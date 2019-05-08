import { Column } from "../Common/Model";
import { GridContext } from "../Common/GridContext";
import { CellMatrix } from "../Common";

export function getColumnFromClientX(gridContext: GridContext, clientX: number): Column {
    const cellMatrix = gridContext.cellMatrix;
    const gridClientRect = gridContext.gridElement.getBoundingClientRect();
    const gridWidth = Math.min(gridClientRect.width, cellMatrix.width);
    const gridX = clientX - gridClientRect.left;
    const rightPaneLeft = gridWidth - cellMatrix.frozenRightRange.width;

    if (gridX < 0) {
        return cellMatrix.first.col;
    }
    else if (gridX > gridWidth) {
        return cellMatrix.last.col;
    }
    else if (gridX < cellMatrix.frozenLeftRange.width) {
        return cellMatrix.frozenLeftRange.cols.find(col => col.right > gridX)!;
    }
    else if (gridX > rightPaneLeft) {
        return cellMatrix.frozenRightRange.cols.find(col => col.right > gridX - rightPaneLeft)!;
    }
    else {
        return cellMatrix.scrollableRange.cols.find(col => col.right > gridX - gridContext.gridElement.scrollLeft - cellMatrix.frozenLeftRange.width)!;
    }
}
