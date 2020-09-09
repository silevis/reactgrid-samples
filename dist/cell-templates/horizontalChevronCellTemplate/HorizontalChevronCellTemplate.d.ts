import * as React from 'react';
import { CellTemplate, Cell, Compatible, Uncertain, UncertainCompatible, Id } from "@silevis/reactgrid";
export interface HorizontalChevronCell extends Cell {
    type: 'horizontalChevron';
    text: string;
    isExpanded?: boolean;
    hasChildren?: boolean;
    columnId?: Id;
    parentId?: Id;
}
export declare class HorizontalChevronCellTemplate implements CellTemplate<HorizontalChevronCell> {
    getCompatibleCell(uncertainCell: Uncertain<HorizontalChevronCell>): Compatible<HorizontalChevronCell>;
    update(cell: Compatible<HorizontalChevronCell>, cellToMerge: UncertainCompatible<HorizontalChevronCell>): Compatible<HorizontalChevronCell>;
    isFocusable: () => boolean;
    handleKeyDown(cell: Compatible<HorizontalChevronCell>, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cell: Compatible<HorizontalChevronCell>;
        enableEditMode: boolean;
    };
    getClassName(cell: Compatible<HorizontalChevronCell>, isInEditMode: boolean): string;
    render(cell: Compatible<HorizontalChevronCell>, isInEditMode: boolean, onCellChanged: (cell: Compatible<HorizontalChevronCell>, commit: boolean) => void): React.ReactNode;
}
