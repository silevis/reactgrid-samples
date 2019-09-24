import * as React from 'react';
import { CellTemplate, CellRenderProps } from '../Common';

export class HeaderCellTemplate implements CellTemplate<string> {

    validate(data: any): string {
        return (typeof (data) === 'string') ? data : '';
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    handleKeyDown(keyCode: number, cellData: string) {
        return { cellData, enableEditMode: false }
    }

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => props.cellData
}
