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

export function transformData(data: GetRevenueCenterDataResponse["data"]) {
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
      row2[String.fromCharCode("A".charCodeAt(0) + i + 1)] = parseFloat(
        arr[i].percentage
      );
      row3[String.fromCharCode("A".charCodeAt(0) + i + 1)] =
        arr[i].total_tickets;
      row4[String.fromCharCode("A".charCodeAt(0) + i + 1)] = parseFloat(
        arr[i].average_ticket_size
      );
    }
    row1["F"] = arr.reduce((a, b) => a + b.category_total, 0);
    row2["F"] = arr.reduce((a, b) => a + parseFloat(b.percentage), 0);
    row2["F"] = row2["F"] / 4.0;
    row3["F"] = arr.reduce((a, b) => a + b.total_tickets, 0);
    row4["F"] = arr.reduce((a, b) => a + parseFloat(b.average_ticket_size), 0);
    row4["F"] = row4["F"] / 4.0;

    // console.log(row1);
    // console.log(row2);
    // console.log(row3);
    // console.log(row4);

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

  for (let i = 1; i < result.length; ++i) {
    newResult.push(result[i]);
  }

  return newResult;
}