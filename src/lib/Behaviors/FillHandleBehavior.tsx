import * as React from 'react';
import { GridContext, Range, Location, Row, Column, KeyboardEvent, ClipboardEvent, PointerEvent, CellMatrix } from "../Common";
import { getLocationFromClient, resetToDefaultBehavior } from "../Functions";
import { PartialArea } from '../Components/PartialArea';
import { AutoScrollBehavior } from './AutoScrollBehavior';
import { getActiveSelectedRange } from '../Functions/getActiveSelectedRange';

type Direction = '' | 'left' | 'right' | 'up' | 'down';

export class FillHandleBehavior extends AutoScrollBehavior {
    private currentLocation?: Location;
    private fillDirection: Direction = '';
    private fillRange?: Range;

    constructor(private gridContext: GridContext) {
        super();
    }

    handlePointerMove(event: PointerEvent) {
        const selectedRange = getActiveSelectedRange(this.gridContext);
        const pointerLocation = getLocationFromClient(this.gridContext, event.clientX, event.clientY);
        if ((this.currentLocation && this.currentLocation.col === pointerLocation.col && this.currentLocation.row === pointerLocation.row)) {
            return;
        }
        this.currentLocation = pointerLocation;
        this.fillDirection = this.getFillDirection(selectedRange, pointerLocation)
        this.fillRange = this.getFillRange(this.gridContext.cellMatrix, selectedRange, pointerLocation, this.fillDirection)
        this.gridContext.forceUpdate();
    }

    private getFillDirection(selectedRange: Range, pointerLocation: Location) {

        // active selection
        let differences: { direction: Direction; value: number }[] = [];
        differences.push({ direction: '', value: 0 });
        differences.push({
            direction: 'up',
            value:
                pointerLocation.row.idx < selectedRange.first.row.idx
                    ? selectedRange.first.row.idx - pointerLocation.row.idx
                    : 0
        });
        differences.push({
            direction: 'down',
            value:
                pointerLocation.row.idx > selectedRange.last.row.idx
                    ? pointerLocation.row.idx - selectedRange.last.row.idx
                    : 0
        });
        differences.push({
            direction: 'left',
            value:
                pointerLocation.col.idx < selectedRange.first.col.idx
                    ? selectedRange.first.col.idx - pointerLocation.col.idx
                    : 0
        });
        differences.push({
            direction: 'right',
            value:
                pointerLocation.col.idx > selectedRange.last.col.idx
                    ? pointerLocation.col.idx - selectedRange.last.col.idx
                    : 0
        });
        return differences.reduce((prev, current) =>
            prev.value >= current.value ? prev : current
        ).direction;
    }

    private getFillRange(cellMatrix: CellMatrix, selectedRange: Range, location: Location, fillDirection: Direction) {
        switch (fillDirection) {
            case 'right':
                return cellMatrix.getRange(
                    cellMatrix.getLocation(
                        selectedRange.first.row.idx,
                        cellMatrix.last.col.idx < selectedRange.last.col.idx + 1
                            ? cellMatrix.last.col.idx
                            : selectedRange.last.col.idx + 1
                    ),
                    cellMatrix.getLocation(selectedRange.last.row.idx, location.col.idx)
                );
            case 'left':
                return cellMatrix.getRange(
                    cellMatrix.getLocation(selectedRange.first.row.idx, location.col.idx),
                    cellMatrix.getLocation(
                        selectedRange.last.row.idx,
                        cellMatrix.first.col.idx > selectedRange.first.col.idx - 1
                            ? cellMatrix.first.col.idx
                            : selectedRange.first.col.idx - 1
                    )
                );
            case 'up':
                return cellMatrix.getRange(
                    cellMatrix.getLocation(location.row.idx, selectedRange.first.col.idx),
                    cellMatrix.getLocation(
                        cellMatrix.first.row.idx > selectedRange.first.row.idx - 1
                            ? cellMatrix.first.row.idx
                            : selectedRange.first.row.idx - 1,
                        selectedRange.last.col.idx
                    )
                );
            case 'down':
                return cellMatrix.getRange(
                    cellMatrix.getLocation(
                        cellMatrix.last.row.idx < selectedRange.last.row.idx + 1
                            ? cellMatrix.last.row.idx
                            : selectedRange.last.row.idx + 1,
                        selectedRange.first.col.idx
                    ),
                    cellMatrix.getLocation(location.row.idx, selectedRange.last.col.idx)
                );
        }
        return undefined;
    }

