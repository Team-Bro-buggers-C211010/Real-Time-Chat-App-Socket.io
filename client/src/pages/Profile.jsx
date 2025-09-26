import { useState, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { updateProfile } from "../features/Auth/authThunk";
import avatarDemo from "/avatarDemo.png";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // Limit to 5MB
      toast.error("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setSelectedImage(imageData);
      dispatch(updateProfile({ profileImage: imageData }))
        .unwrap()
        .then(() => {
          toast.success("Profile image updated");
          fileInputRef.current.value = null;
        })
        .catch(() => {
          toast.error("Failed to update profile image");
          setSelectedImage(null);
          fileInputRef.current.value = null;
        });
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
      setSelectedImage(null);
      fileInputRef.current.value = null;
    };
    reader.readAsDataURL(file);
  };

  // Format createdAt date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-5 flex justify-center px-4 sm:px-6">
      <div className="max-w-2xl w-full p-4 sm:p-6 bg-base-300 rounded-xl shadow-lg space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-base-content">Profile</h1>
          <p className="text-sm text-base-content/60">Your profile information</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {isUpdatingProfile ? (
              <div className="skeleton size-32 rounded-full" aria-hidden="true"></div>
            ) : (
              <img
                src={selectedImage || authUser?.profileImage || avatarDemo}
                alt={`${authUser?.userName || "User"}'s profile`}
                className="size-32 rounded-full object-cover border-4 border-base-200"
              />
            )}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              aria-label="Upload profile image"
            >
              <TbCameraPlus className="size-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-base-content/60">
            {isUpdatingProfile ? "Uploading..." : "Click the camera to update your photo"}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaRegUser className="size-5 text-base-content/60" />
              <label className="font-semibold text-base-content">Name</label>
            </div>
            <input
              type="text"
              value={authUser?.userName || ""}
              className="input input-bordered w-full font-semibold text-base-content/80"
              disabled
              aria-label="Username"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HiOutlineMail className="size-5 text-base-content/60" />
              <label className="font-semibold text-base-content">Email</label>
            </div>
            <input
              type="email"
              value={authUser?.email || ""}
              className="input input-bordered w-full font-semibold text-base-content/80"
              disabled
              aria-label="Email"
            />
          </div>

          <div className="bg-base-200 rounded-xl p-4 sm:p-6">
            <h2 className="text-lg font-medium text-base-content mb-4">Account Information</h2>
            <div className="space-y-3 text-sm text-base-content/80">
              <div className="flex items-center justify-between py-2 border-b border-base-300">
                <span>Member Since</span>
                <span>{formatDate(authUser?.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.displayName = "Profile";

export default memo(Profile);