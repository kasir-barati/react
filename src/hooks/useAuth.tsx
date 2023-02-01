import { User } from "../types";

export const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}") as User;

  return user && user.isAuthenticated;
};
