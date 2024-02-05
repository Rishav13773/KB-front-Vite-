import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Users } from "lucide-react";

const Friends = () => {
  return (
    <>
      <p className="flex gap-2 items-center text-sm w-full hover:bg-primary/5 p-1 pl-2 text-muted-foreground hover:cursor-pointer">
        <Users width={18} />
        Connections
      </p>

      <div className="avatar-main">
        <div className="flex items-center gap-x-2 p-1 pl-2">
          <div className="rounded-md bg-secondary">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
          </div>
          <div className="space-y-0 ">
            <p className="text-xs line-clamp-1 hover:underline cursor-pointer">
              Rishav Jakhu
            </p>
            <span className="text-[10px] line-clamp-1 text-muted-foreground">
              React Developer, Delhi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-2 p-1 pl-2">
          <div className="rounded-md bg-secondary">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
          </div>
          <div className="space-y-0 ">
            <p className="text-xs line-clamp-1 hover:underline cursor-pointer">
              Rahul Kumar
            </p>
            <span className="text-[10px] line-clamp-1 text-muted-foreground">
              UI designer, Delhi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-2 p-1 pl-2">
          <div className="rounded-md bg-secondary">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="image" />
            </Avatar>
          </div>
          <div className="space-y-0 ">
            <p className="text-xs line-clamp-1 hover:underline cursor-pointer">
              Mohak muskan
            </p>
            <span className="text-[10px] line-clamp-1 text-muted-foreground">
              software developer, Delhi
            </span>
          </div>
        </div>
      </div>

      <p className=" flex gap-2 items-center text-xs p-1 pl-2 text-muted-foreground hover:cursor-pointer">
        See all...
      </p>
    </>
  );
};

export default Friends;
