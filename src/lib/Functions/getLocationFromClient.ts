import { getRowFromClientY } from "./getRowFromClientY";
import { getColumnFromClientX } from "./getColumnFromClientX";
import { GridContext, Location } from "../Common";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number): Location {
    const row = getRowFromClientY(gridContext, clientY);
    const col = getColumnFromClientX(gridContext, clientX);
    return { row, col };
}