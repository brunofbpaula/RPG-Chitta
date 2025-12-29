import { useUserContext } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  const location = useLocation();
  const isOnRegister = location.pathname === "/register";

  return (
    <Box className="bg-cyberpunk main-auth">
      {isAuthenticated && !isOnRegister ? (
        <Navigate to="/" />
      ) : (
        <Box className="">
          <Outlet />
        </Box>
      )}
    </ Box>
  );
};

export default AuthLayout;
