/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register/Register";

import Home from "./pages/home/Home";

const App = () => {
  // const { user } = useSelector((state) => ({
  //   ...(state as Record<string, object>),
  // }));
  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/home" element={<Home />} />

        {/* {user && (
          <>
            <Route path="/profile" element={<Profile />} />
          </>
        )}

        {user && (
          <>
            <Route path="/projects/:id" element={<Project />} />
          </>
        )} */}
      </Routes>
    </div>
  );
};

export default App;
