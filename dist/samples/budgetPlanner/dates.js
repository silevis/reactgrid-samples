import moment from 'moment';
export var getDates = function (valuesFilterOptions, span) {
    var dates = [];
    var firstDate = getFirstDate(valuesFilterOptions);
    var lastDate = getLastDate(valuesFilterOptions);
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
};
var getFirstDate = function (valuesFilterOptions) {
    if (valuesFilterOptions !== null && valuesFilterOptions.date.$gte instanceof Date) {
        return moment(valuesFilterOptions.date.$gte).toDate();
    }
    return moment().startOf('year').toDate();
};
var getLastDate = function (valuesFilterOptions) {
    if (valuesFilterOptions !== null && valuesFilterOptions.date.$lte instanceof Date) {
        return moment(valuesFilterOptions.date.$lte).toDate();
    }
    return moment().endOf('year').toDate();
};
