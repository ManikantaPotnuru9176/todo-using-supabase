import SignInView from "@/app/(todo)/_views/auth/SignInView";
import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center">
      <SignInView />
    </div>
  );
};

export default Login;
