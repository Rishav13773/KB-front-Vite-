// Import necessary components
import MobileBar from "@/components/home/sidebar/mobile-bar";
import Sidebar from "@/components/home/sidebar/sidebar";
import Navbar from "@/components/navbar/Navbar";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { RootState } from "@/reducers";
import { ChevronsRight } from "lucide-react";
import { useSelector } from "react-redux";

const Home = () => {
  const userState = useSelector((state: RootState) => state.user);

  console.log("Home page Redux State", userState);

  return (
    <div className="h-screen">
      <Navbar />

      <div className="pt-[62px] h-full">
        <Sheet>
          <div className="md:hidden absolute top-10 left-0 mt-7 z-50">
            <SheetTrigger>
              <ChevronsRight width={18} />
            </SheetTrigger>
          </div>
          <MobileBar />
        </Sheet>
        <Sidebar />N
      </div>
    </div>
  );
};

export default Home;
