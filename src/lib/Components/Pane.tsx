import * as React from "react";
import { GridContext, Range, Borders } from "../Common";
import { Cell } from "./Cell";
import { renderMultiplePartialAreasForPane } from "../Functions/renderPartialAreaForPane";

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
                    {props.range.cols.map((col, ci) => <Cell key={ci} gridContext={props.gridContext} borders={props.borders} location={{ col, row }} />)}
                </div>
            )}
            {renderPartial(props.gridContext, props.range)}
            {/* Odkomentowanie tego powoduje błąd po kliknięciu w komórkę -- RangeError: Maximum call stack size exceeded*/}
            {props.gridContext.state.currentBehavior.renderPanePart(props.range)}
        </div>
    </div>

export function renderPartial(gridContext: GridContext, range: Range) {
    return renderMultiplePartialAreasForPane(gridContext, gridContext.state.selectedRanges, range, {
        border: '1px solid rgb(53, 121, 248)',
        backgroundColor: 'rgba(53, 121, 248, 0.1)'
    });
}