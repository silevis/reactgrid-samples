import { CellTemplate, Cell } from "@silevis/reactgrid";
import { CellStyle } from '@silevis/reactgrid/lib';
export interface DropdownCell extends Cell {
    type: 'dropdown';
    values: string[];
    text: string;
    disabled?: boolean;
}
export declare const DropdownCellTemplate: CellTemplate<DropdownCell>;
export declare const getDropdownCell: (text: string, values: string[], disabled?: boolean | undefined, style?: CellStyle | undefined, className?: string | undefined) => DropdownCell;
