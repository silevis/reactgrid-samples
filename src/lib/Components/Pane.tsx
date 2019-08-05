import * as React from "react";
import { Range, Borders, State, keyCodes } from "../Common";
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
    className?: string
}

interface RowsProps {
    state: State;
    range: Range;
    borders: Borders;
}

class GridContent extends React.Component<RowsProps>{

    shouldComponentUpdate(nextProps: RowsProps) {
        if (this.props.state.focusedLocation && nextProps.state.focusedLocation) {
            if ((this.props.state.focusedLocation.col.id !== nextProps.state.focusedLocation.col.id || this.props.state.focusedLocation.row.id !== nextProps.state.focusedLocation.row.id) && // needed when select range by touch
                nextProps.state.lastKeyCode !== keyCodes.ENTER && nextProps.state.lastKeyCode !== keyCodes.TAB) // improved performance during moving focus inside range
                return true;
        } else {
            return true; // needed when select range by touch after first focus
        }
        return this.props.state.visibleRange != nextProps.state.visibleRange || this.props.state.cellMatrix.props != nextProps.state.cellMatrix.props;
    }

    render() {
        return (
            <>
                {this.props.range.rows.map((row) => <RowRenderer key={row.idx} state={this.props.state} row={row} columns={this.props.range.cols} forceUpdate={true} borders={{ ...this.props.borders, top: this.props.borders.top && row.top === 0, bottom: this.props.borders.bottom && row.idx === this.props.range.last.row.idx }} />)}
                {this.props.range.rows.map((row) => <div key={row.idx} style={{ position: 'absolute', boxSizing: 'border-box', top: row.top, height: row.height, width: '100%', borderBottom: '1px #e5e5e5 solid', pointerEvents: 'none' }} />)}
                {this.props.range.cols.map((col) => <div key={col.idx} style={{ position: 'absolute', boxSizing: 'border-box', left: col.left, width: col.width, height: '100%', borderRight: '1px #e5e5e5 solid', pointerEvents: 'none' }} />)}
            </>
        )
    }
}

export const Pane: React.FunctionComponent<PaneProps> = (props) =>
    <div key={props.id} className="dg-pane" style={{ position: 'relative', width: props.range.width, height: '100%', ...props.style }}>
        <GridContent state={props.state} range={props.range} borders={props.borders} />
        {renderSelectedRanges(props.state, props.range)}
        {props.state.currentBehavior.renderPanePart(props.state, props.range)}
        {props.state.customFocuses.map((focus, id) => props.range.contains(props.state.cellMatrix.getLocationById(focus.rowId, focus.colId)) &&
            <CellFocus key={id} location={props.state.cellMatrix.getLocationById(focus.rowId, focus.colId)} color={focus.color} />)}
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