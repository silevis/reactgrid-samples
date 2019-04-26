import * as React from "react";
import { zIndex } from "../Common/Constants";
import { CellMatrix } from "../Common";

interface LineAndShadowProps {
    onInitialized: (linePositionSetter: (linePosition: number) => void, shadowPositionSetter: (shadowPosition: number) => void) => void
    isVertical: boolean;
    cellMatrix: CellMatrix;
    shadowSize?: number;
}

interface LineAndShadowState {
    linePosition: number;
    shadowPosition: number;
}

export class LineAndShadow extends React.Component<LineAndShadowProps, LineAndShadowState> {
    state = {
        linePosition: -1,
        shadowPosition: -1
    }

    componentDidMount() {
        this.props.onInitialized(
            (linePosition) => this.setState({ linePosition }), 
            (shadowPosition) => this.setState({ shadowPosition})
        );
    }

    render() {
        const { shadowSize, isVertical, cellMatrix } = this.props;
        const { linePosition, shadowPosition } = this.state;
        return (
            (shadowPosition !== -1 || linePosition !== -1) &&
                <>
                    <div
                        style={{
                            position: 'absolute',
                            background: '#666',
                            cursor: '-webkit-grabbing',
                            opacity: 0.3,
                            top: isVertical ? 0 : this.state.shadowPosition,
                            left: isVertical ? this.state.shadowPosition : 0,
                            width: isVertical ? shadowSize : cellMatrix.contentWidth,
                            height: isVertical ? cellMatrix.contentHeight : shadowSize,
                            zIndex: zIndex.colReorderShadow
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            background: '#74b9ff',
                            top: isVertical ? 0 : this.state.linePosition,
                            left: isVertical ? this.state.linePosition : 0,
                            width: isVertical ? 2 : cellMatrix.contentWidth,
                            height: isVertical ? cellMatrix.contentHeight : 2,
                            zIndex: zIndex.line
                        }}
                    />
                </>
        )
    }
}
