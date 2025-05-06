/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, X } from "lucide-react";
import LoginLottie from "../../assets/lottieFiles/login_page_lottie.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { user, signIn, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

      navigate(from, { replace: true });
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
      form.password.value = "";
    }
  };

  const handleDemoLogin = (role) => {
    const form = document.querySelector("form");
    if (role === "employee") {
      // form.email.value = "mehedi@emp.com";
      // form.password.value = "Mehedi123@emp";
      form.email.value = "emp_hasan@user.com";
      form.password.value = "emp@User123";
    } else if (role === "hr_manager") {
      // form.email.value = "mehedi@hr.com";
      // form.password.value = "pr@y2Allah";
      form.email.value = "hr_mehedi@user.com";
      form.password.value = "hr@User123";
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    // const reset = await resetPassword(email);
    try {
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Password reset email sent",
        text: "Please check your inbox for instructions.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error sending password reset email:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send password reset email. Please try again.",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign In</title>
      </Helmet>

      <div className="flex min-h-screen bg-base-200 w-full my-24 items-center">
        <div className="w-full hidden lg:block">
          <Lottie animationData={LoginLottie} loop={true} />
        </div>
        <div className="w-full hero-content">
          <div className="card md:w-2/3 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body w-full">
              <div className="text-center pt-2">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4"
                >
                  Login Now
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-2 justify-center mb-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => handleDemoLogin("employee")}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none text-[12px] capitalize"
                  >
                    Employee Credential
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={() => handleDemoLogin("hr_manager")}
                    className="btn btn-sm bg-indigo-500 hover:bg-indigo-600 text-white border-none text-[12px] capitalize"
                  >
                    HR Manager Credentials
                  </motion.button>
                </motion.div>
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

                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-12 right-3 text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <label className="label">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </button>
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
              className="space-y-2 pb-4"
            >
              <SocialLogin></SocialLogin>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Reset Password
              </h2>
              <button
                // onClick={() => setShowResetModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleReset} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white border-none"
                >
                  Reset Password
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Login;
