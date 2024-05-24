import { Box, NumberInput } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import {
  useUpdateLabourEfficiencyAggregateData,
  useUpdateLabourEfficiencyData,
} from "./api/useLabourEfficiencyReportData";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CustomCell = ({
  accessorKey,
  row,
  cell,
}: {
  accessorKey: string;
  row: any;
  cell: any;
}) => {
  const [inputValue, setInputValue] = useState(cell.getValue());
  const [isEditActive, setIsEditActive] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleUpdate } = useUpdateLabourEfficiencyData({
    config: {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["zeno-insight-labour-efficiency-table"],
        });
        // showSuccessNotification("Successfully Updated!");
      },
    },
  });
  const { mutate: handleUpdateAggregateDatta } =
    useUpdateLabourEfficiencyAggregateData({
      config: {
        onSuccess: () => {
          queryClient.refetchQueries({
            queryKey: ["zeno-insight-labour-efficiency-table"],
          });
          // showSuccessNotification("Successfully Updated!");
        },
      },
    });

  const handleValueUpdate = (val: number | string) => {
    setInputValue(val as number);
  };

  const handleBlur = () => {
    if (row.original.meal?.includes("bottom-")) {
      const key = row.original.meal?.split("-")[1];
      handleUpdateAggregateDatta({
        id: row.original.id,
        store_id: row.original.store_id,
        date: row.original.date,
        [key]: inputValue,
      });
    } else {
      const data = { ...row.original };
      delete data.isHeader;
      delete data.total;
      delete data.hour;
      delete data.meal;

      handleUpdate({ ...data, [accessorKey]: inputValue });
    }
    setIsEditActive(false);
  };

  // isEditable={!(row.original.meal as string).includes('total')}
  console.log({ row: row?.original as string });

  const disabledRows = [
    "breakfast-total",
    "lunch-total",
    "dinner-total",
    "grand-total",
    "empty",
  ];

  return (
    <Box
      onClick={() => setIsEditActive(true)}
      h={22}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isEditActive ? (
        !disabledRows?.includes(row.original.meal as string) &&
        accessorKey !== "total" &&
        !(
          (row.original.meal as string).includes("bottom-") &&
          accessorKey !== "empty"
        ) &&
        (row.original.meal as string) !== "" &&
        (accessorKey !== "empty" ||
          (accessorKey === "empty" &&
            (row.original.meal as string).includes("bottom-"))) ? (
          <NumberInput
            onChange={handleValueUpdate}
            onBlur={handleBlur}
            value={inputValue}
            hideControls
            autoFocus
            styles={{
              input: {
                minHeight: 22,
                height: 22,
                textAlign: "center",
                fontSize: "inherit",
                padding: 2,
              },
            }}
          />
        ) : (
          cell.getValue()
        )
      ) : (
        cell.getValue()
      )}
    </Box>
  );
};

export const columns: ColumnDef<Record<string, number | string | boolean>>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "store_id",
    header: "Store Id",
  },
  {
    accessorKey: "isHeader",
    header: "Is header",
  },
  {
    accessorKey: "hour",
    header: "Hour",
    size: 100,
  },
  {
    accessorKey: "expectedGuests",
    header: "# of Guests Expected",
    size: 80,
    // cell: ({row, cell}) => (
    //   <CustomCell accessorKey="expectedGuests" row={row} cell={cell}/>
    // )
  },
  {
    accessorKey: "actualGuests",
    header: "Actual Guests",
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="actualGuests" row={row} cell={cell} />
    ),
    size: 80,
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 80,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="manager" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "shiftLeader",
    header: "Shift Leader",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="shiftLeader" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "nuggetPrep",
    header: "Nugget Prep",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="nuggetPrep" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "portion",
    header: "Portion",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="portion" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "lineCook",
    header: "Line Cook",
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="lineCook" row={row} cell={cell} />
    ),
    size: 70,
  },
  {
    accessorKey: "lateNight",
    header: "Late Night",
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="lateNight" row={row} cell={cell} />
    ),
    size: 70,
  },
  {
    accessorKey: "dish",
    header: "Dish",
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="dish" row={row} cell={cell} />
    ),
    size: 70,
  },
  {
    accessorKey: "cashier",
    header: "Cashier",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="cashier" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "cashier2",
    header: "Cashier 2",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="cashier2" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ cell, row }) => {
      return (
        <Box
          bg={"hsl(var(--foreground) / 0.095)"}
          pos={"absolute"}
          h={"80%"}
          w={"96%"}
          left={"2%"}
          top={"10%"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "hsl(var(--foreground))",
            fontWeight: 600,
            fontSize: "inherit",
          }}
        >
          <CustomCell accessorKey="total" row={row} cell={cell} />
          {/* {cell.getValue() as string} */}
        </Box>
      );
    },
  },
  {
    accessorKey: "empty",
    id: "empty",
    size: 20,
    header: "",
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="empty" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "sales",
    header: "Sales",
    size: 70,
    cell: ({ row, cell }) => (
      <CustomCell accessorKey="sales" row={row} cell={cell} />
    ),
  },
  {
    accessorKey: "estGuestsPerLH",
    header: "Est. Guests per L/H",
    size: 70,
    cell: ({ cell }) => (
      <span>
        {cell.getValue()
          ? `${parseFloat(cell.getValue() as string).toFixed(1)}`
          : null}{" "}
      </span>
      // <span>${parseFloat(cell.getValue() as string).toFixed(1)}</span>
    ),
  },
  {
    accessorKey: "actualGuestsPerLH",
    header: "Actual Guests per L/H",
    size: 70,
    cell: ({ cell }) => (
      <span>
        {cell.getValue()
          ? `${parseFloat(cell.getValue() as string).toFixed(1)}`
          : null}{" "}
      </span>
    ),
  },
  {
    accessorKey: "actualSalesPerLH",
    header: "Actual Sales per L/H",
    size: 70,
    cell: ({ cell }) => (
      <span>
        {cell.getValue()
          ? `${parseFloat(cell.getValue() as string).toFixed(1)}`
          : null}{" "}
      </span>
    ),
  },
];
