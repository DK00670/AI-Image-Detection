import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppBar from './components/AppBar';
import Phone from './components/Phone';
import CallLogsComponent from './components/CallLogs';
import Sidebar from './components/NavBar';

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

  return (
    <>
      {' '}
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}{' '}
      <div className="wrapper">
        {' '}
        <Sidebar />
        <Phone />
        <CallLogsComponent />
      </div>
    </>
  );
}

export default App;
