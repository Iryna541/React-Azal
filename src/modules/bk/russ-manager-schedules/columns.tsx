import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { Schedule, TransformedData } from "./RussManagerSchedules";
import { Group, Text } from "@mantine/core";

const format = (time: string | null) => {
  if (!time) return null;
  const formattedTime = moment(time, "HH:mm:ss").format("hh:mm A");
  return formattedTime;
};

function ScheduleHeader() {
  return (
    <Group justify="space-between">
      <Text size="sm" fw={700}>
        In
      </Text>
      <Text size="sm" fw={700}>
        Out
      </Text>
      <Text size="sm" fw={700}>
        Hrs
      </Text>
    </Group>
  );
}

function ScheduleCell({ data }: { data: Schedule }) {
  return (
    <Group justify="space-between">
      <Text size="sm" lts={-1}>
        {format(data[0])}
      </Text>
      <Text size="sm" lts={-1}>
        {format(data[1])}
      </Text>
      <Text size="sm" lts={-1}>
        {data[2]}
      </Text>
    </Group>
  );
}

export const columns: ColumnDef<TransformedData[number]>[] = [
  {
    accessorKey: "managerName",
    header: "Manager",
    size: 120,
  },
  {
    accessorKey: "A",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "B",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "C",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "D",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "E",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "F",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
  {
    accessorKey: "G",
    header: () => <ScheduleHeader />,
    cell: ({ cell }) => {
      return <ScheduleCell data={cell.getValue() as unknown as Schedule} />;
    },
  },
];
