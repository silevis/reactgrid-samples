import { valuesFilterOptionsState } from './DataFilterOptions';
import moment from 'moment'

export const getDates = (valuesFilterOptions: valuesFilterOptionsState | null, span: string): Date[] => {
  const dates: Date[] = [];
  const firstDate: Date = getFirstDate(valuesFilterOptions);
  const lastDate: Date = getLastDate(valuesFilterOptions);

  do {
    dates.push(new Date(firstDate.getTime()));
    switch (span) {
      case 'year':
        firstDate.setFullYear(firstDate.getFullYear() + 1);
        break;
      case 'month':
        firstDate.setMonth(firstDate.getMonth() + 1);
        break;
      case 'day':
        firstDate.setDate(firstDate.getDate() + 1);
        break;
      default:
        firstDate.setMonth(firstDate.getMonth() + 1);
    }
  } while (firstDate <= lastDate);
  return dates;
}

const getFirstDate = (valuesFilterOptions: valuesFilterOptionsState | null): Date => {
  if (valuesFilterOptions !== null && valuesFilterOptions.date.$gte instanceof Date) {
    return moment(valuesFilterOptions.date.$gte).toDate();
  }
  return moment().startOf('year').toDate();
}

const getLastDate = (valuesFilterOptions: valuesFilterOptionsState | null): Date => {
  if (valuesFilterOptions !== null && valuesFilterOptions.date.$lte instanceof Date) {
    return moment(valuesFilterOptions.date.$lte).toDate();
  }
  return moment().endOf('year').toDate();
}