import Chart from "react-apexcharts";

import { ColumnChartData } from "./api/useColumnChart";
import { ApexOptions } from "apexcharts";

interface ColumnChartProps {
  data: ColumnChartData[];
}

export const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const categories = data.map((item) => item.name);
  const series = [
    {
      name: "Star Rating",
      data: data.map((item) => item.starRating),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        // borderRadius: 40,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "Star Rating (0 - 5)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val, { seriesIndex }) {
          const storesList = data[seriesIndex].stores.join(", ");
          return `${val} stars - Stores: \n ${storesList}`;
        },
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={350} />;
};
