import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ManagerRoute = ({ children }) => {
  const { loading } = useAuth();
  const [isRole, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (isRole?.role === "hr_manager") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default ManagerRoute;
