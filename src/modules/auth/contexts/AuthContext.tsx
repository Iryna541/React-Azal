import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ActiveUserResponse, useActiveUser } from "../api/useActiveUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export type UserData = ActiveUserResponse["user_info"];

type AuthState = {
  user: UserData | undefined;
  refetch: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthState>({
  user: undefined,
  refetch: () => {},
  loading: true,
});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { data, isError } = useActiveUser({
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
      setLoading(false);
      const excludedPaths = ["/auth/login"];
      const isExcluded = excludedPaths.includes(pathname);
      if (!isExcluded) navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [data, isError]);

  function refetch() {
    setUser(undefined);
    setLoading(true);
    queryClient.removeQueries({ queryKey: ["me"] });
  }

  return (
    <AuthContext.Provider value={{ user, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
