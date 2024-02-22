import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useUser() {
  const value = useContext(AuthContext);
  return value;
}
