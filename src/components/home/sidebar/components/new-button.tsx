import { FileUp, Folder, FolderUp, ListPlus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "../../../ui/button";
import { FolderModal } from "@/components/modals/folder-modal";

import "./style.css";

const NewButton = () => {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="max-w-[130px] pl-2">
              <Button
                variant="default"
                size="sm"
                className="button flex items-center gap-1 px-10 "
              >
                <ListPlus className="text-xs new-icon " />
                New
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-52"
            align="start"
            alignOffset={11}
            forceMount
          >
            <DialogTrigger className="w-full">
              <DropdownMenuItem className="text-xs flex gap-1">
                <Folder width={15} />
                New project
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem className="text-xs flex gap-1">
              <FolderUp width={15} />
              Upload folder
            </DropdownMenuItem>

            <DropdownMenuItem className="text-xs flex gap-1">
              <FileUp width={15} />
              Upload file
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* ///Folder modal */}
        <FolderModal />
      </Dialog>
    </>
  );
};

export default NewButton;
