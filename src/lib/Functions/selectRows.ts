import { GridContext, Range } from "../Common";

export function selectRows(gridContext: GridContext, selectedRowsIdx: number[]): Range[] {
    let selectedRows: Range[] = [];
    if (selectedRowsIdx.length > 0) {
        const cellMatrix = gridContext.cellMatrix;
        selectedRowsIdx.forEach(id => {
            let location = cellMatrix.getLocation(id + 1, cellMatrix.cols[0].idx);
            let range = cellMatrix.getRange(location, {
                row: location.row,
                col: cellMatrix.cols[cellMatrix.cols.length - 1]
            });
            selectedRows.push(range);
        });
    }
    return selectedRows;
}