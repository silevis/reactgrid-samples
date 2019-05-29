import * as React from "react";
import { GridContext, Borders, Location } from "../Common";

export interface CellRendererProps {
    gridContext: GridContext
    location: Location,
    borders: Borders,
}

export const CellRenderer: React.FunctionComponent<CellRendererProps> = (props) => {
    const state = props.gridContext.state;
    const location = props.location;
    const borders = props.borders;
    const cell = props.gridContext.cellMatrix.getCell(props.location);
    const isFocused = (state.focusedLocation !== undefined) && (state.focusedLocation.col.idx === props.location.col.idx && state.focusedLocation.row.idx === props.location.row.idx);

    const style: React.CSSProperties = {
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
        paddingLeft: 2,
        paddingRight: 2,
        borderTop: borders.top ? 'solid 1px #ccc' : '',
        borderLeft: borders.left ? 'solid 1px #ccc' : '',
        borderBottom: borders.bottom
            ? 'solid 1px #ccc'
            : 'solid 1px #e5e5e5',
        borderRight: borders.right
            ? 'solid 1px #ccc'
            : 'solid 1px #e5e5e5'
    }
    return (
        <div
            key={location.row.idx + '-' + location.col.idx}
            className="cell"
            style={style}
            onKeyDown={() => console.log('key down')}
        >
            {cell.renderContent({
                cellData: cell.cellData,
                onValueChanged: cell.trySetData,
                gridContext: props.gridContext,
                isInEditMode: isFocused && props.gridContext.state.isFocusedCellInEditMode,
            })}
        </div>
    )
}
