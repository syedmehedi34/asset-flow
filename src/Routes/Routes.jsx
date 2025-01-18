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
import EmployeeRoute from "./EmployeeRoute";
import MyAssets from "../pages/MyAssets";
import MyTeam from "../pages/MyTeam";
import AssetRequest from "../pages/AssetRequest";
import MyProfile from "../pages/MyProfile";
import PaymentPage from "../pages/PaymentPage";

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

      // HR pages route
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
      {
        path: "packages",
        element: (
          <ManagerRoute>
            <PaymentPage></PaymentPage>
          </ManagerRoute>
        ),
      },

      // employee pages route
      {
        path: "my_assets",
        element: (
          <EmployeeRoute>
            <MyAssets></MyAssets>
          </EmployeeRoute>
        ),
      },
      {
        path: "my_team",
        element: (
          <EmployeeRoute>
            <MyTeam></MyTeam>
          </EmployeeRoute>
        ),
      },
      {
        path: "request_assets",
        element: (
          <EmployeeRoute>
            <AssetRequest></AssetRequest>
          </EmployeeRoute>
        ),
      },
      {
        path: "employee_profile",
        element: (
          <EmployeeRoute>
            <MyProfile></MyProfile>
          </EmployeeRoute>
        ),
      },
    ],
  },
]);
