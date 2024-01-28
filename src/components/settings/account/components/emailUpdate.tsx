import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/reducers";
import React from "react";

const EmailUpdate = () => {
  const {
    register,
    getValues,
    setValue,
    formState: { error },
  } = useForm<FormData>();
  const user = useSelector((state: RootState) => state.user);

  React.useEffect(()=>{
    if (user) {
    setValue("email", user.email);
    setValue("phone", user.phoneNo);
    }
  },[user]);

  const updateEmail = async (event) => {
    try {
      event.preventDefault();
      const userId = user.id;

      console.log("userEmail: ", getValues("email"));
      const formData = getValues();

      const emailResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/updateEmail/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("userEmail in emailUpdate: ", emailResponse);
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  const updatePhone = async (event) => {
    try {
      event.preventDefault();
      const userId = user.id;
      const userPhoneNumber = getValues("phone");

      // setValue("userId", userId);

      const fromData = getValues();

      const phoneResonse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/updatePhone/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fromData),
        }
      );
      console.log("userPhoneNumber in phoneUpdate: ", phoneResonse);
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Email and Phone</h2>
      <p className="text-xs text-muted-foreground mt-2">
        Manage the email and phone you use to sign into Base and receive
        notifications
      </p>

      <form className="flex flex-col gap-6 mt-4 md:w-full sm:w-full md:flex-row sm:flex-row md:gap-12 sm:gap-12">
        <div className="flex flex-col gap-2">
          <div>
            <Label>Email</Label>
          </div>
          <div className="flex flex-col gap-2 md:flex-row sm:flex-row md:items-center sm:items-center">
            <Input
              id="email"
              name="email"
              {...register("email")}
              placeholder="name@example.com"
              type="email"
            />
            <Button
              onClick={updateEmail}
              className="w-20 mt-2 p-1 md:mt-0 sm:mt-0"
              size="icon"
            >
              Update
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>
            <Label>Phone</Label>
          </div>
          <div className="flex flex-col gap-2 md:flex-row sm:flex-row md:items-center sm:items-center">
            <Input
              id="phone"
              name="phone"
              type="number"
              {...register("phone")}
              placeholder="+91-9999999999"
            />
            <Button
              onClick={updatePhone}
              className="w-20 mt-2 p-1 md:mt-0 sm:mt-0"
              size="icon"
            >
              Update
            </Button>
          </div>
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-4">
        For your security, we will send you a code to verify any change to your
        email or phone number
      </p>
      <Separator className="my-8" />
    </div>
  );
};

export default EmailUpdate;
