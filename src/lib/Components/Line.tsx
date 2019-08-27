import * as React from "react";
import { CellMatrix, Orientation } from "../Common";

interface LineProps {
    linePosition: number;
    orientation: Orientation;
    cellMatrix: CellMatrix;
}
export class Line extends React.Component<LineProps> {

    render() {
        const { cellMatrix, linePosition } = this.props;
        const isVertical = this.props.orientation == 'vertical' ? true : false
        return (
            linePosition !== -1 &&
            <div
                style={{
                    position: 'absolute',
                    background: '#74b9ff',
                    top: isVertical ? 0 : this.props.linePosition,
                    left: isVertical ? this.props.linePosition : 0,
                    width: isVertical ? 2 : cellMatrix.width,
                    height: isVertical ? cellMatrix.height : 2,
                    zIndex: 3
                }}
            />
        )
    }
}
