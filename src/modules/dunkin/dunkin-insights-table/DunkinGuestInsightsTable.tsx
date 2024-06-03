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
import { guestSatisfactionColumns, guestSatisfactionColumnsForDemo } from "./columns";

import { useState } from "react";

import { GuestSatisfactionData } from "./api/useGetInsights";
import { useUser } from "~/modules/auth/hooks/useUser";

interface DunkinInsightsTableProps {
  data: GuestSatisfactionData[]; // Ensure this matches the expected structure
}

export function DunkinGuestInsightsTable({ data }: DunkinInsightsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { user } = useUser();
  const isDemoAccount = user?.company_id == 210;

  const table = useReactTable({
    data,
    columns: isDemoAccount ? guestSatisfactionColumnsForDemo : guestSatisfactionColumns,
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

    return "orange.2";
  };
  const setCellColor = (id: string) => {
    if (id.includes("store_name")) return isDemoAccount ? "#f2f2f2" : "blue.1";

    return "white";
  };
  const WrapperComponent = isDemoAccount ? Box : Stack;
  const w = isDemoAccount ? 700 : undefined;
  return (
    <>
      <ScrollArea scrollbars="x">
        <WrapperComponent w={w}>
          <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="xs" style={{ borderRight: "1px solid #f0f0f0" }}>
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
                          padding: isDemoAccount ? 10 : undefined
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
                          padding: 10,
                          fontWeight: 700,
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
                    colSpan={guestSatisfactionColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </WrapperComponent>
      </ScrollArea>
    </>
  );
}
