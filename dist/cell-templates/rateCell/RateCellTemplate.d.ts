import * as React from 'react';
import { CellTemplate, Cell, Compatible, Uncertain, UncertainCompatible } from '@silevis/reactgrid';
import './rate-cell-style.scss';
export interface RateCell extends Cell {
    type: 'rate';
    value: number;
}
export declare class RateCellTemplate implements CellTemplate<RateCell> {
    STARS: number;
    MIN_VAL: number;
    getCompatibleCell(uncertainCell: Uncertain<RateCell>): Compatible<RateCell>;
    textToCellData(cellvalue: number): number;
    handleKeyDown(cell: Compatible<RateCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cell: import("@silevis/reactgrid/core").Compatible<RateCell>;
        enableEditMode: boolean;
    };
    update(cell: Compatible<RateCell>, cellToMerge: UncertainCompatible<RateCell>): Compatible<RateCell>;
    render(cell: Compatible<RateCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<RateCell>, commit: boolean) => void): React.ReactNode;
}
