import Navbar from "@/components/navbar/Navbar";
import DocPage from "@/components/project/page";

const Project = () => {
  return (
    <div>
      <Navbar />

      <main className="pt-20">
        <DocPage />
      </main>
    </div>
  );
};

export default Project;
