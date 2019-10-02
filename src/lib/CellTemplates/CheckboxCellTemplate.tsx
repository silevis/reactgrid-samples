import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, CellTemplate } from '../Common';

export class CheckboxCellTemplate implements CellTemplate<boolean, any> {

    isValid(cellData: boolean): boolean {
        return typeof (cellData) === 'boolean';
    }

    textToCellData(text: string): boolean {
        return text === 'true';
    }

    cellDataToText(cellData: boolean) {
        return cellData ? 'true' : '';
    }

    handleKeyDown(cellData: boolean, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
        if (keyCode === keyCodes.SPACE || keyCode === keyCodes.ENTER)
            cellData = !cellData
        return { cellData, enableEditMode: false }
    }

    renderContent: (props: CellRenderProps<boolean, any>) => React.ReactNode = (props) => {
        return <input
            type="checkbox"
            style={{
                width: '20px',
                height: '20px',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: 0,
                border: 0,
                background: 'transparent',
                pointerEvents: 'auto',
                zIndex: 1
            }}
            checked={props.cellData}
            onChange={() => props.onCellDataChanged(!props.cellData, true)}
        />
    }
}