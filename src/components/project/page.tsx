import { File, Search } from "lucide-react";

import "./components/style.css";
import FileUploader from "./components/uploader";
import UserLabel from "./components/user-label";
import UserDropdown from "./components/user-dropdown";
import { Separator } from "../ui/separator";
import pdf from "./../../assets/pdf-file-icon.svg";

const DocPage = () => {
  return (
    <div>
      {/* <FileUploader /> */}

      <div className="flex">
        <div className="flex-1 p-4 bg-[#1F1F1F] m-4 rounded-lg">
          {/* /////SEARCH BAR//// */}
          <div className="flex justify-between mb-4">
            <div className="container">
              <input
                type="text"
                name="text"
                className="input max-w-[130px]"
                placeholder="Dark Twitch Search"
              />
              <button className="search__btn">
                <Search width={18} />
              </button>
            </div>
            <div className="flex items-center bg-[#313131] pr-3 rounded-lg md:hidden">
              <UserLabel />
              <UserDropdown />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="bg-transparent border border-1 p-4 rounded-md w-50 h-40">
              <img width={100} src={pdf} alt="pdf" />
            </div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="hidden w-1/4 h-screen bg-transparent pt-4 md:block">
          {/* Side Panel Content */}
          <div className="flex justify-between items-center  pr-3 rounded-lg">
            <UserLabel />
            <UserDropdown />
          </div>
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-2 items-start mt-4">
            <p className="">Recent Files</p>

            <div className="w-full space-y-1">
              <p className="flex items-center gap-2 text-sm w-full hover:bg-primary/5  text-muted-foreground hover:cursor-pointer">
                <File width={18} />
                File1
              </p>
              <p className="flex items-center gap-2 text-sm w-full hover:bg-primary/5  text-muted-foreground hover:cursor-pointer">
                <File width={18} />
                File2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocPage;
