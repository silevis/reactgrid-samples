import * as React from 'react';
import { CellTemplate, Cell, CompatibleCell } from '@silevis/reactgrid';

export interface HeaderCell extends Cell {
    type: 'header',
    text: string,
}

export class HeaderCellTemplate implements CellTemplate<HeaderCell> {

    validate(cell: HeaderCell): CompatibleCell<HeaderCell> {
        return cell;
    }

    render(cell: HeaderCell, isInEditMode: boolean, onCellChanged: (cell: HeaderCell, commit: boolean) => void): React.ReactNode {
        return cell.text;
    }

    isFocusable = () => true;

    getStyle = (cell: HeaderCell) => ({ background: '#f3f3f3' })
}
