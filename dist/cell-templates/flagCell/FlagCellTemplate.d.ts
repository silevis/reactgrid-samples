import * as React from 'react';
import { CellRenderProps, CellTemplate } from '@silevis/reactgrid';
export declare class FlagCellTemplate implements CellTemplate<string, any> {
    isValid(data: string): boolean;
    textToCellData(text: string): string;
    cellDataToText(cellData: string): string;
    handleKeyDown(cellData: string, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any): {
        cellData: string;
        enableEditMode: boolean;
    };
    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode;
}
