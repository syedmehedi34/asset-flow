/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // console.log("state in the location login page", location.state);

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      // console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-200 w-full">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 mt-24">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha above"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                {/* TODO: apply disabled for re captcha */}
                <input
                  disabled={false}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="px-6">
              <small>
                New Here? <Link to="/signup">Create an account</Link>{" "}
              </small>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* Left Side */}
//         <div className="relative hidden md:block">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 z-10" />
//           <img
//             src="https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&q=80"
//             alt="Background"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="relative z-20 p-8 flex flex-col justify-between text-white">
//             <div>
//               <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
//               <p className="text-blue-100 text-lg mb-8">
//                 Sign in to continue your journey with us and explore amazing
//                 possibilities.
//               </p>
//             </div>
//             <div className="space-y-6">
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0">
//                   <span className="h-6 w-6 text-blue-200">&#8250;</span>
//                 </div>
//                 <p className="text-blue-100">
//                   Access your personalized dashboard
//                 </p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0">
//                   <span className="h-6 w-6 text-blue-200">&#8250;</span>
//                 </div>
//                 <p className="text-blue-100">
//                   Track your progress in real-time
//                 </p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-shrink-0">
//                   <span className="h-6 w-6 text-blue-200">&#8250;</span>
//                 </div>
//                 <p className="text-blue-100">
//                   Connect with team members globally
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="p-8 flex flex-col justify-center">
//           <div className="max-w-md w-full mx-auto space-y-8">
//             <div>
//               <h2 className="mt-6 text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
//                 Sign in to your account
//               </h2>
//             </div>

//             <div className="mt-8 space-y-6">
//               {/* Email Input */}
//               <div className="relative">
//                 <input
//                   type="email"
//                   placeholder="Email address"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>
//               {/* Password Input */}
//               <div className="relative">
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <a href="#" className="text-sm font-medium text-blue-600">
//                 Forgot your password?
//               </a>
//             </div>

//             <div className="mt-6 flex justify-center">
//               <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
//                 Sign in
//               </button>
//             </div>

//             <div className="mt-4 text-center">
//               <p className="text-sm text-gray-600">
//                 New Here?{" "}
//                 <a href="#" className="font-medium text-blue-600">
//                   Create an account
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
