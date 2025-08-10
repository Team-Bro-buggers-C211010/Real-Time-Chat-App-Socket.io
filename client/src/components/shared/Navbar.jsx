import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import pingMeLogo from "../../assets/PingMe_Logo.png";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { logoutUser } from "../../features/Auth/authThunk";
import { FaRegUser } from 'react-icons/fa';

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className="border-b border-base-300 fixed top-0 w-full z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="w-20 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img className="w-full h-full object-cover rounded-lg text-primary filter drop-shadow-[0_0_4px_white]" src={pingMeLogo} alt="Logo" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
              <IoSettingsOutline className="size-4" />
              <span className="sm:hidden md:inline">Settings</span>
            </Link>
            {authUser &&
              (
                <>
                  <Link to={"/profile"} className="btn btn-sm gap-2 transition-colors">
                    <FaRegUser className="size-4" />
                    <span className="sm:hidden md:inline">Profile</span>
                  </Link>
                  <button className="flex gap-2 items-center hover:cursor-pointer" onClick={() => {dispatch(logoutUser()); navigate("/login");}}>
                    <IoLogOutOutline className="size-5" />
                    <span className="sm:hidden md:inline">Logout</span>
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar