import { getRowFromClientY } from "./getRowFromClientY";
import { GridContext } from "../Common/GridContext";
import { Location } from "../Common/Model";
import { getColumnFromClientX } from "./getColumnFromClientX";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number): Location {
    const row = getRowFromClientY(gridContext, clientY);
    const col = getColumnFromClientX(gridContext, clientX);
    return { row, col };
}