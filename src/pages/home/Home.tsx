import Sidebar from "@/components/home/sidebar/sidebar";
import Navbar from "@/components/navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <div className="border-b-[1px] mt-2"></div> */}
      <Sidebar />
      {/* Content */}
    </div>
  );
};

export default Home;
