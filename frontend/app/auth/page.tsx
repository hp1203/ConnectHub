import Link from "next/link";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Auth: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 items-center justify-center p-5 hidden md:flex flex-[0.7] bg-[url(https://images.unsplash.com/photo-1491118217331-c147f566d809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1589&q=80)] h-screen">
          <h1 className="text-white font-montserrat text-center text-5xl md:text-6xl leading-normal font-semibold tracking-wider">Elevate Your Online Presence</h1>
      </div>

      <div
        className="bg-white w-full flex-[0.4] flex flex-col p-14 h-screen"
      >
          <div>
            <Link
              className="text-gray-800 font-museomoderno text-xl font-bold md:text-2xl hover:text-gray-700"
              href="#"
            >
              ConnectHub
            </Link>
          </div>
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight mt-14">
            Welcome back
          </h2>
          <span className="text-gray-600 font-montserrat text-base tracking-wider">Login to your account</span>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minlength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 text-white font-semibold rounded-lg
              px-4 py-3 mt-6 transition duration-150"
            >
              Log In
            </button>
          </form>

          {/* <hr className="my-6 border-gray-300 w-full" />

          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <FcGoogle className="w-6 h-6" />
              <span className="ml-4">Log in with Google</span>
            </div>
          </button> */}

          <p className="mt-8">
            Need an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-xs font-medium text-gray-500">This site is protected by reCAPTCHA and the <a href="#"><b>Google Privacy Policy</b></a> and <a href="#"><b>Terms of Service</b></a> apply.</p>
        </div>
      </div>
    </section>
  );
};

export default Auth;
