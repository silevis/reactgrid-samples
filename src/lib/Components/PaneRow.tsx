import * as React from "react";
import { Pane } from "./Pane";
import { GridContext, Borders, Range } from "../Common";

export interface PaneRowProps {
    id: string,
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
    zIndex: number,
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
                    id={props.id + 'L'}
                    gridContext={props.gridContext}
                    style={{ background: 'white', left: 0, position: 'sticky', zIndex: props.zIndex + 1 }}
                    range={matrix.frozenLeftRange.slice(props.range, 'rows')}
                    borders={{ ...props.borders, right: true }}
                />
            }
            {state.visibleRange && state.visibleRange.width > 0 &&
                <Pane
                    id={props.id + 'C'}
                    gridContext={props.gridContext}
                    style={{ width: matrix.scrollableRange.width }}
                    range={props.range.slice(state.visibleRange, 'columns')}
                    borders={{ ...props.borders, right: false, bottom: false }}
                />
            }
            {matrix.frozenRightRange.width > 0 &&
                <Pane
                    id={props.id + 'R'}
                    gridContext={props.gridContext}
                    style={{ background: 'white', right: 0, position: 'sticky' }}
                    range={matrix.frozenRightRange.slice(props.range, 'rows')}
                    borders={{ ...props.borders, left: true }}
                />
            }


        </div>
    );

}
