import * as React from 'react';
import { handleCopy, handleCut, handlePaste } from './handleEvents';
// import './Cell.css';
import { Utilities } from '../Common/Utilities';
import { Cell, Orientation, CellProps, Location, CellMatrix } from '../Common';
import { getLocationFromClient } from '../Functions';

export interface HeaderCellProps extends CellProps {
    orientation: Orientation;
    shouldStartReorder: boolean;
    shouldStartColResize: boolean;
    customCss?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    enableCheckBox: boolean;
    checkBoxValue?: boolean;
    readonly setCheckBoxValue?: (value: boolean) => void;
}

export let headerCellTouchStartTime: number;

interface HeaderCellState {
    isResizerHover: boolean;
    checked: boolean;
    visibleCheckBox: boolean;
    checkboxFocused: boolean;
}

export class HeaderCell extends React.Component<HeaderCellProps, HeaderCellState> {
    private readonly resizeDivWidth = 4;
    private mouseEvent: boolean = true;
    static Create(
        orientation: Orientation,
        value: string,
        type: string,
        setValue: (value: any) => void,
        isReadOnly: boolean,
        isReorderable: boolean,
        onFocusChanged: (location: Location) => void,
        isResizable?: boolean,
        customHtml?: React.ReactNode,
        customCSS?: React.CSSProperties,
        enableCheckBox?: boolean,
        checkBoxValue?: boolean,
        trySetCheckBox?: (value: boolean) => void
    ): Cell {
        return {
            value,
            type,
            isReadOnly,
            // onFocusChanged: (location: Location) => onFocusChanged(location), ??
            render: cellProps => (
                <HeaderCell
                    {...cellProps}
                    key={cellProps.cellKey}
                    orientation={orientation}
                    shouldStartReorder={isReorderable}
                    shouldStartColResize={isResizable!}
                    customCss={customCSS}
                    enableCheckBox={enableCheckBox!}
                    checkBoxValue={checkBoxValue}
                    setCheckBoxValue={value => trySetCheckBox!(value)}
                >
                    {customHtml}
                </HeaderCell>
            ),
            trySetValue: setValue
        };
    }

    constructor(props: HeaderCellProps) {
        super(props);
        this.state = {
            isResizerHover: false,
            checked: false,
            visibleCheckBox: false,
            checkboxFocused: false
        };
    }