    handlePointerUp(event: PointerEvent) {
        // const activeSelectedRange = Utilities.getActiveSelectionRange(
        //     this.gridContext.state.selectedRanges,
        //     this.gridContext.state.focusedLocation!
        // );
        // const cellMatrix = this.gridContext.cellMatrix;
        // let values: any[];
        // if (!activeSelectedRange) {
        //     this.gridContext.commitChanges();
        //     resetToDefaultBehavior(this.gridContext);
        //     return;
        // }

        // switch (this.fillDirection) {
        //     case 'right':
        //         values = activeSelectedRange.rows.map((row: Row) =>
        //             this.gridContext.cellMatrix.getCell({ row, col: activeSelectedRange.last.col })
        //         );
        //         this.fillRange.rows.forEach((row: Row, i: number) =>
        //             this.fillRange.cols.forEach((col: Column) => {
        //                 cellMatrix.getCell({ row, col }) &&
        //                     cellMatrix.getCell({ row, col }).trySetValue(values[i].value);
        //             })
        //         );
        //         this.gridContext.setState({
        //             selectedRanges: [
        //                 cellMatrix.getRange(activeSelectedRange.first, {
        //                     row: activeSelectedRange.last.row,
        //                     col: this.currentLocation.col
        //                 })
        //             ]
        //         });
        //         break;
        //     case 'left':
        //         values = activeSelectedRange.rows.map((row: Row) =>
        //             this.gridContext.cellMatrix.getCell({ row, col: activeSelectedRange.first.col })
        //         );
        //         this.fillRange.rows.forEach((row: Row, i: number) =>
        //             this.fillRange.cols.forEach(
        //                 (col: Column) =>
        //                     cellMatrix.getCell({ row, col }) &&
        //                     cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
        //             )
        //         );
        //         this.gridContext.setState({
        //             selectedRanges: [
        //                 cellMatrix.getRange(activeSelectedRange.last, {
        //                     row: activeSelectedRange.first.row,
        //                     col: this.currentLocation.col
        //                 })
        //             ]
        //         });
        //         break;
        //     case 'up':
        //         values = activeSelectedRange.cols.map((col: Column) =>
        //             this.gridContext.cellMatrix.getCell({ row: activeSelectedRange.first.row, col })
        //         );
        //         this.fillRange.rows.forEach((row: Row) =>
        //             this.fillRange.cols.forEach(
        //                 (col: Column, i: number) =>
        //                     cellMatrix.getCell({ row, col }) &&
        //                     cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
        //             )
        //         );
        //         this.gridContext.setState({
        //             selectedRanges: [
        //                 cellMatrix.getRange(activeSelectedRange.last, {
        //                     row: this.currentLocation.row,
        //                     col: activeSelectedRange.first.col
        //                 })
        //             ]
        //         });
        //         break;
        //     case 'down':
        //         values = activeSelectedRange.cols.map((col: Column) =>
        //             this.gridContext.cellMatrix.getCell({ row: activeSelectedRange.last.row, col })
        //         );
        //         this.fillRange.rows.forEach((row: Row) =>
        //             this.fillRange.cols.forEach(
        //                 (col: Column, i: number) =>
        //                     cellMatrix.getCell({ row, col }) &&
        //                     cellMatrix.getCell({ row, col }).trySetValue(values[i].value)
        //             )
        //         );
        //         this.gridContext.setState({
        //             selectedRanges: [
        //                 cellMatrix.getRange(activeSelectedRange.first, {
        //                     row: this.currentLocation.row,
        //                     col: activeSelectedRange.last.col
        //                 })
        //             ]
        //         });
        //         break;
        // }
        // this.gridContext.commitChanges();
        resetToDefaultBehavior(this.gridContext);
    }

    renderPanePart(pane: Range): React.ReactNode {
        return this.fillDirection && this.fillRange && pane.intersectsWith(this.fillRange) &&
            <PartialArea range={this.fillRange} pane={pane} style={{
                backgroundColor: '',
                borderTop: this.fillDirection === 'down' ? '' : '1px dashed #666',
                borderBottom: this.fillDirection === 'up' ? '' : '1px dashed #666',
                borderLeft: this.fillDirection === 'right' ? '' : '1px dashed #666',
                borderRight: this.fillDirection === 'left' ? '' : '1px dashed #666'
            }} />
    }
}
