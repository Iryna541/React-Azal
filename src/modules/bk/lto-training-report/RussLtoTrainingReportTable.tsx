import { useState } from "react";
import { storeWiseColumns } from "./columns";
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
import { Box, Table } from "@mantine/core";

const RussLtoTrainingReportTable = ({
  data,
  columns,
  colVisibility,
}: {
  data: any;
  columns: any;
  colVisibility: VisibilityState;
}) => {
  const PAGE_SIZE = 100;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(colVisibility);

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

  return (
    <Box
      style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
    >
      <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="sm">
        <Table.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Th
                    key={header.id}
                    ta={"center"}
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
            table.getRowModel().rows.map((row: any) => {
              return (
                <>
                  <Table.Tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      row.getIsExpanded()
                        ? row.toggleExpanded(false)
                        : row.toggleExpanded(true);
                    }}
                    style={{ cursor: "pointer" }}
                    bg={
                      row?.original.manager_name === "Grand Total" ||
                      row?.original.store_id === "Grand Total"
                        ? "hsl(var(--secondary))"
                        : ""
                    }
                  >
                    {row.getVisibleCells().map((cell: any) => (
                      <Table.Td
                        fw={500}
                        c="hsl(var(--foreground) / 0.8)"
                        key={cell.id}
                        ta={"center"}
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
                </>
              );
            })
          ) : (
            <Table.Tr>
              <Table.Td
                colSpan={storeWiseColumns.length}
                className="h-24 text-center"
              >
                No results.
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default RussLtoTrainingReportTable;
