import * as React from "react";
import { GridContext, Borders, Location } from "../Common";

export interface CellProps {
    gridContext: GridContext
    location: Location,
    borders: Borders
}

export const Cell: React.FunctionComponent<CellProps> = (props) => {
    const state = props.gridContext.state;
    const location = props.location;
    const borders = props.borders;
    const cell = props.gridContext.cellMatrix.getCell(props.location);
    const isFocused = (state.focusedLocation !== undefined) && (state.focusedLocation.col.idx === props.location.col.idx && state.focusedLocation.row.idx === props.location.row.idx);
    const dynamicStyle: React.CSSProperties = {
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
    };

    return <>{cell.render({
        ...cell,
        gridContext: props.gridContext,
        cellKey: location.row.idx + '-' + location.col.idx,
        isInEditMode: isFocused && props.gridContext.state.isFocusedCellInEditMode,
        attributes: {
            style: {
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                position: 'absolute',
                background: 'white',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                left: location.col.left,
                top: location.row.top,
                width: location.col.width,
                height: location.row.height,
                ...dynamicStyle
            }
        }

    })}</>
}
