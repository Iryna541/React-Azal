import { GetLabourEfficiencyReportDataResponse } from "./api/useLabourEfficiencyReportData";

export function transformLabourEfficiencyReportData(data: GetLabourEfficiencyReportDataResponse["data"]) {
  if(!data){
    return [];
  }
  const breakFastData = data.filter(item => item.meal === 'breakfast').map(item => ({...item, isHeader: false}));
  const lunchData = data.filter(item => item.meal === 'breakfast').map(item => ({...item, isHeader:false}));
  const dinnerData = data.filter(item => item.meal === 'breakfast').map(item => ({...item, isHeader:false}));

  let newList = [];
  newList.push({
    isHeader: true,
    meal: 'BreakFast',
  });
  newList = [...newList, ...breakFastData];
  newList.push({
    isHeader: true,
    meal: 'Lunch',
  });
  newList = [...newList, ...lunchData];
  newList.push({
    isHeader: true,
    meal: 'Dinner',
  });
  newList = [...newList, ...dinnerData];

  return newList;
}
