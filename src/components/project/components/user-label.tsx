import { CalendarIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/reducers";

const UserLabel = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{`@${user.username}`}</Button>
      </HoverCardTrigger>

      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.picture} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{`@${user.username}`}</h4>
            <p className="text-sm">{user.details.bio}</p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default UserLabel;
