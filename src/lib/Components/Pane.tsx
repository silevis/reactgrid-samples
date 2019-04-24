import { GridContext, Range, Borders } from "../Common";

export interface PaneProps {
    gridContext: GridContext
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const Pane: React.SFC<PaneProps> = (props) =>
    <div style={{ width: props.range.width, height: props.range.height, ...props.style }}>
        <div style={{ position: 'relative', width: props.range.width, height: props.range.height }}>
            {props.range.rows.map((row, ri) =>
                <div key={ri} style={{ top: row.top, width: 'auto', height: row.height }}>
                    {props.range.cols.map((col, ci) => props.gridContext.cellMatrix.getCell({ row, col }).render({}))}
                </div>
            )}
            {props.gridContext.state.currentBehavior.renderPanePart(props.range)}
        </div>
    </div>
