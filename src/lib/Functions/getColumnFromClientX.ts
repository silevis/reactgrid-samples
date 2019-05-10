import { GridContext, Column } from "../Common";

export function getColumnFromClientX(gridContext: GridContext, clientX: number): Column {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentWidth = Math.min(gridContext.viewportElement.clientWidth, cellMatrix.width);
    const viewportX = clientX - gridContext.viewportElement.getBoundingClientRect().left;
    const rightPaneLeft = visibleContentWidth - cellMatrix.frozenRightRange.width;

    if (viewportX < 0) {
        return cellMatrix.first.col;
    }
    else if (viewportX >= visibleContentWidth) {
        return cellMatrix.last.col;
    }
    else if (viewportX < cellMatrix.frozenLeftRange.width) {
        return cellMatrix.frozenLeftRange.cols.find(col => col.right > viewportX)!;
    }
    else if (viewportX >= rightPaneLeft) {
        return cellMatrix.frozenRightRange.cols.find(col => col.right > viewportX - rightPaneLeft)!;
    }
    else {
        return cellMatrix.scrollableRange.cols.find(col => col.right > viewportX - cellMatrix.frozenLeftRange.width + gridContext.viewportElement.scrollLeft)!;
    }
}
