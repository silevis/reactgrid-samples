import { State, Range, Location } from "../Common";

export function selectRows(state: State, selectedRowsIdx: number[]): Range[] {
    //     let selectedRows: Range[] = [];
    //     if (selectedRowsIdx.length > 0) {
    //         const cellMatrix = state.cellMatrix;
    //         selectedRowsIdx.forEach(id => {
    //             let location = cellMatrix.getLocation(id + 1, cellMatrix.cols[0].idx);
    //             let range = cellMatrix.getRange(location, new Location(location.row, cellMatrix.last.col))
    //         });
    //         selectedRows.push(range);
    //     });
    // }
    // return selectedRows;
    return []
}