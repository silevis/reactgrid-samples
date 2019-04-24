import * as React from "react";
import { Borders, Range } from "../Model";
import { zIndex } from "../Common/Constants";
import { Pane } from "./Pane";

export interface PaneRowProps {
    style: React.CSSProperties,
    range: Range,
    borders: Borders,

}

export const PaneRow: React.SFC<PaneRowProps> = (props) => <>{(props.range.rows.length > 0) &&

    <div
        style={{
            width: props.matrix.frozenLeftRange.width + props.matrix.scrollableRange.width + props.matrix.frozenRightRange.width,
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

}</>;
}
