import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Box,
  Button,
  Flex,
  Group,
  List,
  Pagination,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { columns } from "./columns";
import { StoreInsights } from "./api/useStoreRanking";
import { useRef, useState } from "react";
import { marked } from "marked";
import html2canvas from "html2canvas";
import { openSendInsightModal } from "./SendInsightsModal";
import { useUser } from "~/modules/auth/hooks/useUser";
import { BarChart, LineChart } from "@mantine/charts";
// import { useGetManagers } from "./api/useGetManagers";

interface BkStoreRankingTableProps {
  data: StoreInsights[];
}

type CombinedProps = BkStoreRankingTableProps;

export function BkStoreRankingTable({ data }: CombinedProps) {
  const PAGE_SIZE = 10;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isLoading, setIsLoading] = useState(false);

  // const { data: managers } = useGetManagers();
  // console.log("managers:", managers.users);
  // console.log("selectedStore:", selectedStore);
  // const managerNames = new Set(managers.users.map((manager) => manager.name));

  // const filteredData = selectedStore
  //   ? data.filter((item) => {
  //       if (selectedStore === "All Stores") return data;
  //       return item.store_id === selectedStore;
  //     })
  //   : data;

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    // column filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    // column visibility
    onColumnVisibilityChange: setColumnVisibility,
    // sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableExpanding: true,
    getExpandedRowModel: getExpandedRowModel(),

    // initial state
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
    // state
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
  });

  const boxRef = useRef(null);

  const handleTakeScreenshot = () => {
    if (boxRef.current) {
      setIsLoading(true);
      html2canvas(boxRef.current)
        .then((canvas) => {
          const base64image = canvas.toDataURL("image/png");
          const photoStrings = [base64image];
          openSendInsightModal({ photo: photoStrings });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Screenshot failed", error);
          setIsLoading(false); // End loading if there's an error
        });
    }
  };

  const { user } = useUser();

  return (
    <>
      <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="xs">
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Th
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                      maxWidth: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Table.Th>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const storeId = row.original.store_id;
              const content = marked.parse(row.original.insights);
              return (
                <>
                  <Table.Tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-store-id={storeId}
                    // onClick={() => {
                    //   row.getIsExpanded()
                    //     ? row.toggleExpanded(false)
                    //     : row.toggleExpanded(true);
                    // }}
                    // style={{ cursor: "pointer" }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Td
                        fw={500}
                        c="hsl(var(--foreground) / 0.8)"
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          minWidth: cell.column.getSize(),
                          maxWidth: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                  {row.getIsExpanded() && (
                    <Table.Tr key="exapanded" px={"sm"}>
                      <Table.Td colSpan={6}>
                        {user?.company_id === 210 && (
                          <Box>
                            <Charts />
                          </Box>
                        )}
                        <Flex>
                          <TypographyStylesProvider ref={boxRef} w={"90%"}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content as string,
                              }}
                            ></div>
                          </TypographyStylesProvider>
                          <Button
                            w={120}
                            py={"sm"}
                            px={"md"}
                            onClick={handleTakeScreenshot}
                            loading={isLoading}
                          >
                            Send
                          </Button>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </>
              );
            })
          ) : (
            <Table.Tr>
              <Table.Td colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Group
        justify="space-between"
        px="xs"
        py="sm"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <Text size="sm">
          {" "}
          {table.getState().pagination.pageIndex * PAGE_SIZE + 1} -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * PAGE_SIZE,
            table.getFilteredRowModel().rows.length
          )}{" "}
          / {table.getFilteredRowModel().rows.length}
        </Text>
        <Pagination
          size="sm"
          boundaries={1}
          total={table.getPageCount()}
          onChange={(value) => table.setPageIndex(value - 1)}
        />
      </Group>
    </>
  );
}

function Charts() {
  return (
    <SimpleGrid cols={2} py="sm">
      <Paper withBorder p="lg">
        <Stack justify="center">
          <Title order={4} fw={500}>
            Summary
          </Title>
          <List fz={14}>
            <List.Item>
              5% more labor is being used in morning daypart
            </List.Item>
            <List.Item>Got 2 negative reviews this week</List.Item>
            <List.Item>
              Speed of service is 10s lower during late night{" "}
            </List.Item>
          </List>
        </Stack>
      </Paper>
      <Box>
        <StatsGrid />
      </Box>
      <Paper withBorder p="lg">
        <Title order={4} mb="lg">
          Weekly Sales Trend{" "}
        </Title>
        <BarChart
          h={300}
          data={[
            { week: "Week 1", Sales: 5000 },
            { week: "Week 2", Sales: 10000 },
            { week: "Week 3", Sales: 15000 },
            { week: "Week 4", Sales: 20000 },
            { week: "Week 5", Sales: 18000 },
            { week: "Week 6", Sales: 10000 },
          ]}
          // valueFormatter={(value) =>
          //   "$" + new Intl.NumberFormat("en-US").format(value)
          // }
          dataKey="week"
          series={[{ name: "Sales", color: "green.6" }]}
          tickLine="y"
          barProps={{
            barSize: 36,
          }}
        />
      </Paper>
      <Paper withBorder p="lg">
        <Title order={4} mb="lg">
          Sales vs Labor{" "}
        </Title>
        <LineChart
          h={300}
          data={[
            {
              week: "Week 1",
              sales: 5555,
              labor: 4554,
            },
            {
              week: "Week 2",
              labor: 2756,
              sales: 4555,
            },
            {
              week: "Week 3",
              labor: 3322,
              sales: 6531,
            },
            {
              week: "Week 4",
              labor: 3470,
              sales: 5102,
            },
            {
              week: "Week 5",
              labor: 3129,
              sales: 3412,
            },
          ]}
          dataKey="week"
          series={[
            { name: "sales", color: "green.6" },
            { name: "labor", color: "yellow.6" },
          ]}
          curveType="linear"
        />
      </Paper>
    </SimpleGrid>
  );
}

import { Paper } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Sales", icon: "receipt", value: "$13,456", diff: 34 },
  { title: "Labor", icon: "coin", value: "25%", diff: 5 },
  { title: "SOS", icon: "discount", value: "1:17", diff: 0.06 },
  { title: "ACR", icon: "user", value: "9.8", diff: -13 },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value} c="hsl(var(--foreground))">
            {stat.value}
          </Text>
          <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <Title order={4} mb="sm">
        The Facts
      </Title>
      <SimpleGrid cols={{ base: 1, xs: 2 }}>{stats}</SimpleGrid>
    </div>
  );
}
