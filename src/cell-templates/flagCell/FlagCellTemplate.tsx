import * as React from 'react';
import { keyCodes, isTextInput, isNavigationKey, CellTemplate, Cell, CompatibleCell } from '@silevis/reactgrid';
import './flag-cell-style.scss';

export interface FlagCell extends Cell {
    type: 'flag',
    text: string
}
export class FlagCellTemplate implements CellTemplate<FlagCell> {

    // isValid(data: string): boolean {
    //     return (typeof (data) === 'string');
    // }
    validate(cell: FlagCell): CompatibleCell<FlagCell> {
        if (cell.text === undefined || cell.text === null)
            throw 'FlagCell is missing text property'
        return cell;
    }

    update(cell: FlagCell, newCell: FlagCell | CompatibleCell): FlagCell {
        // A CompatibleCell will provide the properties a TextCell needs
        newCell.type = cell.type;
        return newCell as FlagCell;
    }

    handleKeyDown(cell: FlagCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: FlagCell, enableEditMode: boolean } {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cell: { ...cell, text: '' }, enableEditMode: true }
        return { cell, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    render(cell: FlagCell, isInEditMode: boolean, onCellChanged: (cell: FlagCell, commit: boolean) => void): React.ReactNode {
        if (!isInEditMode) {
            const flagISO = cell.text.toLowerCase(); // ISO 3166-1, 2/3 letters
            const flagURL = `https://restcountries.eu/data/${flagISO}.svg`;
            return <div
                className="rg-flag-wrapper"
                style={{
                    backgroundImage: 'url("' + flagURL + '"), url("https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg")',
                }} />
        }
        return <input
            type='text'
            className="rg-flag-input"
            ref={input => {
                input && input.focus();
            }}
            defaultValue={cell.text}
            onChange={e => onCellChanged({ ...cell, text: e.currentTarget.value }, false)}
            onCopy={e => e.stopPropagation()}
            onCut={e => e.stopPropagation()}
            onPaste={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onKeyDown={e => {
                if (isTextInput(e.keyCode) || isNavigationKey(e)) e.stopPropagation();
                if (e.keyCode == keyCodes.ESC) e.currentTarget.value = cell.text; // reset
            }}
        />
    }
}