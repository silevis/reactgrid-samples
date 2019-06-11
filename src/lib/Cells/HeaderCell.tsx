import * as React from 'react';
import { Cell, CellRenderProps, CellData } from '../Common';

export class HeaderCell implements Cell {
    cellData: CellData;

    constructor(title: string) {
        this.cellData = { text: title, data: title, type: 'string' }
    }

    trySetData(cellData: CellData) {
        return false;
    }

    shouldEnableEditMode = () => false;

    customStyle: React.CSSProperties = { background: '#eee' };

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => this.cellData.text
}
