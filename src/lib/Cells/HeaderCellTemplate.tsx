import * as React from 'react';
import { CellTemplate, CellRenderProps } from '../Common';

export class HeaderCell implements CellTemplate<string> {

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }

    shouldEnableEditMode = () => false;

    customStyle: React.CSSProperties = { background: '#eee' };

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => props.cellData
}
