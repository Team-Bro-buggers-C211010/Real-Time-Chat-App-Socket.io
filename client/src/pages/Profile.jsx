import { useDispatch, useSelector } from 'react-redux';
import { FaCameraRetro, FaRegUser } from "react-icons/fa";
import avatarDemo from "/avatarDemo.png"
import { HiOutlineMail } from "react-icons/hi";
import { updateProfile } from '../features/Auth/authThunk';
import { useState } from 'react';

const Profile = () => {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      dispatch(updateProfile({ profileImage: reader.result }));
    };
  }
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className='border-4 border-base-content rounded-full overflow-hidden'>
                {isUpdatingProfile ? (
                  <div className="skeleton h-32 w-32 rounded-full"></div>
                ) : (
                  <img
                    src={selectedImage || authUser.profileImage || avatarDemo}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 border-base-100"
                  />
                )}

              </div>
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <FaCameraRetro className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='flex items-center gap-2'>
                <FaRegUser className='size-5' />
                <label className='font-semibold'>Name</label>
              </div>
              <input
                type="text"
                value={authUser.userName || ""}
                className='input input-bordered w-full'
                disabled
              />
            </div>
            <div className='space-y-1.5'>
              <div className='flex items-center gap-2'>
                <HiOutlineMail className='size-5' />
                <label className='font-semibold'>Email</label>
              </div>
              <input
                type="email"
                value={authUser.email || ""}
                className='input input-bordered w-full'
                disabled
              />
            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
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
    </div>
  )
}

export default Profile