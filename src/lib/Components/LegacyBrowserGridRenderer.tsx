import * as React from "react";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { ContextMenu } from "./ContextMenu";
import { MenuOption, State, PointerEvent, Id, Range, KeyboardEvent, ClipboardEvent } from "../Common";
import { CellEditor } from "./CellEditor";
import { Pane } from "./Pane";
import { recalcVisibleRange, getDataToPasteInIE, isBrowserIE } from "../Functions";
import { pasteData, copySelectedRangeToClipboardInIE } from "../Behaviors/DefaultBehavior";

interface LegacyBrowserGridRendererProps {
    state: State,
    viewportElementRefHandler: (viewportElement: HTMLDivElement) => void,
    hiddenElementRefHandler: (hiddenFocusElement: HTMLInputElement) => void,
    onKeyDown: (event: KeyboardEvent) => void,
    onKeyUp: (event: KeyboardEvent) => void,
    onCopy: (event: ClipboardEvent) => void,
    onCut: (event: ClipboardEvent) => void,
    onPaste: (event: ClipboardEvent) => void,
    onPointerDown: (event: PointerEvent) => void,
    onContextMenu: (event: PointerEvent) => void,
    onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onColumnContextMenu?: (selectedColIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
}

export class LegacyBrowserGridRenderer extends React.Component<LegacyBrowserGridRendererProps> {
    private frozenTopScrollableElement!: HTMLDivElement;
    private frozenRightScrollableElement!: HTMLDivElement;
    private frozenBottomScrollableElement!: HTMLDivElement;
    private frozenLeftScrollableElement!: HTMLDivElement;

