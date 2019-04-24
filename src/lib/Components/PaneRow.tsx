import * as React from "react";
import { Pane } from "./Pane";
import { GridContext } from "../Common/GridContext";
import { Borders } from "../Common/Model";
import { Range } from "../Common/Range";

export interface PaneRowProps {
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const PaneRow: React.SFC<PaneRowProps> = (props) =>

    <div
        style={{
            width: props.gridContext.matrix.frozenLeftRange.width + props.gridContext.matrix.scrollableRange.width + props..matrix.frozenRightRange.width,
            height: props.range.height,
            display: 'flex',
            flexDirection: 'row',
            ...props.style
        }}
    >
        {props.matrix.frozenLeftRange.width > 0 &&
            <Pane
                style={{ left: 0, position: 'sticky', zIndex: zIndex.verticalPane }}
                range={props.matrix.frozenLeftRange.slice(props.range, 'rows')}
                borders={{ ...props.borders, right: true }}
                matrix={props.matrix}
            />
        {this.state.visibleRange &&
            <Pane
            style={{ width: matrix.scrollableRange.width }}
            range={props.range.slice(this.state.visibleRange, 'columns')}
            borders={{ ...props.borders }}
            matrix={props.matrix}
        />
        {props.matrix.frozenRightRange.width > 0 &&
            <Pane
                style={{ right: 0, position: 'sticky', zIndex: zIndex.verticalPane }}
                range={{ props.matrix.frozenRightRange.slice(range, 'rows') }}
                {...borders, left: true }
)}
    </div>


