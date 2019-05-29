import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown/*, isItLastRowOrCol*/, stopPropagationEventHandler } from './handleEvents';
import { CellProps, Location, Cell as Cell, CellData, GridContext } from '../Common';
// import '../Grid.css';

export class TextCell implements Cell {
    cellData: CellData;
    isReadOnly = false;
    enteredValue: string = '';

    constructor(
        // customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        value: string,
        private onValueChanged: (value: string) => boolean,
    ) {
        this.cellData = { textValue: value, data: value, type: 'string' }
        this.enteredValue = value
    }

    trySetData(cellData: CellData) {
        return this.onValueChanged(cellData.textValue);
    }

    checkCellMatrixClipboard(e: any, gridContext: GridContext) {
        const htmlData = e.clipboardData!.getData('text/html');
        const parsedData = new DOMParser().parseFromString(htmlData, 'text/html')
        if (htmlData && parsedData.body.firstElementChild!.getAttribute('data-key') === 'dynagrid') {
            gridContext.setState({ isFocusedCellInEditMode: false });
            return e.preventDefault()
        }
        return e.stopPropagation()
    }

    renderContent: (props: CellProps) => React.ReactNode = (props) =>
        <>
            {props.isInEditMode && (
                <input
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
                            input.setSelectionRange(input.value.length, input.value.length);
                        }
                    }}
                    defaultValue={props.cellData.textValue}
                    onChange={input => (this.enteredValue = input.target.value)}
                    onBlur={e => {
                        if (
                            (e.target.value && e.target.value !== props.cellData.textValue) ||
                            (props.cellData.textValue && e.target.value !== props.cellData.textValue)
                        ) {
                            this.onValueChanged(e.target.value);
                            props.gridContext.commitChanges();
                        }
                    }}
                    onCopy={stopPropagationEventHandler}
                    onCut={stopPropagationEventHandler}
                    onPaste={e => this.checkCellMatrixClipboard(e, props.gridContext)}
                    onPointerDown={e => e.stopPropagation()}
                    onKeyDown={e => {
                        if (
                            !(this.enteredValue === undefined || this.enteredValue.length === 0) &&
                            (e.keyCode === keyCodes.ENTER || e.keyCode === keyCodes.TAB)
                        ) {
                            if (this.cellData.textValue !== this.enteredValue) {
                                this.trySetData({ textValue: this.enteredValue, data: this.enteredValue, type: 'string' });
                                props.gridContext.commitChanges();
                            }
                            props.gridContext.setState({ isFocusedCellInEditMode: false });
                            props.gridContext.hiddenFocusElement.focus();
                        } else {
                            e.stopPropagation();
                        }
                    }}
                />
            )}
            {/* {props.children} */}
            {!props.isInEditMode && props.cellData.textValue}
        </>;
}


