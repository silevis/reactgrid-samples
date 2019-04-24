import * as React from 'react';
import { Range, MenuOption } from '../Model';
import { Behavior } from '../Common/Behavior';
import { DelegateBehavior } from "./DelegateBehavior";
import { Grid } from '../Components/Gridonents/Grid';
import { zIndex } from '../Common/Constants';
import '../Cells/Cell.css';
import { Utilities } from '../Common/Utilities';
import { DefaultGridBehavior } from 'ReactDynaGrid/lib/Behaviors';

export class DrawContextMenuBehavior extends DelegateBehavior {
    root: HTMLDivElement;

    constructor(inner: Behavior, grid: Grid, private event: any) {
        super(inner);
        this.grid = grid;
    }

    dispose = () => {
        this.innerBehavior.dispose();
    };

    private renderContextMenu(pane: Range) {
        return (
            <div
                style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: 900 }}
                onTouchStart={e => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onTouchEnd={e => {
                    e.stopPropagation();
                }}
                onContextMenu={e => this.contextMenuHandler(e)}
                onDoubleClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            />
                { this.renderCustomContextMenu(pane) }
        );
    }

    private renderCustomContextMenu(pane): JSX.Element {
        const selectedRows: Range[] = this.grid.selectRows(this.grid.state.selectedRowsIdx);
        const options: MenuOption[] = this.grid.props.onContextMenu(this.grid.state.selectedRanges, selectedRows);
        if (this.grid.props.cellMatrix.scrollableRange.containsRange(pane)) {
            const clickX =
                this.event.type === 'contextmenu'
                    ? this.event.clientX
                    : this.event.type === 'touchend'
                        ? this.event.changedTouches[0].clientX
                        : null;
            const clickY =
                this.event.type === 'contextmenu'
                    ? this.event.clientY
                    : this.event.type === 'touchend'
                        ? this.event.changedTouches[0].clientY
                        : null;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const right = screenW - clickX > 120;
            const left = !right;
            const top = screenH - clickY > 25;
            const bottom = !top;
            let stylePosition = { left: null, top: null };
            if (right) {
                stylePosition.left = `${clickX + 5}px`;
            }
            if (left) {
                stylePosition.left = `${clickX - 120 - 5}px`;
            }
            if (top) {
                stylePosition.top = `${clickY + 5}px`;
            }
            if (bottom) {
                stylePosition.top = `${clickY - 25 - 5}px`;
            }

            const style = { width: '100px', fontSize: '13px', cursor: 'pointer', overflow: 'hidden' };
            return (
                <div
                    style={{
                        ...stylePosition,
                        height: 'auto',
                        position: 'fixed',
                        background: 'white',
                        boxShadow: '0 4px 5px 3px rgba(0, 0, 0, 0.2)',
                        zIndex: zIndex.contextMenu
                    }}
                >
                    {options.map((option, idx) => {
                        return (
                            <div
                                className="context-menu-option"
                                key={idx}
                                style={style}
                                onMouseDown={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={e => {
                                    e.stopPropagation();
                                    option.handler();
                                    this.contextMenuHandler(e);
                                }}
                                onTouchStart={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onTouchEnd={e => {
                                    e.stopPropagation();
                                    option.handler();
                                }}
                            >
                                {option.name}
                            </div>
                        );
                    })}
                </div>
            );
        }
    }

    private contextMenuHandler(e: React.MouseEvent<HTMLDivElement>) {
        this.grid.changeBehavior(new DefaultGridBehavior(this.grid), false);
        Utilities.createSelectionFromFocusedLocation(this.grid);
    }

    renderPanePart = (pane: Range): React.ReactNode => {
        return (
            <>
                {this.innerBehavior.renderPanePart(pane)}
                {this.renderContextMenu(pane)}
            </>
        );
    };
}
