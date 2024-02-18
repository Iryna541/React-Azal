import { Box, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./styles/global.css";

import { getRoutes } from "./routes";
import { resolver, theme } from "./styles";

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
          <ModalsProvider>
            <Entry />
          </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
