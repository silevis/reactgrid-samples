import * as React from 'react'
import { GridContext, Row, Column, Borders } from "../Common";
import { CellRenderer } from './Cell';

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
        return this.props.columns.map((col) => <CellRenderer key={this.props.row.idx + '-' + col.idx} borders={{ ...this.props.borders, left: this.props.borders.left && col.left === 0, right: this.props.borders.right && col.idx === lastColIdx }} gridContext={this.props.gridContext} location={{ col, row: this.props.row }} />)
    }
}