    render() {
        const props: LegacyBrowserGridRendererProps = this.props;
        const state: State = props.state;
        const cellMatrix = state.cellMatrix;
        const hiddenScrollableElement = state.hiddenScrollableElement;

        return (
            <div
                className="dyna-grid-legacy-browser"
                onCopy={(e: ClipboardEvent) => isBrowserIE() ? copySelectedRangeToClipboardInIE(state) : props.onCopy(e)}
                onCut={(e: ClipboardEvent) => isBrowserIE() ? copySelectedRangeToClipboardInIE(state, true) : props.onCut(e)}
                onPaste={(e: ClipboardEvent) => isBrowserIE() ? state.updateState((state: State) => pasteData(state, getDataToPasteInIE())) : props.onPaste(e)}
                onKeyDown={props.onKeyDown}
                onKeyUp={props.onKeyUp}
                onPointerDown={props.onPointerDown}
                onContextMenu={props.onContextMenu}
                style={{ width: '100%', height: '100%', MozUserSelect: 'none', WebkitUserSelect: 'none', msUserSelect: 'none', userSelect: 'none' }}
            >
                <div
                    ref={(hiddenScrollableElement: HTMLDivElement) => hiddenScrollableElement && this.hiddenScrollableElementRefHandler(state, hiddenScrollableElement)}
                    className="dg-hidden-scrollable-element"
                    style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        overflowX: this.isHorizontalScrollbarVisible() ? 'scroll' : 'auto',
                        overflowY: this.isVerticalScrollbarVisible() ? 'scroll' : 'auto',
                        zIndex: 1
                    }}
                    onPointerDown={(e: PointerEvent) => { if (this.isClickedOutOfGrid(e)) e.stopPropagation() }}
                    onScroll={this.scrollHandler}
                >
                    <div style={{ width: cellMatrix.width, height: cellMatrix.height }}></div>
                </div>
                {
                    cellMatrix.frozenTopRange.height > 0 && state.visibleRange && state.visibleRange.width > 0 &&
                    <div
                        className="dg-frozen-top"
                        style={{
                            position: 'absolute', top: 0,
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : cellMatrix.frozenLeftRange.width + state.visibleRange.width + (cellMatrix.frozenRightRange.width > 0 ? cellMatrix.frozenRightRange.width : 0),
                            height: cellMatrix.frozenTopRange.height,
                            background: '#fff',
                            zIndex: 3,
                            pointerEvents: 'none',
                            boxShadow: '0 3px 3px -3px rgba(0, 0, 0, .2)'
                        }}
                    >
                        {cellMatrix.frozenLeftRange.width > 0 &&
                            <Pane
                                id="TL"
                                state={state}
                                style={{ position: 'absolute', top: 0, left: 0, boxShadow: '3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1 }}
                                range={cellMatrix.frozenLeftRange.slice(cellMatrix.frozenTopRange, 'rows')}
                                borders={{}}
                            />
                        }
                        <div
                            ref={(frozenTopScrollableElement: HTMLDivElement) => frozenTopScrollableElement && this.frozenTopScrollableElementRefHandler(state, frozenTopScrollableElement)}
                            style={{
                                position: 'absolute', top: 0, left: cellMatrix.frozenLeftRange.width,
                                width: `calc(100% - ${cellMatrix.frozenLeftRange.width + cellMatrix.frozenRightRange.width}px + 2px)`, height: 'calc(100% + 2px)',
                                overflow: 'hidden'
                            }}>
                            <Pane
                                id="TC"
                                state={state}
                                style={{
                                    width: cellMatrix.width - cellMatrix.frozenLeftRange.width - cellMatrix.frozenRightRange.width + 2,
                                    paddingBottom: 100,
                                    overflowX: 'scroll', overflowY: 'hidden'
                                }}
                                range={cellMatrix.frozenTopRange.slice(state.visibleRange, 'columns')}
                                borders={{}}
                            />
                        </div>
                        {cellMatrix.frozenRightRange.width > 0 &&
                            <Pane
                                id="TR"
                                state={state}
                                style={{
                                    position: 'absolute', top: 0, right: 0, boxShadow: '-3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1
                                }}
                                range={cellMatrix.frozenRightRange.slice(cellMatrix.frozenTopRange, 'rows')}
                                borders={{}}
                            />
                        }
                    </div>
                }
                {
                    cellMatrix.scrollableRange.height > 0 && state.visibleRange && state.visibleRange.width > 0 &&
                    <div
                        style={{
                            position: 'absolute', top: cellMatrix.frozenTopRange.height,
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : cellMatrix.frozenLeftRange.width + state.visibleRange.width + (cellMatrix.frozenRightRange.width > 0 ? cellMatrix.frozenRightRange.width : 0),
                            height: this.isVerticalScrollbarVisible() ? hiddenScrollableElement.clientHeight - cellMatrix.frozenTopRange.height - cellMatrix.frozenBottomRange.height : state.visibleRange.height,
                            zIndex: 2,
                            pointerEvents: 'none',
                            borderLeft: '.1px transparent solid' // delete black line on IE
                        }}
                    >
                        {cellMatrix.frozenLeftRange.width > 0 &&
                            <div
                                className="dg-frozen-left"
                                ref={(frozenLeftScrollableElement: HTMLDivElement) => frozenLeftScrollableElement && this.frozenLeftScrollableElementRefHandler(state, frozenLeftScrollableElement)}
                                style={{
                                    position: 'absolute',
                                    width: cellMatrix.frozenLeftRange.width, height: '100%',
                                    overflow: 'hidden',
                                    boxShadow: '3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1
                                }}>
                                <Pane
                                    id="ML"
                                    state={state}
                                    style={{
                                        height: cellMatrix.height,
                                        background: '#fff',
                                        overflowX: 'hidden', overflowY: 'scroll',
                                        paddingRight: 100
                                    }}
                                    range={cellMatrix.frozenLeftRange.slice(cellMatrix.scrollableRange.slice(state.visibleRange, 'rows'), 'rows')}
                                    borders={{}}
                                />
                            </div>
                        }
                        {cellMatrix.frozenRightRange.width > 0 &&
                            <div
                                className="dg-frozen-right"
                                ref={(frozenRightScrollableElement: HTMLDivElement) => frozenRightScrollableElement && this.frozenRightScrollableElementRefHandler(state, frozenRightScrollableElement)}
                                style={{
                                    position: 'absolute', right: 0,
                                    width: cellMatrix.frozenRightRange.width, height: '100%',
                                    overflow: 'hidden',
                                    boxShadow: '-3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1
                                }}
                            >
                                <Pane
                                    id="MR"
                                    state={state}
                                    style={{
                                        height: cellMatrix.height,
                                        background: '#fff',
                                        paddingRight: 100,
                                        overflowX: 'hidden', overflowY: 'scroll'
                                    }}
                                    range={cellMatrix.frozenRightRange.slice(cellMatrix.scrollableRange.slice(state.visibleRange, 'rows'), 'rows')}
                                    borders={{}}
                                />
                            </div>
                        }
                    </div>
                }
                {
                    cellMatrix.frozenBottomRange.height > 0 && state.visibleRange && state.visibleRange.width > 0 && cellMatrix.rows.length > 1 &&
                    <div
                        className="dg-frozen-bottom"
                        style={{
                            position: 'absolute',
                            bottom: this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : (!this.isVerticalScrollbarVisible() ? `calc(100% - ${cellMatrix.frozenTopRange.height + state.visibleRange.height + cellMatrix.frozenBottomRange.height}px)` : 0),
                            width: this.isHorizontalScrollbarVisible() ? hiddenScrollableElement.clientWidth : cellMatrix.frozenLeftRange.width + state.visibleRange.width + (cellMatrix.frozenRightRange.width > 0 ? cellMatrix.frozenRightRange.width : 0),
                            height: cellMatrix.frozenBottomRange.height,
                            background: '#fff',
                            zIndex: 3,
                            pointerEvents: 'none',
                            boxShadow: '0 -3px 3px -3px rgba(0, 0, 0, .2)'
                        }}>
                        {cellMatrix.frozenLeftRange.width > 0 &&
                            <Pane
                                id="BL"
                                state={state}
                                style={{ position: 'absolute', bottom: 0, left: 0, boxShadow: '3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1 }}
                                range={cellMatrix.frozenLeftRange.slice(cellMatrix.frozenBottomRange, 'rows')}
                                borders={{}}
                            />
                        }
                        {state.visibleRange && state.visibleRange.width > 0 &&
                            <div
                                ref={(frozenBottomScrollableElement: HTMLDivElement) => frozenBottomScrollableElement && this.frozenBottomScrollableElementRefHandler(state, frozenBottomScrollableElement)}
                                style={{
                                    position: 'absolute', bottom: 0, left: cellMatrix.frozenLeftRange.width,
                                    width: `calc(100% - ${cellMatrix.frozenLeftRange.width + cellMatrix.frozenRightRange.width}px)`, height: cellMatrix.frozenBottomRange.height,
                                    overflow: 'hidden'
                                }}>
                                <Pane
                                    id="BC"
                                    state={state}
                                    style={{
                                        width: cellMatrix.scrollableRange.width + 2,
                                        paddingBottom: 100,
                                        overflowX: 'scroll', overflowY: 'hidden'
                                    }}
                                    range={cellMatrix.frozenBottomRange.slice(state.visibleRange, 'columns')}
                                    borders={{}}
                                />
                            </div>
                        }
                        {cellMatrix.frozenRightRange.width > 0 &&
                            <Pane
                                id="BR"
                                state={state}
                                style={{ position: 'absolute', bottom: 0, right: 0, boxShadow: '-3px 0px 3px -3px rgba(0, 0, 0, .2)', zIndex: 1 }}
                                range={cellMatrix.frozenRightRange.slice(cellMatrix.frozenBottomRange, 'rows')}
                                borders={{}}
                            />
                        }
                    </div>
                }
                <div
                    className="dg-viewport"
                    ref={props.viewportElementRefHandler}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: (this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : 0), bottom: (this.isHorizontalScrollbarVisible() && this.isVerticalScrollbarVisible() ? 17 : 0),
                        overflow: 'hidden'
                    }}
                >
                    <div
                        data-cy="dyna-grid"
                        className="dg-content"
                        style={{ width: cellMatrix.width, height: cellMatrix.height }}
                    >
                        {cellMatrix.scrollableRange.height > 0 && cellMatrix.scrollableRange.first.col && cellMatrix.scrollableRange.first.row && cellMatrix.scrollableRange.last.row && state.visibleRange &&
                            <Pane
                                id="MC"
                                state={state}
                                style={{
                                    position: 'absolute', top: cellMatrix.frozenTopRange.height, left: cellMatrix.frozenLeftRange.width,
                                    width: this.isHorizontalScrollbarVisible() ? cellMatrix.width : state.visibleRange.width,
                                    height: this.isVerticalScrollbarVisible() ? cellMatrix.height : state.visibleRange.height,
                                }}
                                range={cellMatrix.scrollableRange.slice(state.visibleRange, 'rows').slice(state.visibleRange, 'columns')}
                                borders={{ right: false, bottom: false }}
                            />
                        }
                        <input
                            style={{
                                position: 'absolute',
                                width: 1,
                                height: 1,
                                opacity: 0,
                                background: 'white'
                            }}
                            ref={(input: HTMLInputElement) => {
                                if (input) {
                                    props.hiddenElementRefHandler(input)
                                    input.setSelectionRange(0, 1)
                                }
                            }}
                            value="&nbsp;"
                        />
                        <Line
                            linePosition={state.linePosition}
                            orientation={state.lineOrientation}
                            cellMatrix={state.cellMatrix}
                        />
                        <Shadow
                            shadowPosition={state.shadowPosition}
                            orientation={state.lineOrientation}
                            cellMatrix={state.cellMatrix}
                            shadowSize={state.shadowSize}
                        />
                        <ContextMenu
                            state={state}
                            onRowContextMenu={(_, menuOptions: MenuOption[]) => props.onRowContextMenu ? props.onRowContextMenu(state.selectedIds, menuOptions) : []}
                            onColumnContextMenu={(_, menuOptions: MenuOption[]) => props.onColumnContextMenu ? props.onColumnContextMenu(state.selectedIds, menuOptions) : []}
                            onRangeContextMenu={(_, menuOptions: MenuOption[]) => props.onRangeContextMenu ? props.onRangeContextMenu(state.selectedRanges, menuOptions) : []}
                            contextMenuPosition={state.contextMenuPosition}
                        />
                    </div>
                </div >
                {state.isFocusedCellInEditMode && state.currentlyEditedCell && <CellEditor state={state} />}
            </div >
        )
    }

