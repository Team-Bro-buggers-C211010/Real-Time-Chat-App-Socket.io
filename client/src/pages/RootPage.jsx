import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { checkAuth } from "../features/Auth/authThunk";

const RootPage = () => {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

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