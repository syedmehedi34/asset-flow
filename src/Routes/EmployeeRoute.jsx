/* eslint-disable no-unused-vars */
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const { loading, logOut } = useAuth();
  const [isRole, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (isRole?.role === "employee") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default EmployeeRoute;

// logOut();
// const isAdminRoute = location?.state?.from?.pathname?.includes("adminRoute")
// || location.pathname.includes("adminRoute");
// <Navigate
// to={isAdminRoute ? "/" : "/login"}
// state={{ from: location }}
// replace
// />
