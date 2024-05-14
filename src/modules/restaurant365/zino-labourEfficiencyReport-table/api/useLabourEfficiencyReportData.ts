import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "~/lib/axios";

const dummyData = [
  {
    id: 2,
    meal: 'breakfast',
    hour: '5:00 am',
    expectedGuests: 12,
    actualGuests: 12,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 3,
    meal: 'breakfast',
    hour: '6:00 am',
    expectedGuests: 10,
    actualGuests: 10,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 4,
    meal: 'breakfast',
    hour: '7:00 am',
    expectedGuests: 15,
    actualGuests: 15,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 5,
    meal: 'lunch',
    hour: '12:00 pm',
    expectedGuests: 15,
    actualGuests: 15,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 6,

    meal: 'lunch',
    hour: '1:00 pm',
    expectedGuests: 15,
    actualGuests: 15,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 7,
    meal: 'lunch',
    hour: '2:00 pm',
    expectedGuests: 15,
    actualGuests: 15,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 8,
    meal: 'dinner',
    hour: '7:00 pm',
    expectedGuests: 20,
    actualGuests: 20,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 9,
    meal: 'dinner',
    hour: '8:00 pm',
    expectedGuests: 20,
    actualGuests: 20,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  },
  {
    id: 10,
    meal: 'dinner',
    hour: '9:00 pm',
    expectedGuests: 20,
    actualGuests: 20,
    manager: 1,
    shiftLeader: 1,
    nuggetPrep: 1,
    portion: 1,
    lineCook: 1,
    lateNight: 1,
    dish: 1,
    cashier: 1,
    cashier2: 1,
    total: 1
  }
]

export type GetLabourEfficiencyReportDataResponse = {
  data: Array<{
    id: number;
    // meal: 'breakfast' | 'linch' | 'dinner';
    meal: string;
    hour: string;
    expectedGuests: number;
    actualGuests: number;
    manager: number;
    shiftLeader: number;
    nuggetPrep: number;
    portion: number;
    lineCook: number;
    lateNight: number;
    dish: number;
    cashier: number;
    cashier2: number;
    total: number;
  }>;
  day: string;
};

export async function fetchLabourEfficiencyData(
  day: string,
): Promise<GetLabourEfficiencyReportDataResponse> {
  return {
    data: dummyData,
    day: 'Monday'
  }
  // try {
  //   const response = await axios.get(
  //     `https://demo-be.azal.io/api/analytics/getRevenueCenterData?day=${day}`
  //   );
  //   return response.data;
  // } catch (error) {
  //   throw new Error(`Failed to fetch labour efficiency data: ${error}`);
  // }
}

export type UseLabourEfficiencyReportDataOptions = {
  day: string;
  // storeId: number;
  config?: UseQueryOptions<GetLabourEfficiencyReportDataResponse>;
};

export function useLabourEfficiencyReportData({
  day,
  ...config
}: UseLabourEfficiencyReportDataOptions) {
  return useQuery({
    queryKey: ["zeno-insight-labour-efficiency-table", day],
    queryFn: () => fetchLabourEfficiencyData(day),
    ...config,
  });
}
