import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputs } from "@/store/types";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/store";
import { useEffect } from "react";

export const SignIn = () => {
  const { login: loginUser, isAuthenticated, error } = useAuthStore();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    try {
      await loginUser(data);
    } catch (error) {
      console.error("Ошибка при авторизации", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      reset();
    }
    if (error) {
      reset();
      setError("password", {
        type: "manual",
        message:
          error === true ? "Ошибка авторизации" : "Неверный email или пароль",
      });
    }
  }, [isAuthenticated, error, navigate, reset, setError]);

  return (
    <div className="bg-[#1A1919]  min-h-screen justify-center items-center flex flex-col gap-3">
      <div className="flex gap-28 items-center">
        <p className="text-white opacity-35">Войти</p>
        <button
          type="button"
          onClick={() => navigate("/sign-up")}
          className="border rounded-md p-[4px] px-2 opacity-20 text-white"
        >
          Регистрация
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3  justify-center items-center w-[280px]"
      >
        <div className="relative w-full ">
          <input
            className="border bg-[#1A1919] rounded-md w-full h-11 p-2 opacity-30 text-white pl-12"
            type="email"
            placeholder="Введите email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          <User className="absolute top-1/2 transform -translate-y-1/2 left-2 text-white opacity-50" />

          <div className="absolute left-9 top-1/2 transform -translate-y-1/2 h-8 border-l border-gray-400 opacity-50"></div>
        </div>
        <div className="relative w-full">
          <input
            className="border bg-[#1A1919] rounded-md w-full  h-11 p-2 opacity-30 text-white pl-12"
            type="password"
            placeholder="Введите пароль!"
            {...register("password", {
              required: "Введите пароль!",
              minLength: {
                value: 6,
                message: "Пароль должен быть не менее 6 символов!",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          <Lock className="absolute top-6 transform -translate-y-1/2 left-2 text-white opacity-50" />
          <div className="absolute left-9 top-6 transform -translate-y-1/2 h-8 border-l border-gray-400 opacity-50"></div>
        </div>

        <button className="bg-amber-400 w-[280px]  h-11 rounded-md text-white cursor-pointer">
          Войти
        </button>
        <div className="flex gap-8">
          <p className=" text-sm text-gray-600  float-left py-1 ">
            Сохранить пароль
          </p>
          <p className="text-sm text-gray-600  float-right py-1 cursor-pointer">
            Забыли пароль?
          </p>
        </div>
      </form>
    </div>
  );
};
