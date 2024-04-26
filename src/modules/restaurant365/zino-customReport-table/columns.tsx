import { Text } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Record<string, number | string>>[] = [
  {
    accessorKey: "A",
    header: "Week",
    size: 280,
    cell: ({ row }) => {
      if (row.original.A === -1)
        return <Text opacity={0}>{row.original.A}</Text>;

      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.A}
          </Text>
        );
      }

      if (
        !["%", "TICKETS", "AVG TICKET $", "Start Date"].includes(
          row.original.A as string
        )
      ) {
        return (
          <Text bg="gray.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.A}
          </Text>
        );
      }
      return row.original.A;
    },
  },
  {
    accessorKey: "B",
    header: "1",
    size: 150,
    cell: ({ row }) => {
      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.B}
          </Text>
        );
      }
      if (
        row.original.A !== "AVG TICKET $" &&
        row.original.A !== "%" &&
        row.original.A !== "Start Date"
      ) {
        return (
          <Text bg="green.1" style={{ fontSize: "14px" }} fw={500}>
            {row.original.B}
          </Text>
        );
      }
      return row.original.B;
    },
  },
  {
    accessorKey: "C",
    header: "2",
    size: 150,
    cell: ({ row }) => {
      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.C}
          </Text>
        );
      }
      if (
        row.original.A !== "AVG TICKET $" &&
        row.original.A !== "%" &&
        row.original.A !== "Start Date"
      ) {
        return (
          <Text bg="green.1" style={{ fontSize: "14px" }} fw={500}>
            {row.original.C}
          </Text>
        );
      }
      return row.original.C;
    },
  },
  {
    accessorKey: "D",
    header: "3",
    size: 150,
    cell: ({ row }) => {
      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.D}
          </Text>
        );
      }
      if (
        row.original.A !== "AVG TICKET $" &&
        row.original.A !== "%" &&
        row.original.A !== "Start Date"
      ) {
        return (
          <Text bg="green.1" style={{ fontSize: "14px" }} fw={500}>
            {row.original.D}
          </Text>
        );
      }
      return row.original.D;
    },
  },
  {
    accessorKey: "E",
    header: "4",
    size: 150,
    cell: ({ row }) => {
      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.E}
          </Text>
        );
      }
      if (
        row.original.A !== "AVG TICKET $" &&
        row.original.A !== "%" &&
        row.original.A !== "Start Date"
      ) {
        return (
          <Text bg="green.1" style={{ fontSize: "14px" }} fw={500}>
            {row.original.E}
          </Text>
        );
      }
      return row.original.E;
    },
  },
  {
    accessorKey: "F",
    header: "TOTALS",
    size: 150,
    cell: ({ row }) => {
      if (row.original.F === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "14px" }} fw={600}>
            {row.original.A}
          </Text>
        );
      }
      if (typeof row.original.F === "number")
        return (
          <Text bg="gray.1" style={{ fontSize: "14px" }} fw={500}>
            {row.original.F.toFixed(2)}
          </Text>
        );
      return "";
    },
  },
  {
    accessorKey: "G",
    header: "Prev Period",
    size: 150,
  },
];
