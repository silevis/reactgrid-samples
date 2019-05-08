import * as React from "react";
import { Range } from "../Common";

export interface PartialRangeProps {
    range: Range,
    pane: Range,
    style: React.CSSProperties
}

export const PartialArea: React.SFC<PartialRangeProps> = (props) => {
    const { range, pane, style } = props;
    if (
        !range ||
        !range.first ||
        !range.last ||
        range.first.col.idx > pane.last.col.idx ||
        range.last.col.idx < pane.first.col.idx ||
        range.first.row.idx > pane.last.row.idx ||
        range.last.row.idx < pane.first.row.idx
    ) {
        return <></>;
    }
    const isAdjecentToFrozenTop = range.first.row.idx <= pane.first.row.idx;
    const isAdjecentToFrozenLeft = range.first.col.idx <= pane.first.col.idx;
    const left = isAdjecentToFrozenLeft ? pane.first.col.left : range.first.col.left;
    const width =
        (range.last.col.idx > pane.last.col.idx
            ? pane.last.col.left + pane.last.col.width
            : range.last.col.left + range.last.col.width) - left;
    const top = isAdjecentToFrozenTop ? pane.first.row.top : range.first.row.top;
    const height =
        (range.last.row.idx > pane.last.row.idx
            ? pane.last.row.top + pane.last.row.height
            : range.last.row.top + range.last.row.height) - top;
    const isBorderTop = range.first.row.idx >= pane.first.row.idx;
    const isBorderBottom = range.last.row.idx <= pane.last.row.idx;
    const isBorderRight = range.last.col.idx <= pane.last.col.idx;
    const isBorderLeft = range.first.col.idx >= pane.first.col.idx;
    return (
        <div
            key={range.first.col.idx + pane.last.col.idx}
            style={{
                ...style,
                top: isAdjecentToFrozenTop ? top : top - 1,
                left: isAdjecentToFrozenLeft ? left : left - 1,
                borderTop: isBorderTop ? (style.borderTop ? style.borderTop : style.border) : '',
                borderBottom: isBorderBottom ? (style.borderBottom ? style.borderBottom : style.border) : '',
                borderRight: isBorderRight ? (style.borderRight ? style.borderRight : style.border) : '',
                borderLeft: isBorderLeft ? (style.borderLeft ? style.borderLeft : style.border) : '',
                position: 'absolute',
                width: isBorderLeft && isAdjecentToFrozenLeft ? width - 2 : width - 1,
                height: isBorderTop && isAdjecentToFrozenTop ? height - 2 : height - 1,
                pointerEvents: 'none',
            }}
        />
    );
}