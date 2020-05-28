import * as React from 'react';
import { CellTemplate, Cell, Compatible, Uncertain } from '@silevis/reactgrid';
import './css-class-style.scss';
export interface CssClassCell extends Cell {
    type: 'cssClass';
    value: number;
    className?: string;
}
export declare class CssClassCellTemplate implements CellTemplate<CssClassCell> {
    getCompatibleCell(uncertainCell: Uncertain<CssClassCell>): Compatible<CssClassCell>;
    handleKeyDown(cell: Compatible<CssClassCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cell: Compatible<CssClassCell>;
        enableEditMode: boolean;
    };
    getClassName(cell: Compatible<CssClassCell>, isInEditMode: boolean): string;
    render(cell: Compatible<CssClassCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<CssClassCell>, commit: boolean) => void): React.ReactNode;
}
