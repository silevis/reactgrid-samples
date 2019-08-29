import * as React from "react";
import { PaneRow } from "./PaneRow";
import { Line } from "./Line";
import { Shadow } from "./Shadow";
import { ContextMenu } from "./ContextMenu";
import { MenuOption, State, Id, Range, KeyboardEvent, ClipboardEvent, PointerEvent } from "../Common";
import { CellEditor } from "./CellEditor";

interface DefaultGridRendererProps {
    state: State,
    viewportElementRefHandler: (viewportElement: HTMLDivElement) => void,
    hiddenElementRefHandler: (hiddenFocusElement: HTMLInputElement) => void,
    onScroll: () => void,
    onKeyDown: (event: KeyboardEvent) => void,
    onKeyUp: (event: KeyboardEvent) => void,
    onPointerDown: (event: PointerEvent) => void,
    onCopy: (event: ClipboardEvent) => void,
    onCut: (event: ClipboardEvent) => void,
    onPaste: (event: ClipboardEvent) => void,
    onPasteCapture: (event: ClipboardEvent) => void,
    onContextMenu: (event: PointerEvent) => void,
    onRowContextMenu?: (selectedRowIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onColumnContextMenu?: (selectedColIds: Id[], menuOptions: MenuOption[]) => MenuOption[],
    onRangeContextMenu?: (selectedRanges: Range[], menuOptions: MenuOption[]) => MenuOption[];
}

export const DefaultGridRenderer: React.FunctionComponent<DefaultGridRendererProps> = props =>
    <div
        className="dyna-grid"
        onKeyDown={props.onKeyDown}
        onKeyUp={props.onKeyUp}
        style={{ width: '100%', height: '100%' }}
    >
        <div
            className="dg-viewport"
            ref={props.viewportElementRefHandler}
            style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                MozUserSelect: 'none',
                WebkitUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                overflow: 'auto'
            }}
            onScroll={props.onScroll}
        >
            <div
                data-cy="dyna-grid"
                className="dg-content"
                style={{
                    width: props.state.cellMatrix.width, height: props.state.cellMatrix.height, position: 'relative', outline: 'none'
                }}
                onPointerDown={props.onPointerDown}
                onCopy={props.onCopy}
                onCut={props.onCut}
                onPaste={props.onPaste}
                onPasteCapture={props.onPasteCapture}
                onContextMenu={props.onContextMenu}
            >
                {props.state.cellMatrix.frozenTopRange.height > 0 &&
                    <PaneRow id='T'
                        state={props.state}
                        style={{ background: 'white', top: 0, position: 'sticky', boxShadow: '0 3px 3px -3px rgba(0, 0, 0, .2)' }}
                        range={props.state.cellMatrix.frozenTopRange}
                        borders={{ bottom: true }}
                        zIndex={3}
                    />}
                {props.state.cellMatrix.scrollableRange.height > 0 && props.state.cellMatrix.scrollableRange.first.col && props.state.cellMatrix.scrollableRange.first.row && props.state.cellMatrix.scrollableRange.last.row && props.state.visibleRange &&
                    <PaneRow
                        id='M'
                        state={props.state}
                        style={{ height: props.state.cellMatrix.scrollableRange.height }}
                        range={props.state.cellMatrix.scrollableRange.slice(props.state.visibleRange, 'rows')}
                        borders={{}}
                        zIndex={0}
                    />}
                {props.state.cellMatrix.frozenBottomRange.height > 0 && props.state.cellMatrix.rows.length > 1 &&
                    <PaneRow
                        id='B'
                        state={props.state}
                        style={{ background: 'white', bottom: 0, position: 'sticky', boxShadow: '0 -3px 3px -3px rgba(0, 0, 0, .2)' }}
                        range={props.state.cellMatrix.frozenBottomRange}
                        borders={{ top: true }}
                        zIndex={3}
                    />}
                <input className="dg-hidden-element" readOnly={true} style={{ position: 'fixed', width: 1, height: 1, opacity: 0 }} ref={props.hiddenElementRefHandler} />
                <Line
                    linePosition={props.state.linePosition}
                    orientation={props.state.lineOrientation}
                    cellMatrix={props.state.cellMatrix}
                />
                <Shadow
                    shadowPosition={props.state.shadowPosition}
                    orientation={props.state.lineOrientation}
                    cellMatrix={props.state.cellMatrix}
                    shadowSize={props.state.shadowSize}
                />
                <ContextMenu
                    state={props.state}
                    onRowContextMenu={(_, menuOptions: MenuOption[]) => props.onRowContextMenu ? props.onRowContextMenu(props.state.selectedIds, menuOptions) : []}
                    onColumnContextMenu={(_, menuOptions: MenuOption[]) => props.onColumnContextMenu ? props.onColumnContextMenu(props.state.selectedIds, menuOptions) : []}
                    onRangeContextMenu={(_, menuOptions: MenuOption[]) => props.onRangeContextMenu ? props.onRangeContextMenu(props.state.selectedRanges, menuOptions) : []}
                    contextMenuPosition={props.state.contextMenuPosition}
                />
            </div>
        </div >
        {props.state.isFocusedCellInEditMode && props.state.currentlyEditedCell && <CellEditor state={props.state} />}
    </div>