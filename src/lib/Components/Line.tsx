import * as React from "react";
import { CellMatrix } from "../Common";

interface LineProps {
    linePosition: number;
    isVertical: boolean;
    cellMatrix: CellMatrix;
}
export class Line extends React.Component<LineProps> {

    render() {
        const { isVertical, cellMatrix, linePosition } = this.props;
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
                    zIndex: 4
                }}
            />
        )
    }
}
