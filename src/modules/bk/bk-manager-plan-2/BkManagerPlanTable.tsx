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
  Group,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import { columns } from "./columns"; // You need to update or create this based on the ManagerPlan data structure
import { ManagerPlanResponse } from "./api/useBkManagerPlan"; // Update the import based on actual file structure
import { useState } from "react";

interface BkManagerPlanTableProps {
  data: ManagerPlanResponse;
}

export function BkManagerPlanTable({ data }: BkManagerPlanTableProps) {
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

  return (
    <>
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
                    <Table.Th>StoreId</Table.Th>
                    <Table.Th>DayPart</Table.Th>
                    <Table.Th>Area of Concern</Table.Th>
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
                          rowSpan={
                            subrows.reduce(
                              (prev, curr) =>
                                prev + curr.area_of_concern.length,
                              0
                            ) +
                            subrows.length +
                            1
                          }
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
                  {subrows.map((item) => {
                    return (
                      <>
                        <Table.Tr>
                          <Table.Td
                            style={{
                              minWidth: 180,
                              border: "1px solid hsl(var(--border))",
                            }}
                            rowSpan={item.area_of_concern.length + 1}
                          >
                            {item.store_id}
                          </Table.Td>
                        </Table.Tr>
                        {item.area_of_concern.map((item) => {
                         const parts = item.split('**');
                         const result = parts.map((part, index) => {
                           if (index % 2 === 1) {
                        
                             const modifiedPart = part.replace(/-\d+/, '').toUpperCase();
                             return  modifiedPart ;
                           }
                           return part;
                         });
                          const substringAfterColon = item.split(/:\s*/)[1];
                       
                          return (
                            <Table.Tr>
                              <Table.Td
                                style={{
                                  maxWidth: 250,
                                  border: "1px solid hsl(var(--border))",
                                  
                                }}
                              >
                              <Text fw={700}>  {result[1]}</Text>
                                 
                              </Table.Td>
                              <Table.Td
                                style={{
                                  border: "1px solid hsl(var(--border))",
                                }}
                              >
                               {substringAfterColon}
                              </Table.Td>
                            </Table.Tr>
                            
                          );
                        })}
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
