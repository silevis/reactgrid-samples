import * as React from 'react';
import { CellTemplate, Cell, Compatible, CellStyle, Uncertain, UncertainCompatible } from '@silevis/reactgrid';
import './number-dropdown-cell-style.scss';
export interface DropdownNumberCell extends Cell {
    type: 'dropdownNumber';
    isOpened: boolean;
    value: number;
}
export declare class DropdownNumberCellTemplate implements CellTemplate<DropdownNumberCell> {
    static MIN_VAL: number;
    static MAX_VAL: number;
    static STEP: number;
    getCompatibleCell(uncertainCell: Uncertain<DropdownNumberCell>): Compatible<DropdownNumberCell>;
    getLimitedValue(value: number): number;
    handleKeyDown(cell: Compatible<DropdownNumberCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cell: Compatible<DropdownNumberCell>;
        enableEditMode: boolean;
    };
    update(cell: Compatible<DropdownNumberCell>, cellToMerge: UncertainCompatible<DropdownNumberCell>): Compatible<DropdownNumberCell>;
    getStyle(cell: Compatible<DropdownNumberCell>, isInEditMode: boolean): CellStyle;
    render(cell: Compatible<DropdownNumberCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<DropdownNumberCell>, commit: boolean) => void): React.ReactNode;
}
