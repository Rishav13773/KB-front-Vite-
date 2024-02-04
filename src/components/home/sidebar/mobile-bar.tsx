import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UserItem } from "./components/user-item";
import NewButton from "./components/new-button";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Trash } from "lucide-react";

const MobileBar = () => {
  return (
    <div>
      <SheetContent side="left">
        <div className="flex flex-col h-full items-start justify-start gap-3  ">
          <UserItem />
          <div className="flex flex-col items-start gap-1 w-full">
            <NewButton />
            <Separator className="mt-4" />
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
      </SheetContent>
    </div>
  );
};

export default MobileBar;
