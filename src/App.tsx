import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from './AppBar';

import SwitchDarkMode from './SwitchDarkMode';
import SelectLanguage from './SelectLanguage';

function App() {
  console.log(window.ipcRenderer);

  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendMessageToElectron = () => {
    if (window.Main) {
      window.Main.sendMessage(t('common.helloElectron'));
    } else {
      setFromMain(t('common.helloBrowser'));
    }
    setSent(true);
  };

  useEffect(() => {
    window.Main.removeLoading();
  }, []);

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('message', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  async function detectCameras() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
  }

  async function createCameraStream(deviceId:any) {
    return await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: deviceId } },
      audio: false,
    });
  }

  function arrangeGrid(cameraCount:number) {
    const grid = document.getElementById('camera-grid');
    const cols = Math.ceil(Math.sqrt(cameraCount));
    const rows = Math.ceil(cameraCount / cols);
    if(grid!==null){
      grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    }
  }

  async function start() {
    const cameras = await detectCameras();
    console.log("Detected Cameras:", cameras);

    const cameraGrid = document.getElementById('camera-grid');
    arrangeGrid(cameras.length);

    cameras.forEach(async (camera) => {
      const videoElement = document.createElement('video');
      videoElement.setAttribute('autoplay', "true");
      videoElement.setAttribute('muted', "true");
      videoElement.setAttribute('playsinline', "true");

      const stream = await createCameraStream(camera.deviceId);
      videoElement.srcObject = stream;

      if(cameraGrid!==null)
        cameraGrid.appendChild(videoElement);
    });
  }

  return (
    <div className="flex flex-col">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex-auto">
        <div className="ml-4 mr-4 mt-4 flex items-center justify-between">
          <SwitchDarkMode />
          <SelectLanguage />
        </div>
        <div className="flex flex-col justify-center items-center h-full pt-32 space-y-4" id="camera-grid">
          <button
            onClick={start}
            className=" bg-green-400 rounded px-4 py-0 focus:outline-none hover:bg-green-300 dark:text-black"
          >
            {t('common.cameras')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
