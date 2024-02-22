import { ReactNode } from "react";
import { RouteObject, Navigate } from "react-router-dom";

import AutomationsPage from "../pages/askq/automations";
import AnalyticsPage from "../pages/askq/analytics";
import DashboardPage from "~/pages/askq";
import CommunicationPage from "~/pages/askq/communication";
import { BkChatPage } from "~/pages/bk-chat";
import { BkRankingPage } from "~/pages/bk-ranking";
import LoginPage from "~/pages/auth/Login";
import AdminCompanyListingPage from "~/pages/admin/company-listing";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (): RouteObject[] => [
  defineRoute("/askq", <DashboardPage />),
  defineRoute("/askq/communication", <CommunicationPage />),
  defineRoute("/askq/analytics", <AnalyticsPage />),
  defineRoute("/askq/automations", <AutomationsPage />),
  defineRoute("/bk-chat", <BkChatPage />),
  defineRoute("/bk-ranking", <BkRankingPage />),
  /* auth pages */
  defineRoute("/auth/login", <LoginPage />),

  /* admin pages */
  defineRoute("/admin", <Navigate to="/admin/companies" />),
  defineRoute("/admin/companies", <AdminCompanyListingPage />),
];
