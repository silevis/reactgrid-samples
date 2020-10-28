import { CellTemplate, Cell } from "@silevis/reactgrid";
import { CellStyle } from '@silevis/reactgrid/lib';
export interface ButtonCell extends Cell {
    type: 'button';
    text: string;
    onClick: () => void;
}
export declare const ButtonCellTemplate: CellTemplate<ButtonCell>;
export declare const getButtonCell: (text: string, onClick: () => void, style?: CellStyle | undefined, className?: string | undefined) => ButtonCell;
