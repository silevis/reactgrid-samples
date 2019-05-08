import { Column, Row, Location } from "./Model";

export class Range {
    readonly width: number = 0;
    readonly height: number = 0;
    readonly first!: Location;
    readonly last!: Location;

    constructor(public readonly cols: Column[], public readonly rows: Row[]) {
        this.first = { row: this.rows[0], col: this.cols[0] };
        this.last = { row: this.rows[this.rows.length - 1], col: this.cols[this.cols.length - 1] };
        this.height = this.rows.map(c => c.height).reduce((a, b) => a + b);
        this.width = this.cols.map(c => c.width).reduce((a, b) => a + b);
    }

    contains(location: Location): boolean {
        return (
            location.col.idx >= this.first.col.idx &&
            location.col.idx <= this.last.col.idx &&
            location.row.idx >= this.first.row.idx &&
            location.row.idx <= this.last.row.idx
        );
    }

    containsRange(range: Range): boolean {
        return (
            range.first.col.idx >= this.first.col.idx &&
            range.first.row.idx >= this.first.row.idx &&
            range.last.col.idx <= this.last.col.idx &&
            range.last.row.idx <= this.last.row.idx
        );
    }

    intersectsWith(range: Range): boolean {
        return (
            range.first.col.idx <= this.last.col.idx &&
            range.first.row.idx <= this.last.row.idx &&
            range.last.col.idx >= this.first.col.idx &&
            range.last.row.idx >= this.first.row.idx
        )
    }

    slice(range: Range, direction: 'columns' | 'rows' | 'both'): Range {
        const firstRow = direction === 'rows' ? range.first.row : this.first.row;
        const firstCol = direction === 'columns' ? range.first.col : this.first.col;
        const lastRow = direction === 'rows' ? range.last.row : this.last.row;
        const lastCol = direction === 'columns' ? range.last.col : this.last.col;
        const slicedRows = this.rows.slice(this.rows.indexOf(firstRow), this.rows.indexOf(lastRow) + 1);
        const slicedCols = this.cols.slice(this.cols.indexOf(firstCol), this.cols.indexOf(lastCol) + 1);
        return new Range(slicedCols, slicedRows);
    }
}