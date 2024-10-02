import { Navigate } from "react-router-dom";
import { getUserRole } from "../../utils/auth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = getUserRole();

  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
