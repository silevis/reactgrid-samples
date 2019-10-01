import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { CellRenderProps, CellTemplate } from '../Common';
import { isNumberInput, isNavigationKey } from './keyCodeCheckings'

export class NumberCellTemplate implements CellTemplate<number, any> {

    isValid(cellData: number): boolean {
        return typeof (cellData) === 'number';
    }

    textToCellData(text: string): number {
        return parseFloat(text);
    }

    cellDataToText(cellData: number): string {
        return isNaN(cellData) ? '' : cellData.toString();
    }

    handleKeyDown(cellData: number, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any) {
        if (!ctrl && !alt && !shift && isNumberInput(keyCode))
            return { cellData: NaN, enableEditMode: true }
        return { cellData, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    renderContent: (props: CellRenderProps<number, any>) => React.ReactNode = (props) => {
        if (!props.isInEditMode) {
            return this.cellDataToText(props.cellData);
        }

        return <input
            style={{
                width: '100%',
                height: '100%',
                padding: 0,
                border: 0,
                background: 'transparent',
                fontSize: 14,
                outline: 'none',
            }}
            ref={input => {
                if (input) {
                    input.focus();
                    // input.setSelectionRange(input.value.length, input.value.length);s
                }
            }}
            defaultValue={this.cellDataToText(props.cellData)}
            onChange={e => props.onCellDataChanged(this.textToCellData(e.currentTarget.value), false)}
            onKeyDown={e => {
                if (isNumberInput(e.keyCode) || isNavigationKey(e.keyCode)) e.stopPropagation();
                if (e.keyCode == keyCodes.ESC) e.currentTarget.value = props.cellData.toString(); // reset
            }}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
        />
    }
}