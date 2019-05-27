import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown/*, isItLastRowOrCol*/, stopPropagationEventHandler } from './handleEvents';
import { CellProps, Location, Cell as Cell, CellData } from '../Common';
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

    renderContent: (props: CellProps) => React.ReactNode = (props) =>
        <>
            {props.isInEditMode && (
                <input
                    style={{
                        // TODO !!!
                        width: 100/*this.props.attributes.style.width*/,
                        height: 25/*this.props.attributes.style.height*/,
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
                        // props.setEditMode(false);
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
                    // TODO onPaste: is content cellData matrix? preventDefault & propagate event ELSE paste in input & stopPropagation 
                    onPaste={stopPropagationEventHandler}
                    onKeyDown={e => {
                        if (
                            !(this.enteredValue === undefined || this.enteredValue.length === 0) &&
                            (e.keyCode === keyCodes.ENTER)
                        ) {
                            console.log(this.enteredValue)
                            this.trySetData({ textValue: this.enteredValue, data: this.enteredValue, type: 'string' });
                            props.gridContext.commitChanges();
                            props.gridContext.setState({ isFocusedCellInEditMode: false });
                            props.gridContext.hiddenFocusElement.focus();
                        }
                    }}
                />
            )}
            {/* {props.children} */}
            {!props.isInEditMode && props.cellData.textValue}
        </>;
}


