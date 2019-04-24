import * as React from "react";
import { zIndex } from "../Common/Constants";
import { CellMatrix } from "..";

export interface LineProps {
    isVertical: boolean;
    position: number;
    cellMatrix: CellMatrix;
}

export const Line: React.SFC<LineProps> = (props) =>
    <div
        style={{
            position: 'absolute',
            background: '#74b9ff',
            top: props.isVertical ? 0 : props.position,
            left: props.isVertical ? props.position : 0,
            width: props.isVertical ? 2 : props.cellMatrix.contentWidth,
            height: props.isVertical ? props.cellMatrix.contentHeight : 2,
            zIndex: zIndex.line
        }}
    />
