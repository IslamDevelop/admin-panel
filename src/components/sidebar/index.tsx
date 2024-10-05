import { useAuthStore } from "@/store/store";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { logout } = useAuthStore();
  const nav = useNavigate();

  const handleClick = () => {
    logout();
    nav("/sign-in");
  };
  return (
    <section className="flex flex-col h-full max-w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            className="border-2 rounded-full border-white mr-3"
            src="./image/R.png"
            alt="icon"
          />
          <div>
            <p className="text-white text-[18px] font-semibold">Азамат</p>
            <p className="text-slate-300 text-[11px] font-normal">Директор</p>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            <img className="cursor-pointer" src="./image/e.png" alt="exit" />
          </button>
        </div>
      </div>
      <div className="text-white flex flex-col mt-64 gap-5">
        <NavLink
          to="/personalOff"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? "text-customBlue" : ""
            }`
          }
        >
          <img src="./image/home.png" alt="home" />
          <p>Личный кабинет</p>
        </NavLink>

        <NavLink
          to="/Orders"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? "text-customBlue" : ""
            }`
          }
        >
          <img src="./image/Vector.png" alt="" />
          <p>Заказы</p>
        </NavLink>

        <NavLink
          to="/Accounting"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? "text-customBlue" : ""
            }`
          }
        >
          <img src="./image/check.png" alt="$" />
          <p>Бухгалтерия</p>
        </NavLink>

        <NavLink
          to="/Users"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? " text-customBlue" : ""
            }`
          }
        >
          <img src="./image/chart.png" alt="users" />
          <p>Пользователи</p>
        </NavLink>

        <NavLink
          to="/DataBase"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? "text-customBlue" : ""
            }`
          }
        >
          <img src="./image/wallet-2.png" alt="database" />
          <p>База данных</p>
        </NavLink>
        <NavLink
          to="/Employees"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? "text-customBlue" : ""
            }`
          }
        >
          <img src="./image/html-5.png" alt="employees" />
          <p>Сотрудники</p>
        </NavLink>
        <NavLink
          to="/Notification"
          className={({ isActive }) =>
            `flex items-center gap-3 cursor-pointer ${
              isActive ? " text-customBlue" : ""
            }`
          }
        >
          <img src="./image/not.png" alt="notification" />
          <p>Настройки</p>
        </NavLink>
      </div>
    </section>
  );
};
