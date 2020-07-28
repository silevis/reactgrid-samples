import { Row, DefaultCellTypes, NumberCell } from "@silevis/reactgrid";
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';
import { RowCells } from './BP';

const generateMonthHeader = (year: number, quarter: string, month: number) => {
    return { type: 'horizontalGroup', text: `${year}-${quarter}-${month}`, className: 'red', parentId: `${year}-${quarter}` };
}

const generateQuarterHeader = (year: number, quarter: string) => {
    return { type: 'horizontalGroup', text: quarter, className: 'green', parentId: `${year}`, hasChildren: true, isExpanded: false }
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
        { type: 'text', text: 'Organization / Period', className: '' },
        ...generateYear(2020) as RowCells[],
        ...generateYear(2021) as RowCells[],
    ]
};

const emptyYear = () => [
    { type: 'number', value: NaN, className: 'blue' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
    { type: 'number', value: NaN, className: 'red' },
];

const filledYear = () => [
    { type: 'number', value: NaN, className: 'blue' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: NaN, className: 'green' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
    { type: 'number', value: 1, className: 'red' },
];

export const dataRows: Row<RowCells>[] = [
    {
        rowId: 'Silevis',
        cells: [
            { type: 'group', text: 'Silevis', parentId: undefined, isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Costs',
        cells: [
            { type: 'group', text: 'Costs', parentId: 'Silevis', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Employees',
        cells: [
            { type: 'group', text: 'Employees', parentId: 'Costs', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Zdeněk Smetana',
        cells: [
            { type: 'group', text: 'Zdeněk Smetana', parentId: 'Employees', isExpanded: true },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Julio Igresias',
        cells: [
            { type: 'group', text: 'Julio Igresias', parentId: 'Employees' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Josh Mosbauer',
        cells: [
            { type: 'group', text: 'Josh Mosbauer', parentId: 'Employees' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Materials',
        cells: [
            { type: 'group', text: 'Materials', parentId: 'Costs', isExpanded: true },
            ...emptyYear() as RowCells[],
            ...emptyYear() as RowCells[],
        ]
    },
    {
        rowId: 'Concrete',
        cells: [
            { type: 'group', text: 'Concrete', parentId: 'Materials' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
    {
        rowId: 'Wood',
        cells: [
            { type: 'group', text: 'Wood', parentId: 'Materials' },
            ...filledYear() as RowCells[],
            ...filledYear() as RowCells[]
        ]
    },
];