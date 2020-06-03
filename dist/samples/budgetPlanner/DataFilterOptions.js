var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
var controlClass = mergeStyleSets({ control: { margin: '0px 20px 0px 0px', width: '300px' } });
var buttonClass = mergeStyleSets({ control: { margin: '27px 20px 0px 0px', } });
export var DataFilterOptions = function (props) {
    var DayPickerStrings = {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        goToToday: 'Go to today',
        prevMonthAriaLabel: 'Go to previous month',
        nextMonthAriaLabel: 'Go to next month',
        prevYearAriaLabel: 'Go to previous year',
        nextYearAriaLabel: 'Go to next year',
        closeButtonAriaLabel: 'Close date picker',
        isRequiredErrorMessage: 'Start date is required.',
        invalidInputErrorMessage: 'Invalid date format.'
    };
    var desc = 'This field is required. One of the support input formats is year dash month dash day.';
    var _a = useState({ date: { $gte: null, $lte: null } }), valuesFilterOptions = _a[0], setValuesFilterOptions = _a[1];
    var _onSelectDateFrom = function (date) {
        setValuesFilterOptions(__assign(__assign({}, valuesFilterOptions), { date: { $gte: date, $lte: valuesFilterOptions.date.$lte } }));
        props.onGetValuesFilterOptions(__assign(__assign({}, valuesFilterOptions), { date: { $gte: date, $lte: valuesFilterOptions.date.$lte } }));
    };
    var _onSelectDateTo = function (date) {
        setValuesFilterOptions(__assign(__assign({}, valuesFilterOptions), { date: { $gte: valuesFilterOptions.date.$gte, $lte: date } }));
        props.onGetValuesFilterOptions(__assign(__assign({}, valuesFilterOptions), { date: { $gte: valuesFilterOptions.date.$gte, $lte: date } }));
    };
    var _clearFilters = function () {
        setValuesFilterOptions({ date: { $gte: null, $lte: null } });
        props.onGetValuesFilterOptions({ date: { $gte: null, $lte: null } });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(DatePicker, { className: controlClass.control, label: "From date", isRequired: false, allowTextInput: true, ariaLabel: desc, firstDayOfWeek: DayOfWeek.Monday, strings: DayPickerStrings, value: valuesFilterOptions.date.$gte, onSelectDate: _onSelectDateFrom }),
        React.createElement(DatePicker, { className: controlClass.control, label: "To date", isRequired: false, allowTextInput: true, ariaLabel: desc, firstDayOfWeek: DayOfWeek.Monday, strings: DayPickerStrings, value: valuesFilterOptions.date.$lte, onSelectDate: _onSelectDateTo }),
        React.createElement(DefaultButton, { className: buttonClass.control, onClick: _clearFilters, text: "Clear filters" })));
};
export default DataFilterOptions;
