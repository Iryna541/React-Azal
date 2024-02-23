import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ActiveUserResponse, useActiveUser } from "../api/useActiveUser";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "~/lib/storage";

export type UserData = ActiveUserResponse["user_info"];

type AuthState = {
  user: UserData | undefined;
  refetch: () => void;
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthState>({
  user: undefined,
  refetch: () => {},
  logout: () => {},
  loading: true,
});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const {
    data,
    isError,
    refetch: refetchUser,
  } = useActiveUser({
    config: {
      staleTime: Infinity,
      retry: 1,
    },
  });

  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        setUser(data.user_info);
      }, 1000);
    }
    // An error means, the user has no JWT or it's expired
    if (isError) {
      const excludedPaths = ["/auth/login"];
      const isExcluded = excludedPaths.includes(pathname);
      if (!isExcluded) navigate("/auth/sign-in");
    }
    // eslint-disable-next-line
  }, [data, isError]);

  function refetch() {
    // setUser(undefined);
    setLoading(true);
    refetchUser();
  }

  function logout() {
    storage.clearToken();
    storage.clearCompanyId();
    navigate("/auth/login");
  }

  return (
    <AuthContext.Provider value={{ user, loading, refetch, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
