import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ActionIcon,
  Box,
  Group,
  Pagination,
  Select,
  Table,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { columns } from "./columns"; // You need to update or create this based on the ManagerPlan data structure
import { ManagerPlanResponse } from "./api/useBkManagerPlan"; // Update the import based on actual file structure
import { useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { IconInfoCircle } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

interface BkManagerPlanTableProps {
  data: ManagerPlanResponse;
  setDtlSelectedOption: (value: string | null) => void; // Correct type for the setter function
}

export function BkManagerPlanTable({
  data,
  setDtlSelectedOption,
}: BkManagerPlanTableProps) {
  const PAGE_SIZE = 25;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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

  const handleSelectChange = (value: any) => {
    setDtlSelectedOption(value);
  };

  return (
    <>
      <Select
        label="Filter"
        placeholder="Pick value"
        data={["All", "Exclude Top 5"]}
        defaultValue="All"
        m={"sm"}
        w={"15%"}
        onChange={handleSelectChange}
      />
      <Table
        horizontalSpacing="lg"
        withColumnBorders
        verticalSpacing="xs"
        withRowBorders
      >
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <>
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

                    <Table.Th>Day Part</Table.Th>
                    <Table.Th>Insights</Table.Th>
                  </>
                );
              })}
            </Table.Tr>
          ))}
        </Table.Thead>
        <Table.Tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const subrows = row.original.subRows;
              return (
                <>
                  <Table.Tr
                    key={row.id}
                    onClick={() => {
                      row.getIsExpanded()
                        ? row.toggleExpanded(false)
                        : row.toggleExpanded(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Table.Td
                          rowSpan={subrows.length + 1}
                          fw={500}
                          c="hsl(var(--foreground) / 0.8)"
                          key={cell.id}
                          style={{
                            width: cell.column.getSize(),
                            minWidth: cell.column.getSize(),
                            maxWidth: cell.column.getSize(),
                            border: "1px solid hsl(var(--border))",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Table.Td>
                      );
                    })}
                  </Table.Tr>
                  {subrows.map((item, idx) => {
                    const insightItems = (
                      item.insights as unknown as {
                        insight: string;
                        has_employee: boolean;
                        employees: Array<{
                          date: string;
                          employee: Array<string>;
                        }>;
                      }[]
                    ).map((el) => {
                      const messageHtml = DOMPurify.sanitize(
                        marked(el.insight) as string
                      );
                      return (
                        <Box>
                          <TypographyStylesProvider p="0" m="0">
                            <div
                              style={{ fontSize: 14 }}
                              dangerouslySetInnerHTML={{
                                __html: messageHtml,
                              }}
                            />
                          </TypographyStylesProvider>
                          {el.has_employee && el.employees.length ? (
                            <ActionIcon
                              ml={"xl"}
                              onClick={() => {
                                modals.open({
                                  title: "Employees",
                                  children: (
                                    <>
                                      {el.employees.map((em, index) => {
                                        return (
                                          <Box key={index}>
                                            <Text
                                              key={index}
                                              fw={700}
                                              mb={"sm"}
                                            >
                                              {em.date}
                                            </Text>
                                            {em.employee.map((el, idx) => {
                                              return (
                                                <Text key={idx}>{el}</Text>
                                              );
                                            })}
                                          </Box>
                                        );
                                      })}
                                    </>
                                  ),
                                });
                              }}
                            >
                              <IconInfoCircle size={14} />
                            </ActionIcon>
                          ) : (
                            <></>
                          )}
                        </Box>
                      );
                    });

                    return (
                      <>
                        <Table.Tr key={idx}>
                          <Table.Td
                            style={{
                              minWidth: 180,
                              border: "1px solid hsl(var(--border))",
                            }}
                          >
                            <Text fw={700}>{item.shift}</Text>
                          </Table.Td>
                          <Table.Td
                            style={{
                              minWidth: 180,
                              border: "1px solid hsl(var(--border))",
                            }}
                          >
                            {insightItems}
                            {/* <TypographyStylesProvider p="0" m="0">
                              <div
                                style={{ fontSize: 14 }}
                                dangerouslySetInnerHTML={{
                                  __html: messageHtml,
                                }}
                              />
                              {item.insights[0].has_employee &&
                              item.insights[0].employees.length ? (
                                <ActionIcon
                                  onClick={() => {
                                    modals.open({
                                      title: "Employees",
                                      children: (
                                        <>
                                          {item.insights[0].employees.map(
                                            (em, index) => {
                                              return (
                                                <Box key={index}>
                                                  <Text
                                                    key={index}
                                                    fw={700}
                                                    mb={"sm"}
                                                  >
                                                    {em.date}
                                                  </Text>
                                                  {em.employee.map(
                                                    (el, idx) => {
                                                      return (
                                                        <Text key={idx}>
                                                          {el}
                                                        </Text>
                                                      );
                                                    }
                                                  )}
                                                </Box>
                                              );
                                            }
                                          )}
                                        </>
                                      ),
                                    });
                                  }}
                                >
                                  <IconInfoCircle size={14} />
                                </ActionIcon>
                              ) : (
                                <></>
                              )}
                            </TypographyStylesProvider> */}
                          </Table.Td>
                        </Table.Tr>
                      </>
                    );
                  })}
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
