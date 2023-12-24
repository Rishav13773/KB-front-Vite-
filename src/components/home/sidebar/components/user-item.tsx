import { ChevronsLeftRight } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../../../ui/button";

export const UserItem = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-2 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[130px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
            <span className="text-start text-xs font-medium line-clamp-1">
              Rishav Jakhu&apos;s Base
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-3 w-3" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 "
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            rishavjakhu@gmail.com
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src="https://github.com/shadcn.png" alt="image" />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-xs line-clamp-1">Rishav Jakhu&apos;s Base</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground text-xs flex justify-start"
        >
          <Button variant="ghost" size="xs">
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
