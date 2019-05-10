import * as React from "react";
import { Location } from "../Common";

interface CellFocusProps {
    location: Location
}

export const CellFocus: React.FunctionComponent<CellFocusProps> = (props) =>
    <div
        className="dg-cell-focus"
        style={{
            boxSizing: 'border-box',
            position: 'absolute',
            top: props.location.row.top,
            left: props.location.col.left,
            width: props.location.col.width,
            height: props.location.row.height,
            border: 'solid 2px #3579f8',
            pointerEvents: 'none'
        }}
    />

