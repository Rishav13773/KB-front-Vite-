import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Project from "./pages/project/Project";
import { RootState } from "./reducers";

const App = () => {
  const userState = useSelector((state: RootState) => state.user);

  console.log("User Redux State", userState);

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />

        <Route
          path="/home"
          element={userState ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/settings"
          element={userState ? <Settings /> : <Navigate to="/" replace />}
        />
        <Route
          path="/projects/:id"
          element={userState ? <Project /> : <Navigate to="/" replace />}
        />

        {/* Additional routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
