import { Row, NumberCell } from "@silevis/reactgrid";
import { RowCells } from './BP';
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';
import { NonEditableNumberCell } from './CellTemplates';

const generateMonthHeader = (year: number, quarter: string, month: number): HorizontalGroupCell => {
    const formattedMonth = `${month}`.padStart(2, '0');
    return { type: 'horizontalGroup', text: `${quarter}-${formattedMonth}`, className: 'month', parentId: `${year}-${quarter}` };
}

const generateQuarterHeader = (year: number, quarter: string, hasChildren: boolean = false, isExpanded: boolean = false): HorizontalGroupCell => {
    return { type: 'horizontalGroup', text: quarter, className: 'quarter', parentId: `${year}`, hasChildren, isExpanded };
}

const generateQuarter = (year: number, quarter: string, month: number) => {
    return [
        generateQuarterHeader(year, quarter),
        generateMonthHeader(year, quarter, month),
        generateMonthHeader(year, quarter, month + 1),
        generateMonthHeader(year, quarter, month + 2),
    ]
}

const generateYear = (year: number, hasChildren: boolean = false) => {
    return [
        { type: 'horizontalGroup', text: `${year}`, className: 'year', parentId: undefined, hasChildren },
        ...generateQuarter(year, 'Q1', 1),
        ...generateQuarter(year, 'Q2', 4),
        ...generateQuarter(year, 'Q3', 7),
        ...generateQuarter(year, 'Q4', 10),
    ];
}

export const topHeaderRow: Row<RowCells> = {
    rowId: 'topHeader',
    cells: [
        { type: 'text', text: 'Organization / Period' },
        ...generateYear(2020) as RowCells[],
        ...generateYear(2021) as RowCells[],
    ]
};

const generateNumberCell = (value: number, className: string = '', nanToZero: boolean = false): NumberCell => {
    return { type: 'number', value, className, nanToZero }
}

const generateNonEditableNumberCell = (value: number, className: string = '', nanToZero: boolean = false): NonEditableNumberCell => {
    return { type: 'nonEditableNumber', value, className, nanToZero }
}

const emptyYear = (): RowCells[] => [
    generateNonEditableNumberCell(0, 'year'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
];

const filledYear = (): RowCells[] => [
    generateNonEditableNumberCell(0, 'year'),
    generateNumberCell(0, 'quarter editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(0, 'quarter editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(0, 'quarter editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(0, 'quarter editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
    generateNumberCell(2, 'month editable'),
];

export const dataRows: Row<RowCells>[] = [
    {
        rowId: 'Silevis',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Silevis organization', parentId: undefined, isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Costs',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Costs', parentId: 'Silevis', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Employees',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Employees', parentId: 'Costs', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Zdeněk Smetana',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Zdeněk Smetana', parentId: 'Employees', isExpanded: true },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Julio Igresias',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Julio Igresias', parentId: 'Employees' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Josh Mosbauer',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Josh Mosbauer', parentId: 'Employees' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Materials',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Materials', parentId: 'Costs', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Concrete',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Concrete', parentId: 'Materials' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Wood',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Wood', parentId: 'Materials' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Other',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Other', parentId: 'Silevis', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Soft Warriors',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Soft Warriors', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
];