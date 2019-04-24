
export function getLocationFromClient(clientX: number, clientY: number, outOfRangeTrim?: boolean): Location {
    const row = this.getRowOnScreen(clientY, outOfRangeTrim);
    const col = this.getColumnOnScreen(clientX, outOfRangeTrim);
    return { row, col };
}