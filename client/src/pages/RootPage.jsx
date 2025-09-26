import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, memo } from "react";
import { checkAuth } from "../features/Auth/authThunk";
import { connectSocket } from "../features/Socket.io/socketThunk";
import { socket } from "../lib/socket";

const RootPage = () => {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    useEffect(() => {
        if (authUser) {
            dispatch(connectSocket());
            return () => {
                socket.disconnect();
            };
        }
    }, [dispatch, authUser]);

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span
                    className="loading loading-ring loading-xl text-primary"
                    aria-live="polite"
                ></span>
            </div>
        );
    }

    return (
        <div data-theme={theme} className="min-h-screen bg-base-200">
            <Navbar />
            <Outlet />
        </div>
    );
};

RootPage.displayName = "RootPage";

export default memo(RootPage);