import * as React from 'react';
import { keyCodes, CompatibleCell, CellTemplate, Cell, isTextInput } from '@silevis/reactgrid';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './date-cell-style.scss';

export interface DateCell extends Cell {
    type: 'date',
    date: Date | undefined
}

export class DateCellTemplate implements CellTemplate<DateCell> {
    getDay(date: Date) {
        const day = date.getDate()
        return (day < 10 ? '0' : '') + day;
    }

    getMonth(date: Date) {
        const month = date.getMonth() + 1;
        return (month < 10 ? '0' : '') + month;
    }

    getFullYear(date: Date) {
        return date.getFullYear();
    }

    getDate(date: Date) {
        return this.getMonth(date) + '/' + this.getDay(date) + '/' + this.getFullYear(date);
    }

    validate(cell: any): CompatibleCell<DateCell> {
        if (cell.date === undefined) {
            // TODO some throw?
            return { ...cell, text: '' }
        }

        if (!(cell.date instanceof Date)) {
            // TODO some throw?
            return { ...cell, date: undefined, text: '' }
        }

        return { ...cell, text: this.getDate(cell.date) }
    }

    handleKeyDown(cell: DateCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
        if (!ctrl && !alt && !shift && isTextInput(keyCode)) {
            return { cell, enableEditMode: true }
        }
        return { cell, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    update(cell: DateCell, newCell: DateCell | CompatibleCell): DateCell {
        const newCellDate = (newCell as DateCell).date;
        const newCellText = (newCell as CompatibleCell).text;
        const date_regex = /^\d{1,2}(\/|-)\d{1,2}(\/|-)\d{4}$/;
        if (newCellDate !== undefined && newCellDate instanceof Date) {
            return { ...cell, date: newCellDate, text: this.getDate(newCellDate) } as DateCell;
        }
        if (newCellText !== undefined && date_regex.test(newCellText)) {
            return { ...cell, date: new Date(newCellText), text: newCellText } as DateCell;
        }
        return cell;
    }

    render(cell: DateCell, isInEditMode: boolean, onCellChanged: (cell: DateCell, commit: boolean) => void): React.ReactNode {
        if (!isInEditMode) {
            return cell.date ? this.getDate(cell.date) : '';
        }

        return (
            <div
                className="rg-date-cell-template"
                onPointerDown={e => e.stopPropagation()}
                onKeyDown={e => {
                    if (e.keyCode === keyCodes.LEFT_ARROW ||
                        e.keyCode === keyCodes.UP_ARROW ||
                        e.keyCode === keyCodes.RIGHT_ARROW ||
                        e.keyCode === keyCodes.DOWN_ARROW ||
                        e.keyCode === keyCodes.BACKSPACE ||
                        e.keyCode === keyCodes.DELETE) {
                        e.stopPropagation();
                    }
                }}
            >
                <DatePicker
                    autoFocus={true}
                    disabledKeyboardNavigation={true}
                    open={true}
                    selected={cell.date}
                    onChange={(date: any) => {
                        onCellChanged({ ...cell, date }, false)
                    }}
                    onKeyDown={(e: any) => {
                        onCellChanged({ ...cell, date: e.target.value.length === 0 ? undefined : cell.date, text: e.target.value } as DateCell, false)
                    }}
                />
            </div>
        );
    }
}

// TODO check format new Intl.