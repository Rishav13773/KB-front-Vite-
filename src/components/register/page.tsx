import RegisterForm from "./components/RegisterForm";
import Section from "./components/Section";

const Page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full md:h-auto">
        {/* Hide Section on tablets and mobile */}
        <div className="hidden md:block">
          <Section />
        </div>

        {/* Show RegisterForm on all screen sizes */}
        <div className="md:w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
