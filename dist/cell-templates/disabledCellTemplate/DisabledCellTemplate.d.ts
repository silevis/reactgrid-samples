import { CellTemplate, Cell } from "@silevis/reactgrid";
import { CellStyle } from '@silevis/reactgrid/lib';
export interface DisabledCell extends Cell {
    type: 'disabled';
    text?: string;
    value?: number;
}
export declare const DisabledCellTemplate: CellTemplate<DisabledCell>;
export declare const getDisabledCell: (value: string | number, style?: CellStyle | undefined, className?: string | undefined) => DisabledCell;
