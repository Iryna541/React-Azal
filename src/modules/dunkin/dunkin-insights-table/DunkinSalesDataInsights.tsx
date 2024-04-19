import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Stack, Table } from "@mantine/core";
import { salesColumns } from "./columns";

import { useState } from "react";

import { SalesData } from "./api/useGetInsights";

interface DunkinInsightsTableProps {
  data: SalesData[]; // Ensure this matches the expected structure
}

export function DunkinSalesDataInsightsTable({
  data,
}: DunkinInsightsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns: salesColumns,
    getCoreRowModel: getCoreRowModel(),
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

    // state
    state: {
      columnFilters,
      columnVisibility,
      sorting,
    },
  });
  const setHeaderColor = (id: string) => {
    if (id === "Sales") return "red.2";
    else if (id === "net_sales") return "red.2";
    else if (id === "growth") return "red.2";
    else if (id === "v.LY $/Rank") return "red.2";
    else if (id === "Transactions") return "blue.2";
    else if (id === "transactions") return "blue.2";
    else if (id === "transactions_growth_percentage") return "blue.2";
    else if (id === "ly_transactions") return "blue.2";
    else if (id === "v.LY /Rank") return "blue.2";
    else if (id === "v.LY % /Rank") return "blue.2";
    else if (id === "Avarage Ticket") return "green.2";
    else if (id === "average_ticket_size") return "green.2";
    else if (id === "AT/Rank") return "green.2";
    else if (id === "ly_average_ticket_size") return "green.2";
    else if (id === "ticket_size_percentage") return "green.2";
    else if (id === "$v.LY/Rank") return "green.2";
    else if (id === "%v.LY/Rank") return "green.2";
    else if (id === "store_name") return "blue.1";
    else if (id === "0_store_name") return "blue.1";

    return "white";
  };
  const setCellColor = (id: string) => {
    if (id.includes("store_name")) return "blue.1";

    return "white";
  };
  return (
    <>
      <Stack>
        <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="xs">
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th
                      bg={setHeaderColor(header.column.id)}
                      key={header.id}
                      colSpan={header.colSpan}
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
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    console.log("get value:", cell.getValue());
                    return (
                      <Table.Td
                        bg={setCellColor(cell.id)}
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
      </Stack>
    </>
  );
}
