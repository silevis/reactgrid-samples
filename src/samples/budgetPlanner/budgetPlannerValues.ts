import moment from 'moment';
import { GroupAttribute } from './budgetPlannerData';
import { getFormattedDate } from './BudgetPlannerUtil';
import { Value } from './interfaces';

export const getDefaultValues = (values: Value[], dates: Date[], span: string) => {
  let returnValues: any = {};
  dates && dates.forEach((date: Date) => {
    const cellText = getFormattedDate(date, span);
    returnValues[cellText] = 0;
  });
  return returnValues;
}

export const calculateValues = (values: Value[], dates: Date[], groupAttribute: GroupAttribute, sumByValue: any) => {
  let returnValues: any = {};
  if (groupAttribute.children === null) {
    dates.forEach((date: Date) => {
      if (!returnValues[moment(date).format('MM-YYYY')]) returnValues[moment(date).format('MM-YYYY')] = 0;
      if (sumByValue && sumByValue.selectedItem) {
        values.forEach((value: Value) => {
          // @ts-ignore
          if (moment(date).format('MM-YYYY') === moment(value.date).format('MM-YYYY') && value[sumByValue.selectedItem.key]) {
            returnValues[moment(date).format('MM-YYYY')] += value[sumByValue.selectedItem.key];
          }
        })
      }
    });
  } else if (groupAttribute.children !== null) {
    groupAttribute.children.forEach((groupAttribute: GroupAttribute) => {
      // @ts-ignore
      const childrenValues = calculateValues(values.filter((value: Value) => groupAttribute.name === value[groupAttribute.fieldName]), dates, groupAttribute, sumByValue);
      for (const key in childrenValues) {
        dates.forEach((date: Date) => {
          if (!returnValues[moment(date).format('MM-YYYY')]) returnValues[moment(date).format('MM-YYYY')] = 0;
          if (moment(date).format('MM-YYYY') === key) returnValues[moment(date).format('MM-YYYY')] += childrenValues[key];
        });
      }
    })
  }
  return returnValues;
}
