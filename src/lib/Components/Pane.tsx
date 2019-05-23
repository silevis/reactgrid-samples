import * as React from "react";
import { GridContext, Range, Borders } from "../Common";
import { CellFocus } from "./CellFocus";
import { FillHandle } from "./FillHandle";
import { RowRenderer } from "./RowRenderer";
import { PartialArea } from "./PartialArea";

export interface PaneProps {
    id: string
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const Pane: React.FunctionComponent<PaneProps> = (props) =>
    <div key={props.id} className="dg-pane" style={{ position: 'relative', width: props.range.width, height: '100%', ...props.style }}>
        {props.range.rows.map((row) => <RowRenderer key={row.idx} gridContext={props.gridContext} row={row} columns={props.range.cols} forceUpdate={true} borders={{ ...props.borders, top: props.borders.top && row.top === 0, bottom: props.borders.bottom && row.idx === props.range.last.row.idx }} />)}
        {renderSelectedRanges(props.gridContext, props.range)}
        {props.gridContext.currentBehavior.renderPanePart(props.range)}
        {props.gridContext.state.focusedLocation && props.range.contains(props.gridContext.state.focusedLocation) &&
            <CellFocus location={props.gridContext.state.focusedLocation} />}
        {props.gridContext.state.selectedRanges[props.gridContext.state.activeSelectedRangeIdx] && props.range.contains(props.gridContext.state.selectedRanges[props.gridContext.state.activeSelectedRangeIdx].last) &&
            <FillHandle gridContext={props.gridContext} location={props.gridContext.state.selectedRanges[props.gridContext.state.activeSelectedRangeIdx].last} />}
    </div>

function renderSelectedRanges(gridContext: GridContext, pane: Range) {
    const focusedLocation = gridContext.state.focusedLocation;
    return gridContext.state.selectedRanges.map((range, i) => !(focusedLocation && range.contains(focusedLocation) && range.cols.length === 1 && range.rows.length === 1) && pane.intersectsWith(range) && <PartialArea key={i} pane={pane} range={range} style={{
        border: '1px solid rgb(53, 121, 248)',
        backgroundColor: 'rgba(53, 121, 248, 0.15)',
    }} />);
}


