import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from 'prop-types';

const RedirectIfAuth = ({ children }) => {
    const { authUser } = useSelector((state) => state.auth);
    return authUser ? <Navigate to="/" replace /> : children;
};

export default RedirectIfAuth;
RedirectIfAuth.propTypes = {
    children: PropTypes.node.isRequired,
};