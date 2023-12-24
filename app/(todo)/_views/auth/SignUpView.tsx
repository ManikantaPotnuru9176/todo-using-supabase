"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { signUpUser } from "@/app/_supabase/_auth/signup";

const SignUpView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const signUpMutation = useMutation({
    mutationFn: (formData: { email: string; password: string }) =>
      signUpUser(formData.email, formData.password),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("Error while regiter!");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUpMutation.mutate({ email, password });
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="text-xl font-bold leading-tight tracking-tight">
          Create and account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
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
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
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
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              bordered
              value={confirmPassword}
              onChange={handleConfirmPassword}
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
  );
};

export default SignUpView;
