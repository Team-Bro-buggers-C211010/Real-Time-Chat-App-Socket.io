import { createBrowserRouter } from "react-router-dom";
import RootPage from "../pages/RootPage";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";

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
                element: <SignUp />
            },
            {
                path: "/login",
                element: <Login />
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