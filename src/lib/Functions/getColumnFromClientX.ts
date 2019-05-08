import { Column, GridContext } from "../Common";

export function getColumnFromClientX(gridContext: GridContext, clientX: number): Column {
    const cellMatrix = gridContext.cellMatrix;
    const visibleWidth = Math.min(gridContext.viewportElement.clientWidth, cellMatrix.width);
    const gridX = clientX - gridContext.viewportElement.clientLeft;
    const rightPaneLeft = visibleWidth - cellMatrix.frozenRightRange.width;

    if (gridX < 0) {
        return cellMatrix.first.col;
    }
    else if (gridX > visibleWidth) {
        return cellMatrix.last.col;
    }
    else if (gridX < cellMatrix.frozenLeftRange.width) {
        return cellMatrix.frozenLeftRange.cols.find(col => col.right > gridX)!;
    }
    else if (gridX > rightPaneLeft) {
        return cellMatrix.frozenRightRange.cols.find(col => col.right > gridX - rightPaneLeft)!;
    }
    else {
        return cellMatrix.scrollableRange.cols.find(col => col.right > gridX - cellMatrix.frozenLeftRange.width + gridContext.viewportElement.scrollLeft)!;
    }
}
