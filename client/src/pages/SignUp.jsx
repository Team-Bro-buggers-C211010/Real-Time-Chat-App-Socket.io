import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../features/Auth/authThunk";
import messageLogo from "/PingMe_Chat_Logo.png";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineLock } from "react-icons/md";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isSignUp } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await dispatch(signupUser(data)).unwrap();
      toast.success("Account created successfully!");
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 lg:grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 max-w-md w-full">
        <div className="w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="flex flex-col items-center gap-2">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  src={messageLogo}
                  alt="PingMe Chat Logo"
                />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-base-content">Create Account</h1>
              <p className="text-sm text-base-content/60">Join us and start chatting!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label" htmlFor="userName">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaRegUser className="size-4 text-base-content/40" />
                </div>
                <input
                  {...register("userName", {
                    required: "Full Name is required",
                    minLength: { value: 2, message: "Full Name must be at least 2 characters" },
                  })}
                  type="text"
                  id="userName"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
                  aria-invalid={errors.userName ? "true" : "false"}
                  aria-describedby={errors.userName ? "userName-error" : undefined}
                />
              </div>
              {errors.userName && (
                <span id="userName-error" role="alert" className="text-red-500 text-xs mt-1">
                  {errors.userName.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <TfiEmail className="size-4 text-base-content/40" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <span id="email-error" role="alert" className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdOutlineLock className="size-5 text-base-content/40" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
                      message:
                        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••"
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="size-5 text-base-content/40" />
                  ) : (
                    <FaRegEye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" role="alert" className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSignUp}
              aria-label="Create Account"
            >
              {isSignUp ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary" aria-label="Log In">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome to PingMe!"
        subtitle="Join us and start chatting!"
      />
    </div>
  );
};

SignUp.displayName = "SignUp";

export default memo(SignUp);