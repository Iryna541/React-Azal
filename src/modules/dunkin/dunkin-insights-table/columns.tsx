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
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "net_sales",
    header: () => (
      <Text fw={600} size="md" style={{ textAlign: "center" }}>
        Sales
      </Text>
    ),
    columns: [
      {
        accessorKey: "net_sales",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            Salse/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.net_sales;
          const rank = row.original.net_sales_rank;

          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "growth",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            v.LY $/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.growth; //jaleel:need to confirm from jaleel what should be the value
          const rank = row.original.sales_ly_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
    ],
  },
  {
    accessorKey: "transactions",
    header: () => (
      <Text fw={600} size="md" style={{ textAlign: "center" }}>
        Transactions
      </Text>
    ),
    columns: [
      {
        accessorKey: "transactions",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            TC/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.transactions;
          const rank = row.original.transaction_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text>{sales}</Text>
              <Text>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_transactions",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            v.LY /Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.ly_transactions;
          const rank = row.original.ly_transaction_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "transactions_growth_percentage",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            v.LY % /Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.transactions_growth_percentage;
          const rank = row.original.transactions_growth_percentage_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
    ],
  },
  {
    accessorKey: "average_ticket_size",
    header: () => (
      <Text fw={600} size="sm" style={{ textAlign: "center" }}>
        Avarage Ticket
      </Text>
    ),

    columns: [
      {
        accessorKey: "average_ticket_size",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            AT/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.average_ticket_size;
          const rank = row.original.ticket_size_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_average_ticket_size",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            $v.LY/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.ly_average_ticket_size;
          const rank = row.original.ly_average_ticket_size_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ticket_size_percentage",
        header: () => (
          <Text fw={600} size="sm" style={{ textAlign: "center" }}>
            %v.LY/Rank
          </Text>
        ),
        cell: ({ row }) => {
          const sales = row.original.ticket_size_percentage;
          const rank = row.original.ticket_size_percentage_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
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
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "total_digital_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            Digital
          </Text>
          <Text fw={600} size="md">
            Rank
          </Text>
        </Flex>
      );
    },

    cell: ({ row }) => {
      const sales = row.original.total_digital_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.total_digital_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "total_mobile_transactions_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            Mobile
          </Text>
          <Text fw={600} size="md">
            Rank
          </Text>
        </Flex>
      );
    },

    cell: ({ row }) => {
      const sales = row.original.total_mobile_transactions_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.total_mobile_transactions_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "loyalty_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            Loyality
          </Text>
          <Text fw={600} size="md">
            Rank
          </Text>
        </Flex>
      );
    },

    cell: ({ row }) => {
      const sales = row.original.loyalty_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.loyalty_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },
  {
    accessorKey: "delivery_sales_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            Delivery
          </Text>
          <Text fw={600} size="md">
            Rank
          </Text>
        </Flex>
      );
    },

    cell: ({ row }) => {
      const sales = row.original.delivery_sales_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.delivery_sales_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={sales && sales < 0 ? "red.5" : ""}>{sales}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },
];

