import { Location } from './Model';
import { Range } from './Range';
import { Grid } from '../Components/Grid';

export class Utilities {
    static getActiveSelectionRange(selections: Range[], focusedLocation: Location): Range {
        return selections.find(selection => selection.contains(focusedLocation))!;
    }

    static getActiveSelectionIdx(selections: Range[], focusedLocation: Location): number {
        return selections.findIndex(selection => selection.contains(focusedLocation));
    }

    static isFocusedLocationInsideSelectedRanges(selections: Range[], location: Location): boolean {
        return selections.some(s => {
            let minColumn: number = Math.min(s.first.col.idx, s.last.col.idx);
            let maxColumn: number = Math.max(s.first.col.idx, s.last.col.idx);
            let minRow: number = Math.min(s.first.row.idx, s.last.row.idx);
            let maxRow: number = Math.max(s.first.row.idx, s.last.row.idx);
            return (
                location.col.idx >= minColumn &&
                location.col.idx <= maxColumn &&
                location.row.idx >= minRow &&
                location.row.idx <= maxRow
            );
        });
    }

    static createSelectionFromFocusedLocation(grid: Grid) {
        const { cellMatrix } = grid.props;
        const { focusedLocation } = grid.state;
        grid.setState({
            selectedRanges: [cellMatrix.getRange(focusedLocation!, focusedLocation!)]
        });
    }
}
