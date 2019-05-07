import * as React from "react";
import { GridContext, Range, Borders, Row, Column, zIndex } from "../Common";
import { Cell } from "./Cell";
import { renderMultiplePartialAreasForPane } from "../Functions/renderPartialAreaForPane";

export interface PaneProps {
    id: string
    gridContext: GridContext,
    style: React.CSSProperties,
    range: Range,
    borders: Borders,
}

export const Pane: React.FunctionComponent<PaneProps> = (props) =>
    <div key={props.id} className="dg-pane" style={{ position: 'relative', width: props.range.width, height: '100%', ...props.style }}>
        {/* <div>{props.range.cols.map(renderColumn)}</div> */}
        {props.range.rows.map((row) => <RowRenderer key={row.idx} gridContext={props.gridContext} row={row} columns={props.range.cols} forceUpdate={false} borders={{ ...props.borders, top: props.borders.top && row.top === 0, bottom: props.borders.bottom && row.idx === props.range.last.row.idx }} />)}
        {renderPartial(props.gridContext, props.range)}
        {props.gridContext.state.currentBehavior.renderPanePart(props.range)}
    </div>

export function renderPartial(gridContext: GridContext, range: Range) {
    return renderMultiplePartialAreasForPane(gridContext, gridContext.state.selectedRanges, range, {
        border: '1px solid rgb(53, 121, 248)',
        backgroundColor: 'rgba(53, 121, 248, 0.1)',
        zIndex: 2
    });
}

// export function renderColumn(column: Column): React.ReactNode {
//     return (
//         <div key={column.idx} className="dg-column" style={{
//             boxSizing: 'border-box',
//             position: 'absolute',
//             left: column.left,
//             width: column.width,
//             top: 0,
//             bottom: 0,
//             borderRight: '1px solid #eee',
//         }} />
//     )
// }

export interface RowRendererProps {
    gridContext: GridContext,
    row: Row,
    columns: Column[],
    forceUpdate: boolean,
    borders: Borders
}

export class RowRenderer extends React.Component<RowRendererProps, {}> {
    shouldComponentUpdate(nextProps: RowRendererProps) {
        return nextProps.forceUpdate || nextProps.columns[0].idx !== this.props.columns[0].idx || nextProps.columns.length !== this.props.columns.length;
    }

    render() {
        const lastColIdx = this.props.columns[this.props.columns.length - 1].idx;
        return this.props.columns.map((col) => <Cell key={this.props.row.idx + '-' + col.idx} borders={{ ...this.props.borders, left: this.props.borders.left && col.left === 0, right: this.props.borders.right && col.idx === lastColIdx }} gridContext={this.props.gridContext} location={{ col, row: this.props.row }} />)
    }
}


