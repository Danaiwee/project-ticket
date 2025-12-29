"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import CustomInput from "./CustomInput";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { SignUpSchema } from "@/lib/validation";

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const submit = async (data: z.infer<typeof SignUpSchema>) => {};

  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="font-semibold text-2xl sm:text-3xl text-gray-900">
          Sign in
        </h1>
        <p className="text-gray-500 text-md font-semibold">
          Please enter your details
        </p>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
          <CustomInput
            control={form.control}
            name="firstName"
            label="First name"
            placeholder="Enter your first name"
          />

          <CustomInput
            control={form.control}
            name="lastName"
            label="Last name"
            placeholder="Enter your last name"
          />

          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <CustomInput
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="text-[16px] rounded-lg border font-semibold text-white shadow-form h-12 cursor-pointer bg-blue-gradient"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-[14px] font-normal text-gray-600">
          Already have an account?
        </p>
        <Link href={"/sign-in"} className="text-[14px] cursor-pointer font-medium text-blue-600">
          Sign in
        </Link>
      </footer>
    </>
  );
};

export default SignUpForm;
