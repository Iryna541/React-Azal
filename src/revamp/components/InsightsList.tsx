import { Accordion } from "@mantine/core";
import { Grid, SimpleGrid, Stack, TypographyStylesProvider } from "@mantine/core";
import { createElement, useState } from "react";
import { useUser } from "~/modules/auth/hooks/useUser";



export interface InsightsListProps<TData> {
  data: TData[];
  control: React.FC<{ row: TData }>;
  panel: React.FC<{ row: TData }>;
}

export function InsightsList<TData>({
  data,
  control,
  panel,
}: InsightsListProps<TData>) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUser();
  // const html = marked(data[selectedIndex].insights) as string;
  return user?.company_id == 210 ? (
    <Grid>
      <Grid.Col span={4}>
        <Stack style={{ backgroundColor: "#ECEEF2", borderColor: "#D5D9E2", padding: "16px", borderRadius: 16, maxHeight: "1024px", overflow: "auto" }} gap="md">
          {data.map((row, i) => {
            return (
              <SimpleGrid cols={2} style={{ cursor: "pointer", backgroundColor: (i == selectedIndex ? "#EDFAFF" : "#fff"), borderColor: (i == selectedIndex ? "#0A93FF" : "#D5D9E2"), borderStyle: "solid", borderWidth: 2, padding: "16px", borderRadius: 16 }} spacing="md" verticalSpacing="xl" onClick={() => setSelectedIndex(i)} key={i}>
                {createElement(control, { row })}
              </SimpleGrid>
            )
          })}
        </Stack>
      </Grid.Col>
      <Grid.Col span={8}>
        <TypographyStylesProvider p="16" m="0" style={{ border: "2px solid #e0e3e9", borderRadius: 16, maxHeight: "1024px", overflow: "auto" }}>
          {createElement(panel, { row: data[selectedIndex] })}
        </TypographyStylesProvider>

      </Grid.Col>
    </Grid >
  ) : (
    <Accordion variant="separated" radius="lg">
      {data.map((row, i) => {
        return (
          <Accordion.Item value={i.toString()} px="sm">
            <Accordion.Control>
              {createElement(control, { row })}
            </Accordion.Control>
            <Accordion.Panel>{createElement(panel, { row })}</Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}
