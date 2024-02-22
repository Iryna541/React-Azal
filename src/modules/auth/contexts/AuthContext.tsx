import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ActiveUserResponse, useActiveUser } from "../api/useActiveUser";
import { useLocation, useNavigate } from "react-router-dom";

type UserData = ActiveUserResponse["user_info"];

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
      const excludedPaths = ["/auth/register", "/auth/login"];
      const isExcluded = excludedPaths.includes(pathname);
      if (!isExcluded) navigate("/auth/sign-in");
    }
    // eslint-disable-next-line
  }, [data, isError]);

  function refetch() {
    setUser(undefined);
    setLoading(true);
    refetchUser();
  }

  return (
    <AuthContext.Provider value={{ user, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
