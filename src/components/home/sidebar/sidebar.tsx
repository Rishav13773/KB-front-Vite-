/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ProjectTable } from "../project-table/projectTable";
import { UserItem } from "./components/user-item";
import NewButton from "./components/new-button";
import { Bookmark, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import MobileBar from "./mobile-bar";
import TrashItem from "./components/trash-item";
import { useState } from "react";

const Sidebar = () => {
  const [revalidate, setReValidate] = useState(false);
  console.log("revalidate", revalidate);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-full"
    >
      {/* //////Side panel for desktop/////// */}
      <ResizablePanel
        className="hidden md:block"
        defaultSize={12}
        minSize={12}
        maxSize={20}
      >
        <div className="flex flex-col h-full items-start justify-start gap-3 dark:bg-transparent bg-gray-100">
          <UserItem />
          <div className="flex flex-col items-start gap-1 w-full">
            <NewButton />
            <Separator className="mt-4" />
            <p className="flex items-center gap-2 text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
              <Bookmark width={18} />
              Starred
            </p>
            <TrashItem revalidate={revalidate} setReValidate={setReValidate} />
          </div>
        </div>
      </ResizablePanel>

      {/* ////Sidebar for mobile////// */}

      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        {/* <div>
          <MobileBar />
        </div> */}
        <div className="flex h-full items-start justify-center p-6">
          <ProjectTable revalidate={revalidate} setReValidate={setReValidate} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Sidebar;
