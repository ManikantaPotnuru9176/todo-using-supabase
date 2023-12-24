import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl pt-2 md:pt-10">
        <div className="card-body">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <Input
                type="email"
                name="email"
                id="email"
                bordered
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                bordered
                required
              />
            </div>
            <div className="card-actions">
              <Button
                type="submit"
                variant="accent"
                icon="signin"
                outline
                className="w-full"
              >
                Sign in
              </Button>
            </div>
            <p className="text-sm font-light">
              Don’t have an account yet?{" "}
              <a href="register" className="font-medium hover:underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
