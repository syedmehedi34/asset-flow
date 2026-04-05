/* eslint-disable no-unused-vars */
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
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const onSubmit = async (data) => {
    if (!profileImageFile) {
      Swal.fire({
        icon: "warning",
        title: "Please upload a profile photo",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", profileImageFile);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
      { method: "POST", body: formData },
    );
    const result = await res.json();

    createUser(data.email, data.password).then((r) => {
      updateUserProfile(data.name, result.data.url)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: result.data.url,
            role: "employee",
            hr_email: "unaffiliated@hostname.com",
            dob: data.dateOfBirth,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Account created!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
              userRoleRefetch();
            }
          });
        })
        .catch(console.log);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Join as Employee</title>
      </Helmet>

      <style>{`
        .signup-page { font-family: 'Plus Jakarta Sans', sans-serif; }
        .signup-bg {
          background: radial-gradient(ellipse at 10% 30%, #f0fdfa 0%, transparent 55%),
                      radial-gradient(ellipse at 90% 70%, #e0f2fe22 0%, transparent 50%), #f8fafc;
          min-height: 100vh;
        }
        .dark .signup-bg {
          background: radial-gradient(ellipse at 10% 30%, #042f2e18 0%, transparent 55%), #0a0f1a;
        }
        .signup-card {
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(226,232,240,0.9);
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 50px rgba(13,148,136,0.06);
        }
        .dark .signup-card {
          background: rgba(15,23,42,0.97);
          border-color: rgba(51,65,85,0.6);
        }
        .su-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 6px;
        }
        .dark .su-label { color: #94a3b8; }
        .su-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
          outline: none;
          transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .su-input:focus { border-color: #14b8a6; background: #fff; box-shadow: 0 0 0 3px rgba(20,184,166,0.12); }
        .su-input::placeholder { color: #94a3b8; font-weight: 400; }
        .dark .su-input { background: #1e293b; border-color: #334155; color: #e2e8f0; }
        .dark .su-input:focus { border-color: #14b8a6; background: #1a2744; box-shadow: 0 0 0 3px rgba(20,184,166,0.15); }
        .su-input-icon { position: relative; }
        .su-input-icon .icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .su-input-icon .su-input { padding-left: 38px; }
        .su-error { font-size: 12px; color: #ef4444; margin-top: 4px; font-weight: 500; }
        .su-btn {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0d9488, #0891b2);
          color: white;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(13,148,136,0.3);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .su-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,148,136,0.42); }
        .su-btn:active { transform: translateY(0); }

        /* Avatar upload */
        .avatar-upload-ring {
          width: 100px; height: 100px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #e2e8f0;
          background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s;
          position: relative;
        }
        .avatar-upload-ring:hover { border-color: #14b8a6; }
        .avatar-upload-btn {
          position: absolute; bottom: 0; right: 0;
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #0d9488, #0891b2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 2px solid white;
          transition: transform 0.15s;
        }
        .avatar-upload-btn:hover { transform: scale(1.1); }

        /* Section divider */
        .section-divider {
          display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;
        }
        .section-divider::before, .section-divider::after {
          content: ''; flex: 1; height: 1px; background: #e2e8f0;
        }
        .dark .section-divider::before, .dark .section-divider::after { background: #334155; }
        .section-divider span {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          color: #94a3b8; text-transform: uppercase;
        }

        /* Step badge */
        .step-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg, #0d9488, #0891b2);
          color: white; font-size: 11px; font-weight: 800;
          flex-shrink: 0;
        }

        /* Checkbox */
        .su-checkbox {
          width: 16px; height: 16px;
          border-radius: 4px;
          accent-color: #0d9488;
          cursor: pointer;
        }

        /* Page header accent */
        .page-header-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px;
          border-radius: 99px;
          background: linear-gradient(135deg, #ccfbf1, #99f6e4);
          color: #0f766e;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .dark .page-header-badge { background: linear-gradient(135deg, #134e4a, #0f766e); color: #5eead4; }
      `}</style>

      <div className="signup-page signup-bg pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Page header */}
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <span className="page-header-badge">
                  <User size={11} />
                  Employee Registration
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Join as an Employee
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Create your account and connect with your HR manager
              </p>
            </div>

            {/* Card */}
            <div className="signup-card rounded-2xl overflow-hidden">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Top colored strip */}
                <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-600" />

                <div className="p-8">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Avatar Upload */}
                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col items-center mb-8"
                    >
                      <div className="relative">
                        <div className="avatar-upload-ring">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User size={36} className="text-slate-300" />
                          )}
                        </div>
                        <label
                          htmlFor="profile-upload"
                          className="avatar-upload-btn"
                        >
                          <Upload size={13} color="white" />
                        </label>
                        <input
                          type="file"
                          id="profile-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-2">
                        {profileImage
                          ? "Photo selected ✓"
                          : "Upload profile photo"}
                      </p>
                    </motion.div>

                    {/* Section label */}
                    <motion.div
                      variants={itemVariants}
                      className="section-divider"
                    >
                      <span>Personal Info</span>
                    </motion.div>

                    {/* Fields grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Full Name</label>
                        <div className="su-input-icon">
                          <User size={15} className="icon" />
                          <input
                            type="text"
                            placeholder="Your full name"
                            className="su-input"
                            {...register("name", { required: true })}
                          />
                        </div>
                        {errors.name && (
                          <p className="su-error">Full name is required</p>
                        )}
                      </motion.div>

                      {/* Date of Birth */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Date of Birth</label>
                        <div className="su-input-icon">
                          <Calendar size={15} className="icon" />
                          <Controller
                            control={control}
                            name="dateOfBirth"
                            rules={{ required: "Date of birth is required" }}
                            render={({ field }) => (
                              <input
                                type="date"
                                onChange={field.onChange}
                                className="su-input"
                              />
                            )}
                          />
                        </div>
                        {errors.dateOfBirth && (
                          <p className="su-error">
                            {errors.dateOfBirth.message}
                          </p>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Email Address</label>
                        <div className="su-input-icon">
                          <Mail size={15} className="icon" />
                          <input
                            type="email"
                            placeholder="you@company.com"
                            className="su-input"
                            {...register("email", { required: true })}
                          />
                        </div>
                        {errors.email && (
                          <p className="su-error">Email is required</p>
                        )}
                      </motion.div>

                      {/* Password */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 6 chars, 1 upper, 1 special"
                            className="su-input pr-10"
                            {...register("password", {
                              required: true,
                              minLength: 6,
                              maxLength: 20,
                              pattern:
                                /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                            })}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                        {errors.password?.type === "required" && (
                          <p className="su-error">Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                          <p className="su-error">
                            At least 6 characters required
                          </p>
                        )}
                        {errors.password?.type === "maxLength" && (
                          <p className="su-error">Max 20 characters</p>
                        )}
                        {errors.password?.type === "pattern" && (
                          <p className="su-error">
                            Must include uppercase, lowercase, number & special
                            char
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Terms */}
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-3 mt-6"
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        className="su-checkbox"
                        {...register("termsAccepted", {
                          required: "You must accept the terms",
                        })}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-slate-600 dark:text-slate-400"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                        >
                          Terms & Conditions
                        </a>
                      </label>
                    </motion.div>
                    {errors.termsAccepted && (
                      <p className="su-error">{errors.termsAccepted.message}</p>
                    )}

                    {/* Submit */}
                    <motion.div variants={itemVariants} className="mt-7">
                      <button type="submit" className="su-btn">
                        Create Employee Account
                        <ArrowRight size={17} />
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSignUp;
