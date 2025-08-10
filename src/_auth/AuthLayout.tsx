import { useUserContext } from "@/context/AuthContext";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  const location = useLocation();
  const isOnRegister = location.pathname === "/register";

  return (
    <>
      {isAuthenticated && !isOnRegister ? (
        <Navigate to="/" />
      ) : (
        <section className="flex flex-1 justify-center items-center flex-col py-10 bg-cyberpunk">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;
