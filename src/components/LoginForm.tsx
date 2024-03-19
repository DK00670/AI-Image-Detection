import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  linkTo: string;
  handleSubmit: (event: FormEvent) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  emailError: string;
  passwordError: string;
  validateEmail: () => void;
  validatePassword: () => void;
  text: string;
  name: string;
  setName: (name: string) => void;
  nameList: string[];
}

// eslint-disable-next-line react/function-component-definition
const LoginForm: FC<LoginFormProps> = ({
  linkTo,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  validateEmail,
  validatePassword,
  text,
  name,
  setName,
  nameList
}) => {
  // const [show, setShow] = useState(false);

  // function handleName(name: string) {
  //   setName(name);
  //   setShow(false);
  // }

  return (
    <div className="pt-12 pb-6 xl:pb-8 xl:pt-24 mx-auto w-full md:max-w-sm xl:max-w-full xl:w-1/3 px-5 xl:px-10">
      <div className="flex gap-3 text-lg font-semibold relative">
        <img src="/images/logo-img.png" alt="logo-img" />
        <h2 className="cursor-pointer">Dapphub</h2>
        {/* <ul className="absolute top-full bg-white rounded-sm left-10">
          {nameList.map(name => (
            <li key={name} onClick={() => handleName(name)} className={`border-b p-2 cursor-pointer ${show ? '' : 'hidden'}`}>
              {name}
            </li>
          ))}
        </ul> */}
      </div>
      <h2 className="text-xl lg:text-2xl font-SF-Display-Bold font-semibold mt-12">
        <strong>{text === 'Login' ? 'Sign up for Dapphub' : 'Log in into your account'}</strong>
      </h2>
      {/* <p className="text-xs mt-3">Let’s get started by providing the details!</p> */}
      <form action="#" className="flex flex-col gap-7 mt-12" onSubmit={handleSubmit}>
        <div className="relative">
          <label
            className="absolute left-4 p-1 -top-3.5 font-medium text-xs lg:text-sm bg-primary-bg z-10"
            htmlFor="email"
          >
            Email ID
          </label>
          <input
            className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            onBlur={validateEmail}
            name="email"
            id="email"
            placeholder="Your work email"
          />
          <span className="error text-red-600">{emailError}</span>
        </div>
        <div className="relative">
          <label
            className="absolute left-4 p-1 -top-3.5 font-medium text-xs lg:text-sm bg-primary-bg z-10"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="px-5 py-3 w-full border bg-opacity-25 border-secondary-color border-opacity-25 rounded-10 placeholder:text-sm bg-primary-bg placeholder:text-secondary-color"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            onBlur={validatePassword}
            name="password"
            id="password"
            placeholder="Your password"
          />
          <span className="error text-red-600">{passwordError}</span>
        </div>
        <button
          type="submit"
          className="text-base font-medium text-white bg-primary-button border border-white border-opacity-10 rounded-10 px-10 py-4 flex justify-center gap-2.5 hover:bg-opacity-90"
        >
          {text === 'Login' ? 'Sign Up Now' : 'Login Now'}
        </button>
      </form>
      <div className="flex flex-col gap-3 mt-8">
        <button className="text-base font-medium text-primary-button border border-black border-opacity-10 rounded-10 px-10 py-3 flex justify-center gap-2.5 hover:text-opacity-90">
          <img src="/images/google-img.png" alt="google-img" /> Continue with Google
        </button>
      </div>
      <p className="text-sm font-medium text-center mt-6">
        Don’t have an account?
        <Link className="text-yellow-color underline ml-1.5" to={`${linkTo}`}>
          {text} here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
