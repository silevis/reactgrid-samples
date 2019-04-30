import { Grid } from "../Components/Grid";

// PUBLIC
export class GridController {
    constructor(private grid: Grid) { }
    print(title: string) { }
    ;
}

    // dataMatrix = () => {
    //     let cells = this.props.cellMatrix.cells;
    //     const data = [];
    //     cells.forEach((row, rIdx) => {
    //         if (rIdx < cells.length - 1) {
    //             let dataRow: string[] = [];
    //             row.forEach((col, cIdx) => {
    //                 if (cIdx > 0 && cIdx < row.length - 1) {
    //                     dataRow.push(col.value);
    //                 }
    //             });
    //             data.push(dataRow);
    //         }
    //     });
    //     return data;
    // };

