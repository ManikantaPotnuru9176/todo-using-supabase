"use client";

import React, { useState } from "react";

import { Button } from "@/app/_components/Button";
import { Input } from "@/app/_components/Input";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/app/_supabase/_auth/signin";

const SignInView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signInMutation = useMutation({
    mutationFn: (formData: { email: string; password: string }) =>
      signInUser(formData.email, formData.password),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      console.log("Error while regiter!");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate({ email, password });
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl pt-2 md:pt-10">
      <div className="card-body">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
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
              value={password}
              onChange={handlePasswordChange}
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
  );
};

export default SignInView;
