import * as React from 'react';
import { State, Range, PointerEvent, CellMatrix, Behavior, Row, Column, Location, DataChange } from "../Common";
import { PartialArea } from '../Components/PartialArea';
import { getActiveSelectedRange } from '../Functions/getActiveSelectedRange';
import { trySetDataAndAppendChange } from '../Functions/trySetDataAndAppendChange';

type Direction = '' | 'left' | 'right' | 'up' | 'down';

export class FillHandleBehavior extends Behavior {
    private fillDirection: Direction = '';
    private fillRange?: Range;

    handlePointerEnter(event: PointerEvent, location: Location, state: State): State {
        const selectedRange = getActiveSelectedRange(state);
        this.fillDirection = this.getFillDirection(selectedRange, location)
        this.fillRange = this.getFillRange(state.cellMatrix, selectedRange, location, this.fillDirection)
        return { ...state };
    }

    private getFillDirection(selectedRange: Range, pointerLocation: Location) {

        // active selection
        const differences: { direction: Direction; value: number }[] = [];
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
                    new Location(selectedRange.last.row, location.col)
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
                    new Location(location.row, selectedRange.last.col)
                );
        }
        return undefined;
    }

    handlePointerUp(event: PointerEvent, location: Location, state: State): State {
        const activeSelectedRange = getActiveSelectedRange(state);
        const cellMatrix = state.cellMatrix;
        let values: any[];
        if (!activeSelectedRange || this.fillRange === undefined) {
            //state.commitChanges();
            return state;
        }

        this.fillRange = state.cellMatrix.validateRange(this.fillRange)

        switch (this.fillDirection) {
            case 'right':
                values = activeSelectedRange.rows.map((row: Row) =>
                    new Location(row, state.cellMatrix.cols[activeSelectedRange.last.col.idx]).cell
                );
                this.fillRange.rows.forEach((row: Row, i: number) =>
                    this.fillRange!.cols.forEach((col: Column) => {
                        const location = new Location(row, col)
                        const data = state.cellTemplates[values[i].type].validate(values[i].data);
                        if (!state.cellTemplates[location.cell.type].handleKeyDown(0, data).editable)
                            return;
                        state = trySetDataAndAppendChange(state, location, values[i].type, data, state.cellTemplates[values[i].type].cellDataToText(data))
                    })
                );
                state = {
                    ...state,
                    selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, new Location(activeSelectedRange.last.row, location.col))],
                    selectedIds: [...activeSelectedRange.cols.map(col => col.id), ...this.fillRange.cols.map(col => col.id)]
                };
                break;
            case 'left':
                values = activeSelectedRange.rows.map((row: Row) =>
                    new Location(row, state.cellMatrix.cols[activeSelectedRange.last.col.idx]).cell
                );
                this.fillRange.rows.forEach((row: Row, i: number) =>
                    this.fillRange!.cols.forEach((col: Column) => {
                        const location = new Location(row, col)
                        const data = state.cellTemplates[values[i].type].validate(values[i].data);
                        if (!state.cellTemplates[location.cell.type].handleKeyDown(0, data).editable)
                            return;
                        state = trySetDataAndAppendChange(state, location, values[i].type, data, state.cellTemplates[values[i].type].cellDataToText(data))
                    })
                );
                state = {
                    ...state,
                    selectedRanges: [cellMatrix.getRange(activeSelectedRange.last, new Location(activeSelectedRange.first.row, location.col))],
                    selectedIds: [...activeSelectedRange.cols.map(col => col.id), ...this.fillRange.cols.map(col => col.id)]
                };
                break;
            case 'up':
                values = activeSelectedRange.cols.map((col: Column) =>
                    new Location(state.cellMatrix.rows[activeSelectedRange.last.row.idx], col).cell
                );
                this.fillRange.rows.forEach((row: Row) =>
                    this.fillRange!.cols.forEach((col: Column, i: number) => {
                        const location = new Location(row, col)
                        const data = state.cellTemplates[values[i].type].validate(values[i].data);
                        if (!state.cellTemplates[location.cell.type].handleKeyDown(0, data).editable)
                            return;
                        state = trySetDataAndAppendChange(state, location, values[i].type, data, state.cellTemplates[values[i].type].cellDataToText(data))
                    })
                );
                state = {
                    ...state,
                    selectedRanges: [cellMatrix.getRange(activeSelectedRange.last, new Location(location.row, activeSelectedRange.first.col))],
                    selectedIds: [...activeSelectedRange.rows.map(row => row.id), ...this.fillRange.rows.map(row => row.id)]
                };
                break;
            case 'down':
                values = activeSelectedRange.cols.map((col: Column) =>
                    new Location(state.cellMatrix.rows[activeSelectedRange.last.row.idx], col).cell
                );
                this.fillRange.rows.forEach((row: Row) =>
                    this.fillRange!.cols.forEach((col: Column, i: number) => {
                        const location = new Location(row, col)
                        const data = state.cellTemplates[values[i].type].validate(values[i].data);
                        if (!state.cellTemplates[location.cell.type].handleKeyDown(0, data).editable)
                            return;
                        state = trySetDataAndAppendChange(state, location, values[i].type, data, state.cellTemplates[values[i].type].cellDataToText(data))
                    })
                );
                state = {
                    ...state,
                    selectedRanges: [cellMatrix.getRange(activeSelectedRange.first, new Location(location.row, activeSelectedRange.last.col))],
                    selectedIds: [...activeSelectedRange.rows.map(row => row.id), ...this.fillRange.rows.map(row => row.id)]
                };
                break;
        }
        return state;
    }

    renderPanePart(state: State, pane: Range): React.ReactNode {
        return this.fillDirection && this.fillRange && pane.intersectsWith(this.fillRange) &&
            <PartialArea range={state.cellMatrix.validateRange(this.fillRange)} pane={pane} style={{
                backgroundColor: '',
                borderTop: this.fillDirection === 'down' ? '' : '1px dashed #666',
                borderBottom: this.fillDirection === 'up' ? '' : '1px dashed #666',
                borderLeft: this.fillDirection === 'right' ? '' : '1px dashed #666',
                borderRight: this.fillDirection === 'left' ? '' : '1px dashed #666'
            }} />
    }
}
