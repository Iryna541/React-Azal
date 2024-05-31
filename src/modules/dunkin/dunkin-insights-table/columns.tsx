import { ColumnDef } from "@tanstack/react-table";

import {
  CostData,
  DriveThruData,
  GuestSatisfactionData,
  LaborInfoData,
  SalesBuildingData,
  SalesData,
} from "./api/useGetInsights";
import { Flex, Text } from "@mantine/core";

const cellColor = (rank: number) => {
  if (rank >= 1 && rank <= 3) return "green.1";
  else if (rank >= 12 && rank <= 14) return "red.1";

  return "white";
};

export const salesColumns: ColumnDef<SalesData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      fw={700}
      size="md"
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
    >
      Store
    </Text>,
    size: 150,
  },
  {
    accessorKey: "net_sales",
    header: () => (
      <Text
        fw={700}
        size="md"
        style={{ textAlign: "center", fontSize: "14px", color: "white" }}
        c="white"
      >
        Sales
      </Text>
    ),
    columns: [
      {
        accessorKey: "net_sales",
        size: 110,
        header: () => (
          <Flex
            justify={"space-between"}
            style={{ paddingInline: 0, padding: 0 }}
          >
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Sales
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),
        cell: ({ row }) => {
          const sales = row.original.net_sales;
          const rank = row.original.net_sales_rank;

          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex >
          );
        },
      },
      {
        accessorKey: "growth",
        size: 110,
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "70%", textAlign: "center" }} fw={700} c="white">
              v.LY $
            </Text>
            <Text style={{ fontSize: "14px", width: "30%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),

        cell: ({ row }) => {
          const sales = row.original.growth; //jaleel:need to confirm from jaleel what should be the value
          const rank = row.original.sales_ly_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
              px={"lg"}
            >
              <Text style={{ fontSize: "14px", width: "70%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "30%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
    ],
  },
  {
    accessorKey: "transactions",
    header: () => (
      <Text
        fw={700}
        size="md"
        style={{ textAlign: "center", fontSize: "14px", width: "50%" }}
        c="white"
      >
        Transactions
      </Text>
    ),
    columns: [
      {
        accessorKey: "transactions",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              TC
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),

        size: 100,
        cell: ({ row }) => {
          const sales = row.original.transactions;
          const rank = row.original.transaction_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }}>{sales}</Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_transactions",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              v.LY
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),

        size: 100,
        cell: ({ row }) => {
          const sales = row.original.ly_transactions;
          const rank = row.original.ly_transaction_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "transactions_growth_percentage",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              v.LY %
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),
        size: 100,
        cell: ({ row }) => {
          const sales = row.original.transactions_growth_percentage;
          const rank = row.original.transactions_growth_percentage_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
    ],
  },
  {
    accessorKey: "average_ticket_size",
    header: () => (
      <Text
        fw={700}
        size="sm"
        style={{ textAlign: "center", fontSize: "14px", width: "50%" }}
        c="white"
      >
        Avarage Ticket
      </Text>
    ),

    columns: [
      {
        accessorKey: "average_ticket_size",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              AT
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),

        size: 100,
        cell: ({ row }) => {
          const sales = row.original.average_ticket_size;
          const rank = row.original.ticket_size_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_average_ticket_size",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              $v.LY
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),

        size: 100,
        cell: ({ row }) => {
          const sales = row.original.ly_average_ticket_size;
          const rank = row.original.ly_average_ticket_size_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ticket_size_percentage",
        header: () => (
          <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              %v.LY
            </Text>
            <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
              Rank
            </Text>
          </Flex>
        ),
        size: 100,
        cell: ({ row }) => {
          const sales = row.original.ticket_size_percentage;
          const rank = row.original.ticket_size_percentage_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
    ],
  },
];

export const salesBuildingColumns: ColumnDef<SalesBuildingData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      fw={700}
      size="md"
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
    >
      Store
    </Text>,
    size: 150,
  },
  {
    accessorKey: "total_digital_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Digital
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Rank
          </Text>
        </Flex>
      );
    },
    size: 110,
    cell: ({ row }) => {
      const sales = row.original.total_digital_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.total_digital_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
            {sales}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "total_mobile_transactions_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Mobile
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Rank
          </Text>
        </Flex>
      );
    },
    size: 110,
    cell: ({ row }) => {
      const sales = row.original.total_mobile_transactions_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.total_mobile_transactions_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
            {sales}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "loyalty_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Loyality
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Rank
          </Text>
        </Flex>
      );
    },
    size: 110,
    cell: ({ row }) => {
      const sales = row.original.loyalty_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.loyalty_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
            {sales}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "delivery_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Delivery
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} size="md" c="white">
            Rank
          </Text>
        </Flex>
      );
    },
    size: 110,
    cell: ({ row }) => {
      const sales = row.original.delivery_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.delivery_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text
            style={{ fontSize: "14px", width: "50%", textAlign: "center" }}
            c={sales && sales < 0 ? "red.5" : ""}
          >
            {sales}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },
];

