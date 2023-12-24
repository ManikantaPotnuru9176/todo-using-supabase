import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center pt-2 md:pt-10">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-xl font-bold leading-tight tracking-tight">
            Create and account
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
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium"
              >
                Confirm password
              </label>
              <Input
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                bordered
                required
              />
            </div>
            <div className="card-actions">
              <Button type="submit" variant="accent" outline className="w-full">
                Create an account
              </Button>
            </div>
            <p className="text-sm font-light">
              Already have an account?{" "}
              <a href="login" className="font-medium hover:underline">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