export const driveThruColumns: ColumnDef<DriveThruData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "lane_total",

    header: () => {
      return (
        <Text fw={600} size="md" style={{ textAlign: "center" }}>
          Weekly{" "}
        </Text>
      );
    },
    columns: [
      {
        accessorKey: "lane_total",
        header: () => {
          return (
            <Flex justify={"space-between"} gap={2} px={"lg"}>
              <Text fw={600} size="md">
                Time
              </Text>
              <Text fw={600} size="md">
                Rank
              </Text>
            </Flex>
          );
        },
        cell: ({ row }) => {
          const sales = row.original.lane_total;
          const rank = row.original.lane_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_lane_total",
        header: () => {
          return (
            <Flex justify={"space-between"} gap={2} px={"lg"}>
              <Text fw={600} size="md">
                v.LY
              </Text>
              <Text fw={600} size="md">
                Rank
              </Text>
            </Flex>
          );
        },
        cell: ({ row }) => {
          const sales = row.original.ly_lane_total;
          const rank = row.original.ly_lane_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "average_daily_count",
        header: () => {
          return (
            <Flex justify={"space-between"} gap={2} px={"lg"}>
              <Text fw={600} size="md">
                ADC
              </Text>
              <Text fw={600} size="md">
                Rank
              </Text>
            </Flex>
          );
        },
        cell: ({ row }) => {
          const sales = row.original.average_daily_count;
          const rank = row.original.average_daily_count_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
            </Flex>
          );
        },
      },
      {
        accessorKey: "ly_adc_total",
        header: () => {
          return (
            <Flex justify={"space-between"} gap={2} px={"lg"}>
              <Text fw={600} size="md">
                v.LY
              </Text>
              <Text fw={600} size="md">
                Rank
              </Text>
            </Flex>
          );
        },
        cell: ({ row }) => {
          const sales = row.original.ly_adc_total;
          const rank = row.original.ly_adc_total_rank;
          return (
            <Flex
              bg={cellColor(rank)}
              justify={"space-between"}
              gap={2}
              px={"lg"}
            >
              <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
              <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
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
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "cml_cost_percentage",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            CML
          </Text>
          <Text fw={600} size="md">
            Food
          </Text>
          <Text fw={600} size="md">
            Paper
          </Text>
          <Text fw={600} size="md">
            Prem
          </Text>
          <Text fw={600} size="md">
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
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text>{cml}</Text>
          <Text>{food}</Text>
          <Text>{paper}</Text>
          <Text>{prem}</Text>
          <Text>{payroll}</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "total_cogs_percentage",
    header: "COGS/Rank",
    cell: ({ row }) => {
      const sales = row.original.total_cogs_percentage; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.cogs_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={sales < 0 ? "red.5" : ""}>{sales}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "target",
    header: "+/-Target$",
    size: 100,
    cell: ({ row }) => {
      const target = row.original.target;

      return (
        <Text c={target < 0 ? "red.5" : ""} bg={target > 0 ? "red.5" : ""}>
          {target}
        </Text>
      );
    },
  },
  {
    accessorKey: "labor_total_hours",
    header: () => {
      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text fw={600} size="md">
            TTL Hours
          </Text>
          <Text fw={600} size="md">
            OT Hours
          </Text>
          <Text fw={600} size="md">
            GC/LH
          </Text>
        </Flex>
      );
    },
    size: 300,
    cell: ({ row }) => {
      const ttl = row.original.labor_total_hours;
      const ot = row.original.labor_overtime_hours;
      const gc = row.original.gc_over_lh;

      return (
        <Flex justify={"space-between"} gap={2} px={"lg"}>
          <Text c={ttl < 0 ? "red.5" : ""}>{ttl}</Text>
          <Text c={ot < 0 ? "red.5" : ""}>{ot}</Text>
          <Text c={gc < 0 ? "red.5" : ""}>{gc}</Text>
        </Flex>
      );
    },
  },
];

export const laborInfoColumns: ColumnDef<LaborInfoData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "total_hours",
    header: "T Hrs",
  },
  {
    accessorKey: "labor_overtime_hours",
    header: " OT Hrs",
  },
  {
    accessorKey: "salary_hours",
    header: "Salary Hrs",
  },
  {
    accessorKey: "labor_total_hours",
    header: "TTL Hrs",
  },
  {
    accessorKey: "gc_over_lh",
    header: "GC/LH",
  },
  {
    accessorKey: "labor_per_hour_rate",
    header: "$/LH",
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return `$${value}`;
    },
  },
];

export const guestSatisfactionColumns: ColumnDef<GuestSatisfactionData>[] = [
  {
    accessorKey: "store_name",
    header: "Store",
    size: 200,
  },
  {
    accessorKey: "overall_experience_percent",
    header: "OSAT/Rank",
    cell: ({ row }) => {
      const osat = row.original.overall_experience_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.overall_experience_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={osat < 0 ? "red.5" : ""}>{osat}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "friendly_percent",
    header: "Friendlyness/Rank",

    cell: ({ row }) => {
      const friendlyness = row.original.friendly_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.friendly_percent_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={friendlyness < 0 ? "red.5" : ""}>{friendlyness}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "order_accuracy_percent",
    header: "Accuracy/Rank",

    cell: ({ row }) => {
      const accuracy = row.original.order_accuracy_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.order_accuracy_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={accuracy < 0 ? "red.5" : ""}>{accuracy}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },

  {
    accessorKey: "speed_of_service_percent",
    header: "Speed/Rank",

    cell: ({ row }) => {
      const speed = row.original.speed_of_service_percent; //jaleel:need to confirm from jaleel what should be the value
      const rank = row.original.speed_of_service_rank;
      return (
        <Flex bg={cellColor(rank)} justify={"space-between"} gap={2} px={"lg"}>
          <Text c={speed < 0 ? "red.5" : ""}>{speed}</Text>
          <Text c={rank < 0 ? "red.5" : ""}>{rank}</Text>
        </Flex>
      );
    },
  },
];
