import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell, isTextInput, isNavigationKey, keyCodes } from '@silevis/reactgrid';
import './flag-cell-style.scss';

export interface FlagCell extends Cell {
    type: 'flag';
    text: string;
}

export class FlagCellTemplate implements CellTemplate<FlagCell> {

    validate(cell: any): CompatibleCell<FlagCell> {        
        if (cell.text === undefined || cell.text === null)
            throw 'FlagCell is missing text property'
        return cell;
    }

    handleKeyDown(cell: FlagCell, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): { cell: FlagCell, enableEditMode: boolean } {
        if (!ctrl && !alt && isTextInput(keyCode))
            return { cell, enableEditMode: true }
        return { cell, enableEditMode: keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER }
    }

    update(cell: FlagCell, newCell: FlagCell | CompatibleCell): FlagCell {
        if (newCell.text !== undefined && newCell.text.length !== 0) {
            return { ...cell, text: newCell.text } as FlagCell;
        }
        return newCell as FlagCell;
    }

    render(cell: FlagCell, isInEditMode: boolean, onCellChanged: (cell: FlagCell, commit: boolean) => void): React.ReactNode {
        if (!isInEditMode) {
            const flagISO = cell.text.toLowerCase(); // ISO 3166-1, 2/3 letters
            const flagURL = `https://restcountries.eu/data/${flagISO}.svg`;
            return <div 
                className="rg-flag-wrapper"
                style={{backgroundImage: 'url("' + flagURL + '"), url("https://upload.wikimedia.org/wikipedia/commons/0/04/Nuvola_unknown_flag.svg")',
            }} />
        }
        return <input
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