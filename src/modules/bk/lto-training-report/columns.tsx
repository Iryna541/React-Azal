import { Badge, Grid, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode, useEffect, useState } from "react";
import { useRussLtoTrainingReportDetail } from "./api/useRussLtoTrainings";

export const storeWiseColumns: ColumnDef<any>[] = [
  {
    accessorKey: "store_id",
    header: "Store ID",
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
          onClick={() => {
            modals.open({
              title: `Store Details (${cell.getValue()})`,
              size: "xl",
              children: <ModalContent storeId={cell.getValue() as string} />,
            });
          }}
        >
          {cell.getValue() as string}
        </Badge>
      ),
    // size: 80,
  },
  {
    accessorKey: "total_enrolled",
    header: "Total Enrolled",
    // size: 120,
  },
  {
    accessorKey: "total_completed",
    header: "Total Completed",
    // size: 120,
  },
  {
    accessorKey: "total_not_completed",
    header: "Total Not Completed",
    // size: 120,
  },
  {
    accessorKey: "completion_percentage",
    header: "Completion (%)",
    cell: (cell) => {
      return `${cell.getValue()} %`;
    },
    // size: 120,
  },
];

export const dtlWiseColumns: ColumnDef<any>[] = [
  {
    accessorKey: "manager_id",
    header: "Manager ID",
    size: 80,
  },
  {
    accessorKey: "manager_name",
    header: "DTL",
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
          onClick={() => {
            modals.open({
              title: `DTL Details (${cell.getValue() as string})`,
              size: "xl",
              children: (
                <StoreWiseModalContent
                  managerId={cell.row.original.manager_id as string}
                />
              ),
            });
          }}
        >
          {cell.getValue() as string}
        </Badge>
      ),
    // size: 120,
  },
  {
    accessorKey: "total_enrolled",
    header: "Total Enrolled",
    // size: 120,
  },
  {
    accessorKey: "total_completed",
    header: "Total Completed",
    // size: 120,
  },
  {
    accessorKey: "total_not_completed",
    header: "Total Not Completed",
    // size: 120,
  },
  {
    accessorKey: "completion_percentage",
    header: "Completion (%)",
    cell: (cell) => {
      return `${cell.getValue()} %`;
    },
    // size: 120,
  },
];

export function ModalContent({ storeId }: { storeId: string }) {
  const { data: data, isFetching } = useRussLtoTrainingReportDetail({
    params: { storeId },
  });
  const [dtlWiseData, setDtlWiseData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const tempData = data;
      const finalRow = {
        name: "Grand Total",
        total_enrolled: tempData.reduce(
          (acc: number, row: any) => acc + row.total_enrolled,
          0
        ),
        total_completed: tempData.reduce(
          (acc: number, row: any) => acc + row.total_completed,
          0
        ),
        total_not_completed: tempData.reduce(
          (acc: number, row: any) => acc + row.total_not_completed,
          0
        ),
        completion_percentage: (
          (tempData.reduce((acc: number, row: any) => acc + row.total_completed, 0) /
            tempData.reduce((acc: number, row: any) => acc + row.total_enrolled, 0)) *
          100
        ).toFixed(2),
      };
      setDtlWiseData([...tempData, finalRow]);
    }
  }, [data]);

  function HeaderCell({
    title,
    textAlign = "center",
  }: {
    title: string;
    textAlign?: any;
  }): ReactNode {
    return (
      <Text size="sm" fw={"700"} ta={textAlign}>
        {title}
      </Text>
    );
  }

  return (
    <Stack>
      <Grid grow>
        <Grid.Col span={2}>
          <HeaderCell title="DTL" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Enrolled" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Completed" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Not Completed" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="Completion (%)" />
        </Grid.Col>
      </Grid>
      {dtlWiseData?.map((item: any) => (
        <Grid
          grow
          bg={item.name === "Grand Total" ? "hsl(var(--secondary))" : ""}
          py={item.name === "Grand Total" ? 10 : 0}
        >
          <Grid.Col span={2}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>{item.name}</Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>{item.total_enrolled}</Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.total_completed}
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.total_not_completed}
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.completion_percentage} %
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
        </Grid>
      ))}
    </Stack>
  );
}

export function StoreWiseModalContent({ managerId }: { managerId: string }) {
  const { data: data, isFetching } = useRussLtoTrainingReportDetail({
    params: { managerId },
  });
  const [storeWiseData, setStoreWiseData] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      const tempData = data;
      const finalRow = {
        store_id: "Grand Total",
        total_enrolled: tempData.reduce(
          (acc: number, row: any) => acc + row.total_enrolled,
          0
        ),
        total_completed: tempData.reduce(
          (acc: number, row: any) => acc + row.total_completed,
          0
        ),
        total_not_completed: tempData.reduce(
          (acc: number, row: any) => acc + row.total_not_completed,
          0
        ),
        completion_percentage: (
          (tempData.reduce((acc: number, row: any) => acc + row.total_completed, 0) /
            tempData.reduce((acc: number, row: any) => acc + row.total_enrolled, 0)) *
          100
        ).toFixed(2),
      };
      setStoreWiseData([...tempData, finalRow]);
    }
  }, [data]);

  function HeaderCell({
    title,
    textAlign = "center",
  }: {
    title: string;
    textAlign?: any;
  }): ReactNode {
    return (
      <Text size="sm" fw={"700"} ta={textAlign}>
        {title}
      </Text>
    );
  }

  return (
    <Stack>
      <Grid grow>
        <Grid.Col span={1}>
          <HeaderCell title="Store ID" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Enrolled" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Completed" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="T. Not Completed" />
        </Grid.Col>
        <Grid.Col span={1}>
          <HeaderCell title="Completion (%)" />
        </Grid.Col>
      </Grid>
      {storeWiseData?.map((item: any) => (
        <Grid
          grow
          bg={item.store_id === "Grand Total" ? "hsl(var(--secondary))" : ""}
          py={item.name === "Grand Total" ? 10 : 0}
        >
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>{item.store_id}</Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>{item.total_enrolled}</Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.total_completed}
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.total_not_completed}
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text style={{ textAlign: "center" }}>
                {item.completion_percentage}%
              </Text>
            ) : (
              <Text style={{ textAlign: "center" }}>
                <Loader />
              </Text>
            )}
          </Grid.Col>
        </Grid>
      ))}
    </Stack>
  );
}