export const driveThruColumns: ColumnDef<DriveThruData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
      fw={700}
    >
      Store
    </Text>,
    size: 150,
  },
  {
    accessorKey: "lane_total",

    header: () => {
      return (
        <Text
          style={{ textAlign: "center", fontSize: "14px" }}
          c="white"
          fw={700}
        >
          Weekly{" "}
        </Text>
      );
    },
    columns: [
      {
        accessorKey: "lane_total",
        header: () => {
          return (
            <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                Time
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                Rank
              </Text>
            </Flex>
          );
        },
        size: 110,
        cell: ({ row }) => {
          const sales = row.original.lane_total;
          const rank = row.original.lane_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_lane_total",
        header: () => {
          return (
            <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                v.LY
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                Rank
              </Text>
            </Flex>
          );
        },
        size: 110,
        cell: ({ row }) => {
          const sales = row.original.ly_lane_total;
          const rank = row.original.ly_lane_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "average_daily_count",
        header: () => {
          return (
            <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                ADC
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                Rank
              </Text>
            </Flex>
          );
        },
        size: 110,
        cell: ({ row }) => {
          const sales = row.original.average_daily_count;
          const rank = row.original.average_daily_count_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_adc_total",
        header: () => {
          return (
            <Flex justify={"space-between"} style={{ paddingInline: 0, padding: 0 }}>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                v.LY
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
                Rank
              </Text>
            </Flex>
          );
        },
        size: 110,
        cell: ({ row }) => {
          const sales = row.original.ly_adc_total;
          const rank = row.original.ly_adc_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              style={{ paddingInline: 0, padding: 0 }}
            >
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
                {sales}
              </Text>
              <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
                {rank}
              </Text>
            </Flex>
          );
        },
      },
    ],
  },
];

export const costDataColumns: ColumnDef<CostData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
      fw={700}
    >
      Store
    </Text>,
    size: 180,
  },
  {
    accessorKey: "cml_cost_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }} c="white" fw={700}>
            CML
          </Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }} c="white" fw={700}>
            Food
          </Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }} c="white" fw={700}>
            Paper
          </Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }} c="white" fw={700}>
            Prem
          </Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }} c="white" fw={700}>
            payroll
          </Text>
        </Flex>
      );
    },
    size: 350,
    cell: ({ row }) => {
      const cml = row.original.cml_cost_percentage;
      const food = row.original.dcp_food_cost_percentage;
      const paper = row.original.dcp_paper_cost_percentage;
      const prem = row.original.dcp_premiums_cost_percentage;
      const payroll = row.original.payroll_cost_percentage;

      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }}>{cml}%</Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }}>{food}%</Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }}>{paper}%</Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }}>{prem}%</Text>
          <Text style={{ fontSize: "14px", width: "20%", textAlign: "center" }}>{payroll}%</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "total_cogs_percentage",
    header: () => <Flex justify={"space-between"}>
      <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
        CORS
      </Text>
      <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c="white" fw={700}>
        Rank
      </Text>
    </Flex>,
    cell: ({ row }) => {
      const sales = row.original.total_cogs_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.cogs_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={sales < 0 ? "red.5" : ""}>
            {sales}%
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "target",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
      fw={700}
    >
      +/-Target$
    </Text>,
    size: 100,
    cell: ({ row }) => {
      const target = row.original.target;

      return (
        <Text
          style={{ fontSize: "14px", textAlign: "center" }}
          c={target < 0 ? "red.5" : ""}
          bg={target > 0 ? "red.5" : ""}
          fw={700}
        >
          {target}
        </Text>
      );
    },
  },
  {
    accessorKey: "labor_total_hours",
    header: () => {
      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c="white" fw={700} >
            TTL Hours
          </Text>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c="white" fw={700}>
            OT Hours
          </Text>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c="white" fw={700}>
            GC/LH
          </Text>
        </Flex>
      );
    },
    size: 250,
    cell: ({ row }) => {
      const ttl = row.original.labor_total_hours;
      const ot = row.original.labor_overtime_hours;
      const gc = row.original.gc_over_lh;

      return (
        <Flex justify={"space-between"}>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c={ttl < 0 ? "red.5" : ""}>
            {ttl}
          </Text>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c={ot < 0 ? "red.5" : ""}>
            {ot}
          </Text>
          <Text style={{ fontSize: "14px", textAlign: "center", width: "33.33%" }} c={gc < 0 ? "red.5" : ""}>
            {gc}
          </Text>
        </Flex>
      );
    },
  },
];

