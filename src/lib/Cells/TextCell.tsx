import * as React from 'react';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown/*, isItLastRowOrCol*/, handleCopy, handleCut, handlePaste } from './handleEvents';
import { CellProps, Location, Cell } from '../Common';
// import '../Grid.css';
export interface TextCellProps extends CellProps {
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}
export class TextCell extends React.Component<TextCellProps, {}> {
    // enteredValue: string = undefined;
    static Create(
        value: string,
        setValue: (value: any, deleteKeyPress?: boolean) => void,
        readOnly = false,
        onFocusChanged: (location: Location, reset?: boolean) => void,
        customHtml?: any,
        customCSS?: React.CSSProperties
    ): Cell {
        return {
            value,
            isReadOnly: readOnly,
            // onFocusChanged: (location: Location) => onFocusChanged(location),
            render: (cellProps: any) => (
                <TextCell {...cellProps} key={cellProps.cellKey} customCss={customCSS}>
                    {customHtml}
                </TextCell>
            ),
            trySetValue: (v: any/*, deleteKeyPress*/) => {
                if (typeof v === 'boolean' || v instanceof Boolean) {
                    v = v.toString();
                }
                if (v && v.length && v.length > 1024) {
                    v = v.substring(0, 1024);
                }
                setValue(v/*, deleteKeyPress*/);
                return true;
            }
        };
    }

    render() {
        let mergedStyle = Object.assign({}, this.props.attributes.style, this.props.customCss);
        return (
            <div
                key={this.props.cellKey}
                className="cell"
                // ref={ref => this.props.setFocusedCellRef(ref)}
                {...(this.props.attributes, { style: mergedStyle })}
                onMouseDown={e => {
                    // if (isItLastRowOrCol(this.props, 'col')) {
                    //     e.stopPropagation();
                    // }
                }}
                onClick={e => {
                    // if (isItLastRowOrCol(this.props, 'col')) {
                    //     e.stopPropagation();
                    // }
                }}
            >
                {this.props.isInEditMode && (
                    <input
                        style={{
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
                        defaultValue={this.props.value}
                        // onChange={input => (this.enteredValue = input.target.value)}
                        onBlur={e => {
                            // this.props.setEditMode(false);
                            if (
                                (e.target.value && e.target.value !== this.props.value) ||
                                (this.props.value && e.target.value !== this.props.value)
                            ) {
                                this.props.trySetValue(e.target.value);
                                this.props.gridContext.commitChanges();
                            }
                        }}
                        onCopy={handleCopy}
                        onCut={handleCut}
                        onPaste={handlePaste}
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
                {this.props.children}
                {!this.props.isInEditMode && this.props.value}
            </div>
        );
    }
}
