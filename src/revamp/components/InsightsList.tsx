import { Accordion } from "@mantine/core";
import { createElement } from "react";

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
  return (
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
