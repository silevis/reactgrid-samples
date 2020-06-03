import { getFormattedDate } from './BudgetPlannerUtil';
import { Value } from './interfaces';

/**
 * Function for values
 * Mapping from reactgrid to values value change
 */

export const getDefaultValues = (values: Value[], dates: Date[], span: string) => {
  let returnValues: any = {};
  dates && dates.forEach((date: Date) => {
    const cellText = getFormattedDate(date, span);
    returnValues[cellText] = 0;
  });
  return returnValues;
}

