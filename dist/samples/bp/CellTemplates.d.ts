import { NumberCellTemplate, Cell } from "@silevis/reactgrid";
export interface NonEditableNumberCell extends Cell {
    type: 'nonEditableNumber';
    value: number;
    format?: Intl.NumberFormat;
    nanToZero?: boolean;
    hideZero?: boolean;
}
export declare const nonEditableNumberCellTemplate: NumberCellTemplate;