    private hiddenScrollableElementRefHandler(state: State, hiddenScrollableElement: HTMLDivElement) {
        state.hiddenScrollableElement = hiddenScrollableElement;
    }

    private frozenTopScrollableElementRefHandler(state: State, frozenTopScrollableElement: HTMLDivElement) {
        this.frozenTopScrollableElement = frozenTopScrollableElement;
        this.frozenTopScrollableElement.scrollLeft = state.hiddenScrollableElement.scrollLeft;
    }

    private frozenRightScrollableElementRefHandler(state: State, frozenRightScrollableElement: HTMLDivElement) {
        this.frozenRightScrollableElement = frozenRightScrollableElement;
        this.frozenRightScrollableElement.scrollTop = state.hiddenScrollableElement.scrollTop;
    }
    private frozenBottomScrollableElementRefHandler(state: State, frozenBottomScrollableElement: HTMLDivElement) {
        this.frozenBottomScrollableElement = frozenBottomScrollableElement;
        this.frozenBottomScrollableElement.scrollLeft = state.hiddenScrollableElement.scrollLeft;
    }
    private frozenLeftScrollableElementRefHandler(state: State, frozenLeftScrollableElement: HTMLDivElement) {
        this.frozenLeftScrollableElement = frozenLeftScrollableElement;
        this.frozenLeftScrollableElement.scrollTop = state.hiddenScrollableElement.scrollTop;
    }

