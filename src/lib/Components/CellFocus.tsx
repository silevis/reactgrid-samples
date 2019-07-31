import * as React from "react";
import { Location, Id } from "../Common";

interface CellFocusProps {
    location: Location;
    color?: string;
}

export const CellFocus: React.FunctionComponent<CellFocusProps> = (props) =>
    <div
        className="dg-cell-focus"
        style={{
            boxSizing: 'border-box',
            position: 'absolute',
            top: props.location.row.top - (props.location.row.top === 0 ? 0 : 1),
            left: props.location.col.left - (props.location.col.left === 0 ? 0 : 1),
            width: props.location.col.width + (props.location.col.left === 0 ? 0 : 1),
            height: props.location.row.height + (props.location.row.top === 0 ? 0 : 1),
            border: `solid 2px ${props.color ? props.color : '#3579f8'}`,
            pointerEvents: 'none' // prevent delegating events around cell
        }}
    />

