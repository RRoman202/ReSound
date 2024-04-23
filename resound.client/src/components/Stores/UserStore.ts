import create from "zustand";
import Cookies from "js-cookie";

interface UserState {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: number;
  username: string;
  email: string;
  // Add other user properties as needed
}

export const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: async (username, password) => {
    // Make API call to login
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set("token", data.token); // Store token in cookie
      set({ isLoggedIn: true, user: data.user });
    } else {
      // Handle login error
    }
  },
  logout: () => {
    Cookies.remove("token");
    set({ isLoggedIn: false, user: null });
  },
}));

export default useUserStore;
