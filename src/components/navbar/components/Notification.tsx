import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, X } from "lucide-react";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bell width={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-xs flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
            <p className="text-xs">Rishav Jakhu</p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 cursor-pointer" />
            <X className="w-4 h-4 cursor-pointer" />
          </div>
        </DropdownMenuItem>

        <Separator />

        <DropdownMenuItem className="text-xs flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
            <p className="text-xs">Mohak Muskan</p>
          </div>
          <div className="flex items-center gap-3">
            <Check className="w-4 h-4 cursor-pointer" />
            <X className="w-4 h-4 cursor-pointer" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
