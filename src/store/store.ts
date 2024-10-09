import { create } from "zustand";
import {
  postRegisterData,
  postLoginData,
  getUserData,
  updateUserData,
} from "./services";
import type { RegisterInputs, LoginInputs, Usern } from "./types";

interface AuthState {
  user: Usern | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  success: boolean;
  setUser: (user: Usern) => void;
  register: (data: RegisterInputs) => Promise<void>;
  login: (data: LoginInputs) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  updateUser: (id: string | number, userData: Partial<Usern>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: Boolean(localStorage.getItem("token")),
  error: null,
  isLoading: false,
  success: false,

  getMe: async () => {
    try {
      set({ isLoading: true, error: null });
      const userData = await getUserData();
      if (userData) {
        set({ user: userData, isAuthenticated: true });
      } else {
        set({
          isAuthenticated: false,
          error: "Не удалось получить данные пользователя",
        });
      }
      set({ isLoading: false });
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      set({ isAuthenticated: false, error: (error as Error).message });
    } finally {
      set({ isLoading: false, error: null, success: true });
    }
  },

  setUser: (user) => set({ user, isAuthenticated: true, error: null }),

  register: async (data: RegisterInputs) => {
    try {
      set({ error: null });
      await postRegisterData(data);
      set({
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: (error as Error).message });
      console.error("Ошибка регистрации:", error);
    }
  },

  login: async (data: LoginInputs): Promise<void> => {
    try {
      set({ error: null });
      const response = await postLoginData(data);
      if (response?.token) {
        localStorage.setItem("token", response.token);

        const userData = await getUserData();

        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
            error: null,
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
  updateUser: async (id: string | number, userData: Partial<Usern>) => {
    try {
      const updatedUser = await updateUserData(id, userData);
      if (updatedUser) {
        set((state) => ({
          ...state,
          user: state.user ? { ...state.user, ...updatedUser } : null,
        }));
      }
    } catch (error) {
      console.error("Ошибка обновления данных пользователя:", error);
    }
  },
}));
