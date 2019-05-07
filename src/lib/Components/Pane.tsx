import * as React from "react";
import { GridContext, Range, Borders, Row, Column, zIndex } from "../Common";
import { Cell } from "./Cell";
import { renderMultiplePartialAreasForPane } from "../Functions/renderPartialAreaForPane";

export interface PaneProps {
    gridContext: GridContext
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const Pane: React.FunctionComponent<PaneProps> = (props) =>
    <div className="dg-pane" style={{ position: 'relative', width: props.range.width, height: '100%', ...props.style }}>
        <div>{props.range.cols.map(renderColumn)}</div>
        {props.range.rows.map((row) =>
            props.range.cols.map((col) => { }
                //<Cell key={row.idx + '-' + col.idx} gridContext={props.gridContext} borders={props.borders} location={{ col, row }} />
            )
        )}
        {renderPartial(props.gridContext, props.range)}
        {props.gridContext.state.currentBehavior.renderPanePart(props.range)}
    </div>


export function renderPartial(gridContext: GridContext, range: Range) {
    return renderMultiplePartialAreasForPane(gridContext, gridContext.state.selectedRanges, range, {
        border: '1px solid rgb(53, 121, 248)',
        backgroundColor: 'rgba(53, 121, 248, 0.1)'
    });
}

export function renderColumn(column: Column): React.ReactNode {
    return (
        <div key={column.idx} className="dg-column" style={{
            boxSizing: 'border-box',
            position: 'absolute',
            left: column.left,
            width: column.width,
            top: 0,
            bottom: 0,
            borderRight: '1px solid #eee',
        }} />
    )
}
