import { Navigate } from "react-router-dom";
import useAuth from "../cores/useAuth";

const ProtectedRoute = ({ children }) => {
  const { authed } = useAuth();
  const token = localStorage.getItem("token");
  if (authed && token) {
    return children;
  } else if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;