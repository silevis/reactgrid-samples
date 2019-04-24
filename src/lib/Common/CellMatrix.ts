import { Location, Cell, Row, Column, Range, ColProps, RowProps } from './Model';

export interface CellMatrixProps {
    rows: RowProps[];
    columns: ColProps[];
    cells: Cell[][];
    frozenTopRows?: number;
    frozenBottomRows?: number;
    frozenLeftColumns?: number;
    frozenRightColumns?: number;
    // focusLocation?: FocusLocation;
}

export class CellMatrix {
    frozenTopRange: Range;
    frozenBottomRange: Range;
    frozenLeftRange: Range;
    frozenRightRange: Range;
    scrollableRange: Range;
    contentWidth: number;
    contentHeight: number;
    frozenRightStart: number;
    frozenBottomStart: number;
    // focusLocation: FocusLocation;

    readonly cols: Column[];
    readonly rows: Row[];
    readonly first: Location;
    readonly last: Location;

    public cells: Cell[][];

    constructor(props: CellMatrixProps) {
        this.cells = props.cells;
        this.frozenBottomStart = props.rows.length - (props.frozenBottomRows || 0);
        this.frozenRightStart = props.columns.length - (props.frozenRightColumns || 0);
        this.rows = props.rows.reduce(
            (rows, row, idx) => {
                const top =
                    idx === 0 || idx === props.frozenTopRows || idx === this.frozenBottomStart
                        ? 0
                        : rows[idx - 1].top + rows[idx - 1].height;
                rows.push({ ...row, top: top, idx: idx, bottom: top + row.height });
                return rows;
            },
            [] as Row[]
        );
        this.cols = props.columns.reduce(
            (cols, column, idx) => {
                const left =
                    idx === 0 || idx === props.frozenLeftColumns || idx === this.frozenRightStart
                        ? 0
                        : cols[idx - 1].left + cols[idx - 1].width;
                cols.push({ ...column, idx, left, right: left + column.width });
                return cols;
            },
            [] as Column[]
        );
        this.contentWidth = this.cols.reduce((sum, col) => sum + col.width, 0);
        this.contentHeight = this.rows.reduce((sum, row) => sum + row.height, 0);

        this.frozenLeftRange = new Range(this.cols.slice(0, props.frozenLeftColumns || 0), this.rows);
        this.frozenRightRange = new Range(this.cols.slice(this.frozenRightStart, this.cols.length), this.rows);
        this.frozenTopRange = new Range(this.cols, this.rows.slice(0, props.frozenTopRows || 0));
        this.frozenBottomRange = new Range(this.cols, this.rows.slice(this.frozenBottomStart, this.rows.length));
        this.scrollableRange = new Range(
            this.cols.slice(props.frozenLeftColumns || 0, this.frozenRightStart),
            this.rows.slice(props.frozenTopRows || 0, this.frozenBottomStart)
        );
        this.first = this.getLocation(0, 0);
        this.last = this.getLocation(this.rows.length - 1, this.cols.length - 1);
        // this.focusLocation = props.focusLocation;
    }

    getRange(start: Location, end: Location): Range {
        const cols = this.cols.slice(
            start.col.idx < end.col.idx ? start.col.idx : end.col.idx,
            start.col.idx > end.col.idx ? start.col.idx + 1 : end.col.idx + 1
        );
        const rows = this.rows.slice(
            start.row.idx < end.row.idx ? start.row.idx : end.row.idx,
            start.row.idx > end.row.idx ? start.row.idx + 1 : end.row.idx + 1
        );
        return new Range(cols, rows);
    }

    getLocation(rowIdx: number, colIdx: number): Location {
        const properRowIdx = rowIdx < this.rows.length - 1 ? rowIdx : this.rows.length - 1;
        const properColIdx = colIdx < this.cols.length - 1 ? colIdx : this.cols.length - 1;
        return { row: this.rows[properRowIdx], col: this.cols[properColIdx] };
    }

    getCell(location: Location): Cell {
        return this.cells[location.row.idx][location.col.idx];
    }
}
