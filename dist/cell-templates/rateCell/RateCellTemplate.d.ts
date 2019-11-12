import * as React from 'react';
import { CellRenderProps, CellTemplate } from '@silevis/reactgrid';
import './rate-cell-style.scss';
export declare class RateCellTemplate implements CellTemplate<number, any> {
    STARS: number;
    MIN_VAL: number;
    isValid(cellData: number): boolean;
    textToCellData(text: string): number;
    cellDataToText(cellData: number): string;
    handleKeyDown(cellData: number, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any): {
        cellData: number;
        enableEditMode: boolean;
    };
    renderContent: (props: CellRenderProps<number, any>) => React.ReactNode;
}
