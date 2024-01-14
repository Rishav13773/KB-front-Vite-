import React, { ChangeEvent, useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoginForm from "@/components/login/LoginForm";
import { cn } from "@/lib/utils";

import "./style.css";
import { ArrowRight, Check } from "lucide-react";

const RegisterForm = () => {
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);

  ///Array to track steps for input fileds
  const formSteps = ["email", "username", "password", "confirmPassword"];

  const [step, setStep] = useState(0);

  //initial form data
  const formData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [credentials, setCredentials] = useState(formData);
  console.log(valid);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      (e.target.name === "email" && isValidEmail(credentials.email)) ||
      (e.target.name === "password" && isValidPassword(credentials.password)) ||
      (e.target.name === "username" && isValidUsername(credentials.username))
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleContinue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setValid(false);

    // Validate email before proceeding to the next step
    if (step === 0 && !isValidEmail(credentials.email)) {
      // Display error
      return;
    }

    if (step === 2 && !isValidPassword(credentials.password)) {
      //Display error
      return;
    }

    // Proceed to the next step
    setStep((prevStep) => prevStep + 1);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    return password.length >= 8;
  };

  const isValidUsername = (username: string) => {
    return username.length >= 6;
  };

  return (
    <>
      {!visible && (
        <>
          <div className="absolute left-4 top-5 md:hidden">
            <h3 className="text-2xl font-bold">Base Inc</h3>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setVisible(true);
            }}
            variant="ghost"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Button>

          {/* /////NEW REGISTER//////// */}
          <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <div className="border-[1px] dark:border-white border-black w-[300px] md:w-[300px] lg:w-[400px] h-auto p-6 pl-8 css-typing rounded-lg  dark:bg-[#1F1F1F] bg-gray-100">
              <div className="mb-6">
                <p className="text-muted-foreground">Welcome to base!</p>
                <p className="text-muted-foreground">Let's begin adventure</p>
              </div>

              {/* ///DATA FORM START////// */}
              <div className={cn("grid gap-6 w-[300px] md:w-[350px]")}>
                <form>
                  <div className="flex flex-col gap-2">
                    <Label>Enter your credentails*</Label>
                    <div className="flex flex-col md:flex-col lg:flex-row items-start gap-2">
                      <div className="flex flex-row md:flex-row items-center gap-2">
                        {valid ? (
                          <Check width={15} color="green" />
                        ) : (
                          <ArrowRight width={15} />
                        )}
                        <Input
                          className="w-[200px] md:w-[200px]"
                          id={formSteps[step]}
                          placeholder={`${
                            formSteps[step] === "confirmPassword"
                              ? "Confirm password"
                              : `Enter your ${formSteps[step]}`
                          }`}
                          type={
                            formSteps[step] === "password" ||
                            formSteps[step] === "confirmPassword"
                              ? "password"
                              : "text"
                          }
                          name={formSteps[step]}
                          value={credentials[formSteps[step]]}
                          onChange={handleInputChange}
                          autoComplete={
                            formSteps[step] === "password" ||
                            formSteps[step] === "confirmPassword"
                              ? "new-password"
                              : "off"
                          }
                        />
                      </div>
                      {step < formSteps.length - 1 ? (
                        <Button size="sm" onClick={handleContinue}>
                          Continue
                        </Button>
                      ) : (
                        <Button type="submit" size="sm">
                          Register
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-[300px] md:w-[300px] lg:w-[400px] absolute bottom-0 mb-5">
              <p className="text-muted-foreground text-xs">
                By creating an account, you agree to the{" "}
                <span className="text-blue-700 underline">
                  Terms of Service
                </span>
                . For more information about Base's privacy practices, see the
                <span className="text-blue-700 underline">
                  Base Privacy Statement
                </span>
                . We'll occasionally send you account-related emails.
              </p>
            </div>
          </div>
        </>
      )}

      {visible && <LoginForm setVisible={setVisible} />}
    </>
  );
};

export default RegisterForm;
