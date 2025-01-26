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
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { user, signIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname || "/";
  const from = "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;

      Swal.fire({
        icon: "success",
        title: "Logged In successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true }); // Redirect to `from` path or "/"
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
      form.password.value = ""; // Clear password field
    }
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign In</title>
      </Helmet>

      <div className="flex min-h-screen bg-base-200 w-full my-24 items-center ">
        <div className="w-full hidden lg:block">
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
                  className="inline-flex items-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 w-full justify-center"
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
