import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps as CellRenderProps, CellTemplate } from '../Common';

export class NumberCellTemplate implements CellTemplate<number> {
    validate(data: any): number {
        return (typeof (data) === 'number') ? data : parseFloat(data);
    }

    textToCellData(text: string): number {
        return parseFloat(text);
    }

    cellDataToText(cellData: number): string {
        return cellData.toString();
    }

    shouldEnableEditMode = () => true

    customStyle: React.CSSProperties = {};

    renderContent: (props: CellRenderProps<number>) => React.ReactNode = (props) => {
        if (!props.isInEditMode) {
            return isNaN(props.cellData) ? '' : props.cellData;
        }


        const preserveValueKeyCodes = [0, keyCodes.ENTER];
        return <input
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
            defaultValue={preserveValueKeyCodes.includes(props.lastKeyCode) && !isNaN(props.cellData) ? (this.cellDataToText(props.cellData)) : ''}
            onChange={e => props.onCellDataChanged ? props.onCellDataChanged(this.textToCellData(e.currentTarget.value)) : null}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}