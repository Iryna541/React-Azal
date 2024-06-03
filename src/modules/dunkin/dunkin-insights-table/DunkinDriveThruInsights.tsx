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
import { ScrollArea, Stack, Box, Table } from "@mantine/core";
import { driveThruColumns, driveThruColumnsForDemo } from "./columns";

import { useState } from "react";

import { DriveThruData } from "./api/useGetInsights";
import { useUser } from "~/modules/auth/hooks/useUser";

interface DunkinInsightsTableProps {
  data: DriveThruData[]; // Ensure this matches the expected structure
}

export function DunkinDriveThruInsightsTable({
  data,
}: DunkinInsightsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { user } = useUser();
  const isDemoAccount = user?.company_id == 210;

  const table = useReactTable({
    data,
    columns: isDemoAccount ? driveThruColumnsForDemo : driveThruColumns,
    autoResetPageIndex: false,
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
    if (isDemoAccount) return "#789ccc";
    if (id === "store_name") return "blue.1";

    return "yellow.3";
  };
  const setCellColor = (id: string) => {
    if (id.includes("store_name")) return isDemoAccount ? "#f2f2f2" : "blue.1";

    return "white";
  };
  const WrapperComponent = isDemoAccount ? Box : Stack;
  const w = isDemoAccount ? 730 : undefined;
  return (
    <>
      <ScrollArea scrollbars="x">
        <WrapperComponent w={w}>
          <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="xs" style={isDemoAccount ? { borderRight: "1px solid #f0f0f0" } : undefined}>
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Table.Th
                        bg={setHeaderColor(header.column.id)}
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.column.getSize(),

                          minWidth: header.column.getSize(),

                          maxWidth: header.column.getSize(),
                        }}
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
                              padding: isDemoAccount ? 10 : undefined,
                              fontWeight: isDemoAccount ? 700 : undefined,
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
        </WrapperComponent>
      </ScrollArea>
    </>
  );
}
