import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Project from "./pages/project/Project";
import { RootState } from "./reducers";

const App = () => {
  const userState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  console.log("Redux State", userState);

  // Effect to navigate to the login page when the user logs out
  useEffect(() => {
    if (!userState) {
      navigate("/");
    }
  }, [userState, navigate]);

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Register />} />

        <Route
          path="/home"
          element={userState.details ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/settings"
          element={
            userState.details ? <Settings /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/project"
          element={
            userState.details ? <Project /> : <Navigate to="/" replace />
          }
        />

        {/* Additional routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
