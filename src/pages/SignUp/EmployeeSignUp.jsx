/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
  Mail,
  Upload,
  User,
} from "lucide-react";

const EmployeeSignUp = () => {
  const [, , , userRoleRefetch] = useRole();
  const [showPassword, setShowPassword] = useState(false);
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!profileImageFile) {
      alert("Please select an image.");
      return;
    }

    console.log(data);

    // send image to imbb
    const formDataUserImage = new FormData();
    formDataUserImage.append("image", profileImageFile);
    const responseUserImage = await fetch(
      `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
      {
        method: "POST",
        body: formDataUserImage,
      }
    );
    const resultUserImage = await responseUserImage.json();
    console.log(resultUserImage);
    //
    //
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: resultUserImage.data.url,
            role: "employee",
            hr_email: "unaffiliated@hostname.com",
            dob: data.dateOfBirth,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              // console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
              userRoleRefetch();
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  // ?
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileImageFile(file);
    }
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign Up</title>
      </Helmet>

      <div className="mt-16 bg-base-200">
        <div className="w-3/4 mx-auto  bg-white shadow-2xl mt-10">
          {/* header  */}
          <div className="text-center mb-1 pt-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4"
            >
              Join as a Employee
            </motion.h1>
            <p className="text-gray-600">
              Create your employee account and start a good team collaboration
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* image upload */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center mb-3"
            >
              <div className="relative w-32 h-32">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-blue-500">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  <Upload className="w-4 h-4 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  // {...register("image", { required: true })}
                  onChange={handleImageUpload} // Handle the file input change
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload your profile photo
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* full name  */}
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                      })}
                      // name="name"
                      placeholder="Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      Full name is required
                    </p>
                  )}
                </div>

                {/* dob  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Controller
                      control={control}
                      name="dateOfBirth"
                      rules={{ required: "Date of birth is required" }}
                      render={({ field }) => (
                        <input
                          type="date"
                          onChange={field.onChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      )}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
              >
                {/* email  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && (
                    <span className="mt-1 text-sm text-red-500">
                      Email is required
                    </span>
                  )}
                </div>

                {/* password  */}
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      placeholder="Enter your password"
                      className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="mt-1 text-sm text-red-500">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="mt-1 text-sm text-red-500">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="mt-1 text-sm text-red-500">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* terms and conditions  */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-2 mt-4"
            >
              <input
                type="checkbox"
                {...register("termsAccepted", {
                  required: "You must accept the terms and conditions",
                })}
                id="terms"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{" "}
                <a href="" className="text-blue-600 hover:underline">
                  Terms and Conditions
                </a>
              </label>
            </motion.div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500">
                {errors.termsAccepted.message}
              </p>
            )}

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
                className="inline-flex items-center px-8 py-3  text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </motion.div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeSignUp;
