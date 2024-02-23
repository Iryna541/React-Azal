/* eslint-disable */
// @ts-nocheck

import {
  Box,
  Flex,
  Group,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState } from "react";

dayjs.extend(localizedFormat);

const columns = [
  {
    accessorKey: "manager",
    header: "District Manager",
    size: 140,
  },
  {
    accessorKey: "monday",
    header: "Monday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "tuesday",
    header: "Tuesday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "Wednesday",
    header: "Wednesday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "thursday",
    header: "Thursday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "friday",
    header: "Friday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "saturday",
    header: "Saturday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
  {
    accessorKey: "sunday",
    header: "Sunday",
    size: 320,
    cell: (info) =>
      info.getValue().map((item, index) => {
        // Determine background color based on the time of day
        const backgroundColor =
          item.time === "Afternoon"
            ? "#FFE5CC"
            : item.time === "Morning"
            ? "#FFF3D1"
            : "#D0F5E1";

        return (
          <Flex
            my="xs"
            direction="column"
            align="start"
            px={10}
            key={index}
            style={{ backgroundColor: backgroundColor, borderRadius: "8px" }}
          >
            <Text
              p={4}
              style={{ borderRadius: "8px" }}
              mb={3}
              mt={6}
              bg="white"
              w={60}
              size="xs"
            >
              {item.store}
            </Text>
            <Text fw={500} c="#344054">
              {item.time}
            </Text>
            <Text size="sm">{item.task}</Text>
          </Flex>
        );
      }),
  },
];

export function CalenderTable({ data }) {
  const PAGE_SIZE = 12;
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
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
    <ScrollArea
      w="100vw"
      scrollbars="xy"
      style={{ border: "1px solid hsl(var(--border))", borderRadius: 8 }}
    >
      <Table
        horizontalSpacing="xs"
        verticalSpacing="sm"
        stickyHeader
        withTableBorder={false}
        withColumnBorders
      >
        <Table.Thead>
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
            table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))
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
        pt="sm"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <Text size="sm">
          {table.getState().pagination.pageIndex * PAGE_SIZE + 1} -{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * PAGE_SIZE,
            table.getFilteredRowModel().rows.length
          )}{" "}
          / {table.getFilteredRowModel().rows.length}
        </Text>
        <Pagination
          pb="sm"
          size="sm"
          boundaries={1}
          total={table.getPageCount()}
          onChange={(value) => table.setPageIndex(value - 1)}
        />
      </Group>
    </ScrollArea>
  );
}
