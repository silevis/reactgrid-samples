
import { GridContext } from "../Common/GridContext";
import { getVisibleCells } from "./getVisibleCells";
//import { setTimeout, clearTimeout} from "";

export function refreshIfNeeded(gridContext: GridContext) {
    const state = gridContext.state;
    const { scrollTop, scrollLeft } = state.gridElement;
    if (!gridContext.renderScheduled) {
        gridContext.renderScheduled = true;
        window.setTimeout(() => {
            gridContext.renderScheduled = false;
            if (
                scrollTop < state.minScrollTop || scrollTop > state.maxScrollTop ||
                scrollLeft < state.minScrollLeft || scrollLeft > state.maxScrollLeft
            ) {
                gridContext.setState(getVisibleCells(state.gridElement, gridContext.cellMatrix))
            }
        }, 200);

        // console.log(
        //     'top: ' + scrollTop + ' (' + gridContext.state.minScrollTop + ' - ' + gridContext.state.maxScrollTop + ')' +
        //     'left: ' + scrollLeft + ' (' + gridContext.state.minScrollLeft + ' - ' + gridContext.state.maxScrollLeft + ')'
        // );

    }
}
