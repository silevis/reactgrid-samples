import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, CellTemplate } from '../Common';

export class CheckboxCellTemplate implements CellTemplate<boolean> {
    validate(data: any): boolean {
        return (typeof (data) === 'boolean') ? data : false;
    }

    textToCellData(text: string): boolean {
        return parseFloat(text) === 1;
    }

    cellDataToText(cellData: boolean) {
        return cellData ? '1' : '';
    }

    handleKeyDown(keyCode: number, cellData: boolean) {
        if (keyCode == keyCodes.SPACE || keyCode == keyCodes.ENTER) {
            cellData = !this.validate(cellData)
        }
        return { shouldEnableEditMode: false, cellData }
    }

    customStyle: React.CSSProperties = {};

    renderContent: (props: CellRenderProps<boolean>) => React.ReactNode = (props) => {
        return <input
            type="checkbox"
            style={{
                width: '20px',
                height: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',

            }}
            checked={props.cellData}
            onChange={() => { props.onCellDataChanged ? props.onCellDataChanged(!props.cellData) : null }}
        />
    }
}