import { Badge, Grid, Loader, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { ColumnDef } from "@tanstack/react-table";
import { ReactNode } from "react";
import { useRussLtoTrainingReportDetail } from "./api/useRussLtoTrainings";

export const storeWiseColumns: ColumnDef<any>[] = [
  {
    accessorKey: "store_id",
    header: "Store ID",
    cell: (cell) => (
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
    cell: (cell) => (
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
    // size: 120,
  },
];

export function ModalContent({ storeId }: { storeId: string }) {
  const { data: data, isFetching } = useRussLtoTrainingReportDetail({
    params: { storeId },
  });
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
          <HeaderCell title="DTL" textAlign={"left"} />
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
      {data?.map((item: any) => (
        <Grid grow>
          <Grid.Col span={2}>
            {!isFetching ? (
              <Text>{item.name}</Text>
            ) : (
              <Text>
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
                {item.completion_percentage}
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
          <HeaderCell title="Store ID" textAlign={"left"} />
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
      {data?.map((item: any) => (
        <Grid grow>
          <Grid.Col span={1}>
            {!isFetching ? (
              <Text>{item.store_id}</Text>
            ) : (
              <Text>
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
                {item.completion_percentage}
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
