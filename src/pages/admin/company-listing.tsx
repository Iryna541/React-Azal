import { Box, Loader, Title } from "@mantine/core";
import { Layout } from "~/components/Layout";
import { useAllCompanies } from "~/modules/admin/api/useCompanies";
import { CompanyListingTable } from "~/modules/admin/components/CompanyListingTable";

export default function AdminCompanyListingPage() {
  const { data, isLoading } = useAllCompanies();
  return (
    <Layout isAdmin>
      <Box style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}>
        <Box px="lg" py="md">
          <Title order={5} fw={500} fz={16}>
            Welcome to super admin panel. {isLoading && <Loader />}
          </Title>
        </Box>
        {data && <CompanyListingTable data={data.companies} />}
      </Box>
    </Layout>
  );
}
