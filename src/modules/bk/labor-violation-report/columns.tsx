import { Badge, Text } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";

export const laborViolationTableColumn: ColumnDef<any>[] = [
  {
    accessorKey: "store_id",
    header: "Location #",
    cell: (cell) =>
      cell.getValue() === "Grand Total" ? (
        <Text ta={"center"} fw={"600"}>
          {cell.getValue() as string}
        </Text>
      ) : (
        <Badge
          size="md"
          h={32}
          w={"100%"}
          c="hsl(var(--foreground) / 0.8)"
          bg="hsl(var(--secondary))"
          fw={600}
          fz={14}
          style={{ borderRadius: 4, cursor: "pointer" }}
        >
          {cell.getValue() as string}
        </Badge>
      ),
    // size: 80,
  },
  {
    accessorKey: "employee_name",
    header: "Employee"
  },
  {
    accessorKey: "age",
    header: "Age",
    // size: 120,
  },
  {
    accessorKey: "start",
    header: "Start",
    // cell: (cell) => {
    //   return `${moment(cell.getValue() as string).format("MM/DD/YYYY")}`;
    // },
    // size: 120,
  },
  {
    accessorKey: "end",
    header: "End",
    // cell: (cell) => {
    //   return `${moment(cell.getValue() as string).format("MM/DD/YYYY")}`;
    // },
    // size: 120,
  },
  {
    accessorKey: "hours_worked",
    header: "Hours Worked",
    // size: 120,
  },
  {
    accessorKey: "color",
    header: "Color",
  },
];
