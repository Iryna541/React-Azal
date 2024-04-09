import { ReactNode } from "react";
import { RouteObject, Navigate } from "react-router-dom";

// import DashboardPage from "~/pages/askq";
import LoginPage from "~/pages/auth/Login";
import AdminCompanyListingPage from "~/pages/admin/company-listing";
import { storage } from "~/lib/storage";
import OscarGptPage from "~/pages/oscar-gpt";
import OrganizationPage from "~/pages/organization";
import InsightsPage from "~/pages/askq/insights";
import AnalyticsPage from "~/pages/askq/analytics";
import CommunicationPage from "~/pages/communication";
import DashboardPage from "~/pages/askq";

const defineRoute = (path: string, element: ReactNode) => ({ path, element });

export const getRoutes = (): RouteObject[] => {
  const roleId = storage.getRoleId();
  const isSuperAdmin = roleId === "1";
  return [
    defineRoute("/askq", <DashboardPage />),
    defineRoute("/askq/analytics", <AnalyticsPage />),
    defineRoute("/askq/insights", <InsightsPage />),
    defineRoute("/communication", <CommunicationPage />),
    defineRoute("/oscar-gpt", <OscarGptPage />),
    defineRoute("/auth/login", <LoginPage />),
    defineRoute("/organization", <OrganizationPage />),
    defineRoute(
      "/admin",
      isSuperAdmin ? <AdminCompanyListingPage /> : <Navigate to="/askq" />
    ),
    defineRoute("*", <Navigate to="/auth/login" />),
  ];
};