export const laborInfoColumns: ColumnDef<LaborInfoData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      Store
    </Text>,
    size: 180,
  },
  {
    accessorKey: "total_hours",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      T Hrs
    </Text>,
    size: 110,
  },
  {
    accessorKey: "labor_overtime_hours",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      OT Hrs
    </Text>,
    size: 110,
  },
  {
    accessorKey: "salary_hours",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      Salary Hrs
    </Text>,
    size: 110,
  },
  {
    accessorKey: "labor_total_hours",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      TTL Hrs
    </Text>,
    size: 110,
  },
  {
    accessorKey: "gc_over_lh",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      GC/LH
    </Text>,
    size: 110,
  },
  {
    accessorKey: "labor_per_hour_rate",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px" }}
      c="white"
      fw={700}
    >
      $/LH
    </Text>,
    size: 110,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
];

export const guestSatisfactionColumns: ColumnDef<GuestSatisfactionData>[] = [
  {
    accessorKey: "store_name",
    header: () => <Text
      style={{ textAlign: "center", fontSize: "14px", color: "white" }}
      c="white"
      fw={700}
    >
      Store
    </Text>,
    size: 180,
  },
  {
    accessorKey: "overall_experience_percent",
    header: () => (
      <Flex justify={"space-between"}>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          OSAT
        </Text>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          Rank
        </Text>
      </Flex>
    ),

    cell: ({ row }) => {
      const osat = row.original.overall_experience_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.overall_experience_rank;

      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={osat < 0 ? "red.5" : ""}>
            {osat}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "friendly_percent",
    header: () => (
      <Flex justify={"space-between"}>
        <Text style={{ fontSize: "14px", width: "70%", textAlign: "center" }} fw={700} c="white">
          Friendlyness
        </Text>
        <Text style={{ fontSize: "14px", width: "30%", textAlign: "center" }} fw={700} c="white">
          Rank
        </Text>
      </Flex>
    ),
    cell: ({ row }) => {
      const friendlyness = row.original.friendly_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.friendly_percent_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text
            style={{ fontSize: "14px", width: "70%", textAlign: "center" }}
            c={friendlyness < 0 ? "red.5" : ""}
          >
            {friendlyness}
          </Text>
          <Text style={{ fontSize: "14px", width: "30%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "order_accuracy_percent",
    header: () => (
      <Flex justify={"space-between"}>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          Accuracy
        </Text>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          Rank
        </Text>
      </Flex>
    ),

    cell: ({ row }) => {
      const accuracy = row.original.order_accuracy_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.order_accuracy_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={accuracy < 0 ? "red.5" : ""}>
            {accuracy}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "speed_of_service_percent",
    header: () => (
      <Flex justify={"space-between"}>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          Speed
        </Text>
        <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} fw={700} c="white">
          Rank
        </Text>
      </Flex>
    ),

    cell: ({ row }) => {
      const speed = row.original.speed_of_service_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.speed_of_service_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"}>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={speed < 0 ? "red.5" : ""}>
            {speed}
          </Text>
          <Text style={{ fontSize: "14px", width: "50%", textAlign: "center" }} c={rank < 0 ? "red.5" : ""}>
            {rank}
          </Text>
        </Flex>
      );
    },
  },
];
