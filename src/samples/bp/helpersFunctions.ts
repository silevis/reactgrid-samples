import { GroupCell, Column, DefaultCellTypes, Id, NumberCell } from '@silevis/reactgrid';
import { BPRow, RowCells } from '..';
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';

export const getGroupCell = (row: BPRow) => row.cells.find((cell: DefaultCellTypes | HorizontalGroupCell) => cell.type === 'group') as GroupCell;

const hasChildren = (rows: BPRow[], row: BPRow): boolean => rows.some(r => getGroupCell(r)?.parentId === row.rowId);

const isRowFullyExpanded = (rows: BPRow[], row: BPRow): boolean => {
    const parentRow = getParentRow(rows, row);
    if (parentRow) {
        if (!getGroupCell(parentRow).isExpanded) return false;
        return isRowFullyExpanded(rows, parentRow);
    }
    return true;
};

export const getExpandedRows = (rows: BPRow[]): BPRow[] => rows.filter(row => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
});

export const fillCellMatrixHorizontally = (rows: BPRow[]): BPRow[] => rows.map(row => {
    const mappedCells = row.cells.map((cell, idx) => ({ className: cell.className, idx }));

    mappedCells
        .filter(mappedCell => mappedCell.className === 'green')
        .forEach(mappedCell => {
            const cells = row.cells as NumberCell[];
            cells[mappedCell.idx].value = cells[mappedCell.idx + 1].value + cells[mappedCell.idx + 2].value + cells[mappedCell.idx + 3].value;
        });

    mappedCells
        .filter(mappedCell => mappedCell.className === 'blue')
        .forEach(mappedCell => {
            const cells = row.cells as NumberCell[];
            cells[mappedCell.idx].value = cells[mappedCell.idx + 1].value + cells[mappedCell.idx + 5].value
                + cells[mappedCell.idx + 9].value + cells[mappedCell.idx + 13].value
        });
    return row;
});

export const fillCellMatrixVerticaly = (rows: BPRow[], rowz: BPRow[]): BPRow[] => rows.map(row => {
    const groupCell = getGroupCell(row);
    if (groupCell && groupCell.parentId === undefined) {
        const hasRowChildrens = hasChildren(rows, row);
        if (hasRowChildrens) az(rows, row, rowz, 0);
    }
    const parentRow = getParentRow(rows, row);
    if (parentRow) {
        rowz.push(parentRow);
    }
    // Gdzie silevis ??
    return row;
});

const az = (allRows: BPRow[], parentRow: BPRow, rowz: BPRow[], level: number) => {
    ++level;
    getDirectChildrenRows(allRows, parentRow).forEach(row => {
        const groupCell = getGroupCell(row);
        const hasRowChildrens = hasChildren(allRows, row);
        if (!hasRowChildrens) {
            const parentRow = getParentRow(allRows, row);
            // console.log({ row, pr: parentRow });
            if (parentRow) {
                rowz.push(row);
                rowz.push(parentRow);
            }
        }

        if (hasRowChildrens) az(allRows, row, rowz, level);
    });
};

const getDirectChildrenRows = (rows: BPRow[], parentRow: BPRow): BPRow[] => rows.filter(row => !!row.cells.find(cell => cell.type === 'group' && cell.parentId === parentRow.rowId));

const getParentRow = (rows: BPRow[], row: BPRow): BPRow | undefined => rows.find(r => r.rowId === getGroupCell(row)?.parentId);

const assignIndentAndHasChildrens = (allRows: BPRow[], parentRow: BPRow, indent: number) => {
    ++indent;
    getDirectChildrenRows(allRows, parentRow).forEach(row => {
        const groupCell = getGroupCell(row);
        groupCell.indent = indent;
        const hasRowChildrens = hasChildren(allRows, row);
        groupCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens) assignIndentAndHasChildrens(allRows, row, indent);
    });
};

export const getDataFromRows = (rows: BPRow[]): BPRow[] => rows.filter(row => row.cells.find(cell => cell.type === 'group') !== undefined);

export const createIndents = (rows: BPRow[]): BPRow[] => rows.map(row => {
    const groupCell = getGroupCell(row);
    if (groupCell && groupCell.parentId === undefined) {
        const hasRowChildrens = hasChildren(rows, row);
        groupCell.hasChildren = hasRowChildrens;
        if (hasRowChildrens) assignIndentAndHasChildrens(rows, row, 0);
    }
    return row;
});

/// COLUMN

export const getDataFromColumns = (columns: Column[]): Column[] => columns.slice(1, columns.length);

export const getHorizontalGroupCell = (cells: RowCells[], columnId: Id) => cells.find((cell: RowCells) => cell.type === 'horizontalGroup' && cell.parentId === columnId) as HorizontalGroupCell | undefined;

// export const hasHorizontalChildren = (columns: Column[], cells: RowCells[]) => cells.some(cl => columns.some(col => col.columnId === cell.parentId));

// export const getParentColumn = (rows: BPRow[], row: BPRow): BPRow | undefined => rows.find(r => r.rowId === getHorizontalGroupCell(row).parentId);

export const getDirectChildrenColumns = (rows: BPRow[], parentRow: BPRow): BPRow[] => rows.filter(row => !!row.cells.find(cell => cell.type === 'horizontalGroup' && cell.parentId === parentRow.rowId));

// export const isColumnFullyExpanded = (rows: BPRow[], row: BPRow): boolean => {
//     const parentColumn = getParentColumn(rows, row);
//     if (parentColumn) {
//         if (!getHorizontalGroupCell(parentColumn).isExpanded) return false;
//         return isColumnFullyExpanded(rows, parentColumn);
//     }
//     return true;
// };

// export const getExpandedColumnsIds = (rows: BPRow[]): BPRow[] => rows.filter(row => {
//     const areAllParentsExpanded = isColumnFullyExpanded(rows, row);
//     return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
// });

// export const assignHasChildrens = (allRows: BPRow[], parentRow: BPRow) => {
//     getDirectChildrenColumns(allRows, parentRow).forEach(row => {
//         const horizontalGroupCell = getHorizontalGroupCell(row);
//         const hasColumnChildrens = hasHorizontalChildren(allRows, row);
//         horizontalGroupCell.hasChildren = hasColumnChildrens;
//         if (hasColumnChildrens) assignHasChildrens(allRows, row);
//     });
// };