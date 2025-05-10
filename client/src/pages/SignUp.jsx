import { useState } from "react";
import { useSelector } from 'react-redux';
import messageLogo from "../../public/PingMe_Chat_Logo.png";
import { FaRegUser } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlineLock } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { isSignUp } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-up logic here
    console.log("Form submitted:", formData);
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 ">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-100">
        {/* logo */}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute z-100 inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaRegUser className="size-4 text-base-content/40" />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input input-bordered w-full pl-10"
              />
            </div>
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
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input input-bordered w-full pl-10"
              />
            </div>
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
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="input input-bordered w-full pl-10"
              />
              <button 
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <FaRegEyeSlash className="size-5 text-base-content/40" />
                ) : (
                  <FaRegEye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isSignUp}>
            {true ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>
      </div>

      {/* right side */}
      <div className="flex flex-col justify-center items-center">
      </div>
    </div>
  )
}

export default SignUp