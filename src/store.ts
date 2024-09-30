import { create } from "zustand";
import {
  postRegisterData,
  postLoginData,
  RegisterInputs,
  LoginInputs,
  getUserData,
  User,
} from "./services";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | boolean | null;
  setUser: (user: User) => void;
  register: (data: RegisterInputs) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,

  getMe: async () => {
    try {
      set({ error: null });
      const userData = await getUserData();
      if (userData) {
        set({ user: userData, isAuthenticated: true });
      } else {
        set({
          isAuthenticated: false,
          error: "Не удалось получить данные пользователя",
        });
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      set({ isAuthenticated: false, error: (error as Error).message });
    }
  },

  setUser: (user) => set({ user, isAuthenticated: true, error: null }),

  register: async (data: RegisterInputs) => {
    try {
      set({ error: false });
      const response = await postRegisterData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);
        set({
          user: {
            email: data.email,
            name: data.name,
            number: data.number,
            id: "",
            password: "",
            confirmPassword: "",
          },
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка регистрации:", error);
    }
  },

  login: async (data: LoginInputs) => {
    try {
      set({ error: false });
      const response = await postLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);

        const userData = await getUserData();

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
          });
        } else {
          set({ error: "Не удалось получить данные пользователя" });
        }
      } else {
        set({ error: "Ошибка авторизации" });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка авторизации:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false, error: null });
  },
}));
