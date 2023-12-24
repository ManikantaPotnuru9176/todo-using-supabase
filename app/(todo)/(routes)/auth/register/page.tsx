import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Register</h2>
          <form className="max-w-sm">
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="john@gmail.com"
                bordered
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Your password
              </label>
              <Input type="password" id="password" bordered required />
            </div>
            <div className="mb-5">
              <label
                htmlFor="repeat-password"
                className="block mb-2 text-sm font-medium"
              >
                Repeat password
              </label>
              <Input type="password" id="repeat-password" bordered required />
            </div>
            <div className="card-actions justify-end">
              <Button type="submit" variant="primary">
                Register new account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
