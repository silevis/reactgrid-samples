import * as React from "react";
import { Pane } from "./Pane";
import { GridContext, Borders, Range, zIndex, Row } from "../Common";

export interface PaneRowProps {
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
    zIndex: number
}

export const PaneRow: React.FunctionComponent<PaneRowProps> = (props) => {
    const matrix = props.gridContext.cellMatrix;
    const state = props.gridContext.state
    return (
        <div
            className="dg-pane-row"
            style={{
                width: '100%',
                height: props.range.height,
                position: 'relative',
                display: 'flex',
                flexDirection: 'row',
                ...props.style,
                zIndex: props.zIndex
            }}
        >
            {matrix.frozenLeftRange.width > 0 &&
                <Pane
                    gridContext={props.gridContext}
                    style={{ background: 'white', left: 0, position: 'sticky', zIndex: props.zIndex + 1 }}
                    range={matrix.frozenLeftRange.slice(props.range, 'rows')}
                    borders={{ ...props.borders, right: true }}
                />
            }
            {state.visibleRange && state.visibleRange.width > 0 &&
                <Pane
                    gridContext={props.gridContext}
                    style={{ width: matrix.scrollableRange.width }}
                    range={props.range.slice(state.visibleRange, 'columns')}
                    borders={{ ...props.borders }}
                />
            }
            {matrix.frozenRightRange.width > 0 &&
                <Pane
                    gridContext={props.gridContext}
                    style={{ background: 'white', right: 0, position: 'sticky' }}
                    range={matrix.frozenRightRange.slice(props.range, 'rows')}
                    borders={{ ...props.borders, left: true }}
                />
            }
            {props.range.rows.map(row => <div key={row.idx} className="dg-row" style={{
                boxSizing: 'border-box',
                position: 'absolute',
                left: 0,
                right: 0,
                top: row.top,
                height: row.height,
                zIndex: props.zIndex + 1,
                borderBottom: '1px solid #eee',
            }} />)}
        </div>
    );

}
