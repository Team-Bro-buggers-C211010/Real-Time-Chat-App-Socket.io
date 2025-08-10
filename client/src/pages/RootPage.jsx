import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { checkAuth } from "../features/Auth/authThunk";
import { connectSocket } from "../features/Socket.io/socketThunk";
import { socket } from "../lib/socket";

const RootPage = () => {
    const { authUser, isCheckingAuth, isLogin } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authUser || isLogin) {
            console.log("Dispatching checkAuth");
            dispatch(checkAuth());
        }
    }, [dispatch, authUser]);

    useEffect(() => {
        if (authUser) {
            console.log("Dispatching connectSocket with authUser:", authUser);
            dispatch(connectSocket());

            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, authUser]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex justify-center items-center h-screen select-none">
                <span className="loading loading-ring loading-xl text-primary-content"></span>
            </div>
        )
    }

    return (
        <div data-theme={theme} className="select-none">
            <Navbar />
            <Outlet />
        </div>
    )
}

export default RootPage