import { Row, DefaultCellTypes } from "@silevis/reactgrid";
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';

export const topHeaderRow: Row<DefaultCellTypes | HorizontalGroupCell> = {
    rowId: 'topHeader',
    cells: [
        { type: 'text', text: 'Organization / Period', className: '' },
        { type: 'horizontalGroup', text: '2020', className: 'blue', parentId: undefined, hasChildren: true },
        { type: 'horizontalGroup', text: 'Q1', className: 'green', parentId: '2020', hasChildren: true, isExpanded: false },
        { type: 'horizontalGroup', text: '2020-Q1-01', className: 'red', parentId: '2020-Q1' },
        { type: 'horizontalGroup', text: '2020-Q1-02', className: 'red', parentId: '2020-Q1' },
        { type: 'horizontalGroup', text: '2020-Q1-03', className: 'red', parentId: '2020-Q1' },
        { type: 'horizontalGroup', text: 'Q2', className: 'green', parentId: '2020', hasChildren: false },
        { type: 'horizontalGroup', text: 'Q3', className: 'green', parentId: '2020', hasChildren: false },
        { type: 'horizontalGroup', text: 'Q4', className: 'green', parentId: '2020', hasChildren: false },
    ]
};

export const dataRows: Row<DefaultCellTypes | HorizontalGroupCell>[] = [
    {
        rowId: 'Silevis',
        cells: [
            { type: 'group', text: 'Silevis', parentId: undefined, isExpanded: true },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
    {
        rowId: 'Costs',
        cells: [
            { type: 'group', text: 'Costs', parentId: 'Silevis', isExpanded: true },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
    {
        rowId: 'Employees',
        cells: [
            { type: 'group', text: 'Employees', parentId: 'Costs', isExpanded: true },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
    {
        rowId: 'Zdeněk Smetana',
        cells: [
            { type: 'group', text: 'Zdeněk Smetana', parentId: 'Employees', isExpanded: true },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
    {
        rowId: 'Julio Igresias',
        cells: [
            { type: 'group', text: 'Julio Igresias', parentId: 'Employees' },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
    {
        rowId: 'Josh Mosbauer',
        cells: [
            { type: 'group', text: 'Josh Mosbauer', parentId: 'Employees' },
            { type: 'number', value: NaN, className: 'blue' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: 1, className: 'red' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
            { type: 'number', value: NaN, className: 'green' },
        ]
    },
];