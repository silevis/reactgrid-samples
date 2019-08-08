import * as React from "react";
import { CellMatrix, Orientation } from "../Common";

interface ShadowProps {
    shadowPosition: number;
    orientation: Orientation;
    cellMatrix: CellMatrix;
    shadowSize: number;
    verticalOffset: number;
    horizontalOffset: number;
}


export class Shadow extends React.Component<ShadowProps> {

    render() {
        const { shadowSize, shadowPosition, cellMatrix } = this.props;
        const isVertical = this.props.orientation == 'vertical' ? true : false
        return (
            this.props.shadowPosition !== -1 &&
            <div
                style={{
                    position: 'absolute',
                    background: '#000',
                    cursor: '-webkit-grabbing',
                    opacity: 0.1,
                    top: (isVertical ? 0 : shadowPosition),
                    left: (isVertical ? shadowPosition : 0),
                    width: isVertical ? shadowSize : cellMatrix.width,
                    height: isVertical ? cellMatrix.height : shadowSize,
                    zIndex: 4
                }}
            />
        )
    }
}
