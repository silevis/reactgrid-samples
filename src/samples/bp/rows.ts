import { Row, NumberCell } from "@silevis/reactgrid";
import { RowCells } from './BP';
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';

const generateMonthHeader = (year: number, quarter: string, month: number): HorizontalGroupCell => {
    return { type: 'horizontalGroup', text: `${year}-${quarter}-${month}`, className: 'red', parentId: `${year}-${quarter}` };
}

const generateQuarterHeader = (year: number, quarter: string): HorizontalGroupCell => {
    return { type: 'horizontalGroup', text: quarter, className: 'green', parentId: `${year}`, hasChildren: true, isExpanded: false };
}

const generateQuarter = (year: number, quarter: string, month: number) => {
    return [
        generateQuarterHeader(year, quarter),
        generateMonthHeader(year, quarter, month),
        generateMonthHeader(year, quarter, month + 1),
        generateMonthHeader(year, quarter, month + 2),
    ]
}

const generateYear = (year: number) => {
    return [
        { type: 'horizontalGroup', text: `${year}`, className: 'blue', parentId: undefined, hasChildren: true },
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

const emptyYear = (): RowCells[] => [
    generateNumberCell(0, 'blue'),
    generateNumberCell(0, 'green'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
    generateNumberCell(0, 'red'),
];

const filledYear = (): RowCells[] => [
    generateNumberCell(0, 'blue'),
    generateNumberCell(0, 'green'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(0, 'green'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
    generateNumberCell(2, 'red'),
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