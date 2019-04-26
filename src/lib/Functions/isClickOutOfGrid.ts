import { GridContext } from "../Common";

export function isClickOutOfGrid(gridContext: GridContext, clientX: number, clientY: number): boolean {
    // const gridCellsContainerRef = this.gridCellsContainerRef.getBoundingClientRect();
    let outOfGrid: boolean = false;
    // if (
    //     clientY > gridCellsContainerRef.bottom ||
    //     clientY < gridCellsContainerRef.top ||
    //     clientX > gridCellsContainerRef.right ||
    //     clientX < gridCellsContainerRef.left
    // ) {
    //     outOfGrid = true;
    // }
    return outOfGrid;
}