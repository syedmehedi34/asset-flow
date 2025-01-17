import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Upload,
  User,
} from "lucide-react";

const ManagerSignUp = () => {
  const [, , , userRoleRefetch] = useRole();
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
  const [showPassword, setShowPassword] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [companyImageFile, setCompanyImageFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileImageFile(file);
    }
  };

  //api key for imgBB
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const packages = [
    {
      packageId: "starter",
      packagePrice: 5,
      packageName: "Starter Package - 5 Members",
      description:
        "Perfect for small teams. Manage up to 5 members for just $5",
      packageMemberLimit: 5,
      color: "from-blue-500 to-blue-600",
    },
    {
      packageId: "basic",
      packagePrice: 8,
      packageName: "Growth Package - 10 Members",
      description: "Scale up with ease. Manage up to 10 members for only $8",
      packageMemberLimit: 10,
      color: "from-purple-500 to-purple-600",
    },
    {
      packageId: "pro",
      packagePrice: 15,
      packageName: "Pro Package - 20 Members",
      description:
        "deal for larger teams. Manage up to 20 members for just $15.",
      packageMemberLimit: 20,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const onSubmit = async (data) => {
    if (!profileImageFile) {
      alert("Please select an image.");
      return;
    }
    console.log(data);

    // send first image
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

    // send 2nd image
    const formDataCompanyImage = new FormData();
    formDataCompanyImage.append("image", companyImageFile);
    const responseCompanyImage = await fetch(
      `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
      {
        method: "POST",
        body: formDataCompanyImage,
      }
    );
    const resultCompanyImage = await responseCompanyImage.json();

    // console.log(resultUserImage.data.url, resultCompanyImage.data.url);
    //
    //
    if (resultUserImage.success && resultCompanyImage.success) {
      createUser(data.email, data.password).then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // updateUserProfile(data?.name, data?.photoURL)
        updateUserProfile(data?.name, resultUserImage.data.url)
          .then(() => {
            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: resultUserImage.data.url,
              dob: data.dateOfBirth,
              companyName: data.companyName,
              companyLogo: resultCompanyImage.data.url,
              role: "hr_manager",
              package: data.package,
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
    }
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign Up</title>
      </Helmet>

      <div className="">
        <div className="w-3/4 mx-auto  bg-base-200 mt-24">
          {/* Header */}
          <div className="text-center mb-1 pt-10">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4"
            >
              Join as a Manager
            </motion.h1>
            <p className="text-gray-600">
              Create your manager account and start managing your team
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/*  */}
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

                {/* company name  */}
                <div className="form-control">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      {...register("companyName", { required: true })}
                      // name="name"
                      placeholder="Company Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  {errors.companyName && (
                    <span className="mt-1 text-sm text-red-500">
                      Name is required
                    </span>
                  )}
                </div>

                {/*  company logo  */}
                <div className="form-control">
                  <label className=" block text-sm font-medium text-gray-700 mb-1">
                    Company Logo URL
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-md w-full max-w-xs"
                    accept="image/*"
                    onChange={(e) => setCompanyImageFile(e.target.files[0])}
                  />
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
            </div>

            {/* package section  */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-lg font-medium text-gray-700 mb-4">
                Select Package
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                  <motion.label
                    key={pkg.packageId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="relative"
                  >
                    <input
                      type="radio"
                      {...register("package", {
                        required: "Please select a package",
                      })}
                      value={pkg.packageId}
                      className="absolute opacity-0 peer"
                    />
                    <div
                      className={`cursor-pointer h-full p-6 rounded-xl border-2 transition-all duration-200 bg-white peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:text-white border-gray-200 hover:border-blue-500`}
                    >
                      <div
                        className={`inline-block p-3 rounded-lg bg-gradient-to-r ${pkg.color} mb-4`}
                      >
                        <CheckCircle2 className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {pkg.packageName}
                      </h3>
                      <p className="text-3xl font-bold mb-2">
                        ${pkg.packagePrice}
                        <span className={`text-sm font-normal text-gray-500 `}>
                          /month
                        </span>
                      </p>
                      <p className="text-gray-600">
                        {pkg.packageMemberLimit} team members
                      </p>
                    </div>
                  </motion.label>
                ))}
              </div>

              {errors.package && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.package.message}
                </p>
              )}
            </motion.div>

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
          {/* <p className="px-6">
            <small>
              Already have an account <Link to="/login">Login</Link>
            </small>
          </p> */}
        </div>
      </div>
    </>
  );
};

export default ManagerSignUp;
