import { TypographyStylesProvider } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { marked } from "marked";

export interface ManagerPlan {
  manager: string;
  action_plan: string;
}

export const columns: ColumnDef<ManagerPlan>[] = [
  {
    accessorKey: "manager",
    header: "General Manager",
    size: 40,
  },
  {
    accessorKey: "action_plan",
    header: "Action Plans",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      const content = marked.parse(value) as string;
      return (
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </TypographyStylesProvider>
      );
    },
  },
];
