import { PointerLocation, Row, Column, Direction, State } from "../Common";

export function getLocationFromClient(state: State, clientX: number, clientY: number, favorScrollableContent?: Direction): PointerLocation {
    const viewportX = clientX - state.viewportElement.getBoundingClientRect().left;
    const viewportY = clientY - state.viewportElement.getBoundingClientRect().top;

    const [cellY, row] = getRow(state, viewportY, (favorScrollableContent === 'vertical' || favorScrollableContent === 'both'));
    const [cellX, col] = getColumn(state, viewportX, (favorScrollableContent === 'horizontal' || favorScrollableContent === 'both'));
    return new PointerLocation(row, col, viewportX, viewportY, cellX, cellY);
}

function getRow(state: State, viewportY: number, favorScrollableContent: boolean): [number, Row] {
    const cellMatrix = state.cellMatrix;
    const visibleContentHeight = Math.min(state.viewportElement.clientHeight, cellMatrix.height);
    const bottomPaneTop = visibleContentHeight - cellMatrix.frozenBottomRange.height;
    const scrollTop = state.viewportElement.scrollTop;
    const maxScrollTop = cellMatrix.scrollableRange.height - visibleContentHeight + cellMatrix.frozenTopRange.height + cellMatrix.frozenBottomRange.height - 1;

    if (cellMatrix.frozenTopRange.rows.find(row => row.bottom > viewportY) && viewportY < cellMatrix.frozenTopRange.height && !(favorScrollableContent && scrollTop > 0)) {
        const row = cellMatrix.frozenTopRange.rows.find(row => row.bottom > viewportY)!;
        return [viewportY - row.top, row];
    }
    else if (cellMatrix.frozenBottomRange.rows && viewportY >= bottomPaneTop && !(favorScrollableContent && scrollTop < maxScrollTop)) {
        const row = cellMatrix.frozenBottomRange.rows.find(row => row.bottom > viewportY - bottomPaneTop) || cellMatrix.last.row;
        return [viewportY - bottomPaneTop - row.top, row];
    }
    else {
        // TODO find is expensive, quickfind?
        const scrollableContentY = viewportY - cellMatrix.frozenTopRange.height + state.viewportElement.scrollTop;
        const row = cellMatrix.scrollableRange.rows.find(row => row.bottom >= scrollableContentY) || cellMatrix.scrollableRange.last.row;
        return [scrollableContentY - row.top, row];
    }
}

function getColumn(state: State, viewportX: number, favorScrollableContent: boolean): [number, Column] {
    const cellMatrix = state.cellMatrix;
    const visibleContentWidth = Math.min(state.viewportElement.clientWidth, cellMatrix.width);
    const rightPaneLeft = visibleContentWidth - cellMatrix.frozenRightRange.width;
    const scrollLeft = state.viewportElement.scrollLeft;
    const maxScrollLeft = cellMatrix.scrollableRange.width - visibleContentWidth + cellMatrix.frozenLeftRange.width + cellMatrix.frozenRightRange.width - 1;

    if (cellMatrix.frozenLeftRange.cols.find(col => col.right > viewportX) && viewportX < cellMatrix.frozenLeftRange.width && !(favorScrollableContent && scrollLeft > 0)) {
        const column = cellMatrix.frozenLeftRange.cols.find(col => col.right > viewportX)!;
        return [viewportX - column.left, column];
    }
    else if (cellMatrix.frozenRightRange.cols && viewportX >= rightPaneLeft && !(favorScrollableContent && scrollLeft < maxScrollLeft)) {
        const column = cellMatrix.frozenRightRange.cols.find(col => col.right > viewportX - rightPaneLeft) || cellMatrix.last.col;
        return [viewportX - rightPaneLeft - column.left, column]
    }
    else {
        // TODO find is expensive, quickfind ?
        const scrollableContentX = viewportX - cellMatrix.frozenLeftRange.width + scrollLeft;
        const column = cellMatrix.scrollableRange.cols.find(col => col.right >= scrollableContentX) || cellMatrix.scrollableRange.last.col;
        return [scrollableContentX - column.left, column];
    }
}