import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

export const AuthGuard = ({ children }) => {
  const authorized = useAuth();

  if (!authorized) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
