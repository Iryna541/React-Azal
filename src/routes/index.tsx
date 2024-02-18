import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

// import AutomationsPage from "../pages/askq/automations";
// import AnalyticsPage from "../pages/askq/analytics";
// import DashboardPage from "~/pages/askq";
// import CommunicationPage from "~/pages/askq/communication";
import { ChatPage } from "~/pages/chat";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (): RouteObject[] => [
  // defineRoute("/askq", <DashboardPage />),
  // defineRoute("/askq/communication", <CommunicationPage />),
  // defineRoute("/askq/analytics", <AnalyticsPage />),
  // defineRoute("/askq/automations", <AutomationsPage />),
  defineRoute("/bk-chat", <ChatPage />),
];
