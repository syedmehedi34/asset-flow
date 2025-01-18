/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Building2, Mail, User, Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile, setUser } = useAuth();
  const [isRole, , , userRoleRefetch] = useRole();
  const axiosSecure = useAxiosSecure();
  console.log(isRole);
  const [profileImage, setProfileImage] = useState(user?.photoURL);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mock company data - replace with actual data from your backend
  const companyData = {
    name: "TechCorp Solutions",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&auto=format&fit=crop&q=60",
  };

  // image upload to imgBB
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setProfileImageFile(file);
    }
  };

  const onSubmit = async (data) => {
    // send  image
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

    // ?

    const name = data.fullName;
    const photo = resultUserImage.data.url;

    // console.log(name, photo);

    const updatedProfileData = {
      name,
      photo,
    };

    // // Update only the name if the photo URL is blank
    if (name && !photo) {
      updateUserProfile(name, user.photoURL).then(() => {
        Swal.fire({
          icon: "success",
          title: "Name has been  updated",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }

    // Update only the photo URL if the name is blank
    if (name === user.displayName && photo) {
      updateUserProfile(user.displayName, photo).then(() => {
        Swal.fire({
          icon: "success",
          title: "Photo has been  updated",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }

    // Update both if both fields are filled
    if (name && photo) {
      updateUserProfile(name, photo).then(async () => {
        // now update the data in the backend
        const res = await axiosSecure.patch("/users", {
          _id: isRole._id,
          name,
          photo,
        });
        console.log(res);
        userRoleRefetch();
        Swal.fire({
          icon: "success",
          title: "Name and Photo has been  updated",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }

    //?
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 max-w-4xl"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Company Banner */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600 ">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-0 right-1/2 transform transition-transform translate-x-1/2"
            >
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-8 h-8 text-white" />
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </motion.div>
          </div>

          {/* Company Info */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 px-8 py-6 border-b border-gray-200"
          >
            <div className="flex items-center justify-center space-x-4">
              <img
                src={companyData.logo}
                alt="Company Logo"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span className="text-xl font-semibold text-gray-800">
                  {companyData.name}
                </span>
              </div>
            </div>
          </motion.div> */}

          {/* Profile Form */}
          <div className="px-8 py-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    defaultValue={user.displayName}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.fullName.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    {...register("email")}
                    type="email"
                    defaultValue={user?.email}
                    readOnly
                    className="pl-10 w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-end"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                >
                  <Pencil className="w-5 h-5 mr-2" />
                  Update Profile
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;
