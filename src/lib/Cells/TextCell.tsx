import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown/*, isItLastRowOrCol*/, stopPropagationEventHandler } from './handleEvents';
import { CellProps, Location, Cell, CellData } from '../Common';
// import '../Grid.css';
export interface TextCellProps extends CellProps {
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export class TextCell implements Cell {
    cellData: CellData;
    isReadOnly = false;

    constructor(
        value: string,
        private onValueChanged: (value: string) => boolean,
    ) {
        this.cellData = { textValue: value, data: value, type: 'string' }
    }

    trySetData(cellData: CellData) {
        return this.onValueChanged(cellData.textValue);
    }

    render: (props: TextCellProps) => React.ReactNode = (props) =>
        <div
            key={props.cellKey}
            className="cell"
            {...(props.attributes)}
        >
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
                    // onChange={input => (this.enteredValue = input.target.value)}
                    onBlur={e => {
                        // this.props.setEditMode(false);
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
                        // handleKeyDown(e, this.props);
                        // if (
                        //     (this.enteredValue === undefined || this.enteredValue.length === 0) &&
                        //     (e.keyCode === keyCodes.ENTER && isItLastRowOrCol(this.props, 'row'))
                        // ) {
                        //     this.props.trySetValue(this.enteredValue);
                        //     this.props.gridContext.commitChanges();
                        // }
                    }}
                />
            )}
            {/* {props.children} */}
            {!props.isInEditMode && props.cellData.textValue}
        </div>;
}


