import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import EmployeeSignUp from "../pages/SignUp/EmployeeSignUp";
import Error from "../pages/Error";
import ManagerSignUp from "../pages/SignUp/ManagerSignUp";
import AssetList from "../pages/AssetList/AssetList";
import ManagerRoute from "./ManagerRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "employee_signup",
        element: <EmployeeSignUp></EmployeeSignUp>,
      },
      {
        path: "hr_signup",
        element: <ManagerSignUp></ManagerSignUp>,
      },

      // HR pages layout
      {
        path: "assets_list",
        element: (
          <ManagerRoute>
            <AssetList></AssetList>
          </ManagerRoute>
        ),
      },
    ],
  },
]);
