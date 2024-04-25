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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Flex,
  Group,
  Pagination,
  Table,
  Text,
  TypographyStylesProvider,
} from "@mantine/core";
import { columns } from "./columns";
import { StoreInsights } from "./api/useStoreRanking";
import { useRef, useState } from "react";
import { marked } from "marked";
import html2canvas from "html2canvas";
import { openSendInsightModal } from "./SendInsightsModal";
// import { useGetManagers } from "./api/useGetManagers";

interface BkStoreRankingTableProps {
  data: StoreInsights[];
}

type CombinedProps = BkStoreRankingTableProps;

export function BkStoreRankingTable({ data }: CombinedProps) {
  const PAGE_SIZE = 10;
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [isLoading, setIsLoading] = useState(false);

  // const { data: managers } = useGetManagers();
  // console.log("managers:", managers.users);
  // console.log("selectedStore:", selectedStore);
  // const managerNames = new Set(managers.users.map((manager) => manager.name));

  // const filteredData = selectedStore
  //   ? data.filter((item) => {
  //       if (selectedStore === "All Stores") return data;
  //       return item.store_id === selectedStore;
  //     })
  //   : data;

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

  const boxRef = useRef(null);

  const handleTakeScreenshot = () => {
    if (boxRef.current) {
      setIsLoading(true);
      html2canvas(boxRef.current)
        .then((canvas) => {
          const base64image = canvas.toDataURL("image/png");
          const photoStrings = [base64image];
          openSendInsightModal({ photo: photoStrings });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Screenshot failed", error);
          setIsLoading(false); // End loading if there's an error
        });
    }
  };

  return (
    <>
      <Table horizontalSpacing="lg" withColumnBorders verticalSpacing="xs">
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
            table.getRowModel().rows.map((row) => {
              const content = marked.parse(row.original.insights);
              return (
                <>
                  <Table.Tr
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    // onClick={() => {
                    //   row.getIsExpanded()
                    //     ? row.toggleExpanded(false)
                    //     : row.toggleExpanded(true);
                    // }}
                    // style={{ cursor: "pointer" }}
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
                  {row.getIsExpanded() && (
                    <Table.Tr key="exapanded" px={"sm"}>
                      <Table.Td colSpan={6}>
                        <Flex>
                          <TypographyStylesProvider ref={boxRef} w={"90%"}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: content as string,
                              }}
                            ></div>
                          </TypographyStylesProvider>
                          <Button
                            w={120}
                            py={"sm"}
                            px={"md"}
                            onClick={handleTakeScreenshot}
                            loading={isLoading}
                          >
                            Send
                          </Button>
                        </Flex>
                      </Table.Td>
                    </Table.Tr>
                  )}
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
