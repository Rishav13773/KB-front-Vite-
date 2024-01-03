import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";

import EmailUpdate from "./components/emailUpdate";

const Account = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
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
              htmlFor="fileInput"
            >
              <div className="bg-black p-4 rounded-full">
                <Upload className="text-white" />
              </div>
            </label>
            <Input
              id="fileInput"
              type="file"
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
                placeholder="Enter your username"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Bio</Label>
              <Textarea
                id="bio"
                name="bio"
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
  );
};

export default Account;
