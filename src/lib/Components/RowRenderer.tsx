import * as React from 'react'
import { State, Row, Column, Borders, Location } from "../Common";
import { CellRenderer } from './CellRenderer';

export interface RowRendererProps {
    state: State,
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
        return this.props.columns.map((col) => <CellRenderer key={this.props.row.idx + '-' + col.idx} borders={{ ...this.props.borders, left: this.props.borders.left && col.left === 0, right: this.props.borders.right && col.idx === lastColIdx }} state={this.props.state} location={new Location(this.props.row, col)} />)
    }
}