import * as React from 'react';
import { keyCodes, isTextInput, isNavigationKey, CellRenderProps, CellTemplate } from '@silevis/reactgrid';

export class StyleCellTemplate implements CellTemplate<string, any> {

    isValid(data: string): boolean {
        return (typeof (data) === 'number');
    }

    textToCellData(text: string): string {
        return text;
    }

    cellDataToText(cellData: string) {
        return cellData;
    }


    renderContent: (props: CellRenderProps<string, any>) => React.ReactNode = (props) => {
        // console.log(props.props);

        if (!props.isInEditMode) {
            return (
                <div
                    className={props.props.className}>
                    {props.cellData}

                </div>
            )

        }
    }
}