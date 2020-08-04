import { Row } from "@silevis/reactgrid";
import { RowCells } from './BP';
export declare const topHeaderRow: Row<RowCells>;
export declare const emptyYear: () => RowCells[];
export declare const filledYear: (min?: number, max?: number, bonus?: number) => RowCells[];
export declare const dataRows: Row<RowCells>[];
