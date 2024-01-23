import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Settings } from "lucide-react";

import "./style.css";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch({ type: "LOGOUT" });
    navigation("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Settings className="set_icon" width={16} />
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
  );
};

export default UserDropdown;
