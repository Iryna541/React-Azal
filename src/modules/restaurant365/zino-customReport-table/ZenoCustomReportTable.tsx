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
  // getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ScrollArea, Table } from "@mantine/core";
import { columns } from "./columns";
import { useState } from "react";

interface ZenoInsightTableProps {
  data: Array<Record<string, number | string>>;
  customReportFilterPeriod: string;
}

export function ZenoCustomReportTable({ data, customReportFilterPeriod }: ZenoInsightTableProps) {
  const PAGE_SIZE = 10;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    category_id: false,
    week_1_start_date: false,
    week_2_start_date: false,
    week_3_start_date: false,
    week_4_start_date: false,
    store_name: false,
  });

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    // pagination
    // getPaginationRowModel: getPaginationRowModel(),
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

  return (
    <>
      <ScrollArea w="calc(100vw - 330px)" scrollbars="x">
        <Table horizontalSpacing="lg" withColumnBorders verticalSpacing={6} fz={12}>
          <Table.Thead>
            <Table.Tr
              style={{
                borderBottom: "2px solid hsl(var(--foreground) / 0.05) ",
                background: "#336699",
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <Table.Th className="text-center"
                style={{ textAlign: "center", borderColor: "rgba(255, 255, 255, 0.2)", }}>
                Norwalk
              </Table.Th>
              <Table.Th
                colSpan={7}
                className="text-center"
                style={{ textAlign: "center", borderColor: "rgba(255, 255, 255, 0.2)", }}
              >
                {customReportFilterPeriod}
              </Table.Th>
            </Table.Tr>
            {/* <Table.Tr>
              <Table.Th className="text-center">Week</Table.Th>
              <Table.Th className="text-center">1</Table.Th>
              <Table.Th className="text-center">2</Table.Th>
              <Table.Th className="text-center">3</Table.Th>
              <Table.Th className="text-center">4</Table.Th>
              <Table.Th className="text-center">Totals</Table.Th>
              <Table.Th className="text-center">Prev Period</Table.Th>
            </Table.Tr> */}
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}
              
              style={{
                background: "#336699",
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th
                      style={{
                        width: `${header.column.getSize()}px`,
                        minWidth: `${header.column.getSize()}px`,
                        maxWidth: `${header.column.getSize()}px`,
                        borderBottom:
                          "2px solid hsl(var(--foreground) / 0.05) ",
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      }}
                      key={header.id}
                      colSpan={header.colSpan}
                      ta={"center"}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {header.column.getCanGroup()
                            ? // If the header can be grouped, let's add a toggle
                              null
                            : null}{" "}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
            
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Table.Tr key={row.id}
                ta={"center"}
                bg={"hsl(var(--foreground) / 0.065)"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Table.Td
                        {...{
                          key: cell.id,
                          style: {
                            background: cell.getIsGrouped()
                              ? "#0aff0082"
                              : cell.getIsAggregated()
                                ? "#ffa50078"
                                : cell.getIsPlaceholder()
                                  ? "#ff000042"
                                  : "white",
                            textAlign: "center",
                            fontWeight: 500,
                            verticalAlign:  'middle',
                          },
                        }}
                      >
                        {cell.getIsGrouped() ? (
                          // If it's a grouped cell, add an expander and row count
                          <>
                            <button
                              {...{
                                onClick: row.getToggleExpandedHandler(),
                                style: {
                                  cursor: row.getCanExpand()
                                    ? "pointer"
                                    : "normal",
                                    // verticalAlign: 'middle'
                                },
                              }}
                            >
                              {row.getIsExpanded() ? "👇" : "👉"}{" "}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{" "}
                              ({row.subRows.length})
                            </button>
                          </>
                        ) : cell.getIsAggregated() ? (
                          // If the cell is aggregated, use the Aggregated
                          // renderer for cell
                          flexRender(
                            cell.column.columnDef.aggregatedCell ??
                              cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        ) : cell.getIsPlaceholder() ? null : ( // For cells with repeated values, render null
                          // Otherwise, just render the regular cell
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </ScrollArea>
{/* 
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
      </Group> */}
    </>
  );
}
