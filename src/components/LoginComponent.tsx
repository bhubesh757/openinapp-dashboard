"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppContext } from "@/contexts/Provider";
import {useRouter} from 'next/navigation'
import { useSession, signIn, signOut } from "next-auth/react"

import Link from "next/link"

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { login } = useAppContext();

  const {data:session} = useSession();
  useEffect (() => {
    console.log("session" , session);
    if(session?.user){
        router.push("/");
    }
  },[session])
  
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Your password should contain atleast 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      performlogin(values);
    },
  });

  const performlogin = async (values) => {
    setLoading(true);
    const { email, password } = values;
    await login(email, password);
    setLoading(false);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col px-32 py-40 space-y-4 w-full "
    >
      <h1 className=" top-20 text-[32px] font-bold font-inherit text-light-bulma1 inline-block w-[140.81px] h-[48.3px] flex-shrink-0 space-y-2">
        Sign In
      </h1>
      <div className="text-base font-lato text-light-bulma1  w-[176.74px] h-[20.86px]">
        Sign in to your account
      </div>
      {/* signin with google and apple */}
      <div className="flex space-x-5 " >
      <button
        type="submit"
        className=" bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74] "
        onClick={() => signIn("google")}
      >
        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Sign in with Google
      </button>

      <button
        type="submit"
        className=" bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74] "
      >
        <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"   fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16"> <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"/> <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z"/> </svg>
        Sign in with Apple
      </button>
      </div>
      

      <div className="flex flex-col space-y-3">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="border rounded p-2"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-400 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-3">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="border rounded p-2"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-400 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="text-link inline-block w-[136.12px] h-[20.86px]">
        <h1>Forgot password?</h1>
      </div>

      <button
        type="submit"
        className="bg-[#03A9F4] rounded-full p-2 text-white font-semibold"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <span className="flex justify-center text-sm text-gray-500">
        Don’t have an account. Create account{" "}
        <Link href="/signup">
          <strong>&nbsp;here</strong>
        </Link>
      </span>
    </form>
  );
}