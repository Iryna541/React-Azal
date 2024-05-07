import { Box, Flex, Loader, Select, Stack, Title } from "@mantine/core";
import {
  ManagerSchedule,
  useRussManagerSchedules,
} from "./api/useRussManagerSchedules";
import { RussManagerSchedulesTable } from "./RussManagerSchedulesTable";
import moment from "moment";
import { useState } from "react";

export function RussManagerSchedules() {
  const [value, setValue] = useState<string | null>("4");

  const { data: managerSchedulesData, isLoading } = useRussManagerSchedules({
    params: { storeId: value ?? "4" },
  });
  return (
    <>
      <Stack>
        <Flex justify="space-between">
          <Title order={3}>Weekly Schedule</Title>
          <Select
            allowDeselect={false}
            placeholder="Pick store Id"
            data={managerSchedulesData ? managerSchedulesData.stores : []}
            value={value}
            onChange={setValue}
          />
        </Flex>
        {isLoading && (
          <Box mx="auto" my="xl">
            <Loader size="lg" />
          </Box>
        )}
        {managerSchedulesData?.previous_week_schedules && (
          <TransformedTable
            data={managerSchedulesData.previous_week_schedules}
          />
        )}
        {managerSchedulesData?.current_week_schedules && (
          <TransformedTable
            data={managerSchedulesData.current_week_schedules}
          />
        )}
        {managerSchedulesData?.next_week_schedules && (
          <TransformedTable data={managerSchedulesData.next_week_schedules} />
        )}
      </Stack>
    </>
  );
}

export function TransformedTable({ data }: { data: ManagerSchedule[] }) {
  const transformedData = data ? transform(data) : null;
  if (transformedData) {
    return (
      <Box>
        <Title order={6} mb="sm">
          {moment(transformedData.startDate, "MM-DD-YYYY").format("MM/DD/YYYY")}{" "}
          &mdash;{" "}
          {moment(transformedData.endDate, "MM-DD-YYYY").format("MM/DD/YYYY")}
        </Title>
        <RussManagerSchedulesTable
          data={transformedData.data}
          startDate={transformedData.startDate}
          endDate={transformedData.endDate}
        />
      </Box>
    );
  }
  return null;
}

export type Schedule = [string | null, string | null, number | null];
export type TransformedData = Array<{
  managerName: string;
  A: Schedule;
  B: Schedule;
  C: Schedule;
  D: Schedule;
  E: Schedule;
  F: Schedule;
  G: Schedule;
}>;

function transform(data: ManagerSchedule[]) {
  const parseDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  data.sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  );
  const groupedData = groupBy(data, "name");

  const transformedData: TransformedData = [];
  Object.keys(groupedData).map((managerName) => {
    const data = groupedData[managerName];
    if (data?.length === 7) {
      transformedData.push({
        managerName,
        A: [
          data[0].scheduled_start_time,
          data[0].scheduled_end_time,
          data[0].scheduled_hours,
        ],
        B: [
          data[1].scheduled_start_time,
          data[1].scheduled_end_time,
          data[1].scheduled_hours,
        ],
        C: [
          data[2].scheduled_start_time,
          data[2].scheduled_end_time,
          data[2].scheduled_hours,
        ],
        D: [
          data[3].scheduled_start_time,
          data[3].scheduled_end_time,
          data[3].scheduled_hours,
        ],
        E: [
          data[4].scheduled_start_time,
          data[4].scheduled_end_time,
          data[4].scheduled_hours,
        ],
        F: [
          data[5].scheduled_start_time,
          data[5].scheduled_end_time,
          data[5].scheduled_hours,
        ],
        G: [
          data[6].scheduled_start_time,
          data[6].scheduled_end_time,
          data[6].scheduled_hours,
        ],
      });
    }
  });

  if (data.length === 0) return null;

  return {
    startDate: data[0].date,
    endDate: data[data.length - 1].date,
    data: transformedData,
  };
}

function groupBy<
  K extends string | number | symbol,
  T extends { [k in K]: any },
>(data: T[], key: K): Partial<Record<T[K], T[]>> {
  return data.reduce(
    (acc, item) => {
      const group = item[key];
      const arr: T[] = (acc[group] = acc[group] ?? []);
      arr.push(item);
      return acc;
    },
    {} as Partial<Record<T[K], T[]>>
  );
}
