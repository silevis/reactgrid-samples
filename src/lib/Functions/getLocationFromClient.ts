import { GridContext, PointerLocation, Row, Column, Direction } from "../Common";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number, favorScrollableContent?: Direction): PointerLocation {
    const viewportX = clientX - gridContext.viewportElement.getBoundingClientRect().left;
    const viewportY = clientY - gridContext.viewportElement.getBoundingClientRect().top;

    const [cellY, row] = getRow(gridContext, viewportY, (favorScrollableContent === 'vertical' || favorScrollableContent === 'both'));
    const [cellX, col] = getColumn(gridContext, viewportX, (favorScrollableContent === 'horizontal' || favorScrollableContent === 'both'));
    return new PointerLocation(row, col, viewportX, viewportY, cellX, cellY);
}

function getRow(gridContext: GridContext, viewportY: number, favorScrollableContent: boolean): [number, Row] {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentHeight = Math.min(gridContext.viewportElement.clientHeight, cellMatrix.height);

    const bottomPaneTop = visibleContentHeight - cellMatrix.frozenBottomRange.height;
    const scrollableContentY = viewportY - cellMatrix.frozenTopRange.height + gridContext.viewportElement.scrollTop;

    if (viewportY < cellMatrix.frozenTopRange.height && !(favorScrollableContent && scrollableContentY >= 0)) {
        const row = cellMatrix.frozenTopRange.rows.find(row => row.bottom > viewportY)!;
        return [viewportY - row.top, row];
    }
    else if (viewportY >= bottomPaneTop && !(favorScrollableContent && scrollableContentY <= cellMatrix.scrollableRange.height)) {
        const row = cellMatrix.frozenBottomRange.rows.find(row => row.bottom > viewportY - bottomPaneTop) || cellMatrix.last.row;
        return [viewportY - bottomPaneTop - row.top, row];
    }
    else {
        // TODO find is expensive, quickfind?
        const row = cellMatrix.scrollableRange.rows.find(row => row.bottom >= scrollableContentY)!;
        return [scrollableContentY - row.top, row];
    }
}

function getColumn(gridContext: GridContext, viewportX: number, favorScrollableContent: boolean): [number, Column] {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentWidth = Math.min(gridContext.viewportElement.clientWidth, cellMatrix.width);
    const rightPaneLeft = visibleContentWidth - cellMatrix.frozenRightRange.width;
    const scrollableContentX = viewportX - cellMatrix.frozenLeftRange.width + gridContext.viewportElement.scrollLeft;

    if (viewportX < cellMatrix.frozenLeftRange.width && !(favorScrollableContent && scrollableContentX >= 0)) {
        const column = cellMatrix.frozenLeftRange.cols.find(col => col.right > viewportX)!;
        return [viewportX - column.left, column];
    }
    else if (viewportX >= rightPaneLeft && !(favorScrollableContent && scrollableContentX <= cellMatrix.scrollableRange.width)) {
        const column = cellMatrix.frozenRightRange.cols.find(col => col.right > viewportX - rightPaneLeft) || cellMatrix.last.col;
        return [viewportX - rightPaneLeft - column.left, column]
    }
    else {
        // TODO find is expensive, quickfind ?
        const column = cellMatrix.scrollableRange.cols.find(col => col.right >= scrollableContentX)!;
        return [scrollableContentX - column.left, column];
    }
}