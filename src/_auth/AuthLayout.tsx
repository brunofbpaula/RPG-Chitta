import { Box } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import Loader from "@/components/shared/Loader";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();
  const location = useLocation();

  if (isLoading) {
    return (
      <Box className="bg-cyberpunk main-auth">
        <Loader size={70} />
      </Box>
    );
  }

  const path = location.pathname;
  const isLogin = path === "/login";
  const isRegister = path === "/register";

  if (!isAuthenticated && !isLogin && !isRegister) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box className="bg-cyberpunk main-auth">
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
