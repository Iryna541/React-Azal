import { Box, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "./styles/global.css";

import { getRoutes } from "./routes";
import { resolver, theme } from "./styles";
import { Notifications } from "@mantine/notifications";
import { AuthContextProvider } from "./modules/auth/contexts/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

LogRocket.init("50nqpl/azal");
setupLogRocketReact(LogRocket);

const queryClient = new QueryClient();

function Entry() {
  const children = useRoutes(getRoutes());
  return <Box>{children}</Box>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MantineProvider theme={theme} cssVariablesResolver={resolver}>
          <Notifications position="top-center" />
          <ModalsProvider>
            <AuthContextProvider>
              <Entry />
              {/* <ReactQueryDevtools /> */}
            </AuthContextProvider>
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
