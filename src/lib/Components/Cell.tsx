import * as React from "react";
import { Borders } from "../Model";
import { CellMatrix } from "../CellMatrix";

export interface CellProps {
    location: Location,
    borders: Borders,
    matrix: CellMatrix
}

export const Cell: React.SFC<CellProps> = (props) => {
    const cell = props.matrix.getCell(props.location);
    const isFocused =
        this.state.focusedLocation &&
        (this.state.focusedLocation.col.idx === location.col.idx &&
            this.state.focusedLocation.row.idx === location.row.idx);

    let isSelected = false;
    for (let range of this.state.selectedRanges) {
        if (!isSelected) {
            isSelected = range.contains(location);
        }
    }
    const dynamicStyle: React.CSSProperties = isFocused
        ? {
            // marginLeft: isFirstCol ? 0 : -1, marginTop: isFirstRow ? 0 : -1,
            // paddingLeft: isFirstCol ? 0 : 1, paddingTop: isFirstRow ? 0 : 1,
            paddingLeft: 0,
            paddingRight: 0,
            border: 'solid 2px #3579f8'
        }
        : {
            paddingLeft: 2,
            paddingRight: 2,
            borderTop: borders.top ? 'solid 1px #CCC' : '',
            borderLeft: borders.left ? 'solid 1px #CCC' : '',
            borderBottom: borders.bottom
                ? 'solid 1px #CCC'
                : borders.bottom === undefined
                    ? 'solid 1px #E0E0E0'
                    : 'solid 1px #E0E0E0',
            borderRight: borders.right
                ? 'solid 1px #CCC'
                : borders.right === undefined
                    ? 'solid 1px #E0E0E0'
                    : 'solid 1px #E0E0E0'
        };

    return cell.render({
        ...cell,
        grid: this,
        cellKey: location.row.idx + '-' + location.col.idx,
        isInEditMode: isFocused && this.state.isFocusedCellInEditMode,
        isReadOnly: cell.isReadOnly,
        isSelected: isSelected,
        isFocused: isFocused,
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

    });
}
