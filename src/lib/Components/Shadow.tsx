import * as React from "react";
import { zIndex } from "../Common/Constants";
import { CellMatrix } from "..";

export interface ShadowProps {
    isVertical: boolean;
    position: number;
    size: number;
    cellMatrix: CellMatrix;
}

export const Shadow: React.SFC<ShadowProps> = (props) =>
    <div
        style={{
            position: 'absolute',
            background: '#666',
            cursor: '-webkit-grabbing',
            opacity: 0.3,
            top: props.isVertical ? 0 : props.position,
            left: props.isVertical ? props.position : 0,
            width: props.isVertical ? props.size : props.cellMatrix.contentWidth,
            height: props.isVertical ? props.cellMatrix.contentHeight : props.size,
            zIndex: zIndex.colReorderShadow
        }}
    />
