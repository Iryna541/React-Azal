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
import { Box, ScrollArea, Table } from "@mantine/core";
import { columns } from "./columns";
import { useState } from "react";
import { TransformedData } from "./RussManagerSchedules";
import moment from "moment";

export function RussManagerSchedulesTable({
  data,
  startDate,
  endDate,
  storeId,
}: {
  data: TransformedData;
  startDate: string;
  endDate: string;
  storeId: string;
}) {
  const PAGE_SIZE = 10;
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

  const _startDate = moment(startDate, "MM-DD-YYYY");
  const _endDate = moment(endDate, "MM-DD-YYYY");
  const datesInRange = [];
  while (_startDate <= _endDate) {
    datesInRange.push(_startDate.format("MM/DD/YYYY"));
    _startDate.add(1, "days");
  }

  return (
    <ScrollArea scrollbars="x" w="calc(100vw - 330px)">
      <Box
        style={{ border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
      >
        <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr
              style={{
                borderBottom: "1px solid hsl(var(--foreground) / 0.075)",
              }}
            >
              <Table.Th>Store: {storeId}</Table.Th>
              {datesInRange.map((date) => {
                return (
                  <Table.Th ta="center">
                    {date.toString()} <br />{" "}
                    {moment(date, "MM/DD/YYYY").format("dddd")}
                  </Table.Th>
                );
              })}
            </Table.Tr>
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
      </Box>
    </ScrollArea>
  );
}
