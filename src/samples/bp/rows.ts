import { Row, DefaultCellTypes } from "@silevis/reactgrid";
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';

export const dataRows: Row<DefaultCellTypes | HorizontalGroupCell>[] = [
    {
        rowId: 'topHeader',
        cells: [
            { type: 'text', text: 'ORG/Period', className: '' },
            { type: 'horizontalGroup', text: '2020', className: '', parentId: undefined, hasChildren: true },
            { type: 'horizontalGroup', text: 'Q1', className: '', parentId: '2020', hasChildren: true },
            { type: 'horizontalGroup', text: 'Q1-01', className: '', parentId: 'Q1' },
            { type: 'horizontalGroup', text: 'Q1-02', className: '', parentId: 'Q1' },
            { type: 'horizontalGroup', text: 'Q1-03', className: '', parentId: 'Q1' },
            { type: 'horizontalGroup', text: 'Q2', className: '', parentId: '2020', hasChildren: true },
            { type: 'horizontalGroup', text: 'Q3', className: '', parentId: '2020', hasChildren: true },
            { type: 'horizontalGroup', text: 'Q4', className: '', parentId: '2020', hasChildren: true },
        ]
    },
    {
        rowId: 'Silevis',
        cells: [
            { type: 'group', text: 'Silevis', parentId: undefined, isExpanded: true },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
    {
        rowId: 'Costs',
        cells: [
            { type: 'group', text: 'Costs', parentId: 'Silevis', isExpanded: true },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
    {
        rowId: 'Employees',
        cells: [
            { type: 'group', text: 'Employees', parentId: 'Costs', isExpanded: true },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
    {
        rowId: 'Zdeněk Smetana',
        cells: [
            { type: 'group', text: 'Zdeněk Smetana', parentId: 'Employees', isExpanded: true },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
    {
        rowId: 'Julio Igresias',
        cells: [
            { type: 'group', text: 'Julio Igresias', parentId: 'Employees' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
    {
        rowId: 'Josh Mosbauer',
        cells: [
            { type: 'group', text: 'Josh Mosbauer', parentId: 'Employees' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: 1, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
            { type: 'number', value: NaN, className: '' },
        ]
    },
];