import * as React from "react";
import { CellMatrix } from "../Common";

interface ShadowProps {
    shadowPosition: number;
    isVertical: boolean;
    cellMatrix: CellMatrix;
    shadowSize?: number;
}


export class Shadow extends React.Component<ShadowProps> {

    render() {
        const { shadowSize, isVertical, cellMatrix } = this.props;
        return (
            this.props.shadowPosition !== -1 &&
            <div
                style={{
                    position: 'fixed',
                    background: '#000',
                    cursor: '-webkit-grabbing',
                    opacity: 0.1,
                    top: isVertical ? 0 : this.props.shadowPosition,
                    left: isVertical ? this.props.shadowPosition : 0,
                    width: isVertical ? shadowSize : cellMatrix.width,
                    height: isVertical ? cellMatrix.height : shadowSize,
                    zIndex: 4
                }}
            />
        )
    }
}
