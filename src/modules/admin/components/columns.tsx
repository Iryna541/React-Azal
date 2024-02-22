import { ColumnDef } from "@tanstack/react-table";
import { Company } from "../api/useCompanies";
import { Box } from "@mantine/core";

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
    cell: () => {
      return <Box></Box>;
    },
  },
];
