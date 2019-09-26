import * as React from 'react';
import { CellTemplate, CellRenderProps } from '../Common';

export class HeaderCellTemplate implements CellTemplate<string> {

    isReadonly(cellData: string) {
        return true;
    }

    isValid(cellData: string): boolean {
        return (typeof (cellData) === 'string');
    }

    cellDataToText(cellData: string): string {
        return cellData;
    }

    getCustomStyle(cellData: string): React.CSSProperties {
        return { background: '#eee' }
    }

    renderContent: (props: CellRenderProps<string>) => React.ReactNode = (props) => props.cellData
}
