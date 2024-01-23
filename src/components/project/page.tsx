/* eslint-disable @typescript-eslint/no-unused-vars */
import { File, Search } from "lucide-react";

import "./components/style.css";
import FileUploader from "./components/uploader";
import UserLabel from "./components/user-label";
import UserDropdown from "./components/user-dropdown";
import { Separator } from "../ui/separator";
import pdf from "./../../assets/pdf-file-icon.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

//Blueprint of response data
interface docsData {
  url: [];
  project: string;
}

const DocPage = () => {
  const [data, setData] = useState<docsData>();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const resposne = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getdocumentByPid/${id}`
      );
      console.log(resposne.data);
      setData(resposne.data[0].urls); ///Need to get info from URLS
    };

    getData();
  }, []);

  return (
    <div>
      <div className="flex h-full">
        <div className="flex-1 p-4 bg-gray-100 dark:bg-[#1F1F1F] m-4 rounded-lg">
          {/* /////SEARCH BAR//// */}
          <div className="flex justify-between mb-4">
            <div className="container">
              <input
                type="text"
                name="text"
                className="input max-w-[130px] bg-gray-200 dark:bg-[#53535f] dark:focus:bg-[#0e0e10] placeholder:text-muted-foreground text-black dark:text-white"
                placeholder="Search..."
              />
              <button className="search__btn bg-gray-300 hover:bg-gray-400 dark:bg-[#2a2a2d] dark:hover:bg-[#363638]">
                <Search width={18} />
              </button>
            </div>
            <div className="flex items-center bg-gray-200 dark:bg-gray-600 pr-3 rounded-lg md:hidden">
              <UserLabel />
              <UserDropdown />
            </div>
          </div>

          {/* ///Fetching files and displaying/// */}
          {!data ? (
            <FileUploader />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {data.map((itm: docsData) => (
                <div className="bg-transparent border border-1 p-4 rounded-md w-50 h-auto flex flex-col items-center justify-center gap-4">
                  <img width={100} src={pdf} alt="pdf" />
                  <h5 className="text-xs">Hello.pdf</h5>
                </div>
              ))}
              <div className="bg-transparent border border-1 p-4 rounded-md w-50 h-50 flex justify-center">
                Add files
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
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
