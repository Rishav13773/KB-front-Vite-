import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "@/reducers";

const NavMenu = () => {
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.picture} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/settings">
            <DropdownMenuItem className="text-xs">Settings</DropdownMenuItem>
          </Link>
          <Link to="/home">
            <DropdownMenuItem className="text-xs">Dashboard</DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="text-xs" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavMenu;
