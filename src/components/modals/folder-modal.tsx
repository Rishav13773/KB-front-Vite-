/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

import { RootState } from "@/reducers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export function FolderModal() {
  const projectInfo = {
    projectName: "",
    description: "",
    isPrivate: false,
  };

  const [project, setProject] = useState(projectInfo);
  const { projectName, description, isPrivate } = project;

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

  console.log(project);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Reached");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createProject`,
        {
          projectName: projectName,
          description: description,
          isPrivate: isPrivate,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(data.project);

      toast("Project created !", {
        description: formattedDate,
        action: {
          label: "close",
          onClick: () => console.log("Undo"),
        },
      });
      setTimeout(() => {
        navigate(`/projects/${data.project._id}`);
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  //Handling onchange events
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setProject({ ...project, [name]: newValue });
  };

  return (
    <>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Deploy your new project in one-click.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name of your project"
                className="col-span-3"
                name="projectName"
                onChange={handleOnChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Textarea
                placeholder="Description of your project"
                id="bio"
                className="col-span-3"
                name="description"
                onChange={handleOnChange}
              />
            </div>

            <div className="items-top flex space-x-2">
              <input
                type="checkbox"
                id="terms1"
                name="isPrivate"
                className={cn(
                  "peer h-4 w-4 shrink-0 rounded-lg border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                )}
                onChange={handleOnChange}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Make project private
                </label>
                <p className="text-xs text-muted-foreground">
                  Other users can not see your private projects.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
      <Toaster />
    </>
  );
}
