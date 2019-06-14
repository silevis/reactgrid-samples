import * as React from "react";
import { CellMatrix } from "../Common";

interface LineProps {
    onInitialized: (linePositionSetter: (linePosition: number) => void) => void
    isVertical: boolean;
    cellMatrix: CellMatrix;
    shadowSize?: number;
}

interface LineState {
    linePosition: number;
}

export class Line extends React.Component<LineProps, LineState> {
    state = {
        linePosition: -1,
    }

    componentDidMount() {
        this.props.onInitialized(
            (linePosition) => this.setState({ linePosition }),
        );
    }

    render() {
        const { isVertical, cellMatrix } = this.props;
        const { linePosition } = state;
        return (
            linePosition !== -1 &&
            <div
                style={{
                    position: 'absolute',
                    background: '#74b9ff',
                    top: isVertical ? 0 : state.linePosition,
                    left: isVertical ? state.linePosition : 0,
                    width: isVertical ? 2 : cellMatrix.width,
                    height: isVertical ? cellMatrix.height : 2,
                    zIndex: 4
                }}
            />
        )
    }
}
