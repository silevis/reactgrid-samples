import * as React from "react";
import { Range } from "../Common";

export interface PartialAreaProps {
    area: any,
    pane: Range,
    style: React.CSSProperties
}

export const PartialArea: React.SFC<PartialAreaProps> = (props) => {
    const { area, pane, style } = props;
    if (
        area.first.col.idx > pane.last.col.idx ||
        area.last.col.idx < pane.first.col.idx ||
        area.first.row.idx > pane.last.row.idx ||
        area.last.row.idx < pane.first.row.idx
    ) {
        return <></>;
    }
    const isAdjecentToFrozenTop = area.first.row.idx <= pane.first.row.idx;
    const isAdjecentToFrozenLeft = area.first.col.idx <= pane.first.col.idx;
    const left = isAdjecentToFrozenLeft ? pane.first.col.left : area.first.col.left;
    const width =
        (area.last.col.idx > pane.last.col.idx
            ? pane.last.col.left + pane.last.col.width
            : area.last.col.left + area.last.col.width) - left;
    const top = isAdjecentToFrozenTop ? pane.first.row.top : area.first.row.top;
    const height =
        (area.last.row.idx > pane.last.row.idx
            ? pane.last.row.top + pane.last.row.height
            : area.last.row.top + area.last.row.height) - top;
    const isBorderTop = area.first.row.idx >= pane.first.row.idx;
    const isBorderBottom = area.last.row.idx <= pane.last.row.idx;
    const isBorderRight = area.last.col.idx <= pane.last.col.idx;
    const isBorderLeft = area.first.col.idx >= pane.first.col.idx;
    return (
        <div
            key={area.first.col.idx + pane.last.col.idx}
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
                pointerEvents: 'none'
            }}
        />
    );
}