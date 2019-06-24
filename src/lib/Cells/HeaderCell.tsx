import * as React from 'react';
import { CellTemplate, CellRenderProps, CellData } from '../Common';

export class HeaderCell implements CellTemplate {

    trySetData(cellData: CellData) {
        return cellData;
    }

    shouldEnableEditMode = () => false;

    getText(cellData: CellData) {
        return cellData.data;
    }

    customStyle: React.CSSProperties = { background: '#eee' };

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => props.cellData.text
}
