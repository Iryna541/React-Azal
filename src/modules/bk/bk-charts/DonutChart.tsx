
import Chart from "react-apexcharts";

import {
  Box,

} from "@mantine/core";

import { DonutChartData } from "./api/useDonutChart";

interface DonutChartProps {
  data: DonutChartData[];
}

const colorMap: { [key: string]: string } = {
  "4.0 - 5.0": "#008000", 
  "3.8 - 3.9": "#808000", 
  "3.0 - 3.7": "#FFA500", 
  "2.0 - 2.9": "#FFC040", 
  "0.0 - 2.0": "#FF0000", 
};

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {

  const firstItem = data[0];
  
  const series = firstItem.series;
  const labels = firstItem.chartOptions.labels;
  const stores = firstItem.stores;

  const colors = labels.map((label) => colorMap[label] || "grey");

  const options: ApexCharts.ApexOptions = {
    labels,
    colors,
    chart: {
      type: "donut",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#373d3f",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a:number, b:number) => a + b, 0).toString();
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          return `Stores: ${stores[seriesIndex].join(', ')}`;
        }
      }
    },
   
  };

  return (
    <Box>
      <Chart type="donut" series={series} options={options} height={330} />
    </Box>
  );
}