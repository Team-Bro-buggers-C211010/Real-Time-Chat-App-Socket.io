import { createBrowserRouter } from "react-router-dom";
import RootPage from "../pages/RootPage";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import RedirectIfAuth from "./RedirectIfAuth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                path: "/",
                element: <PrivateRoute> <Home /> </PrivateRoute>
            },
            {
                path: "/signup",
                element: <RedirectIfAuth><SignUp /></RedirectIfAuth>
            },
            {
                path: "/login",
                element: <RedirectIfAuth><Login /></RedirectIfAuth>
            },
            {
                path: "/settings",
                element: <Settings />
            },
            {
                path: "/profile",
                element: <PrivateRoute> <Profile /> </PrivateRoute>
            }
        ]
    }
])

export default router;