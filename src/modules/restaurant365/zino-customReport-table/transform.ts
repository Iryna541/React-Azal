import { GetRevenueCenterDataResponse } from "./api/useRevenueCenterData";

function groupBy<
  K extends string | number | symbol,
  T extends { [k in K]: any },
>(data: T[], key: K): Partial<Record<T[K], T[]>> {
  return data.reduce(
    (acc, item) => {
      const group = item[key];
      const arr: T[] = (acc[group] = acc[group] ?? []);
      arr.push(item);
      return acc;
    },
    {} as Partial<Record<T[K], T[]>>
  );
}

export function transformData(
  data: GetRevenueCenterDataResponse["data"],
  locations: GetRevenueCenterDataResponse["locations"]
) {
  if (!data) {
    return [];
  }
  const groupedData = groupBy(data, "category_id");
  let firstRow = true;
  const dataArrays = Object.keys(groupedData).map((key) => {
    const arr = groupedData[
      parseInt(key)
    ] as GetRevenueCenterDataResponse["data"];

    arr.sort((a, b) => a.week - b.week);

    const categoryName = arr[0].category_name;

    const returnArr = [];
    if (firstRow) {
      returnArr.push({
        A: "Start Date",
        B: arr[0].week_start_date,
        C: arr[1].week_start_date,
        D: arr[2].week_start_date,
        E: arr[3].week_start_date,
        F: "",
      });
      returnArr.push({
        A: -1,
        B: "",
        C: "",
        D: "",
        E: "",
        F: "",
      });
      firstRow = false;
    }

    const row1: Record<string, number | string> = {},
      row2: Record<string, number | string> = {},
      row3: Record<string, number | string> = {},
      row4: Record<string, number | string> = {};
    row1["A"] = categoryName;
    row2["A"] = "%";
    row3["A"] = "TICKETS";
    row4["A"] = "AVG TICKET $";
    for (let i = 0; i < 4; ++i) {
      row1[String.fromCharCode("A".charCodeAt(0) + i + 1)] =
        arr[i].category_total;
      row2[String.fromCharCode("A".charCodeAt(0) + i + 1)] =
        parseFloat(arr[i].percentage) + "%";
      row3[String.fromCharCode("A".charCodeAt(0) + i + 1)] = arr[i].tickets;
      row4[String.fromCharCode("A".charCodeAt(0) + i + 1)] =
        "$" + parseFloat(arr[i].average_ticket_size);
    }
    row1["F"] = arr.reduce((a, b) => a + b.category_total, 0);
    row2["F"] = arr.reduce((a, b) => a + parseFloat(b.percentage), 0);
    row2["F"] = row2["F"] / 4.0;
    row3["F"] = arr.reduce((a, b) => a + b.tickets, 0);
    row4["F"] = arr.reduce((a, b) => a + parseFloat(b.average_ticket_size), 0);
    row4["F"] = row4["F"] / 4.0;

    row1["G"] = arr[0].prev_period_total_diff
      ? `${arr[0].prev_period_total_diff}`
      : "";
    row3["G"] = arr[0].prev_period_ticket_diff || "";
    row4["G"] = arr[0].prev_period_avg_ticket_diff
      ? `${arr[0].prev_period_avg_ticket_diff}`
      : "";

    // setting store_id, category_id, weekStartDate
    row1["store_id"] = arr[0].store_id;
    row1["store_name"] =
      locations?.find((item) => item.store_id === arr[0].store_id)?.name || "";

    row1["category_id"] = arr[0].category_id;
    row2["category_id"] = arr[0].category_id;
    row3["category_id"] = arr[0].category_id;
    row4["category_id"] = arr[0].category_id;

    for (let i = 0; i < 4; ++i) {
      row1[`week_${i + 1}_start_date`] = arr[i].week_start_date;
      row2[`week_${i + 1}_start_date`] = arr[i].week_start_date;
      row3[`week_${i + 1}_start_date`] = arr[i].week_start_date;
      row4[`week_${i + 1}_start_date`] = arr[i].week_start_date;
    }

    returnArr.push(row1);
    returnArr.push(row2);
    returnArr.push(row3);
    returnArr.push(row4);
    returnArr.push({
      A: -1,
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
    });

    return returnArr;
  });

  const result = dataArrays.flat().slice(0, -1);

  let totalNetSales1 = 0;
  let totalNetSales2 = 0;
  let totalNetSales3 = 0;
  let totalNetSales4 = 0;
  let totalNetSales5 = 0;

  for (let i = 0; i < result.length; ++i) {
    if ((i - 2) % 5 === 0) {
      totalNetSales1 += result[i].B as number;
      totalNetSales2 += result[i].C as number;
      totalNetSales3 += result[i].D as number;
      totalNetSales4 += result[i].E as number;
    }
  }

  totalNetSales5 =
    totalNetSales1 + totalNetSales2 + totalNetSales3 + totalNetSales4;

  const newResult = [];
  newResult.push(result[0]);

  newResult.push({
    A: "TOTAL NET SALES",
    B: totalNetSales1,
    C: totalNetSales2,
    D: totalNetSales3,
    E: totalNetSales4,
    F: totalNetSales5,
  });

  // Define the new row data based on total_tickets

  const totalTicketsRow = {
    A: "TOTAL TICKETS",
    B:
      data.find(
        (d) => d.period === "PERIOD 6" && d.week_start_date === "2024-05-13"
      )?.total_week_net_tickets ??
      data?.[0]?.total_week_net_tickets ??
      0,
    C:
      data.find(
        (d) => d.period === "PERIOD 6" && d.week_start_date === "2024-05-20"
      )?.total_week_net_tickets ??
      data?.[1]?.total_week_net_tickets ??
      0,
    D:
      data.find(
        (d) => d.period === "PERIOD 6" && d.week_start_date === "2024-05-27"
      )?.total_week_net_tickets ??
      data?.[2]?.total_week_net_tickets ??
      0,
    E:
      data.find(
        (d) => d.period === "PERIOD 6" && d.week_start_date === "2024-06-03"
      )?.total_week_net_tickets ??
      data?.[3]?.total_week_net_tickets ??
      0,
    F: data[0].total_net_tickets,
  };

  // const totalTicketsRow = {
  //   A: "TOTAL TICKETS",
  //   B: totalNetTickets1,
  //   C: totalNetTickets2,
  //   D: totalNetTickets3,
  //   E: totalNetTickets4,
  //   F: totalNetTickets5,
  // };

  // Find the position of the "TOTAL NET SALES" row and insert the new row after it

  const totalNetSalesIndex = newResult.findIndex(
    (row) => row.A === "TOTAL NET SALES"
  );

  if (totalNetSalesIndex !== -1) {
    newResult.splice(totalNetSalesIndex + 1, 0, totalTicketsRow);
  }

  for (let i = 1; i < result.length; ++i) {
    newResult.push(result[i]);
  }

  return newResult;
}
