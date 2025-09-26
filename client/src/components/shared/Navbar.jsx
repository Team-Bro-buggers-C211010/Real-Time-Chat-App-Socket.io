import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import pingMeLogo from "../../assets/PingMe_Logo.png";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "../../features/Auth/authThunk.js";
import { memo } from "react";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border-b border-base-300 fixed top-0 w-full z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          aria-label="PingMe Home"
        >
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <img
              className="w-full h-full object-contain rounded-lg text-primary"
              src={pingMeLogo}
              alt="PingMe Logo"
            />
          </div>
          <span className="font-semibold text-base-content hidden sm:inline">PingMe</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/settings"
            className="btn btn-sm btn-ghost gap-2 text-base-content hover:bg-base-200"
            aria-label="Settings"
          >
            <IoSettingsOutline className="size-4" />
            <span className="hidden md:inline">Settings</span>
          </Link>
          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-sm btn-ghost gap-2 text-base-content hover:bg-base-200"
                aria-label="Profile"
              >
                <FaRegUser className="size-4" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button
                className="btn btn-sm btn-ghost gap-2 text-base-content hover:bg-base-200"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <IoLogOutOutline className="size-5" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};


Navbar.displayName = "Navbar";

export default memo(Navbar);