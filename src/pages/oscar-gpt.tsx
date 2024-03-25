import { Title } from "@mantine/core";
import { DunkinIcon } from "~/assets/DunkinLogo";
import { Layout } from "~/components/Layout";
import { ProtectedRoute } from "~/modules/auth/components/ProtectedRoute";
import { useUser } from "~/modules/auth/hooks/useUser";
import { BkLogo } from "~/modules/bk/bk-chat/BkLogo";
import { BkChatInterface } from "~/modules/bk/bk-chat/ChatInterface";

export default function OscarGptPage() {
  const { user } = useUser();
  return (
    <ProtectedRoute>
      <Layout>
        <Title order={3} mb="lg">
          OscarGPT
        </Title>
        {(user?.company_id === 211 || user?.company_id === 210) && (
          <BkChatInterface
            type="bk"
            logo={<BkLogo width={40} height={40} />}
            title="BK University Chatbot"
          />
        )}
        {(user?.company_id === 212 || user?.company_id===215) && (
          <BkChatInterface
            type="dunkin"
            logo={<DunkinIcon width={120} height={40} />}
            title="The Center Chatbot"
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
}
