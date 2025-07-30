import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/Auth/authThunk";
import { useForm } from "react-hook-form";
import messageLogo from "/PingMe_Chat_Logo.png";
import AuthImagePattern from "../components/AuthImagePattern";
import { TfiEmail } from "react-icons/tfi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineLock } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isLogIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset(); // Reset the form after submission
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl flex items-center justify-center transition-colors">
                <img className="text-primary" src={messageLogo} alt="messageLogo" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Login now and start chatting!</p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute z-5 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <TfiEmail className="size-4 text-base-content/40" />
                </div>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full pl-10"
                />
              </div>
              {errors.email && (
                <span role="alert" className="text-red-500">
                  {errors.email.type === "required" ? "Email is required" : "Invalid email format"}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute z-100 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdOutlineLock className="size-5 text-base-content/40" />
                </div>
                <input
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="input input-bordered w-full pl-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="size-5 text-base-content/40" />
                  ) : (
                    <FaRegEye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span role="alert" className="text-red-500">
                  Password must be at least 6 characters and include uppercase, lowercase, number, and special character.
                </span>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isLogIn}>
              {isLogIn ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern title="Welcome Back" subtitle="Login in to continue your conversations and catch up with your messages." />
    </div>
  )
}

export default Login