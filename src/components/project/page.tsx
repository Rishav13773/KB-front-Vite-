import { Search } from "lucide-react";

import "./components/style.css";
import FileUploader from "./components/uploader";

const DocPage = () => {
  return (
    <div>
      <FileUploader />

      <div className="flex">
        <div className="flex-1 p-4 bg-[#1F1F1F]">
          {/* /////SEARCH BAR//// */}
          <div className="flex justify-around">
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
            <div>avatar</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
            <div className="bg-blue-500 p-4 rounded-md w-50 h-40"></div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="hidden w-1/4 bg-gray-200 p-4">
          {/* Side Panel Content */}
        </div>
      </div>
    </div>
  );
};

export default DocPage;
