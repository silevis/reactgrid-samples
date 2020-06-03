import { Column, Row } from "@silevis/reactgrid/lib";
export interface GroupGridStateData {
    columns: Column[];
    rows: Row[];
    dates: Date[];
}
export interface IDropdownControlledState {
    selectedItem?: {
        key: string | number | undefined;
    };
}
export interface Variable {
    [key: string]: string | number | Date | Variable;
    name: string;
}
export interface Value {
    [key: string]: string | number | Date | Value;
}
export interface GroupAttribute {
    name: string;
    fieldName: string;
    children?: GroupAttribute[];
    values: any;
    variables: any;
}
