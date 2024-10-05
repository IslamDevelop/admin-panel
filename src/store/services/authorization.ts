import { LoginInputs, RegisterInputs, Usern, Response } from "@/store/types";
import axios from "axios";

export const postRegisterData = async (
  data: RegisterInputs
): Promise<Response> => {
  try {
    const response = await axios.post<Response>(
      "https://b846882921d4f43c.mokky.dev/register",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw new Error("Не удалось зарегистрироваться");
  }
};

export const postLoginData = async (
  data: LoginInputs
): Promise<Response | null> => {
  try {
    const response = await axios.post<Response>(
      "https://b846882921d4f43c.mokky.dev/auth",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return null;
  }
};

export const getUserData = async (): Promise<Usern | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Токен не найден. Нужно авторизоваться");
    }
    const response = await axios.get<Usern>(
      "https://b846882921d4f43c.mokky.dev/auth_me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return null;
  }
};

export const updateUserData = async (
  id: string | number,
  userData: Partial<Usern>
): Promise<Usern | null> => {
  try {
    const response = await axios.patch(
      `https://b846882921d4f43c.mokky.dev/users/${id}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Не удалось изменить данные", error);
    return null;
  }
};
