import * as React from "react";
import { GridContext, Borders, Location, keyCodes, CellData } from "../Common";

export interface CellRendererProps {
    gridContext: GridContext
    location: Location,
    borders: Borders,
}

export const CellRenderer: React.FunctionComponent<CellRendererProps> = (props) => {
    const state = props.gridContext.state;
    const location = props.location;
    const cell = location.cell;
    const borders = props.borders;
    const isFocused = (state.focusedLocation !== undefined) && (state.focusedLocation.col.idx === props.location.col.idx && state.focusedLocation.row.idx === props.location.row.idx);
    const initialCellData = cell.cellData;

    const style: React.CSSProperties = {
        ...cell.customStyle,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        left: location.col.left,
        top: location.row.top,
        width: location.col.width,
        height: location.row.height,
        // paddingLeft: 2,
        // paddingRight: 2,
        borderTop: borders.top ? 'solid 1px #ccc' : '',
        borderLeft: borders.left ? 'solid 1px #ccc' : '',
        borderBottom: borders.bottom
            ? 'solid 1px #ccc'
            : 'solid 1px #e5e5e5',
        borderRight: borders.right
            ? 'solid 1px #ccc'
            : 'solid 1px #e5e5e5',
        touchAction: isFocused ? 'none' : 'auto' // prevent scrolling
    }
    return (
        <div
            className="cell"
            style={style}
            onBlur={() => {
                if (props.gridContext.lastKeyCode === keyCodes.ESC) {
                    cell.trySetData(initialCellData)
                } else {
                    props.gridContext.commitChanges([{
                        initialData: initialCellData.data,
                        newData: cell.cellData.data,
                        type: cell.cellData.type,
                        rowId: location.row.id,
                        columnId: location.col.id
                    }])
                }

            }}
            onKeyDown={e => { if ([keyCodes.ENTER, keyCodes.ESC].includes(e.keyCode)) e.stopPropagation() }}
        >
            {cell.renderContent({
                isInEditMode: isFocused && props.gridContext.state.isFocusedCellInEditMode,
                lastKeyCode: props.gridContext.lastKeyCode
            })}
        </div>
    )
}