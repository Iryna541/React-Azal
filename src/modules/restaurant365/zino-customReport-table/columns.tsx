import {
  Box,
  Button,
  Flex,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import { useUpdateRevenueCenterData } from "./api/useRevenueCenterData";
import { showSuccessNotification } from "~/utils/notifications";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

const isNull = (value: unknown) => {
  if (value === null) return true;
  else return false;
};

export const columns: ColumnDef<Record<string, number | string>>[] = [
  {
    accessorKey: "A",
    header: "Week",
    size: 280,
    cell: ({ row }) => {
      if (row.original.A === -1)
        return (
          <Text opacity={0}>
            {isNull(row.original.A) ? "" : row.original.A}
          </Text>
        );

      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
            {isNull(row.original.A) ? "" : row.original.A}
          </Text>
        );
      }

      if (
        !["%", "TICKETS", "AVG TICKET $", "Start Date"].includes(
          row.original.A as string
        )
      ) {
        return (
          <Text bg="gray.1" style={{ fontSize: "inherit" }} fw={600}>
            {isNull(row.original.A) ? "" : row.original.A}
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
      console.log("b--->", row.original.B);
      if (row.original.A === "TOTAL NET SALES") {
        return (
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
            {isNull(row.original.B) ? "" : row.original.B}
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
            <Text style={{ fontSize: "inherit" }} fw={500}>
              {isNull(row.original.B) ? "" : row.original.B}
            </Text>
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
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
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
          <Text bg="green.1" style={{ fontSize: "inherit" }} fw={500}>
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
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
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
          <Text bg="green.1" style={{ fontSize: "inherit" }} fw={500}>
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
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
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
          <Text bg="green.1" style={{ fontSize: "inherit" }} fw={500}>
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
          <Text bg="yellow.1" style={{ fontSize: "inherit" }} fw={600}>
            {isNull(row.original.A) ? "" : row.original.A}
          </Text>
        );
      }
      if (typeof row.original.F === "number")
        return (
          <Text bg="gray.1" style={{ fontSize: "inherit" }} fw={500}>
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
    header: "Action",
    cell: ({ row }) => {
      return row.original.store_id ? (
        <Flex>
          <Button
            size="compact-sm"
            variant="outline"
            fz={"inherit"}
            // p={"md"}
            onClick={() =>
              modals.open({
                title: "Edit Data",
                children: (
                  <EditModalContent
                    storeId={row.original.store_id as number}
                    categoryId={row.original.category_id as number}
                    weekStartDates={{
                      "Week 1": row.original.week_1_start_date as string,
                      "Week 2": row.original.week_2_start_date as string,
                      "Week 3": row.original.week_3_start_date as string,
                      "Week 4": row.original.week_4_start_date as string,
                    }}
                    storeName={row.original.store_name as string}
                    categoryName={row.original.A as string}
                  />
                ),
              })
            }
          >
            Edit&nbsp;
            <IconPencil size={16} />
          </Button>
        </Flex>
      ) : null;
    },
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
  {
    accessorKey: "store_name",
  },
];

function EditModalContent({
  storeId,
  categoryId,
  weekStartDates,
  storeName,
  categoryName,
}: {
  storeId: number;
  categoryId: number;
  weekStartDates: { [key: string]: string };
  storeName: string;
  categoryName: string;
}): ReactNode {
  const [selectedWeek, setSelectedWeek] = useState<string>("Week 1");
  const [weekStartDate, setWeekStartDate] = useState<string>(
    weekStartDates["Week 1"]
  );

  const queryClient = useQueryClient();

  const updateSchema = z.object({
    net_sales: z.number(),
    percentage: z.number(),
    tickets: z.number(),
    average_ticket_size: z.number(),
    week_start_date: z.string(),
    category_id: z.number(),
    store_id: z.number(),
  });

  type UpdateSchema = z.infer<typeof updateSchema>;

  const { mutate: handleUpdate, isPending } = useUpdateRevenueCenterData({
    config: {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["zeno-insight-revenue-table"],
        });
        showSuccessNotification("Successfully Updated!");
        modals.closeAll();
      },
    },
  });

  const form = useForm<UpdateSchema>({
    validate: zodResolver(updateSchema),
    initialValues: {
      percentage: 0,
      tickets: 0,
      average_ticket_size: 0,
      week_start_date: weekStartDate,
      category_id: categoryId,
      store_id: storeId,
      net_sales: 0,
    },
  });

  useEffect(() => {
    if (selectedWeek) {
      const data = (
        queryClient.getQueriesData({
          queryKey: ["zeno-insight-revenue-table"],
        })[0][1] as any
      ).data;
      const currentItem = data.find(
        (item: any) =>
          item.category_id === categoryId &&
          item.store_id === storeId &&
          item.week_start_date === weekStartDate
      );
      if (currentItem) {
        form.setFieldValue("net_sales", currentItem?.category_total as number);
        form.setFieldValue("percentage", parseFloat(currentItem.percentage));
        form.setFieldValue("tickets", currentItem.tickets as number);
        form.setFieldValue(
          "average_ticket_size",
          parseFloat(currentItem.average_ticket_size)
        );
        form.setFieldValue("week_start_date", weekStartDate as string);
        form.setFieldValue("category_id", categoryId as number);
        form.setFieldValue("store_id", storeId as number);
      }
    }
  }, [queryClient, weekStartDate]);

  useEffect(() => {
    if (selectedWeek) {
      setWeekStartDate(weekStartDates[selectedWeek]);
    }
  }, [selectedWeek]);

  return (
    <Stack gap={"sm"}>
      <Flex direction={"column"} justify={"space-between"} gap={"xs"}>
        <Select
          fw={"500"}
          placeholder="Pick value"
          data={["Week 1", "Week 2", "Week 3", "Week 4"]}
          value={selectedWeek}
          onChange={(v) => {
            if (v) setSelectedWeek(v);
          }}
          allowDeselect={false}
        />
      </Flex>
      {selectedWeek !== "0" && (
        <form
          onSubmit={form.onSubmit((values) => {
            handleUpdate(values);
          })}
        >
          <Stack gap={"sm"}>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Week Start Date
              </Text>
              <TextInput value={weekStartDate} disabled={true} w={200} />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Store
              </Text>
              <TextInput value={storeName} disabled={true} w={200} />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Category
              </Text>
              <TextInput value={categoryName} disabled={true} w={200} />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Net Sales
                <Box c={"red.5"} component={"span"}>
                  *
                </Box>
              </Text>
              <NumberInput
                placeholder="Enter Net Sales"
                w={200}
                {...form.getInputProps("net_sales")}
              />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Percentage{" "}
                <Box c={"red.5"} component={"span"}>
                  *
                </Box>
              </Text>
              <NumberInput
                placeholder="Enter Percentage"
                w={200}
                {...form.getInputProps("percentage")}
              />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Tickets{" "}
                <Box c={"red.5"} component={"span"}>
                  *
                </Box>
              </Text>
              <NumberInput
                placeholder="Enter Total Tickets"
                w={200}
                {...form.getInputProps("tickets")}
              />
            </Flex>
            <Flex justify={"space-between"} align={"center"}>
              <Text size="sm" fw={"600"}>
                Average Ticket Size{" "}
                <Box c={"red.5"} component={"span"}>
                  *
                </Box>
              </Text>
              <NumberInput
                placeholder="Enter Average Ticket Size"
                w={200}
                {...form.getInputProps("average_ticket_size")}
              />
            </Flex>
            <Button
              mt="sm"
              size="md"
              type="submit"
              variant="azalio-ui-dark"
              loading={isPending}
            >
              Update
            </Button>
          </Stack>
        </form>
      )}
    </Stack>
  );
}
