import { GetLabourEfficiencyReportDataResponse } from "./api/useLabourEfficiencyReportData";

export function transformLabourEfficiencyReportData(
  data: GetLabourEfficiencyReportDataResponse["data"],
  storeId: number,
  aggregate_values: GetLabourEfficiencyReportDataResponse["aggregate_values"],
  date: string
) {
  if (!data || data.length === 0) {
    return [];
  }
  let breakFastData = data
    .filter((item) => item.meal === "breakfast")
    .map((item) => ({ ...item, isHeader: false }));
  breakFastData = breakFastData.map((item) => ({
    ...item,
    store_id: storeId,
    estGuestsPerLH:
      item.expectedGuests && item.total
        ? item.expectedGuests / parseFloat(item?.total as string)
        : 0,
    actualGuestsPerLH:
      item.actualGuests && item.total
        ? item.actualGuests / parseFloat(item?.total as string)
        : 0,
    actualSalesPerLH:
      item.sales && item.total
        ? item.sales / parseFloat(item?.total as string)
        : 0,
  }));

  let lunchData = data
    .filter((item) => item.meal === "lunch")
    .map((item) => ({ ...item, isHeader: false }));
  lunchData = lunchData.map((item) => ({
    ...item,
    store_id: storeId,
    estGuestsPerLH: item.expectedGuests
      ? item.expectedGuests / parseFloat(item?.total as string)
      : 0,
    actualGuestsPerLH: item.actualGuests
      ? item.actualGuests / parseFloat(item?.total as string)
      : 0,
    actualSalesPerLH: item.sales
      ? item.sales / parseFloat(item?.total as string)
      : 0,
  }));

  let dinnerData = data
    .filter((item) => item.meal === "dinner")
    .map((item) => ({ ...item, isHeader: false }));
  dinnerData = lunchData.map((item) => ({
    ...item,
    store_id: storeId,
    estGuestsPerLH: item.expectedGuests
      ? item.expectedGuests / parseFloat(item?.total as string)
      : 0,
    actualGuestsPerLH: item.actualGuests
      ? item.actualGuests / parseFloat(item?.total as string)
      : 0,
    actualSalesPerLH: item.sales
      ? item.sales / parseFloat(item?.total as string)
      : 0,
  }));

  let newList: any[] = [];
  newList.push({
    isHeader: true,
    meal: "BreakFast",
  });
  newList = [...newList, ...breakFastData];
  newList.push({
    isHeader: false,
    meal: "breakfast-total",
    hour: "Breakfast Total",
    actualGuests: breakFastData.reduce(
      (acc, item) => acc + (item?.actualGuests || 0),
      0
    ),
    expectedGuests: breakFastData.reduce(
      (acc, item) => acc + (item?.expectedGuests || 0),
      0
    ),
    manager: breakFastData.reduce((acc, item) => acc + (item?.manager || 0), 0),
    shiftLeader: breakFastData.reduce(
      (acc, item) => acc + (item?.shiftLeader || 0),
      0
    ),
    nuggetPrep: breakFastData.reduce(
      (acc, item) => acc + (item?.nuggetPrep || 0),
      0
    ),
    portion: breakFastData.reduce((acc, item) => acc + (item?.portion || 0), 0),
    lineCook: breakFastData.reduce(
      (acc, item) => acc + (item?.lineCook || 0),
      0
    ),
    lateNight: breakFastData.reduce(
      (acc, item) => acc + (item?.lateNight || 0),
      0
    ),
    dish: breakFastData.reduce((acc, item) => acc + (item?.dish || 0), 0),
    cashier: breakFastData.reduce((acc, item) => acc + (item?.cashier || 0), 0),
    cashier2: breakFastData.reduce(
      (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
      0
    ),
    sales: parseFloat(
      breakFastData
        .reduce((acc, item) => acc + (item?.sales || 0), 0)
        .toFixed(1)
    ),
    total: breakFastData.reduce(
      (acc, item) => acc + (parseFloat(item?.total as string) || 0),
      0
    ),
    estGuestsPerLH:
      breakFastData.reduce(
        (acc, item) => acc + (item?.expectedGuests || 0),
        0
      ) /
      breakFastData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualGuestsPerLH:
      breakFastData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0) /
      breakFastData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualSalesPerLH:
      parseFloat(
        breakFastData
          .reduce((acc, item) => acc + (item?.sales || 0), 0)
          .toFixed(1)
      ) /
      breakFastData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
  });
  newList.push({
    isHeader: true,
    meal: "Lunch",
  });
  newList = [...newList, ...lunchData];
  newList.push({
    isHeader: false,
    meal: "lunch-total",
    hour: "Lunch Total",
    actualGuests: lunchData.reduce(
      (acc, item) => acc + (item?.actualGuests || 0),
      0
    ),
    expectedGuests: lunchData.reduce(
      (acc, item) => acc + (item?.expectedGuests || 0),
      0
    ),
    manager: lunchData.reduce((acc, item) => acc + (item?.manager || 0), 0),
    shiftLeader: lunchData.reduce(
      (acc, item) => acc + (item?.shiftLeader || 0),
      0
    ),
    nuggetPrep: lunchData.reduce(
      (acc, item) => acc + (item?.nuggetPrep || 0),
      0
    ),
    portion: lunchData.reduce((acc, item) => acc + (item?.portion || 0), 0),
    lineCook: lunchData.reduce((acc, item) => acc + (item?.lineCook || 0), 0),
    lateNight: lunchData.reduce((acc, item) => acc + (item?.lateNight || 0), 0),
    dish: lunchData.reduce((acc, item) => acc + (item?.dish || 0), 0),
    cashier: lunchData.reduce((acc, item) => acc + (item?.cashier || 0), 0),
    cashier2: lunchData.reduce(
      (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
      0
    ),
    sales: parseFloat(
      lunchData.reduce((acc, item) => acc + (item?.sales || 0), 0).toFixed(1)
    ),
    total: lunchData.reduce(
      (acc, item) => acc + (parseFloat(item?.total as string) || 0),
      0
    ),
    estGuestsPerLH:
      lunchData.reduce((acc, item) => acc + (item?.expectedGuests || 0), 0) /
      lunchData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualGuestsPerLH:
      lunchData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0) /
      lunchData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualSalesPerLH:
      parseFloat(
        lunchData.reduce((acc, item) => acc + (item?.sales || 0), 0).toFixed(1)
      ) /
      lunchData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
  });
  newList.push({
    isHeader: true,
    meal: "Dinner",
  });
  newList = [...newList, ...dinnerData];
  newList.push({
    isHeader: false,
    meal: "dinner-total",
    hour: "Dinner Total",
    actualGuests: dinnerData.reduce(
      (acc, item) => acc + (item?.actualGuests || 0),
      0
    ),
    expectedGuests: dinnerData.reduce(
      (acc, item) => acc + (item?.expectedGuests || 0),
      0
    ),
    manager: dinnerData.reduce((acc, item) => acc + (item?.manager || 0), 0),
    shiftLeader: dinnerData.reduce(
      (acc, item) => acc + (item?.shiftLeader || 0),
      0
    ),
    nuggetPrep: dinnerData.reduce(
      (acc, item) => acc + (item?.nuggetPrep || 0),
      0
    ),
    portion: dinnerData.reduce((acc, item) => acc + (item?.portion || 0), 0),
    lineCook: dinnerData.reduce((acc, item) => acc + (item?.lineCook || 0), 0),
    lateNight: dinnerData.reduce(
      (acc, item) => acc + (item?.lateNight || 0),
      0
    ),
    dish: dinnerData.reduce((acc, item) => acc + (item?.dish || 0), 0),
    cashier: dinnerData.reduce((acc, item) => acc + (item?.cashier || 0), 0),
    cashier2: dinnerData.reduce(
      (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
      0
    ),
    sales: parseFloat(
      dinnerData.reduce((acc, item) => acc + (item?.sales || 0), 0).toFixed(1)
    ),
    total: dinnerData.reduce(
      (acc, item) => acc + (parseFloat(item?.total as string) || 0),
      0
    ),
    estGuestsPerLH:
      dinnerData.reduce((acc, item) => acc + (item?.expectedGuests || 0), 0) /
      dinnerData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualGuestsPerLH:
      dinnerData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0) /
      dinnerData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
    actualSalesPerLH:
      parseFloat(
        dinnerData.reduce((acc, item) => acc + (item?.sales || 0), 0).toFixed(1)
      ) /
      dinnerData.reduce(
        (acc, item) => acc + (parseInt(item?.total as string) || 0),
        0
      ),
  });

  const grandTotalExpectedGuests =
    breakFastData.reduce((acc, item) => acc + (item?.expectedGuests || 0), 0) +
    lunchData.reduce((acc, item) => acc + (item?.expectedGuests || 0), 0) +
    dinnerData.reduce((acc, item) => acc + (item?.expectedGuests || 0), 0);
  const grandTotalActualGuests =
    breakFastData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0) +
    lunchData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0) +
    dinnerData.reduce((acc, item) => acc + (item?.actualGuests || 0), 0);
  const grandTotalsales =
    breakFastData.reduce((acc, item) => acc + (item?.sales || 0), 0) +
    lunchData.reduce((acc, item) => acc + (item?.sales || 0), 0) +
    dinnerData.reduce((acc, item) => acc + (item?.sales || 0), 0);
  const grandTtotalTotal =
    breakFastData.reduce(
      (acc, item) => acc + (parseFloat(item?.total as string) || 0),
      0
    ) +
    lunchData.reduce(
      (acc, item) => acc + (parseInt(item?.total as string) || 0),
      0
    ) +
    dinnerData.reduce(
      (acc, item) => acc + (parseFloat(item?.total as string) || 0),
      0
    );

  newList.push({
    isHeader: false,
    meal: "grand-total",
    hour: "Total",
    actualGuests: grandTotalActualGuests,
    expectedGuests: grandTotalExpectedGuests,
    manager:
      breakFastData.reduce((acc, item) => acc + (item?.manager || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.manager || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.manager || 0), 0),
    shiftLeader:
      breakFastData.reduce((acc, item) => acc + (item?.shiftLeader || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.shiftLeader || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.shiftLeader || 0), 0),
    nuggetPrep:
      breakFastData.reduce((acc, item) => acc + (item?.nuggetPrep || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.nuggetPrep || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.nuggetPrep || 0), 0),
    portion:
      breakFastData.reduce((acc, item) => acc + (item?.portion || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.portion || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.portion || 0), 0),
    lineCook:
      breakFastData.reduce((acc, item) => acc + (item?.lineCook || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.lineCook || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.lineCook || 0), 0),
    lateNight:
      breakFastData.reduce((acc, item) => acc + (item?.lateNight || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.lateNight || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.lateNight || 0), 0),
    dish:
      breakFastData.reduce((acc, item) => acc + (item?.dish || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.dish || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.dish || 0), 0),
    cashier:
      breakFastData.reduce((acc, item) => acc + (item?.cashier || 0), 0) +
      lunchData.reduce((acc, item) => acc + (item?.cashier || 0), 0) +
      dinnerData.reduce((acc, item) => acc + (item?.cashier || 0), 0),
    cashier2:
      breakFastData.reduce(
        (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
        0
      ) +
      lunchData.reduce(
        (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
        0
      ) +
      dinnerData.reduce(
        (acc, item) => acc + (parseInt(item?.cashier2 as string) || 0),
        0
      ),
    sales: parseFloat(grandTotalsales.toFixed(1)),
    total: grandTtotalTotal,
    estGuestsPerLH: grandTotalExpectedGuests / grandTtotalTotal,
    actualGuestsPerLH: grandTotalActualGuests / grandTtotalTotal,
    actualSalesPerLH: grandTotalsales / grandTtotalTotal,
  });

  const salariedHours = newList.reduce(
    (acc, item) => acc + ((item as any)?.manager || 0),
    0
  );
  const discounts = aggregate_values?.[0]?.discounts;
  const grossSales = grandTotalsales + discounts;
  const avghourlyWage = aggregate_values?.[0]?.average_hourly_wage;
  const netPayroll = (grandTtotalTotal - salariedHours) * avghourlyWage;
  const grossPayroll = netPayroll * 1.12;
  const grossDirectLabor = grossPayroll / grandTtotalTotal;
  const gm = aggregate_values?.[0]?.gm;
  const grossLabor = grossPayroll + gm;
  const grossLaborPercentage = grossLabor / grandTtotalTotal;

  newList.push({
    isHeader: true,
    meal: "Summery",
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Salared Hours",
    empty: salariedHours,
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "bottom-discounts",
    total: "Discounts",
    id: aggregate_values?.[0].id,
    empty: discounts,
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
    store_id: storeId,
    date,
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Gross Sales",
    id: aggregate_values?.[0].id,
    empty: parseFloat(grossSales.toFixed(1)),
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "bottom-averageHourlyWage",
    total: "Avg Hourly Wage",
    id: aggregate_values?.[0].id,
    empty: avghourlyWage,
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
    store_id: storeId,
    date,
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Net Payroll",
    empty: netPayroll,
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Gross Payroll",
    empty: parseFloat(grossPayroll.toFixed(2)),
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Gross Direct Labor",
    empty: parseFloat(grossDirectLabor.toFixed(1)),
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "bottom-gm",
    total: "GM",
    id: aggregate_values?.[0].id,
    empty: gm,
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
    store_id: storeId,
    date,
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Gross Labor $",
    empty: parseFloat(grossLabor.toFixed(1)),
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });
  newList.push({
    isHeader: false,
    meal: "",
    total: "Gross Labor %",
    empty: parseFloat(grossLaborPercentage.toFixed(2)),
    estGuestsPerLH: "",
    actualGuestsPerLH: "",
    actualSalesPerLH: "",
  });

  return newList;
}
