import { Button } from "@/app/_components/Button";
import { cn } from "@/app/_utils/cn";
import React from "react";

// VerifyView component
const VerifyView = () => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl mt-20">
      <div className="card-body">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mx-auto w-16 h-16 text-green-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4 mb-6">
          Email Verified
        </h2>
        <p className="text-gray-600 text-center pb-6">
          Your email has been successfully verified. You can now access all
          features.
        </p>
        <p className="text-gray-600 text-center pb-6">
          You can procced with{" "}
          <a className="text-blue-500 underline" href="/auth/login">
            Login
          </a>{" "}
          now.
        </p>
      </div>
    </div>
  );
};

export default VerifyView;
