import * as React from "react";
import { Range, Borders, State } from "../Common";
import { CellFocus } from "./CellFocus";
import { FillHandle } from "./FillHandle";
import { RowRenderer } from "./RowRenderer";
import { PartialArea } from "./PartialArea";

export interface PaneProps {
    id: string
    state: State,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const Pane: React.FunctionComponent<PaneProps> = (props) =>
    <div key={props.id} className="dg-pane" style={{ position: 'relative', width: props.range.width, height: '100%', ...props.style }}>
        {props.range.rows.map((row) => <RowRenderer key={row.idx} state={props.state} row={row} columns={props.range.cols} forceUpdate={true} borders={{ ...props.borders, top: props.borders.top && row.top === 0, bottom: props.borders.bottom && row.idx === props.range.last.row.idx }} />)}
        {props.range.rows.map((row) => <div key={row.idx} style={{ position: 'absolute', boxSizing: 'border-box', top: row.top, height: row.height, width: '100%', borderBottom: '1px #e5e5e5 solid', pointerEvents: 'none' }} />)}
        {props.range.cols.map((col) => <div key={col.idx} style={{ position: 'absolute', boxSizing: 'border-box', left: col.left, width: col.width, height: '100%', borderRight: '1px #e5e5e5 solid', pointerEvents: 'none' }} />)}
        {renderSelectedRanges(props.state, props.range)}
        {props.state.currentBehavior.renderPanePart(props.range)}
        {props.state.focusedLocation && props.range.contains(props.state.focusedLocation) &&
            <CellFocus location={props.state.focusedLocation} />}
        {props.state.selectedRanges[props.state.activeSelectedRangeIdx] && props.range.contains(props.state.selectedRanges[props.state.activeSelectedRangeIdx].last) &&
            <FillHandle state={props.state} location={props.state.selectedRanges[props.state.activeSelectedRangeIdx].last} />}
    </div>

function renderSelectedRanges(state: State, pane: Range) {
    return state.selectedRanges.map((range, i) => !(state.focusedLocation && range.contains(state.focusedLocation) && range.cols.length === 1 && range.rows.length === 1) && pane.intersectsWith(range) && <PartialArea key={i} pane={pane} range={range} style={{
        border: '1px solid rgb(53, 121, 248)',
        backgroundColor: 'rgba(53, 121, 248, 0.15)',
    }} />);
}


