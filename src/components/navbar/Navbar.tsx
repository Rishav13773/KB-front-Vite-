import { ModeToggle } from "../mode-toggle";
import NavMenu from "./NavMenu";

import logodark from "../../assets/logo-dark.svg";
import logolight from "../../assets/logo-light.svg";

const Navbar = () => {
  return (
    <div className="flex justify-between mx-6 mt-4 items-center">
      <div className="flex gap-2">
        <img className="dark:hidden" width={20} src={logodark} alt="" />
        <img className="hidden dark:block" width={20} src={logolight} alt="" />
        <p className="text-sm">Base Inc.</p>
      </div>

      <div className="flex gap-4 items-center ">
        <ModeToggle />
        <NavMenu />
      </div>
    </div>
  );
};

export default Navbar;
