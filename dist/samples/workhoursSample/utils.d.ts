import { Column, DefaultCellTypes, TextCell, HeaderCell, CellChange, Row, NumberCell, DateCell } from "@silevis/reactgrid/lib";
import { DropdownCell } from "../../cell-templates/dropdownCellTemplate/dropdownCellTemplate";
import { WorkLog } from "../../data/workhoursData/initialValues";
export interface ExtendedColumn extends Column {
    key?: string;
}
export declare type CustomTypes = DefaultCellTypes | DropdownCell;
export declare const initialColumns: ExtendedColumn[];
export declare const usePrevious: (value: any) => undefined;
export declare const getTextCell: (text?: string | undefined) => TextCell;
export declare const getHeaderCell: (text?: string | undefined, background?: string | undefined) => HeaderCell;
export declare const getCellValue: (change: CellChange<CustomTypes>) => import("../datagridSample/DatagridDataGenerator").RandomDataTypes;
export declare const transformLogsToModel: (logs: WorkLog[], height: number) => Row<CustomTypes>[];
export declare const getBlankRow: (onPressButton: () => void, height: number, id: number) => {
    rowId: number;
    height: number;
    cells: (DateCell | NumberCell | TextCell | DropdownCell | import("../../cell-templates/buttonCellTemplate/buttonCellTemplate").ButtonCell)[];
};
