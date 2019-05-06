import * as React from "react";
import { Location } from "../Common";

interface CellFocusProps {
    onInitialized: (locationSetter: (location: Location) => void) => void;
}

interface CellFocusState {
    location: Location
}

export class CellFocus extends React.Component<CellFocusProps, CellFocusState> {
    componentDidMount() {
        this.props.onInitialized(
            (location) => {this.setState({ location })}
        );
    }

    render() {
        let top, left, width, height;
        if (this.state && this.state.location) {
            top = this.state.location.row.top;
            left = this.state.location.col.left;
            width = this.state.location.col.width - 4;
            height = this.state.location.row.height - 4;
        }

        return (
            <div 
                className="focusCell"
                style={{
                    position: 'absolute', 
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    zIndex: 2,
                    border: 'solid 2px #3579f8'}}
            />
        )
    }
}
