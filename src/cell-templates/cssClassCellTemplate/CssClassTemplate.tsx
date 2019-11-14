import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell } from '@silevis/reactgrid';

export interface CssClassCell extends Cell {
    type: 'cssClass';
    value: number;
    className?: string | undefined;
}

export class CssClassCellTemplate implements CellTemplate<CssClassCell> {

    validate(cell: CssClassCell): CompatibleCell<CssClassCell> {
        return { ...cell, text: cell.value.toString() }
    }

    handleKeyDown(cell: CssClassCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: CssClassCell, enableEditMode: boolean }  {
        return { cell, enableEditMode: false }
    }

    render(cell: CssClassCell, isInEditMode: boolean, onCellChanged: (cell: CssClassCell, commit: boolean) => void): React.ReactNode {
        if (!isInEditMode) {
            return <div className={cell.className}>{cell.value}</div>
        }
    }
}