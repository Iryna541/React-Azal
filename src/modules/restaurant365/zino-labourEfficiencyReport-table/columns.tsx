import { Box, NumberInput } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { useUpdateLabourEfficiencyData } from "./api/useLabourEfficiencyReportData";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccessNotification } from "~/utils/notifications";
import { useState } from "react";

const CustomCell = ({accessorKey, row, cell}:{accessorKey: string, row: any, cell: any}) => {
  const [inputValue, setInputValue] = useState(cell.getValue());
  const [isEditActive, setIsEditActive] =useState(false);
  const queryClient = useQueryClient();
  const { mutate: handleUpdate } = useUpdateLabourEfficiencyData({
    config: {
      onSuccess: () => {
        queryClient.refetchQueries({
          queryKey: ["zeno-insight-labour-efficiency-table"],
        });
        showSuccessNotification("Successfully Updated!");
      },
    },
  });

  const handleValueUpdate = (val: number | string) => {
    setInputValue(val as number);
  }

  const handleBlur = () => {
    const data = {...row.original};
    delete data.isHeader;
    delete data.total;
    delete data.hour;
    delete data.meal;

    setIsEditActive(false);

    handleUpdate({...data, [accessorKey]: inputValue});
  }

  return (
    <Box onClick={() => setIsEditActive(true)} h={30}>
      {
        isEditActive ? (
          <NumberInput
            onChange={handleValueUpdate}
            onBlur={handleBlur}
            value={inputValue}
            hideControls
            autoFocus
            styles={{
              input: {
                minHeight: 30,
                height: 30,
                textAlign: 'center'
              }
            }}
          />
        ): cell.getValue()
      }
    </Box>
  )
}

export const columns: ColumnDef<Record<string, number | string | boolean>>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "store_id",
    header: "Store Id"
  },
  {
    accessorKey: "isHeader",
    header: "Is header",
  },
  {
    accessorKey: "hour",
    header: "Hour",
  },
  {
    accessorKey: "expectedGuests",
    header: "# of Guests Expected",
    // cell: ({row, cell}) => (
    //   <CustomCell accessorKey="expectedGuests" row={row} cell={cell}/>
    // )
  },
  {
    accessorKey: "actualGuests",
    header: "Actual Guests",
    cell: ({row, cell}) => (
      <CustomCell accessorKey="actualGuests" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "manager",
    header: "Manager",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="manager" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "shiftLeader",
    header: "Shift Leader",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="shiftLeader" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "nuggetPrep",
    header: "Nugget Prep",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="nuggetPrep" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "portion",
    header: "Portion",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="portion" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "lineCook",
    header: "Line Cook",
    cell: ({row, cell}) => (
      <CustomCell accessorKey="lineCook" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "lateNight",
    header: "Late Night",
    cell: ({row, cell}) => (
      <CustomCell accessorKey="lateNight" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "dish",
    header: "Dish",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="dish" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "cashier",
    header: "Cashier",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="cashier" row={row} cell={cell}/>
  )},
  {
    accessorKey: "cashier2",
    header: "Cashier 2",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="cashier2" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "sales",
    header: "Sales",
    size: 100,
    cell: ({row, cell}) => (
      <CustomCell accessorKey="sales" row={row} cell={cell}/>
    )
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ cell }) => {
      return (
        <Box
          bg={"hsl(var(--foreground) / 0.095)"}
          pos={"absolute"}
          h={"96%"}
          w={"96%"}
          left={"2%"}
          top={"2%"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "hsl(var(--foreground))",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {cell.getValue() as string}
        </Box>
      );
    },
  },
];
