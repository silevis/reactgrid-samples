import * as React from "react";
import { Borders, Range } from "../Model";
import { CellMatrix } from "../CellMatrix";
import { zIndex } from "../Common/Constants";

export interface RowPaneProps {
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
    matrix: CellMatrix
}

export const RowPane: React.SFC<RowPaneProps> = (props) => <>{(props.range.rows.length > 0) &&

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
            <ColumnPane
                style={left: 0, position: 'sticky', zIndex: zIndex.verticalPane }
matrix.frozenLeftRange.slice(range, 'rows'),
                        {...borders, right: true }, matrix
/>
                {this.state.visibleRange &&
            ColumnPane(
                { width: matrix.scrollableRange.width },
                range.slice(this.state.visibleRange, 'columns'),
                { ...borders }
            )}
        {matrix.frozenRightRange.width > 0 &&
            ColumnPane(
                { right: 0, position: 'sticky', zIndex: zIndex.verticalPane },
                matrix.frozenRightRange.slice(range, 'rows'),
                { ...borders, left: true }
            )}
    </div>

}</>;
}
