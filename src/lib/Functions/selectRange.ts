import { GridContext, Range } from "../Common";

export function selectRange(gridContext: GridContext, selectedRange: Range) {
    const selectedRanges = gridContext.state.selectedRanges.map(range => range.contains(gridContext.state.focusedLocation!) ? selectedRange : range);

    gridContext.setState({
        selectionMode: 'range',
        selectedRanges,
        focusedSelectedRangeIdx: gridContext.state.focusedSelectedRangeIdx
    });
}