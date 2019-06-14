import * as React from "react";
import { CellMatrix } from "../Common";

interface ShadowProps {
    onInitialized: (shadowPositionSetter: (shadowPosition: number) => void) => void
    isVertical: boolean;
    cellMatrix: CellMatrix;
    shadowSize?: number;
}

interface ShadowState {
    shadowPosition: number;
}

export class Shadow extends React.Component<ShadowProps, ShadowState> {
    state = {
        shadowPosition: -1
    }

    componentDidMount() {
        this.props.onInitialized(
            (shadowPosition) => this.setState({ shadowPosition })
        );
    }

    render() {
        const { shadowSize, isVertical, cellMatrix } = this.props;
        const { shadowPosition } = state;
        return (
            shadowPosition !== -1 &&
            <div
                style={{
                    position: 'fixed',
                    background: '#000',
                    cursor: '-webkit-grabbing',
                    opacity: 0.1,
                    top: isVertical ? 0 : state.shadowPosition,
                    left: isVertical ? state.shadowPosition : 0,
                    width: isVertical ? shadowSize : cellMatrix.width,
                    height: isVertical ? cellMatrix.height : shadowSize,
                    zIndex: 4
                }}
            />
        )
    }
}
