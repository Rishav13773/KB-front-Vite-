/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";

import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";

const App = () => {
  // const { user } = useSelector((state) => ({
  //   ...(state as Record<string, object>),
  // }));
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />

        {/* {user && (
          <>
            <Route path="/projects/:id" element={<Project />} />
          </>
        )} */}
      </Routes>
    </div>
  );
};

export default App;
