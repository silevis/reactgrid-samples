import * as React from "react";
import { Location } from "../Common";

interface CellFocusProps {
    location: Location
}

export const CellFocus: React.FunctionComponent<CellFocusProps> = (props) => 
    <div 
        className="focusCell"
        style={{
            boxSizing: 'border-box',
            position: 'absolute', 
            top: props.location.row.top,
            left: props.location.col.left,
            width: props.location.col.width,
            height: props.location.row.height,
            zIndex: 2,
            border: 'solid 2px #3579f8'}}
    />