    render() {
        let style = {
            background: '#eee',
            cursor: 'default',
                // this.props.isSelected &&
                //     this.props.gridContext.cellMatrix.first.row.idx !== 0 &&
                //     this.props.gridContext.cellMatrix.first.col.idx !== 0
                //     ? '-webkit-grab'
                //     : 'default',
            paddingRight: 0
        };
        let mergedStyle = Object.assign({}, this.props.attributes.style, style, this.props.customCss);
        let innerStyle = {
            background: '#eee',
            cursor: /*this.props.isSelected ? '-webkit-grab' : 'default',*/ 'default',
            display: 'flex',
            justifyContent: this.state.visibleCheckBox ? 'center' : 'space-between',
            width: `calc(100% - ${this.resizeDivWidth}px)`,
            alignItems: 'center'
        };
        return (
            <div
                className="cell-header"
                {...(this.props.attributes, { style: mergedStyle })}
                onMouseDown={e => {
                    e.stopPropagation();
                    if (this.mouseEvent) {
                        this.handleMouseDownClickAndTouchStart(e);
                    }
                }}
                onTouchStart={e => {
                    this.handleMouseDownClickAndTouchStart(e);
                }}
                onTouchEnd={() => {
                    this.mouseEvent = false;
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (!this.mouseEvent) {
                        this.handleMouseDownClickAndTouchStart(e);
                    }
                    this.mouseEvent = true;
                }}
                onDoubleClick={e => {
                    if (this.props.isReadOnly) {
                        e.stopPropagation();
                    }
                }}
            >
                <div style={innerStyle}>
                    {this.props.isInEditMode && (
                        <input
                            onBlur={e => {
                                if (
                                    !this.nameIsNullOrEmpty(e.currentTarget.value) &&
                                    e.currentTarget.value !== this.props.value
                                ) {
                                    this.props.trySetValue(e.currentTarget.value);
                                    this.props.gridContext.commitChanges();
                                }
                                // this.props.setEditMode(false);
                            }}
                            onKeyDown={e => {}/*handleKeyDown(e, this.props)*/}
                            onCopy={handleCopy}
                            onCut={handleCut}
                            onPaste={handlePaste}
                            style={{
                                width: this.props.attributes.style!.width,
                                height: this.props.attributes.style!.height,
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
                        />
                    )}
                    {this.shouldRenderCellValue() && <div style={{ overflow: 'hidden' }}>{this.props.value}</div>}
                    {this.props.children}
                </div>
                {this.props.shouldStartColResize && this.orientationAllowsResizing() && (
                    <div
                        data-cy="touch-resize-button"
                        onTouchStart={e => {
                            this.startResizingColumn(e);
                            this.setState({ isResizerHover: true });
                        }}
                        onTouchEnd={() => this.setState({ isResizerHover: false })}
                        style={{
                            position: 'relative',
                            right: 0,
                            width: 10,
                            height: this.props.attributes.style!.height
                        }}
                    >
                        <div
                            onMouseDown={e => this.startResizingColumn(e)}
                            onClick={e => e.stopPropagation()}
                            onMouseEnter={() => this.setState({ isResizerHover: true })}
                            onMouseOut={() => this.setState({ isResizerHover: false })}
                            style={{
                                width: this.resizeDivWidth,
                                height: this.props.attributes.style!.height,
                                cursor: this.state.isResizerHover ? 'w-resize' : 'default',
                                background: this.state.isResizerHover ? '#3498db' : '#eee',
                                position: 'absolute',
                                right: 0
                            }}
                        />
                    </div>
                )}
            </div>
        );
    }

    public setCheckBoxValue(value: boolean) {
        this.setState({ checked: value });
    }

    private shouldRenderCellValue(): boolean {
        return (
            !this.props.isInEditMode && (this.props.checkBoxValue === undefined ? true : !this.state.visibleCheckBox)
        );
    }

    private orientationAllowsResizing() {
        return this.props.orientation === 'horizontal'/* || this.props.orientation === 'full-dimension'*/;
    }

    private handleMouseDownClickAndTouchStart(e: any) {
        const positionX =
            e.type === 'mousedown' || e.type === 'click'
                ? e.clientX
                : e.type === 'touchstart'
                    ? e.changedTouches[0].clientX
                    : null;
        const positionY =
            e.type === 'mousedown' || e.type === 'click'
                ? e.clientY
                : e.type === 'touchstart'
                    ? e.changedTouches[0].clientY
                    : null;
        const locationOfCell = getLocationFromClient(this.props.gridContext, positionX, positionY);
        const isItTheSameCell = this.props.gridContext.state.focusedLocation
            ? this.props.gridContext.state.focusedLocation.row.idx === locationOfCell.row.idx &&
            this.props.gridContext.state.focusedLocation.col.idx === locationOfCell.col.idx
            : null;

        if (isItTheSameCell && this.props.gridContext.state.isFocusedCellInEditMode) {
            return;
        }
        const selRange = Utilities.getActiveSelectionRange(
            this.props.gridContext.state.selectedRanges,
            this.props.gridContext.state.focusedLocation!
        );
        const cellMatrix = this.props.gridContext.cellMatrix;

        if (e.type === 'touchstart') {
            headerCellTouchStartTime = new Date().getTime();
        }

        if (e.type === 'mousedown' || e.type === 'touchstart') {
            if (selRange && selRange.contains(locationOfCell) && !e.ctrlKey) {
                if (this.props.shouldStartReorder) {
                    if (this.props.orientation === 'horizontal') {
                        // changeBehavior(this.props.gridContext, new ColReorderBehavior(this.props.gridContext, e));
                    } else {
                        // changeBehavior(this.props.gridContext, new RowReorderBehavior(this.props.gridContext, e));
                    }
                }
            } else {
                this.selectColumnOrRow(e, locationOfCell, cellMatrix);
            }
            e.stopPropagation();
            e.preventDefault();
        } else if (e.type === 'click') {
            this.selectColumnOrRow(e, locationOfCell, cellMatrix);
        }
    }

    private selectColumnOrRow(e: any, locationOfCell: Location, cellMatrix: CellMatrix) {
        const orientation = this.props.orientation;
        const gridContext = this.props.gridContext;

        if (orientation === 'horizontal') {
            if (e.type === 'click') {
                // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'column', true));
            } else if (e.type === 'mousedown') {
                // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'column'));
            }
        } else if (orientation === 'vertical') {
            if (e.type === 'click') {
                // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'row', true));
            } else if (e.type === 'mousedown') {
                // changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'row'));
            }
        } else if (orientation === 'full-dimension') {
            if (e.type === 'mousedown' || e.type === 'click') {
                gridContext.setState({
                    focusedLocation: locationOfCell,
                    selectedRanges: [cellMatrix.getRange(cellMatrix.first, cellMatrix.last)]
                });
            }
        }
    }

    private startResizingColumn(e: any) {
        const positionX =
            e.type === 'mousedown' ? e.clientX : e.type === 'touchstart' ? e.changedTouches[0].clientX : null;
        // const column = this.props.grid.getColumnFromClientX(positionX);
        e.stopPropagation();
        // this.props.grid.changeBehavior(new ResizeColumnBehavior(this.props.grid, column, e));
    }

    private nameIsNullOrEmpty(name: string) {
        return !name || !name.trim();
    }
}
