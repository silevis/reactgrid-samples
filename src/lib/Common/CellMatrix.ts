import { Location, Cell, Row, Column, ColProps, RowProps } from "./Model";
import { Range } from "./Range";

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
    width: number;
    height: number;
    //frozenRightFirstIdx: number;
    //frozenBottomFirstIdx: number;
    // focusLocation: FocusLocation;

    readonly cols: Column[];
    readonly rows: Row[];
    readonly first: Location;
    readonly last: Location;

    public cells: Cell[][];

    constructor(props: CellMatrixProps) {
        this.cells = props.cells;
        const frozenBottomFirstIdx = props.rows.length - (props.frozenBottomRows || 0);
        const frozenRightFirstIdx = props.columns.length - (props.frozenRightColumns || 0);
        this.rows = props.rows.reduce(
            (rows, row, idx) => {
                const top =
                    idx === 0 || idx === props.frozenTopRows || idx === frozenBottomFirstIdx
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
                    idx === 0 || idx === props.frozenLeftColumns || idx === frozenRightFirstIdx
                        ? 0
                        : cols[idx - 1].left + cols[idx - 1].width;
                cols.push({ ...column, idx, left, right: left + column.width });
                return cols;
            },
            [] as Column[]
        );
        this.width = this.cols.reduce((sum, col) => sum + col.width, 0);
        this.height = this.rows.reduce((sum, row) => sum + row.height, 0);

        this.frozenLeftRange = new Range(this.cols.slice(0, props.frozenLeftColumns || 0), this.rows);
        this.frozenRightRange = new Range(this.cols.slice(frozenRightFirstIdx, this.cols.length), this.rows);
        this.frozenTopRange = new Range(this.cols, this.rows.slice(0, props.frozenTopRows || 0));
        this.frozenBottomRange = new Range(this.cols, this.rows.slice(frozenBottomFirstIdx, this.rows.length));
        this.scrollableRange = new Range(
            this.cols.slice(props.frozenLeftColumns || 0, frozenRightFirstIdx),
            this.rows.slice(props.frozenTopRows || 0, frozenBottomFirstIdx)
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
        // TODO is this really needed?
        const properRowIdx = rowIdx < this.rows.length - 1 ? rowIdx : this.rows.length - 1;
        const properColIdx = colIdx < this.cols.length - 1 ? colIdx : this.cols.length - 1;
        return { row: this.rows[properRowIdx], col: this.cols[properColIdx] };
    }

    getCell(location: Location): Cell {
        return this.cells[location.row.idx][location.col.idx];
    }
}
