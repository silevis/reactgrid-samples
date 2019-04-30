import { GridContext, Range, Location } from "../Common";

export function selectRange(gridContext: GridContext, range: Range) {
    gridContext.setState({
        selectionMode: 'range',
        selectedRanges: [range],
    });
}