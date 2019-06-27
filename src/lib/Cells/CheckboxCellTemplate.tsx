import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, CellTemplate } from '../Common';

export class CheckboxCellTemplate implements CellTemplate<boolean> {
    validate(data: any): boolean {
        return (typeof (data) === 'boolean') ? data : false;
    }

    textToCellData(text: string): boolean {
        return false;
    }

    cellDataToText(cellData: boolean) {
        return cellData.toString();
    }

    shouldEnableEditMode = () => true

    customStyle: React.CSSProperties = {};

    renderContent: (props: CellRenderProps<boolean>) => React.ReactNode = (props) => {
        console.log(props.cellData)
        return <input
            type="checkbox"
            style={{
                width: '100%',
                height: '100%',
                border: 0,
                fontSize: 16,
                outline: 'none'
            }}
            ref={input => {
                if (input) {
                    input.focus();
                    // input.setSelectionRange(input.value.length, input.value.length);
                }
            }}
            checked={props.cellData}
            onChange={() => { props.onCellDataChanged ? props.onCellDataChanged(!props.cellData) : null }}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}