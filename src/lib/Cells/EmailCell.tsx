import * as React from 'react';
import { CellProps, Cell, Location } from '../Model';
import { keyCodes } from '../Common/Constants';
import { handleKeyDown, isItLastRowOrCol, handleCopy, handleCut, handlePaste } from './handleEvents';

export interface EmailCellProps extends CellProps {
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}
export class EmailCell extends React.Component<EmailCellProps, {}> {
    enteredValue: string = undefined;
    static Create(
        value: string,
        setValue: (value: any, deleteKeyPress: boolean) => void,
        readOnly: boolean,
        onFocusChanged: (location: Location) => void,
        customHtml?: any,
        customCSS?: React.CSSProperties
    ): Cell {
        return {
            value,
            isReadOnly: readOnly,
            onFocusChanged: location => onFocusChanged(location),
            render: cellProps => (
                <EmailCell {...cellProps} key={cellProps.cellKey} customCss={customCSS}>
                    {customHtml}
                </EmailCell>
            ),
            trySetValue: (v, deleteKeyPress) => {
                const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let value = v ? v.toString() : v;
                value = value ? value.replace(/\s+/g, '') : value;
                if (email_regex.test(value) || !value) {
                    setValue(value, deleteKeyPress);
                    return true;
                }
            }
        };
    }

    render() {
        let mergedStyle = Object.assign({}, this.props.attributes.style, this.props.customCss);

        return (
            <div
                ref={ref => this.props.setFocusedCellRef(ref)}
                {...(this.props.attributes, { style: mergedStyle })}
                className="cell"
            >
                {this.props.isInEditMode && (
                    <input
                        type="email"
                        style={{
                            width: this.props.attributes.style.width,
                            height: this.props.attributes.style.height,
                            border: 0,
                            fontSize: 16,
                            outline: 'none'
                        }}
                        ref={input => {
                            if (input) {
                                input.focus();
                                // input.setSelectionRange(input.value.length, input.value.length)
                            }
                        }}
                        defaultValue={this.props.value}
                        onChange={input => (this.enteredValue = input.target.value)}
                        onBlur={e => {
                            this.props.setEditMode(false);
                            if (
                                (e.target.value && e.target.value !== this.props.value) ||
                                (this.props.value && e.target.value !== this.props.value)
                            ) {
                                this.props.trySetValue(e.target.value);
                                this.props.grid.commitChanges();
                            }
                        }}
                        onCopy={handleCopy}
                        onCut={handleCut}
                        onPaste={handlePaste}
                        onKeyDown={e => {
                            handleKeyDown(e, this.props);
                            if (
                                (this.enteredValue === undefined || this.enteredValue.length === 0) &&
                                (e.keyCode === keyCodes.ENTER && isItLastRowOrCol(this.props, 'row'))
                            ) {
                                this.props.trySetValue(this.enteredValue);
                                this.props.grid.commitChanges();
                            }
                        }}
                    />
                )}
                {this.props.children}
                {!this.props.isInEditMode && (
                    <a style={{ color: '#000000', padding: 0, margin: 0 }} href={'mailto:' + this.props.value}>
                        {this.props.value}
                    </a>
                )}
            </div>
        );
    }
}
