/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";

import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Project from "./pages/project/Project";
import { RootState } from "./reducers";

const App = () => {
  const userState = useSelector((state: RootState) => state.user);

  console.log(userState);
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/project" element={<Project />} />
        {/* <Route path="/projects/:id" element={<Project />} /> */}
      </Routes>
    </div>
  );
};

export default App;
