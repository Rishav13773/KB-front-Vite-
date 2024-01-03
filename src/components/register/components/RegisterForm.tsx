import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import LoginForm from "@/components/login/LoginForm";
import { cn } from "@/lib/utils";

const RegisterForm = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {!visible && (
        <>
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
          <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below to create your account
              </p>
            </div>
            <div className={cn("grid gap-6 w-[300px] md:w-[350px]")}>
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-2">
                    <Label className="sr-only">Email</Label>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                    />

                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      name="password"
                      autoCapitalize="none"
                      autoComplete="password"
                      autoCorrect="off"
                    />
                  </div>
                  <Button size="sm">Sign up </Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" type="button">
                Github
              </Button>
            </div>
          </div>
        </>
      )}

      {visible && <LoginForm setVisible={setVisible} />}
    </>
  );
};

export default RegisterForm;
