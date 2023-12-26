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

const Sidebar = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-full"
    >
      <ResizablePanel defaultSize={12} minSize={12} maxSize={20}>
        <div className="flex flex-col h-full items-start justify-start gap-3 dark:bg-transparent bg-gray-100">
          <UserItem />
          <div className="flex flex-col items-start gap-1 w-full">
            <NewButton />
            <p className="flex items-center gap-2 text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
              <Bookmark width={18} />
              Starred
            </p>
            <p className="flex gap-2 items-center text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
              <Trash width={18} />
              Trash
            </p>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-start justify-center p-6">
          <ProjectTable />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Sidebar;
