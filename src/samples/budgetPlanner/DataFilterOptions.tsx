import React, { useState } from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const controlClass = mergeStyleSets({ control: { margin: '0px 20px 0px 0px', width: '300px' } });
const buttonClass = mergeStyleSets({ control: { margin: '27px 20px 0px 0px', } });

interface ValuesFilterOptionsProps {
  onGetValuesFilterOptions: Function
}

export interface valuesFilterOptionsState {

  date: {
    $gte: Date | null | undefined,
    $lte: Date | null | undefined
  }
}

export const DataFilterOptions: React.FunctionComponent<ValuesFilterOptionsProps> = (props) => {
  const DayPickerStrings: IDatePickerStrings = {
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
  const desc = 'This field is required. One of the support input formats is year dash month dash day.';
  const [valuesFilterOptions, setValuesFilterOptions] = useState<valuesFilterOptionsState>({ date: { $gte: null, $lte: null } });

  const _onSelectDateFrom = (date: Date | null | undefined): void => {
    setValuesFilterOptions({ ...valuesFilterOptions, date: { $gte: date, $lte: valuesFilterOptions.date.$lte } });
    props.onGetValuesFilterOptions({ ...valuesFilterOptions, date: { $gte: date, $lte: valuesFilterOptions.date.$lte } });
  };

  const _onSelectDateTo = (date: Date | null | undefined): void => {
    setValuesFilterOptions({ ...valuesFilterOptions, date: { $gte: valuesFilterOptions.date.$gte, $lte: date } });
    props.onGetValuesFilterOptions({ ...valuesFilterOptions, date: { $gte: valuesFilterOptions.date.$gte, $lte: date } });
  };

  const _clearFilters = (): void => {
    setValuesFilterOptions({ date: { $gte: null, $lte: null } });
    props.onGetValuesFilterOptions({ date: { $gte: null, $lte: null } });
  }

  return (
    <>

      <DatePicker
        className={controlClass.control}
        label="From date"
        isRequired={false}
        allowTextInput={true}
        ariaLabel={desc}
        firstDayOfWeek={DayOfWeek.Monday}
        strings={DayPickerStrings}
        value={valuesFilterOptions.date.$gte!}
        onSelectDate={_onSelectDateFrom}
      />
      <DatePicker
        className={controlClass.control}
        label="To date"
        isRequired={false}
        allowTextInput={true}
        ariaLabel={desc}
        firstDayOfWeek={DayOfWeek.Monday}
        strings={DayPickerStrings}
        value={valuesFilterOptions.date.$lte!}
        onSelectDate={_onSelectDateTo}
      />
      <DefaultButton
        className={buttonClass.control}
        onClick={_clearFilters}
        text="Clear filters"
      />
    </>
  );
};

export default DataFilterOptions;