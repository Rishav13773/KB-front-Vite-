// Import necessary components
import Sidebar from "@/components/home/sidebar/sidebar";
import Navbar from "@/components/navbar/Navbar";

const Home = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="pt-20 h-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
