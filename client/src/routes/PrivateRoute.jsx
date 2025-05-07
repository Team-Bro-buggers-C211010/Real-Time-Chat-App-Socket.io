import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const { authUser, isCheckingAuth } = useSelector((state) => state.auth);
    const location = useLocation();

    if (isCheckingAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-ring loading-xl text-emerald-400"></span>
            </div>
        )
    }
    if (authUser) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login" />
}
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute