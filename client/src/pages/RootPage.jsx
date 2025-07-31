import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { checkAuth } from "../features/Auth/authThunk";
// import { useSocketListeners } from "../hooks/useSocketListeners";
import { connectSocket } from "../features/Socket.io/socketThunk";

const RootPage = () => {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    // useSocketListeners();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
    if (authUser) {
      console.log("Dispatching connectSocket with authUser:", authUser);
      dispatch(connectSocket());
    }
  }, [dispatch, authUser]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-xl text-emerald-400"></span>
            </div>
        )
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default RootPage