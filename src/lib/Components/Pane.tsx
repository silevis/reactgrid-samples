import { CellMatrix } from "../CellMatrix";
import { Borders, Range } from "../Model";
import { Cell as Cell } from "./Cell";

export interface PaneProps {
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
    matrix: CellMatrix
}

export const Pane: React.SFC<PaneProps> = (props) => <>{props.range.cols.length > 0 && (
    <div style={{ width: props.range.width, height: props.range.height, ...props.style }}>
        <div style={{ position: 'relative', width: props.range.width, height: props.range.height }}>
            {props.range.rows.map((row, ri) =>
                <div
                    className="row-container"
                    key={ri}
                    style={{ top: row.top, width: 'auto', height: row.height }}
                >
                    {props.range.cols.map((col, ci) =>
                        <Cell location={row, col },
                                        borders={
                        top: borders.top && ri === 0,
            left: borders.left && ci === 0,
            bottom: borders.bottom && ri === range.rows.length - 1,
            right: borders.right && ci === range.cols.length - 1
        } />
    )
)}
                            </div>
                    })}
                    {this.renderPartial(range)}
            {this.state.currentBehavior.renderPanePart(range)}
        </div>
    </div>
)
}</>);
}