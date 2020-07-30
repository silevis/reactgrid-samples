import * as React from 'react';
import { CellTemplate, Cell, Compatible, Uncertain, UncertainCompatible, Id } from "@silevis/reactgrid";
export interface HorizontalGroupCell extends Cell {
    type: 'horizontalGroup';
    text: string;
    isExpanded?: boolean;
    hasChildren?: boolean;
    parentId?: Id;
}
export declare class HorizontalGroupCellTemplate implements CellTemplate<HorizontalGroupCell> {
    getCompatibleCell(uncertainCell: Uncertain<HorizontalGroupCell>): Compatible<HorizontalGroupCell>;
    update(cell: Compatible<HorizontalGroupCell>, cellToMerge: UncertainCompatible<HorizontalGroupCell>): Compatible<HorizontalGroupCell>;
    handleKeyDown(cell: Compatible<HorizontalGroupCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cell: Compatible<HorizontalGroupCell>;
        enableEditMode: boolean;
    };
    getClassName(cell: Compatible<HorizontalGroupCell>, isInEditMode: boolean): string;
    render(cell: Compatible<HorizontalGroupCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<HorizontalGroupCell>, commit: boolean) => void): React.ReactNode;
}
