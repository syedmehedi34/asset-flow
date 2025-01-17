/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LoginLottie from "../../assets/lottieFiles/login_page_lottie.json";
import Lottie from "lottie-react";

const Login = () => {
  const { user, signIn } = useContext(AuthContext);
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(user);

  const from = location.state?.from?.pathname || "/";
  // console.log("state in the location login page", location.state);
  // Redirect logged-in users to the homepage
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Logged In successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again."); // Set error message

        Swal.fire({
          // position: "top-end",
          icon: "error",
          title: "Invalid credentials",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.error("ERROR", error.message);
        event.target.password.value = "";
      });
  };

  return (
    <>
      <div className="flex min-h-screen bg-base-200 w-full my-24 items-center ">
        <div className="w-full  hidden lg:block">
          <Lottie animationData={LoginLottie} loop={true} />
        </div>
        <div className="w-full hero-content">
          <div className="card md:w-2/3 w-full max--sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body w-full h-[380px]">
              <div className="text-center pt-2">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4"
                >
                  Login Now
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>

                {/* password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
              </motion.div>

              {/* submit  */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center px-8 py-3  text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 w-full justify-center"
                >
                  Login
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <SocialLogin></SocialLogin>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
