import { useState } from "react";
import { useSelector } from 'react-redux';
import messageLogo from "../../public/PingMe_Chat_Logo.png";
import { FaRegUser, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineLock } from "react-icons/md";
import { Link } from "react-router-dom"; // FIXED: use react-router-dom
import AuthImagePattern from "../components/AuthImagePattern";
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { isSignUp } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    toast.success('Successfully Submitted!');
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-base-100">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center  mb-8">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <img className="text-base-content/60" src={messageLogo} alt="messageLogo" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            <p className="text-base-content/60">Join us and start chatting!</p>
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:w-[50%]">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute z-100 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaRegUser className="size-4 text-base-content/40" />
              </div>
              <input
                {...register("fullName", { required: true })}
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full pl-10"
              />
            </div>
            {errors.fullName && <span role="alert" className="text-red-500">Full Name is required</span>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute z-100 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                placeholder="********"
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

          <button type="submit" className="btn btn-primary w-full" disabled={isSignUp}>
            {isSignUp ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">Sign In</Link>
          </p>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern title={"Welcome to PingMe!"} subtitle={"Join us and start chatting!"} />
    </div>
  );
};

export default SignUp;
