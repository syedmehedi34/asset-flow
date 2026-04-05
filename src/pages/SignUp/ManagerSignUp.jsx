import { useContext, useEffect, useState } from "react";
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
  CreditCard,
  Users,
  Zap,
} from "lucide-react";
import usePaymentData from "../../hooks/usePaymentData";
import { Elements } from "@stripe/react-stripe-js";
import RegisterCheckout from "../../components/RegisterCheckout";

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
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [
    selectedPackage,
    setSelectedPackage,
    stripePromise,
    open,
    setOpen,
    handleOpen,
    isPayment,
    setIsPayment,
  ] = usePaymentData();
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  useEffect(() => {
    if (isPayment) setPaymentComplete(true);
  }, [selectedPackage, setIsPayment]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const packages = [
    {
      packageId: "starter",
      packagePrice: 5,
      packageName: "Starter",
      tagline: "Perfect for small teams",
      packageMemberLimit: 5,
      icon: <Users size={20} />,
      accent: "#0d9488",
      bg: "from-teal-500 to-teal-600",
    },
    {
      packageId: "basic",
      packagePrice: 8,
      packageName: "Growth",
      tagline: "Scale up with ease",
      packageMemberLimit: 10,
      icon: <Zap size={20} />,
      accent: "#0891b2",
      bg: "from-cyan-500 to-blue-500",
      popular: true,
    },
    {
      packageId: "pro",
      packagePrice: 15,
      packageName: "Pro",
      tagline: "For larger teams",
      packageMemberLimit: 20,
      icon: <CheckCircle2 size={20} />,
      accent: "#6366f1",
      bg: "from-indigo-500 to-violet-600",
    },
  ];

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

    const uploadImg = async (file) => {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${image_hosting_key}`,
        { method: "POST", body: fd },
      );
      return await res.json();
    };

    const [resultUser, resultCompany] = await Promise.all([
      uploadImg(profileImageFile),
      uploadImg(companyImageFile),
    ]);

    if (resultUser.success && resultCompany.success) {
      createUser(data.email, data.password).then((r) => {
        updateUserProfile(data.name, resultUser.data.url)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photo: resultUser.data.url,
              dob: data.dateOfBirth,
              companyName: data.companyName,
              companyLogo: resultCompany.data.url,
              role: "hr_manager",
              package: data.package,
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
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.38, ease: "easeOut" },
    },
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Join as HR Manager</title>
      </Helmet>

      <style>{`
        .signup-page { font-family: 'Plus Jakarta Sans', sans-serif; }
        .signup-bg {
          background: radial-gradient(ellipse at 10% 30%, #f0fdfa 0%, transparent 55%),
                      radial-gradient(ellipse at 90% 70%, #eff6ff 0%, transparent 50%), #f8fafc;
          min-height: 100vh;
        }
        .dark .signup-bg { background: radial-gradient(ellipse at 10% 30%, #042f2e18 0%, transparent 55%), #0a0f1a; }
        .signup-card {
          background: rgba(255,255,255,0.97);
          border: 1px solid rgba(226,232,240,0.9);
          box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 20px 50px rgba(13,148,136,0.06);
        }
        .dark .signup-card { background: rgba(15,23,42,0.97); border-color: rgba(51,65,85,0.6); }
        .su-label {
          display: block; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase; color: #64748b; margin-bottom: 6px;
        }
        .dark .su-label { color: #94a3b8; }
        .su-input {
          width: 100%; padding: 10px 14px; border-radius: 10px;
          border: 1.5px solid #e2e8f0; background: #f8fafc;
          font-size: 14px; font-weight: 500; color: #1e293b; outline: none;
          transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
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
          width: 100%; padding: 12px; border-radius: 12px;
          background: linear-gradient(135deg, #0d9488, #0891b2);
          color: white; font-size: 15px; font-weight: 700; letter-spacing: 0.02em;
          border: none; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: all 0.2s;
          box-shadow: 0 4px 14px rgba(13,148,136,0.3);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .su-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,148,136,0.42); }
        .su-btn:disabled { opacity: 0.55; cursor: not-allowed; background: linear-gradient(135deg, #94a3b8, #94a3b8); box-shadow: none; }
        .avatar-upload-ring {
          width: 100px; height: 100px; border-radius: 50%; overflow: hidden;
          border: 3px solid #e2e8f0; background: #f1f5f9;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s; position: relative;
        }
        .avatar-upload-ring:hover { border-color: #14b8a6; }
        .avatar-upload-btn {
          position: absolute; bottom: 0; right: 0;
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #0d9488, #0891b2);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 2px solid white; transition: transform 0.15s;
        }
        .avatar-upload-btn:hover { transform: scale(1.1); }
        .section-divider {
          display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;
        }
        .section-divider::before, .section-divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
        .dark .section-divider::before, .dark .section-divider::after { background: #334155; }
        .section-divider span { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #94a3b8; text-transform: uppercase; }
        .su-checkbox { width: 16px; height: 16px; border-radius: 4px; accent-color: #0d9488; cursor: pointer; }

        /* Package cards */
        .pkg-card {
          position: relative; border-radius: 16px; padding: 20px;
          border: 2px solid #e2e8f0; background: white;
          cursor: pointer; transition: all 0.2s; overflow: hidden;
        }
        .dark .pkg-card { background: #1e293b; border-color: #334155; }
        .pkg-card:hover { border-color: #14b8a6; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,148,136,0.12); }
        .pkg-card.selected { border-color: #0d9488; box-shadow: 0 0 0 3px rgba(13,148,136,0.15), 0 8px 24px rgba(13,148,136,0.12); }
        .pkg-popular-badge {
          position: absolute; top: 12px; right: 12px;
          background: linear-gradient(135deg, #0891b2, #6366f1);
          color: white; font-size: 9px; font-weight: 800;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 2px 8px; border-radius: 99px;
        }
        .pkg-icon-wrap {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: white; margin-bottom: 12px;
        }
        .pkg-check {
          width: 20px; height: 20px; border-radius: 50%;
          border: 2px solid #e2e8f0; background: white;
          display: flex; align-items: center; justify-content: center;
          position: absolute; top: 12px; left: 12px;
          transition: all 0.2s;
        }
        .dark .pkg-check { background: #1e293b; border-color: #334155; }
        .pkg-card.selected .pkg-check { background: #0d9488; border-color: #0d9488; }

        /* Page header badge */
        .page-header-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 99px;
          background: linear-gradient(135deg, #e0f2fe, #bae6fd);
          color: #0369a1; font-size: 11px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px;
        }

        /* Payment card */
        .payment-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
        }
        .dark .payment-card { background: #1e293b; border-color: #334155; }
        .payment-header {
          background: linear-gradient(135deg, #0d9488, #0891b2);
          padding: 16px 20px;
          display: flex; align-items: center; justify-content: space-between;
        }

        /* File input */
        .su-file-input {
          width: 100%; padding: 9px 12px;
          border-radius: 10px; border: 1.5px dashed #cbd5e1;
          background: #f8fafc; font-size: 13px; color: #64748b;
          cursor: pointer; transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .su-file-input:hover { border-color: #14b8a6; background: #f0fdfa; color: #0f766e; }
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
                  <Building2 size={11} />
                  HR Manager Registration
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                Join as HR Manager
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Set up your company account and manage your team's assets
              </p>
            </div>

            {/* Main Card */}
            <div className="signup-card rounded-2xl overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-indigo-500" />

              <form onSubmit={handleSubmit(onSubmit)}>
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

                    {/* Personal Info */}
                    <motion.div
                      variants={itemVariants}
                      className="section-divider"
                    >
                      <span>Personal Info</span>
                    </motion.div>

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

                    {/* Company Info */}
                    <motion.div
                      variants={itemVariants}
                      className="section-divider"
                    >
                      <span>Company Info</span>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Company Name */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Company Name</label>
                        <div className="su-input-icon">
                          <Building2 size={15} className="icon" />
                          <input
                            type="text"
                            placeholder="Your company"
                            className="su-input"
                            {...register("companyName", { required: true })}
                          />
                        </div>
                        {errors.companyName && (
                          <p className="su-error">Company name is required</p>
                        )}
                      </motion.div>

                      {/* Company Logo */}
                      <motion.div variants={itemVariants}>
                        <label className="su-label">Company Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="su-file-input"
                          onChange={(e) =>
                            setCompanyImageFile(e.target.files[0])
                          }
                        />
                        <p className="text-xs text-slate-400 mt-1">
                          PNG, JPG up to 5MB
                        </p>
                      </motion.div>
                    </div>

                    {/* Package Selection */}
                    <motion.div
                      variants={itemVariants}
                      className="section-divider"
                    >
                      <span>Choose Package</span>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      {packages.map((pkg) => (
                        <label
                          key={pkg.packageId}
                          className="relative cursor-pointer"
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            {...register("package", {
                              required: "Please select a package",
                            })}
                            value={pkg.packageId}
                            onChange={() => setSelectedPackage(pkg)}
                          />
                          <div
                            className={`pkg-card ${selectedPackage?.packageId === pkg.packageId ? "selected" : ""}`}
                          >
                            {/* Check circle */}
                            <div className="pkg-check">
                              {selectedPackage?.packageId === pkg.packageId && (
                                <CheckCircle2 size={14} color="white" />
                              )}
                            </div>

                            {pkg.popular && (
                              <span className="pkg-popular-badge">Popular</span>
                            )}

                            {/* Icon */}
                            <div
                              className={`pkg-icon-wrap bg-gradient-to-br ${pkg.bg}`}
                            >
                              {pkg.icon}
                            </div>

                            <h3 className="text-base font-black text-slate-800 dark:text-white">
                              {pkg.packageName}
                            </h3>
                            <p className="text-2xl font-black text-slate-800 dark:text-white mt-1">
                              ${pkg.packagePrice}
                              <span className="text-xs font-normal text-slate-400">
                                /mo
                              </span>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Up to {pkg.packageMemberLimit} members
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 italic">
                              {pkg.tagline}
                            </p>
                          </div>
                        </label>
                      ))}
                    </motion.div>
                    {errors.package && (
                      <p className="su-error mt-2">{errors.package.message}</p>
                    )}

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
                      <button
                        type="submit"
                        className="su-btn"
                        disabled={!transactionId}
                      >
                        {transactionId ? (
                          <>
                            <CheckCircle2 size={17} /> Create Manager Account
                          </>
                        ) : (
                          <>
                            <CreditCard size={17} /> Complete Payment First
                          </>
                        )}
                      </button>
                      {!transactionId && (
                        <p className="text-center text-xs text-slate-400 mt-2">
                          Select a package and complete payment below to
                          continue
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </form>
            </div>

            {/* Payment Section */}
            {selectedPackage && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6"
              >
                <div className="payment-card">
                  {/* Payment header */}
                  <div className="payment-header">
                    <div className="flex items-center gap-3 text-white">
                      <CreditCard size={20} className="opacity-80" />
                      <div>
                        <p className="text-sm font-black">Payment</p>
                        <p className="text-xs opacity-70">
                          Secure checkout via Stripe
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-white">
                      <p className="text-xl font-black">
                        ${selectedPackage.packagePrice}
                      </p>
                      <p className="text-xs opacity-70 capitalize">
                        {selectedPackage.packageId} plan / month
                      </p>
                    </div>
                  </div>

                  {/* Payment summary */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${selectedPackage.bg}`}
                        >
                          {selectedPackage.icon}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase">
                            {selectedPackage.packageId}
                          </p>
                          <p className="text-xs text-slate-400">
                            Up to {selectedPackage.packageMemberLimit} members
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          Total
                        </p>
                        <p className="text-lg font-black text-teal-600">
                          ${selectedPackage.packagePrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="mx-5 mt-4 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                      ⚠️ Please do not refresh the page after selecting a
                      package
                    </p>
                  </div>

                  {/* Stripe form */}
                  <div className="p-5">
                    <Elements stripe={stripePromise}>
                      <RegisterCheckout
                        selectedPackage={selectedPackage}
                        setOpen={setOpen}
                        transactionId={transactionId}
                        setTransactionId={setTransactionId}
                      />
                    </Elements>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ManagerSignUp;
