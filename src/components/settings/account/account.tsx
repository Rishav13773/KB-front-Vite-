import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import React from "react";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Upload } from "lucide-react";

import EmailUpdate from "./components/emailUpdate";
import { RootState } from "@/reducers";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import axios from "axios";

interface FormData {
  picture: File;
}

const Account = () => {
  const user = useSelector((state: RootState) => state.user);
  const [image, setImage] = useState<string | null>(user.picture || null);
  const dispatch = useDispatch();

  //Formatting Date and Time
  const currentDate = new Date();

  const options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  console.log("profile", user);
  console.log("userID", user.id, " or user._id", user._id);
  const {
    register,
    getValues,
    setValue,
    formState: { error },
    handleSubmit,
  } = useForm<FormData>();

  console.log("picture: ", user.picture);
  React.useEffect(() => {
    // Check if user object is not empty
    if (user) {
      // Assuming your form fields match the user properties
      setValue("username", user.username);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("bio", user.details.bio);
      setValue("picture", user.picture);
      // ... set other form field values
    }
  }, [user]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Set the value of the "picture" field
      setValue("picture", file);

      // Read the selected file and set it to the image state
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
    // else {
    //   // If no file is selected, use the image from user.picture
    //   setImage(user.picture || null);
    // }
  };

  const updateProfile = async () => {
    try {
      const userId = user.id;
      console.log("userId", userId);
      // console.log("getValues: ", getValues);
      const formData = new FormData();

      // Append form data
      formData.append("username", getValues("username"));
      formData.append("firstName", getValues("firstName"));
      formData.append("lastName", getValues("lastName"));
      formData.append("bio", getValues("bio"));
      formData.append("picture", getValues("picture")); // Assuming "picture" is an array

      // console.log("formData: ", formData);

      const userProfile = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/profile/${userId}`,

        formData
      );
      const data = await userProfile.data;
      console.log(data);
      Cookies.set("user", JSON.stringify(data));
      dispatch({ type: "PROFILE", payload: data });

      toast("Profile Updated", {
        description: formattedDate,
        action: {
          label: "close",
          onClick: () => console.log("Undo"),
        },
      });

      // console.log("profile: ", userProfile);
    } catch (error) {
      console.log("Error Occurred", error);
      toast("Please try again later", {
        description: formattedDate,
        action: {
          label: "close",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <>
      <div className="mt-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* ////PROFILE SECTION///// */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold">Your Profile</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Choose how you are displayed as host or guest
          </p>

          {/* ////PROFILE FORM///// */}
          <form
            onSubmit={handleSubmit(updateProfile)}
            action=""
            className="flex flex-col gap-4 mt-4 md:flex-row sm:flex-row md:gap-10 sm:gap-10"
          >
            <div className="md:order-2 sm:order-2 ">
              <Avatar className="w-40 h-40 md:w-32 md:h-32 sm:w-32 sm:h-32">
                <AvatarImage src={image} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <label
                className="absolute top-[21rem] ml-24 md:top-[19.5rem] md:ml-20 sm:top-[19.5rem] sm:ml-20"
                htmlFor="picture"
              >
                <div className="bg-black p-4 rounded-full">
                  <Upload className="text-white" />
                </div>
              </label>
              <Input
                id="picture"
                type="file"
                name="picture"
                {...register("picture")}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="md:w-80 sm:w-72 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                  id="username"
                  name="username"
                  {...register("username")}
                  placeholder="Enter your username"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  {...register("bio")}
                  placeholder="Tell us a little bit about yourself"
                />
              </div>

              <Button size="sm" className="w-32 mt-2">
                Save Changes
              </Button>
            </div>
          </form>
        </section>
        <Separator className="my-8" />
        {/* ///Email & Phone/// */}
        <EmailUpdate />
      </div>
      <Toaster />
    </>
  );
};

export default Account;
