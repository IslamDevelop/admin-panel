import { Sidebar } from "@/components";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();

  const { isAuthenticated, getMe } = useAuthStore();

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated]);

  return (
    <div className="bg-[#1A1919] min-h-screen grid grid-cols-[250px_auto] gap-5 h-full w-full p-5">
      <Sidebar />
      <div className="bg-white top-0 right-0 left-[250px] h-full rounded-3xl">
        <Outlet />
      </div>
    </div>
  );
};
