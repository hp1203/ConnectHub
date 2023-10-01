"use client";
import Button from "@/UI/Button";
import Input from "@/UI/Input";
import useApi from "@/hooks/useApi";
import Link from "next/link";
import React, { useState } from "react";
import { MdPerson2, MdAlternateEmail, MdLock } from "react-icons/md";
import { signIn } from "next-auth/react";

const Register: React.FC = () => {
  const { fetchData } = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}));
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetchData('post', 'auth/register', JSON.stringify(formData)).then((response) => {
      if (response?.data && response?.data.token) {
        signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: `${window.location.origin}/admin`
        });
      } 
    }).catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.error);
    });
    setLoading(false);
  }

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 items-center justify-center p-5 hidden md:flex flex-[0.7] bg-[url(https://images.unsplash.com/photo-1456428746267-a1756408f782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] h-screen">
        <h1 className="text-white font-montserrat text-center text-5xl md:text-6xl leading-normal font-semibold tracking-wider">
          Elevate Your Online Presence
        </h1>
      </div>

      <div className="bg-white w-full flex-[0.4] flex flex-col p-14 h-screen overflow-y-scroll">
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
            Join ConnectHub
          </h2>
          <span className="text-gray-600 font-montserrat text-base tracking-wider">
            Signup for free
          </span>

          <form className="mt-6" action="#" method="POST" onSubmit={handleOnSubmit}>
          <div>
              <label className="block text-gray-700">Full Name</label>
              <Input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                icon={<MdPerson2 className="w-6 h-6 text-gray-500" />}
                onChange={handleOnChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <Input
                name="email"
                type="text"
                placeholder="Enter your email"
                required
                icon={<MdAlternateEmail className="w-6 h-6 text-gray-500" />}
                onChange={handleOnChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                icon={<MdLock className="w-6 h-6 text-gray-500" />}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex items-center justify-between text-right mt-2">
              <div>
                { error && <span className="text-red-500 font-medium text-sm">{error}</span>}
              </div>
              {/* <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a> */}
            </div>
            <Button style="primary" className="w-full mt-6 py-3" type="submit" isLoading={loading}>
              Sign Up
            </Button>
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
            Already have an account?{" "}
            <Link
              href="/auth"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login here
            </Link>
          </p>
          <p className="mt-2 text-xs font-medium text-gray-500">
            This site is protected by reCAPTCHA and the{" "}
            <a href="#">
              <b>Google Privacy Policy</b>
            </a>{" "}
            and{" "}
            <a href="#">
              <b>Terms of Service</b>
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
