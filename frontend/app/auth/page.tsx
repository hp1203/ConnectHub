"use client";
import Button from "@/UI/Button";
import Input from "@/UI/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdAlternateEmail, MdLock } from "react-icons/md";
const Auth: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSigin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      ...formData,
      // callbackUrl: `${window.location.origin}/admin`,
      redirect: false
    });
    if (res?.error) {
      console.log(res);
      // setError(error.response.data.error);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 items-center justify-center p-5 hidden md:flex flex-[0.7] bg-[url(https://images.unsplash.com/photo-1491118217331-c147f566d809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1589&q=80)] h-screen">
        <h1 className="text-white font-montserrat text-center text-5xl md:text-6xl leading-normal font-semibold tracking-wider">
          Elevate Your Online Presence
        </h1>
      </div>

      <div className="bg-white w-full flex-[0.4] flex flex-col p-14 h-screen">
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
          <span className="text-gray-600 font-montserrat text-base tracking-wider">
            Login to your account
          </span>

          <form
            className="mt-6"
            action="#"
            method="POST"
            onSubmit={handleSigin}
          >
            <div>
              <label className="block text-gray-700">Email Address</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                icon={<MdAlternateEmail className="w-6 h-6 text-gray-500" />}
                onChange={handleOnChange}
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                icon={<MdLock className="w-6 h-6 text-gray-500" />}
                onChange={handleOnChange}
              />
            </div>

            <div className="flex items-center justify-between text-right mt-2">
              <div>
                { error && <span className="text-red-500 font-medium text-sm">{error}</span>}
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              style="primary"
              className="w-full mt-6 py-3"
              type="submit"
              isLoading={loading}
            >
              Login
            </Button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          {/* <Button type="button" className="border-[1px] border-gray-300 text-gray-900 w-full py-3" style="outline" icon={<FcGoogle className="w-6 h-6" />}><span className="ml-4">Log in with Google</span></Button> */}
          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            onClick={() => signIn("google")}
          >
            <div className="flex items-center justify-center">
              <FcGoogle className="w-6 h-6" />
              <span className="ml-4">Log in with Google</span>
            </div>
          </button>

          <p className="mt-8">
            Need an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
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

export default Auth;
