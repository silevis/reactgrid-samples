import * as React from "react";
import { Range } from "../Common";

export interface PartialRangeProps {
    range: Range,
    pane: Range,
    style: React.CSSProperties
}

export const PartialArea: React.FunctionComponent<PartialRangeProps> = (props) => {
    const { range, pane, style } = props;
    const top = (range.first.row.idx <= pane.first.row.idx) ? pane.first.row.top : range.first.row.top;
    const left = (range.first.col.idx <= pane.first.col.idx) ? pane.first.col.left : range.first.col.left;
    const width = (range.last.col.idx > pane.last.col.idx ? pane.last.col.right : range.last.col.right) - left;
    const height = (range.last.row.idx > pane.last.row.idx ? pane.last.row.bottom : range.last.row.bottom) - top;
    const hasTopBorder = range.first.row.idx >= pane.first.row.idx;
    const hasBottomBorder = range.last.row.idx <= pane.last.row.idx;
    const hasRightBorder = range.last.col.idx <= pane.last.col.idx;
    const hasLeftBorder = range.first.col.idx >= pane.first.col.idx;
    return (
        <div
            key={range.first.col.idx + pane.last.col.idx}
            style={{
                ...style,
                boxSizing: 'border-box',
                position: 'absolute',
                pointerEvents: 'none',
                top: top - (top === 0 ? 0 : 1), left: left - (left === 0 ? 0 : 1),
                width: width + (left === 0 ? 0 : 1), height: height + (top === 0 ? 0 : 1),
                borderTop: hasTopBorder ? (style.borderTop ? style.borderTop : style.border) : '',
                borderBottom: hasBottomBorder ? (style.borderBottom ? style.borderBottom : style.border) : '',
                borderRight: hasRightBorder ? (style.borderRight ? style.borderRight : style.border) : '',
                borderLeft: hasLeftBorder ? (style.borderLeft ? style.borderLeft : style.border) : '',
            }}
        />
    )
}