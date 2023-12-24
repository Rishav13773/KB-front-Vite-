import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { UserItem } from "./components/user-item";
import NewButton from "./components/new-button";

const Sidebar = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-full border-t"
    >
      <ResizablePanel defaultSize={10} minSize={15} maxSize={30}>
        <div className="flex flex-col items-start justify-start dark:bg-transparent bg-gray-100 h-full">
          <UserItem />
          <div className="flex flex-col w-full justify-start mt-4 mx-6 gap-4">
            <NewButton />
            <span>Starred</span>
            <span>Share</span>
            <span>Trash</span>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Sidebar;
