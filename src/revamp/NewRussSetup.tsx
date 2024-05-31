import { Tabs, Flex, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
import { useUser } from "~/modules/auth/hooks/useUser";
import { BkManagerPlanTable } from "~/modules/bk/bk-manager-plan-2/BkManagerPlanTable";
import { useBkManagerPlan } from "~/modules/bk/bk-manager-plan-2/api/useBkManagerPlan";
import { useGetManagers } from "~/modules/bk/bk-store-ranking/api/useGetManagers";
import {
  useStoreRanking,
  GetStoreRankingResponse,
} from "~/modules/bk/bk-store-ranking/api/useStoreRanking";
import { RussManagerSchedules } from "~/modules/bk/russ-manager-schedules/RussManagerSchedules";
import { SubwayInsights } from "./subway/SubwayInsights";

export function NewRussSetup({ forInsightsAction }) {
  const { configurations, user } = useUser();
  const { data } = useStoreRanking({
    companyId: user?.company_id.toString(),
  });

  const [filteredData, setFilteredData] = useState<GetStoreRankingResponse>(
    data || []
  );
  console.log(filteredData);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dtlSelectedOption, setDtlSelectedOption] = useState<string>("All");

  const { data: managerData } = useBkManagerPlan({
    type: dtlSelectedOption,
    isDemo: user?.company_id === 210 ? "true" : "",
  });

  const { data: managers } = useGetManagers();

  const managerNames =
    managers?.users
      .filter((user) => user.role_title === "Manager")
      .map((user) => user.name) ?? [];

  console.log(managerNames);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedOption === "All Stores" || !selectedOption) {
      if (data) setFilteredData(data);
      return;
    }
    const selectedManagerStores = managers?.users
      .find((user) => user.name === selectedOption)
      ?.regions.map((region) => region.region_title);

    const filteredStoreRanking = data?.filter((item) =>
      selectedManagerStores?.includes(item.store_id.toString())
    );

    if (filteredStoreRanking) setFilteredData(filteredStoreRanking);
    // eslint-disable-next-line
  }, [selectedOption]);

  // eslint-disable-next-line
  const handleSelectChange = (value: any) => {
    setSelectedOption(value);
  };

  console.log(handleSelectChange);

  // for filtering data to admin vs dtl
  const isAdmin =
    configurations?.is_partner === 1 || configurations?.role?.role_id === 2;

  const filteredManagerData = isAdmin
    ? managerData
    : managerData?.filter((item) => {
      return item.managers_name === user?.name;
    });

  return (
    <Tabs variant="pills" radius="xs" defaultValue={forInsightsAction ? "store" : "manager"}>
      <Flex align="center" justify="space-between">
        <Tabs.List mb="lg">
          {
            forInsightsAction ? (<Tabs.Tab value="store">Store</Tabs.Tab>) : (user?.company_id === 210 || user?.company_id === 211) && (
              <Tabs.Tab value="manager">DTL</Tabs.Tab>
            )
          }
          {user?.company_id === 211 && (
            <Tabs.Tab value="manager-schedules">Manager Schedules</Tabs.Tab>
          )}
        </Tabs.List>
      </Flex>
      <Tabs.Panel value="store">
        <Stack gap="xl">
          {/* <Box
            style={{
              border: "1px solid hsl(var(--border))",
              borderRadius: 8,
            }}
          >
            <Flex justify={"space-between"}>
              <Box px="lg" py="md">
                <Title order={5} fw={500} fz={16}>
                  Store Leaderboard
                </Title>
                <Title
                  component="p"
                  order={6}
                  fz={14}
                  fw={500}
                  size="sm"
                  lh={1.5}
                >
                  Which locations are doing better?
                </Title>
              </Box>
              <Select
                label="Filter stores"
                placeholder="Pick value"
                data={["All Stores", ...managerNames]}
                defaultValue="All Stores"
                m={"sm"}
                onChange={handleSelectChange}
                allowDeselect={false}
              />
            </Flex>
            <Divider />
            {data && <BkStoreRankingTable data={filteredData} />}
          </Box> */}
          <SubwayInsights />
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="manager">
        {managerData && (
          <BkManagerPlanTable
            data={filteredManagerData ?? []}
            dtlSelectedOption={dtlSelectedOption}
            setDtlSelectedOption={setDtlSelectedOption}
          />
        )}
      </Tabs.Panel>
      <Tabs.Panel value="manager-schedules">
        <RussManagerSchedules />
      </Tabs.Panel>
    </Tabs>
  );
}
