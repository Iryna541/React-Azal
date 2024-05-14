import { Box } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Record<string, number | string | boolean>>[] = [
  {
    accessorKey: "isHeader",
    header: "Is header",
  },
  {
    accessorKey: "hour",
    header: "Hour",
  },
  {
    accessorKey: "expectedGuests",
    header: "# of Guests Expected",
  },
  {
    accessorKey: "actualGuests",
    header: "Actual Guests",
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 100,
  },
  {
    accessorKey: "shiftLeader",
    header: "Shift Leader",
    size: 100,
  },
  {
    accessorKey: "nuggetPrep",
    header: "Nugget Prep",
    size: 100,
  },
  {
    accessorKey: "portion",
    header: "Portion",
    size: 100,
  },
  {
    accessorKey: "lineCook",
    header: "Line Cook",
  },
  {
    accessorKey: "lateNight",
    header: "Late Night",
  },
  {
    accessorKey: "dish",
    header: "Dish",
    size: 100,
  },
  {
    accessorKey: "cashier",
    header: "Cashier",
    size: 100,
  },
  {
    accessorKey: "cashier2",
    header: "Cashier 2",
    size: 100,
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ cell }) => {
      return (
        <Box
          bg={"hsl(var(--foreground) / 0.095)"}
          pos={"absolute"}
          h={"96%"}
          w={"96%"}
          left={"2%"}
          top={"2%"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "hsl(var(--foreground))",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {cell.getValue() as string}
        </Box>
      );
    },
  },
];
