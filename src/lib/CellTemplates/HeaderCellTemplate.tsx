import * as React from 'react';
import { CellTemplate, CellRenderProps } from '../Common';

export class HeaderCellTemplate implements CellTemplate<string, any> {

    isReadonly = () => true;

    isValid = (cellData: string) => (typeof (cellData) === 'string');

    isFocusable = () => false;

    cellDataToText = (cellData: string) => cellData;

    getCustomStyle = (cellData: string) => ({ background: '#f3f3f3' })

    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode = (props) => props.cellData
}
