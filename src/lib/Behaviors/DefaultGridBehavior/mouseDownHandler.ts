import { getLocationFromClient, changeBehavior } from "../../Functions";
import { GridContext, Location } from "../../Common";
import { CellSelectionBehavior } from "../CellSelectionBehavior";

export function handleMouseDown (gridContext: GridContext, e: React.MouseEvent<HTMLDivElement>) {
    // if (this.mouseEvent) {
        const location: Location = getLocationFromClient(gridContext, e.clientX, e.clientY);
        if (
            gridContext.state.isFocusedCellInEditMode &&
            (gridContext.state.focusedLocation!.row.idx === location.row.idx &&
                gridContext.state.focusedLocation!.col.idx === location.col.idx)
        ) {
            return;
        }
        changeBehavior(gridContext, new CellSelectionBehavior(gridContext, e, 'cell'));
    // }
};