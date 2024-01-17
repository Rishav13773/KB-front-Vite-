import { ModeToggle } from "../mode-toggle";
import NavMenu from "./NavMenu";

import logodark from "../../assets/logo-dark.svg";
import logolight from "../../assets/logo-light.svg";

const Navbar = () => {
  return (
    <div className=" justify-between fixed top-0 flex items-center w-full p-2 px-3 border-b bg-background dark:bg-[#111111] z-50">
      <div className="flex gap-2 ">
        <img className="dark:hidden" width={20} src={logodark} alt="" />
        <img className="hidden dark:block" width={20} src={logolight} alt="" />
        <p className="text-sm font-semibold">Base Inc.</p>
      </div>

      <div className="flex gap-4 items-center">
        <ModeToggle />
        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
