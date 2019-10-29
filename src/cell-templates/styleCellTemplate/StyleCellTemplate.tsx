import * as React from 'react';
import { keyCodes, isTextInput, isNavigationKey, CellRenderProps, CellTemplate } from '@silevis/reactgrid';

export class StyleCellTemplate implements CellTemplate<string, any> {

    isValid(data: string): boolean {
        return (typeof (data) === 'string');
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }


    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode = (props) => {
        console.log(props);

        if (!props.isInEditMode) {
            return <div style={{
                margin: 'auto auto',
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
                backgroundSize: 'cover',
                border: '1px solid #cccccc',
                backgroundPosition: 'center center'
            }}

                defaultValue={props.cellData}
            >{props.cellData}</div>

        }
    }
}