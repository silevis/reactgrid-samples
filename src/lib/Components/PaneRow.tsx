import * as React from "react";
import { Pane } from "./Pane";
import { GridContext, Borders, Range, zIndex } from "../Common";

export interface PaneRowProps {
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const PaneRow: React.SFC<PaneRowProps> = (props) => {
    const matrix = props.gridContext.cellMatrix;
    const state = props.gridContext.state
    return (
        <div
            style={{
                width: matrix.frozenLeftRange.width + matrix.scrollableRange.width + matrix.frozenRightRange.width,
                height: props.range.height,
                display: 'flex',
                flexDirection: 'row',
                ...props.style
            }}
        >
            {matrix.frozenLeftRange.width > 0 &&
                <Pane
                    gridContext={props.gridContext}
                    style={{ left: 0, position: 'sticky', zIndex: zIndex.verticalPane }}
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
                    style={{ right: 0, position: 'sticky', zIndex: zIndex.verticalPane }}
                    range={matrix.frozenRightRange.slice(props.range, 'rows')}
                    borders={{ ...props.borders, left: true }}
                />
            }
        </div>
    );

}



