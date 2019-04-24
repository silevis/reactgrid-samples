import * as React from 'react';
import { CellProps, Cell, Location } from '../Model';
import { keyCodes } from '../Common/Constants';
import { handleKeyDownCheckboxCell, isItLastRowOrCol } from './handleEvents';

export interface CheckboxCellProps extends CellProps {
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}
export class CheckboxCell extends React.Component<CheckboxCellProps, {}> {
    static Create(
        value = false,
        type: string,
        setValue: (value: any, deleteKeyPress?: boolean) => void,
        readOnly = false,
        onFocusChanged: (location: Location) => void,
        customHtml?: any,
        customCSS?: React.CSSProperties
    ): Cell {
        return {
            value,
            isReadOnly: readOnly,
            type: type,
            onFocusChanged: location => onFocusChanged(location),
            render: cellProps => (
                <CheckboxCell {...cellProps} key={cellProps.cellKey} customCss={customCSS}>
                    {customHtml}
                </CheckboxCell>
            ),
            trySetValue: (v, deleteKeyPress) => {
                const isBoolean = v => 'boolean' === typeof v;
                if (isBoolean) {
                    setValue(v, deleteKeyPress);
                    return true;
                }
            }
        };
    }

    onChange() { }

    trySetValue(value: boolean | string) {
        this.props.trySetValue(value);
        this.props.grid.commitChanges();
    }

    render() {
        let mergedStyle = Object.assign({}, this.props.attributes.style, this.props.customCss);
        return (
            <div
                ref={ref => this.props.setFocusedCellRef(ref)}
                {...(this.props.attributes, { style: mergedStyle })}
                onDoubleClick={e => e.stopPropagation()}
                onTouchEnd={e => e.stopPropagation()}
                className="cell"
            >
                {this.props.isInEditMode && (
                    <input
                        style={{ width: 18, height: '100%' }}
                        onChange={() => { }}
                        type="checkbox"
                        checked={this.props.value}
                        onClick={() => {
                            this.trySetValue(!this.props.value);
                        }}
                        ref={input => {
                            if (input) {
                                input.focus();
                            }
                        }}
                        onBlur={() => {
                            this.props.setEditMode(false);
                        }}
                        onKeyDown={e => {
                            handleKeyDownCheckboxCell(e, this.props);
                            if (e.keyCode === keyCodes.ENTER && isItLastRowOrCol(this.props, 'row')) {
                                this.trySetValue(false);
                            }
                        }}
                    />
                )}
                {!this.props.isInEditMode && (
                    <input
                        style={{ width: 18, height: '100%' }}
                        type="checkbox"
                        checked={this.props.value}
                        onClick={() => this.trySetValue(!this.props.value)}
                    />
                )}
            </div>
        );
    }
}
