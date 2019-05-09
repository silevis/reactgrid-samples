import { GridContext, Row } from "../Common";

export function getRowFromClientY(gridContext: GridContext, clientY: number): Row {
    const cellMatrix = gridContext.cellMatrix;
    const visibleHeight = Math.min(gridContext.viewportElement.clientHeight, cellMatrix.height);
    const viewportY = clientY - gridContext.viewportElement.clientTop;
    const bottomPaneTop = visibleHeight - cellMatrix.frozenBottomRange.height;

    if (viewportY < 0) {
        return cellMatrix.first.row;
    }
    else if (viewportY >= visibleHeight) {
        return cellMatrix.last.row;
    }
    else if (viewportY < cellMatrix.frozenTopRange.height) {
        return cellMatrix.frozenTopRange.rows.find(row => row.bottom > viewportY)!;
    }
    else if (viewportY >= bottomPaneTop) {
        return cellMatrix.frozenBottomRange.rows.find(row => row.bottom > viewportY - bottomPaneTop)!;
    }
    else {
        return cellMatrix.scrollableRange.rows.find(row => row.bottom > viewportY - cellMatrix.frozenTopRange.height + gridContext.viewportElement.scrollTop)!;
    }
}