import * as React from "react";
import { zIndex } from "../Common/Constants";
import { CellMatrix } from "..";

export interface LineProps {
    onInitialized: (positionSetter: (position: number) => void) => void
    isVertical: boolean;
    cellMatrix: CellMatrix;
}


export class Line extends React.Component<LineProps, { position: number; }> {

    componentDidMount() {
        this.props.onInitialized(position => this.setState({ position }))
    }

    render() {
        return <div
            style={{
                position: 'absolute',
                background: '#74b9ff',
                top: this.props.isVertical ? 0 : this.state.position,
                left: this.props.isVertical ? this.state.position : 0,
                width: this.props.isVertical ? 2 : this.props.cellMatrix.contentWidth,
                height: this.props.isVertical ? this.props.cellMatrix.contentHeight : 2,
                zIndex: zIndex.line
            }}
        />

    }
}
