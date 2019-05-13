import { GridContext, Location, Row, Column, Direction  } from "../Common";

export function getLocationFromClient(gridContext: GridContext, clientX: number, clientY: number, favorScrollableContent?: Direction): Location {
    const row = getRowFromClientY(gridContext, clientY, (favorScrollableContent === 'vertical' || favorScrollableContent === 'both'));
    const col = getColumnFromClientX(gridContext, clientX, (favorScrollableContent === 'horizontal' || favorScrollableContent === 'both'));
    return { row, col };
}

function getRowFromClientY(gridContext: GridContext, clientY: number, favorScrollableContent: boolean): Row {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentHeight = Math.min(gridContext.viewportElement.clientHeight, cellMatrix.height);
    const viewportY = clientY - gridContext.viewportElement.getBoundingClientRect().top;
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
        return cellMatrix.scrollableRange.rows.find(row => row.bottom >= scrollableContentY)!;
    }
}

function getColumnFromClientX(gridContext: GridContext, clientX: number, favorScrollableContent: boolean): Column {
    const cellMatrix = gridContext.cellMatrix;
    const visibleContentWidth = Math.min(gridContext.viewportElement.clientWidth, cellMatrix.width);
    const viewportX = clientX - gridContext.viewportElement.getBoundingClientRect().left;
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
        return cellMatrix.scrollableRange.cols.find(col => col.right >= scrollableContentX)!;
    }
}