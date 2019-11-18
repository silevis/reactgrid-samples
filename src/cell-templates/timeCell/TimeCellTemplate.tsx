import * as React from 'react';
import { keyCodes, CompatibleCell, CellTemplate, Cell, isTextInput } from '@silevis/reactgrid';
// import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import './time-cell-style.scss';

export interface TimeCell extends Cell {
    type: 'time',
    time: string
}

export class TimeCellTemplate implements CellTemplate<TimeCell> {

    validate(cell: any): CompatibleCell<TimeCell> {
        if (cell.time === undefined) {
            return { ...cell, text: '' }
        }

        return { ...cell, text: cell.time }
    }

    handleKeyDown(cell: TimeCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean) {
        if (!ctrl && !alt && !shift && isTextInput(keyCode)) {
            return { cell, enableEditMode: true }
        }
        return { cell, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    update(cell: TimeCell, newCell: TimeCell | CompatibleCell): TimeCell {
        const newCellTime = (newCell as TimeCell).time;
        const newCellText = (newCell as CompatibleCell).text;
        const time_regex = /^\d{1,2}\:\d{1,2}$/;

        if (newCellTime !== undefined) {
            return { ...cell, time: newCellTime, text: newCellTime } as TimeCell;
        }

        if (newCellText !== undefined && time_regex.test(newCellText)) {
            return { ...cell, time: newCellText, text: newCellText } as TimeCell;
        }

        return cell;
    }

    render(cell: TimeCell, isInEditMode: boolean, onCellChanged: (cell: TimeCell, commit: boolean) => void): React.ReactNode {
        if (!isInEditMode) {
            return cell.time ? cell.time : '';
        }

        return (
            <div
                className="rg-time-cell-template"
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
                {/* <TimePicker
                    isOpen={true}
                    clockIcon={null}
                    clearIcon={null}
                    onChange={(time) => {
                        onCellChanged({ ...cell, time }, false)
                    }}
                    value={cell.time}
                    format="HH:mm"
                /> */}
            </div>
        );
    }
}

// TODO check format new Intl.