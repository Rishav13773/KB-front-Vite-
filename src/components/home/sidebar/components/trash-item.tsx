import { Search, Trash, Undo } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

import { useSelector } from "react-redux";
import { RootState } from "@/reducers";

import React, { useEffect, useState } from "react";
import axios from "axios";

export type Project = {
  id: string;
  projectName: string;
  description: string;
  trash: boolean;
  createdBy: string;
  createdDate: string;
};

interface TrashProps {
  revalidate: boolean;
  setReValidate: React.Dispatch<React.SetStateAction<boolean>>;
}

const TrashItem: React.FC<TrashProps> = ({
  revalidate,
  setReValidate,
}: TrashProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [projects, setProjects] = React.useState<Project[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, [revalidate]);

  const fetchData = async () => {
    try {
      const state = true;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getprojectbyid/${
          user.id
        }?state=${state}`
      );

      const projectsData = await response.data;

      //   console.log("projectData : ", projectsData);
      setProjects(projectsData);

      //   console.log(" state Projects:", projects);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const onRestore = async (id: string) => {
    console.log(id);
    const state = false;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/restoreProject/${id}`,
        { state }
      );

      const data = await response.data;
      setReValidate((prev) => !prev);
      fetchData();

      // console.log(data);
    } catch (error) {
      console.error("Error deleting project:", error.message);
      // Handle the error as needed, e.g., show an error message to the user
    }
  };

  const onRemove = async (id: string) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/deletProject/${id}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="flex gap-2 items-center text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
          <Trash width={18} />
          Trash
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" alignOffset={11}>
        <div className="flex items-center gap-x-1 p-2">
          <Search className="h-4 w-4" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            placeholder="Filter by project title..."
          />
        </div>

        <div className="mt-2 px-1 pb-1">
          <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
            No projects found.
          </p>
          {projects
            .filter((project) =>
              project.projectName.toLowerCase().includes(search.toLowerCase())
            )
            .map((project) => (
              <div
                key={project._id} // Assuming your project object has an 'id' property
                role="button"
                className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
              >
                <span className="truncate pl-2">{project.projectName}</span>
                <div className="flex items-center">
                  <div
                    onClick={() => onRestore(project._id)}
                    role="button"
                    className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  >
                    <Undo className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <ConfirmModal onConfirm={() => onRemove(project._id)}>
                    <div
                      role="button"
                      className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                    >
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </ConfirmModal>
                </div>
              </div>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrashItem;
