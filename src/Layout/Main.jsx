import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import NavBar from "../pages/Shared/NavBar";

const Main = () => {
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

export default Main;
