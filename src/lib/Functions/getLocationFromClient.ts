import { GridContext, PointerLocation, Row, Column, Direction } from "../Common";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number, favorScrollableContent?: Direction): PointerLocation {
    const viewportX = clientX - gridContext.viewportElement.getBoundingClientRect().left;
    const viewportY = clientY - gridContext.viewportElement.getBoundingClientRect().top;

    // TODO 
    const cellX = 0;
    const cellY = 0;

    const row = getRow(gridContext, viewportY, (favorScrollableContent === 'vertical' || favorScrollableContent === 'both'));
    const col = getColumn(gridContext, viewportX, (favorScrollableContent === 'horizontal' || favorScrollableContent === 'both'));
    return new PointerLocation(row, col, viewportX, viewportY, cellX, cellY);
}

function getRow(gridContext: GridContext, viewportY: number, favorScrollableContent: boolean): Row {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentHeight = Math.min(gridContext.viewportElement.clientHeight, cellMatrix.height);

    const bottomPaneTop = visibleContentHeight - cellMatrix.frozenBottomRange.height;
    const scrollableContentY = viewportY - cellMatrix.frozenTopRange.height + gridContext.viewportElement.scrollTop;

    if (viewportY < 0) {
        return cellMatrix.first.row;
    }
    else if (viewportY >= visibleContentHeight) {
        return cellMatrix.last.row;
    }
    else if (viewportY < cellMatrix.frozenTopRange.height && !(favorScrollableContent && scrollableContentY >= 0)) {
        return cellMatrix.frozenTopRange.rows.find(row => row.bottom > viewportY)!;
    }
    else if (viewportY >= bottomPaneTop && !(favorScrollableContent && scrollableContentY <= cellMatrix.scrollableRange.height)) {
        return cellMatrix.frozenBottomRange.rows.find(row => row.bottom > viewportY - bottomPaneTop)!;
    }
    else {
        // TODO find is expensive, quickfind?
        return cellMatrix.scrollableRange.rows.find(row => row.bottom >= scrollableContentY)!;
    }
}

function getColumn(gridContext: GridContext, viewportX: number, favorScrollableContent: boolean): Column {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentWidth = Math.min(gridContext.viewportElement.clientWidth, cellMatrix.width);
    const rightPaneLeft = visibleContentWidth - cellMatrix.frozenRightRange.width;
    const scrollableContentX = viewportX - cellMatrix.frozenLeftRange.width + gridContext.viewportElement.scrollLeft;

    if (viewportX < 0) {
        return cellMatrix.first.col;
    }
    else if (viewportX >= visibleContentWidth) {
        return cellMatrix.last.col;
    }
    else if (viewportX < cellMatrix.frozenLeftRange.width && !(favorScrollableContent && scrollableContentX >= 0)) {
        return cellMatrix.frozenLeftRange.cols.find(col => col.right > viewportX)!;
    }
    else if (viewportX >= rightPaneLeft && !(favorScrollableContent && scrollableContentX <= cellMatrix.scrollableRange.width)) {
        return cellMatrix.frozenRightRange.cols.find(col => col.right > viewportX - rightPaneLeft)!;
    }
    else {
        // TODO find is expensive, quickfind ?
        return cellMatrix.scrollableRange.cols.find(col => col.right >= scrollableContentX)!;
    }
}