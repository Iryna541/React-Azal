import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Company } from "../api/useCompanies";
import { Box, Button } from "@mantine/core";
import { storage } from "~/lib/storage";
import { useNavigate } from "react-router-dom";
import { useUser } from "~/modules/auth/hooks/useUser";
import { useActiveUser } from "~/modules/auth/api/useActiveUser";

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "account_owner_name",
    header: "Account Owner Name",
  },
  {
    accessorKey: "email",
    header: "Account Owner Email",
  },
  {
    accessorKey: "phone_number",
    header: "Contact No",
  },
  {
    accessorKey: "signed_on",
    header: "Date Signed Up",
  },
  {
    header: "Action",
    cell: ActionCell,
  },
];

function ActionCell({ row }: CellContext<Company, unknown>) {
  const navigate = useNavigate();
  const { refetch } = useActiveUser({ config: { enabled: false } });
  return (
    <Box>
      <Button
        variant="subtle"
        size="xs"
        onClick={async () => {
          storage.setCompanyId(row.original.company_id.toString());
          await refetch();
          navigate("/askq");
        }}
      >
        View as Customer
      </Button>
    </Box>
  );
}
