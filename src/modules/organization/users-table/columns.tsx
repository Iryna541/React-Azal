import { ColumnDef } from "@tanstack/react-table";
import { User } from "../api/useAllUsers";
import { Text } from "@mantine/core";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "role_title",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (cell) => {
      const value = cell.getValue() as string;
      return <Text>{value.length ? value : "-"}</Text>;
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
