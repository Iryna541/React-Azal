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
import { salesBuildingColumns, salesBuildingColumnsForDemo } from "./columns";

import { useState } from "react";
import { useUser } from "~/modules/auth/hooks/useUser";
import { SalesBuildingData } from "./api/useGetInsights";

interface DunkinInsightsTableProps {
  data: SalesBuildingData[]; // Ensure this matches the expected structure
}

export function DunkinSalesBuildingInsightsTable({
  data,
}: DunkinInsightsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { user } = useUser();
  const isDemoAccount = user?.company_id == 210;

  const table = useReactTable({
    data,
    columns: isDemoAccount ? salesBuildingColumnsForDemo : salesBuildingColumns,

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
    if (id === "Sales") return "red.2";
    else if (id === "total_digital_sales_percentage") return "orange.2";
    else if (id === "store_name") return "blue.1";
    else if (id === "total_mobile_transactions_percentage") return "violet.2";
    else if (id === "loyalty_sales_percentage") return "blue.2";
    else if (id === "delivery_sales_percentage") return "red.2";

    return "white";
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
                          padding: isDemoAccount ? 10 : undefined,
                          fontWeight: isDemoAccount ? 700 : undefined,
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
                    colSpan={salesBuildingColumns.length}
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
