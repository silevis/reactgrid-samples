import { BorderProps, CellStyle, Row } from "@silevis/reactgrid/lib";
import { SampleCellTypes } from "./ExcercisesDataSample";
export declare const noBorder: BorderProps;
export declare const noBorderCellStyle: CellStyle;
export declare const addColorToEvenColumns: (row: Row<SampleCellTypes>) => {
    cells: SampleCellTypes[];
    rowId: import("@silevis/reactgrid/lib").Id;
    height?: number | undefined;
    reorderable?: boolean | undefined;
};
