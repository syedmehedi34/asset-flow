import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const MainLayout = () => {
  const {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    setUser,
  } = useAuth();
  const [isRole, isRoleLoading] = useRole();

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="">
      <NavBar></NavBar>
      <div className="w-11/12 mx-auto ">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
