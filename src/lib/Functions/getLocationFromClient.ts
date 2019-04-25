import { getRowFromClientY } from "./getColumnFromClientX";
import { getColumnFromClientX } from "./getRowFromClientY";
import { GridContext } from "../Common/GridContext";
import { Location } from "../Common/Model";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number, outOfRangeTrim: boolean = false): Location {
    const row = getRowFromClientY(gridContext, clientY, outOfRangeTrim);
    const col = getColumnFromClientX(gridContext, clientX, outOfRangeTrim);
    return { row, col };
}