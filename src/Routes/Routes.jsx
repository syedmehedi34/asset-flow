import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import EmployeeSignUp from "../pages/SignUp/EmployeeSignUp";
import Error from "../pages/Error";
import ManagerSignUp from "../pages/SignUp/ManagerSignUp";
import AssetList from "../pages/AssetList/AssetList";
import ManagerRoute from "./ManagerRoute";
import AddAsset from "../pages/AddAsset/AddAsset";
import AllRequest from "../pages/AllRequest/AllRequest";
import EmployeeList from "../pages/EmployeeList/EmployeeList";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import ManagerProfile from "../pages/ManagerProfile/ManagerProfile";
import UpdateAssetData from "../pages/UpdateAssetData";

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
      {
        path: "asset/update",
        element: (
          <ManagerRoute>
            <UpdateAssetData></UpdateAssetData>
          </ManagerRoute>
        ),
      },
      {
        path: "add_asset",
        element: (
          <ManagerRoute>
            <AddAsset></AddAsset>
          </ManagerRoute>
        ),
      },
      {
        path: "all_requests",
        element: (
          <ManagerRoute>
            <AllRequest></AllRequest>
          </ManagerRoute>
        ),
      },
      {
        path: "employee_list",
        element: (
          <ManagerRoute>
            <EmployeeList></EmployeeList>
          </ManagerRoute>
        ),
      },
      {
        path: "add_employee",
        element: (
          <ManagerRoute>
            <AddEmployee></AddEmployee>
          </ManagerRoute>
        ),
      },
      {
        path: "hr_profile",
        element: (
          <ManagerRoute>
            <ManagerProfile></ManagerProfile>
          </ManagerRoute>
        ),
      },
    ],
  },
]);
