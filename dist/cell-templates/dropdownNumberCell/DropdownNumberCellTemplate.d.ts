import * as React from 'react';
import { CellRenderProps, CellTemplate } from '@silevis/reactgrid';
import './number-dropdown-cell-style.scss';
interface IDropdownNumberCell {
    value: number;
    isOpened: boolean;
}
export declare class DropdownNumberCellTemplate implements CellTemplate<IDropdownNumberCell, any> {
    MIN_VAL: number;
    MAX_VAL: number;
    STEP: number;
    isValid(cellData: IDropdownNumberCell): boolean;
    textToCellData(text: string): IDropdownNumberCell;
    cellDataToText(cellData: IDropdownNumberCell): string;
    handleKeyDown(cellData: IDropdownNumberCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any): {
        cellData: IDropdownNumberCell;
        enableEditMode: boolean;
    };
    getCustomStyle(cellData: IDropdownNumberCell, isInEditMode: boolean, props?: any): React.CSSProperties;
    renderContent: (props: CellRenderProps<IDropdownNumberCell, any>) => React.ReactNode;
}
export {};
