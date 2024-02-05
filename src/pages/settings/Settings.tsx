import Navbar from "@/components/navbar/navbar";
import Account from "@/components/settings/account/account";

const Settings = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-20 max-w-[300px] flex flex-col mx-5 items-center justify-center md:max-w-full sm:max-w-full">
        <Account />
      </main>
    </div>
  );
};

export default Settings;
