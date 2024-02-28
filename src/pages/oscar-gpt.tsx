import { Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { BkChatInterface } from "~/modules/bk/bk-chat/ChatInterface";

export default function OscarGptPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3} mb="lg">
          OscarGPT
        </Title>
        <BkChatInterface />
      </Layout>
    </ProtectedRoute>
  );
}
