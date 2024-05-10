import { Box, Button, Flex, Grid, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";

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
          <Flex bg="green.1" justify={"center"} align={"center"}>
            <Text  style={{ fontSize: "14px" }} fw={500}>
              {row.original.B}
            </Text>
            {row.original.A === "CATERING IN STORE" && <Button size="compact-sm" variant="transparent" onClick={() => modals.open({
              title: "Edit Data",
              children: <EditModalContent storeId={row.original.store_id} category_id={row.original.category_id} weekStartDate={row.original.week_1_start_date}/>
            })}><IconPencil size={16}/></Button> }
          </Flex>
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
  {
    accessorKey: "store_id",
    header: "Store ID",
    size: 150,
  },
  {
    accessorKey: "category_id",
    header: "Category ID",
    size: 150,
  },
  {
    accessorKey: "week_1_start_date",
    header: "Week 1 Start Date",
    size: 150,
  },
  {
    accessorKey: "week_2_start_date",
    header: "Week 2 Start Date",
    size: 150,
  },
  {
    accessorKey: "week_3_start_date",
    header: "Week 3 Start Date",
    size: 150,
  },
  {
    accessorKey: "week_4_start_date",
    header: "Week 4 Start Date",
    size: 150,
  },
];


function EditModalContent({storeId, categoryId, weekStartDate}: {storeId: number, categoryId: number, weekStartDate: string}): ReactNode {
  return (
    <Stack gap={"sm"}>
      <Flex justify={'space-between'} align={"center"}>
          <Text>Store ID:</Text>
          <Text>{storeId}</Text>
      </Flex>
      <Grid grow>
        <Grid.Col>
          <Text>Category ID:</Text>
        </Grid.Col>
        <Grid.Col>
          <Text>{categoryId}</Text>
        </Grid.Col>
      </Grid>
      <Grid grow>
        <Grid.Col>
          <Text>Week Start Date:</Text>
        </Grid.Col>
        <Grid.Col>
          <Text>{weekStartDate}</Text>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
