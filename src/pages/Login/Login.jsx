/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, X, ArrowRight, ShieldCheck, Users } from "lucide-react";
import Lottie from "lottie-react";
import LoginLottie from "../../assets/lottieFiles/login_page_lottie.json";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { signIn, resetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    setIsLoading(true);
    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        showConfirmButton: false,
        timer: 1200,
      });
      navigate("/", { replace: true });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Invalid credentials",
        showConfirmButton: false,
        timer: 1500,
      });
      form.password.value = "";
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const form = document.querySelector("form");
    if (role === "employee") {
      form.email.value = "emp_hasan@user.com";
      form.password.value = "emp@User123";
    } else {
      form.email.value = "hr_mehedi@user.com";
      form.password.value = "hr@User123";
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    try {
      await resetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Reset email sent!",
        text: "Check your inbox for instructions.",
        showConfirmButton: false,
        timer: 1500,
      });
      setShowResetModal(false);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to send reset email",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    event.target.reset();
  };

  return (
    <>
      <Helmet>
        <title>AssetFlow | Sign In</title>
      </Helmet>

      <style>{`
        .login-page {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .login-bg {
          background: radial-gradient(ellipse at 20% 50%, #f0fdfa 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, #e0f2fe 0%, transparent 50%),
                      #f8fafc;
        }
        .dark .login-bg {
          background: radial-gradient(ellipse at 20% 50%, #042f2e22 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, #0c1a2e 0%, transparent 50%),
                      #0a0f1a;
        }

        /* Geometric pattern on the left panel */
        .left-panel {
          background: linear-gradient(135deg, #0d9488 0%, #0891b2 50%, #0369a1 100%);
          position: relative;
          overflow: hidden;
        }
        .left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        /* Card */
        .login-card {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(226,232,240,0.8);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.5),
            0 20px 60px rgba(0,0,0,0.08),
            0 4px 16px rgba(13,148,136,0.06);
        }
        .dark .login-card {
          background: rgba(15,23,42,0.95);
          border-color: rgba(51,65,85,0.6);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04),
            0 20px 60px rgba(0,0,0,0.4);
        }

        /* Input */
        .login-input {
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
        .login-input:focus {
          border-color: #14b8a6;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(20,184,166,0.12);
        }
        .login-input::placeholder { color: #94a3b8; font-weight: 400; }
        .dark .login-input {
          background: #1e293b;
          border-color: #334155;
          color: #e2e8f0;
        }
        .dark .login-input:focus {
          border-color: #14b8a6;
          background: #1a2744;
          box-shadow: 0 0 0 3px rgba(20,184,166,0.15);
        }

        /* Label */
        .login-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 6px;
        }
        .dark .login-label { color: #94a3b8; }

        /* Submit button */
        .login-btn {
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
          box-shadow: 0 4px 14px rgba(13,148,136,0.35);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .login-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(13,148,136,0.45);
        }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        /* Demo buttons */
        .demo-btn {
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          border: none;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .demo-btn-emp {
          background: #f0fdfa;
          color: #0f766e;
          border: 1.5px solid #99f6e4;
        }
        .demo-btn-emp:hover { background: #ccfbf1; }
        .demo-btn-hr {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1.5px solid #bfdbfe;
        }
        .demo-btn-hr:hover { background: #dbeafe; }
        .dark .demo-btn-emp { background: #042f2e; color: #2dd4bf; border-color: #0f766e; }
        .dark .demo-btn-emp:hover { background: #064e3b; }
        .dark .demo-btn-hr { background: #1e3a5f; color: #93c5fd; border-color: #1d4ed8; }
        .dark .demo-btn-hr:hover { background: #1e40af33; }

        /* Divider */
        .or-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
        }
        .or-divider::before, .or-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }
        .dark .or-divider::before, .dark .or-divider::after { background: #334155; }
        .or-divider span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #94a3b8;
          text-transform: uppercase;
        }

        /* Modal backdrop */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }
        .modal-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
        }
        .dark .modal-card { background: #0f172a; border-color: #334155; }

        /* Stat cards on left panel */
        .stat-chip {
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Spinner */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="login-page login-bg min-h-screen flex items-center justify-center pt-16">
        <div className="w-full max-w-5xl mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex rounded-2xl overflow-hidden shadow-2xl"
            style={{ minHeight: 580 }}
          >
            {/* LEFT PANEL — decorative */}
            <div className="left-panel hidden lg:flex flex-col justify-between w-[45%] p-10 text-white">
              <div className="grid-pattern" />
              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-lg">
                    AF
                  </div>
                  <span className="text-xl font-bold tracking-tight">
                    AssetFlow
                  </span>
                </div>

                {/* Headline */}
                <h2 className="text-4xl font-black leading-tight mb-3">
                  Manage assets
                  <br />
                  <span className="text-cyan-200">smarter.</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                  Track, assign, and retrieve company assets — all in one place.
                  Built for modern HR teams.
                </p>
              </div>

              {/* Lottie animation */}
              <div className="relative z-10 my-4 -mx-4">
                <Lottie
                  animationData={LoginLottie}
                  loop={true}
                  style={{ filter: "brightness(1.15)" }}
                />
              </div>

              {/* Stats */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="stat-chip">
                  <ShieldCheck
                    size={18}
                    className="text-cyan-200 flex-shrink-0"
                  />
                  <div>
                    <p className="text-xs text-white/60 leading-none">
                      Role-based access
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      Employee & HR Manager
                    </p>
                  </div>
                </div>
                <div className="stat-chip">
                  <Users size={18} className="text-cyan-200 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/60 leading-none">
                      Subscription model
                    </p>
                    <p className="text-sm font-bold mt-0.5">
                      Per-company asset tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — form */}
            <div className="login-card flex-1 flex flex-col justify-center px-8 py-10">
              <div className="max-w-sm mx-auto w-full">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-8"
                >
                  <h1 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
                    Welcome back
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Sign in to your AssetFlow account
                  </p>
                </motion.div>

                {/* Demo credentials */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-6"
                >
                  <p className="login-label mb-2">Quick demo access</p>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleDemoLogin("employee")}
                      className="demo-btn demo-btn-emp"
                    >
                      <Users size={13} />
                      Employee
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDemoLogin("hr_manager")}
                      className="demo-btn demo-btn-hr"
                    >
                      <ShieldCheck size={13} />
                      HR Manager
                    </button>
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={handleLogin}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="login-label">Email address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="login-input"
                    />
                  </div>

                  <div>
                    <label className="login-label">Password</label>
                    <div className="relative">
                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="login-input pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="login-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner" />
                        Signing in…
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </motion.form>

                {/* Divider + Social */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <div className="or-divider">
                    <span>or continue with</span>
                  </div>
                  <SocialLogin />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Reset Password Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) =>
              e.target === e.currentTarget && setShowResetModal(false)
            }
          >
            <motion.div
              className="modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {/* Modal header */}
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-slate-900">
                <div>
                  <h2 className="text-base font-black text-slate-800 dark:text-white">
                    Reset Password
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    We'll send a link to your inbox
                  </p>
                </div>
                <button
                  onClick={() => setShowResetModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <form onSubmit={handleReset} className="p-6 space-y-4">
                <div>
                  <label className="login-label">Email address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="login-input"
                  />
                </div>
                <button type="submit" className="login-btn">
                  Send Reset Link
                  <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
