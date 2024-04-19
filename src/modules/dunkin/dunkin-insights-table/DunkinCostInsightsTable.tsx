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
import { costDataColumns } from "./columns";
import { useState } from "react";

import { CostData } from "./api/useGetInsights";

interface DunkinInsightsTableProps {
  data: CostData[]; // Ensure this matches the expected structure
}

export function DunkinCostInsightsTable({ data }: DunkinInsightsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns: costDataColumns,
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
    if (id === "store_name") return "blue.1";
    else if (id === "cml_cost_percentage") return "green.1";
    else if (id === "total_cogs_percentage") return "teal.5";
    else if (id === "target") return "green.4";
    else if (id === "labor_total_hours") return "indigo.2";

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
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td
                      bg={setCellColor(cell.id)}
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
              ))
            ) : (
              <Table.Tr>
                <Table.Td
                  colSpan={costDataColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
