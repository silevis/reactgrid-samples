import * as React from 'react';
import { Cell, CellRenderProps, CellData } from '../Common';

export class ColumnHeaderCell implements Cell {
    cellData: CellData;

    constructor(value: string) {
        this.cellData = { text: value, data: value, type: 'string' }
    }

    trySetData(cellData: CellData) {
        return false;
    }

    shouldEnableEditMode = () => false;

    customStyle: React.CSSProperties = { background: '#eee' };

    renderContent: (props: CellRenderProps) => React.ReactNode = (props) => this.cellData.text
}
