import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { ActiveUserResponse, useActiveUser } from "../api/useActiveUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  ConfigurationResponse,
  useConfigurations,
} from "../api/useConfigurations";

export type UserData = ActiveUserResponse["user_info"];

type AuthState = {
  user: UserData | undefined;
  configurations: ConfigurationResponse | undefined;
  refetch: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthState>({
  user: undefined,
  configurations: undefined,
  refetch: () => {},
  loading: true,
});

export function AuthContextProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [configurations, setConfigurations] = useState<
    ConfigurationResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const { data, isError } = useActiveUser({
    config: {
      staleTime: Infinity,
      retry: 1,
    },
  });
  const { data: configurationsData } = useConfigurations({
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

    if (configurationsData) {
      setConfigurations(configurationsData);
    }

    // An error means, the user has no JWT or it's expired
    if (isError) {
      setLoading(false);
      const excludedPaths = ["/auth/login"];
      const isExcluded = excludedPaths.includes(pathname);
      if (!isExcluded) navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [data, isError, configurationsData]);

  function refetch() {
    setUser(undefined);
    setLoading(true);
    queryClient.removeQueries({ queryKey: ["me"] });
    queryClient.removeQueries({ queryKey: ["configurations"] });
  }

  return (
    <AuthContext.Provider value={{ user, configurations, loading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}