    private scrollHandler = () => {
        const state: State = this.props.state;
        const { scrollTop, scrollLeft } = state.hiddenScrollableElement;

        if (this.frozenTopScrollableElement) {
            this.frozenTopScrollableElement.scrollLeft = scrollLeft;
        }
        if (this.frozenBottomScrollableElement) {
            this.frozenBottomScrollableElement.scrollLeft = scrollLeft;
        }
        if (this.frozenLeftScrollableElement) {
            this.frozenLeftScrollableElement.scrollTop = scrollTop;
        }
        if (this.frozenRightScrollableElement) {
            this.frozenRightScrollableElement.scrollTop = scrollTop;
        }

        if (state.viewportElement) {
            state.viewportElement.scrollTop = scrollTop;
            state.viewportElement.scrollLeft = scrollLeft;
        }

        if (scrollTop < state.minScrollTop || scrollTop > state.maxScrollTop || scrollLeft < state.minScrollLeft || scrollLeft > state.maxScrollLeft) {
            state.updateState((state: State) => recalcVisibleRange(state))
        }
    }

    private isClickedOutOfGrid(event: PointerEvent): boolean {
        const hiddenScrollableElement = this.props.state.hiddenScrollableElement;
        const cellMatrix = this.props.state.cellMatrix;

        const rightEmptySpace = hiddenScrollableElement.clientWidth - cellMatrix.width;
        const bottomEmptySpace = hiddenScrollableElement.clientHeight - cellMatrix.height;

        if (cellMatrix.width > hiddenScrollableElement.clientWidth) {
            if (event.clientX > hiddenScrollableElement.clientWidth + hiddenScrollableElement.getBoundingClientRect().left)
                return true;
        } else {
            if (event.clientX > hiddenScrollableElement.clientWidth - rightEmptySpace + hiddenScrollableElement.getBoundingClientRect().left)
                return true;
        }

        if (cellMatrix.height > hiddenScrollableElement.clientHeight) {
            if (event.clientY > hiddenScrollableElement.clientHeight + hiddenScrollableElement.getBoundingClientRect().top)
                return true;
        } else {
            if (event.clientY > hiddenScrollableElement.clientHeight - bottomEmptySpace + hiddenScrollableElement.getBoundingClientRect().top)
                return true;
        }
        return false;
    }

    private isHorizontalScrollbarVisible(): boolean {
        return this.props.state.hiddenScrollableElement && this.props.state.cellMatrix.width > this.props.state.hiddenScrollableElement.clientWidth;
    }

    private isVerticalScrollbarVisible(): boolean {
        return this.props.state.hiddenScrollableElement && this.props.state.cellMatrix.height > this.props.state.hiddenScrollableElement.clientHeight;
    }
}
