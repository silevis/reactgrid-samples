import { getFormattedDate } from './BudgetPlannerUtil';
export var getDefaultValues = function (values, dates, span) {
    var returnValues = {};
    dates && dates.forEach(function (date) {
        var cellText = getFormattedDate(date, span);
        returnValues[cellText] = 0;
    });
    return returnValues;
};
