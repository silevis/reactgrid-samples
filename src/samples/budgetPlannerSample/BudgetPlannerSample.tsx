import React from 'react';
import styled from 'styled-components';
import { ReactGrid, DataChange, CellMatrixProps, ColumnProps, RowProps, Cell, CellTemplates } from '@silevis/reactgrid';
import { MonthOfYear, DateRange, BudgetPlannerProps, DataRow, Entry, MonthIdx, BudgetPlannerNumberCellData } from './BudgetPlannerSampleTypes';
import BudgetPlannerSampleData from './BudgetPlannerSampleData';
import { BudgetPlannerTextCellTemplate, BudgetPlannerNumberCellTemplate, BudgetPlannerColumnHeaderCellTemplate } from './../../cell-templates/budgetPlannerCells/BudgetPlannerCellTemplates';
import './styling.scss';

const MonthNameByIdx = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const ReactGridContainer = styled.div`
    position: relative;
    min-height: 400px;
`

const BudgetPlanner: React.FC<BudgetPlannerProps> = (props) => {
    const [budgetData, setBudgetData] = React.useState(props.budgetData);
    const [collapsedLabels, setCollapsedLabels] = React.useState({ columns: {} as any, rows: {} as any });

    const getMonthsInRange = (dateRange: DateRange): MonthOfYear[] => {
        const monthsInRange: MonthOfYear[] = [];
        const { start, end } = dateRange;

        for (let yearIdx = start.year; yearIdx <= end.year; yearIdx++) {
            let endMonthIdx = yearIdx !== end.year ? 11 : end.month;
            let startMonthIdx = yearIdx === start.year ? start.month : 0;
            for (let monthIdx = startMonthIdx; monthIdx <= endMonthIdx; monthIdx = (monthIdx > 12 ? monthIdx % 12 || 11 : monthIdx + 1) as MonthIdx) {
                monthsInRange.push({ year: yearIdx, month: monthIdx });
            }
        }

        return monthsInRange;
    }

    const computeGridData = () => {
        const seen: any = {
            years: {} as any,
            quarters: {} as any
        }
        const computedColumns: ColumnProps[] = [
            { id: 'tag', reorderable: false, resizable: false, width: 100 }
        ];

        // compute grid columns for the date range
        getMonthsInRange(props.dateRange).forEach(month => {
            const newColumn = { reorderable: false, resizable: false } as any;
            const quarterId = ['quarter', month.year, Math.floor(month.month / 3)].join(',');
            const yearId = ['year', month.year].join(',');
            const monthId = ['month', month.year, month.month].join(',');

            if (!(month.year in seen.years)) {
                seen.years[month.year] = true;
                newColumn.width = 80;
                newColumn.id = yearId;
                computedColumns.push({ ...newColumn });
            }

            if (!(quarterId in seen.quarters)) {
                seen.quarters[quarterId] = true;
                newColumn.width = 100;
                newColumn.id = quarterId;
                computedColumns.push({ ...newColumn })
            }

            newColumn.width = 140;
            newColumn.id = monthId;
            computedColumns.push(newColumn);
        })

        let parentYearCell: Cell;
        let parentQuarterCell: Cell;

        // first row (header)
        const computedRows: RowProps[] = [{
            id: 'header',
            height: 25,
            reorderable: false,
            cells: [
                { type: 'text', data: { value: 'Category', isCollapsed: false } },
                ...computedColumns.slice(1).map((column) => {
                    const columnData: string[] = (column.id as string).split(',');
                    const newCell: Cell = {
                        type: 'columnHeader',
                        data: { value: columnData[1], isCollapsed: false }
                    };

                    if (columnData[0] === 'year') {
                        parentYearCell = newCell;
                    } else if (columnData[0] === 'quarter') {
                        newCell.data.value = `Q${parseInt(columnData[2]) + 1}/${columnData[1].substr(2)}`;
                        newCell.data.parent = parentYearCell;
                        parentQuarterCell = newCell;
                    } else { // month
                        newCell.data.value = `${MonthNameByIdx[parseInt(columnData[2])]}, ${columnData[1]}`;
                        newCell.data.parent = parentQuarterCell;
                    }

                    newCell.data.isCollapsed = Boolean(collapsedLabels.columns[column.id]);
                    return newCell;
                })
            ]
        }]

        // rows with numeric data
        props.budgetData.forEach(category => {
            // parent category row (with category totals)
            let parentYearCell: Cell;
            let parentQuarterCell: Cell;
            const parentRow: RowProps = {
                id: category.id,
                reorderable: false,
                height: 25,
                cells: [
                    { type: 'columnHeader', data: { value: category.category, isCollapsed: category.isCollapsed } },
                    ...computedColumns.slice(1).map((column, idx): Cell => {
                        const newCell: Cell = { data: { value: 0 } as BudgetPlannerNumberCellData, type: 'bpNumber' };
                        const columnData: string[] = column.id.toString().split(',');
                        newCell.data.isCollapsed = false

                        if (columnData[0] === 'year') {
                            parentYearCell = newCell;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                        } else if (columnData[0] === 'quarter') {
                            newCell.data.parent = parentYearCell;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                            parentQuarterCell = newCell;
                        } else { // month
                            newCell.data.parent = parentQuarterCell;
                        }

                        return newCell;
                    })
                ]
            };
            computedRows.push(parentRow);
            // children category rows (with monthly values and annual/quarterly totals)
            category.subcategories.forEach(subcategory => {
                const row: RowProps = {
                    id: subcategory.id,
                    reorderable: false,
                    height: 25,
                    cells: [{
                        type: 'columnHeader',
                        data: { value: subcategory.subcategory, isCollapsed: false, parent: parentRow.cells[0] }
                    }]
                };
                let [yearColIdx, quarterColIdx]: number[] = [NaN, NaN];
                computedColumns.slice(1).forEach((column, idx) => {
                    const newCell: Cell = {
                        type: 'bpNumber',
                        data: { value: NaN, isCollapsed: false },
                    }
                    const columnData: string[] = (column.id as string).split(',');

                    // console.log('columnData', columnData);

                    switch (columnData[0]) {
                        case 'year':
                            parentYearCell = newCell;
                            newCell.data.value = 0;
                            yearColIdx = idx + 1;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                            break;

                        case 'quarter':
                            parentQuarterCell = newCell;
                            newCell.data.value = 0;
                            newCell.data.parent = parentYearCell;
                            newCell.data.isCollapsed = computedRows[0].cells[idx + 1].data.isCollapsed;
                            quarterColIdx = idx + 1;
                            break;

                        default: // month of year
                            newCell.data.parent = parentQuarterCell;
                            const matchingEntry = subcategory.entries.find(entry => (entry.year.toString() === columnData[1] && entry.month.toString() === columnData[2]));
                            const value = matchingEntry ? matchingEntry.value : 0;

                            // increment totals
                            row.cells[yearColIdx].data.value += value;
                            row.cells[quarterColIdx].data.value += value;
                            parentRow.cells[idx + 1].data.value += value;
                            parentRow.cells[yearColIdx].data.value += value;
                            parentRow.cells[quarterColIdx].data.value += value;

                            newCell.data.value = value !== 0 ? value : NaN;
                    }
                    row.cells.push(newCell);
                })
                computedRows.push(row);
            })
        });
        return { computedColumns, computedRows };
    }

    const generateCellMatrixProps = (): CellMatrixProps => {
        const { computedColumns, computedRows } = computeGridData();

        const gridColumns: ColumnProps[] = computedColumns.filter((computedColumn, idx) => {
            let parentCell: Cell = computedRows[0].cells[idx].data.parent;
            let ancestorCollapsed: boolean = false;
            while (ancestorCollapsed === false && parentCell) {
                ancestorCollapsed = parentCell.data.isCollapsed;
                if (ancestorCollapsed)
                    return false;
                parentCell = parentCell.data.parent;
            }
            return true
        });

        const gridRows: RowProps[] = computedRows.filter((row) => {
            return row.cells[0].data.parent ? !row.cells[0].data.parent.data.isCollapsed : true;
        });
        gridRows.forEach(gridRow => {
            gridRow.cells = gridRow.cells.filter(cell => {
                let cellHidden: boolean = false;

                if (cell.data.parent) {
                    cellHidden = cell.data.parent.data.isCollapsed;
                    let parentCell: Cell = cell.data.parent;
                    while (parentCell.data.parent) {
                        parentCell = parentCell.data.parent;
                        if (!cellHidden)
                            cellHidden = parentCell.data.isCollapsed;
                    }
                }

                return !cellHidden;
            })
        })

        // convert cells to basic types
        gridRows.forEach(gridRow => {
            gridRow.cells = gridRow.cells.filter(cell => {
                if (cell.type === 'bpNumber') {
                    cell.type = 'number';
                    cell.data = cell.data.value;
                }
                return true;
            })
        })

        return { columns: gridColumns, rows: gridRows, frozenLeftColumns: 1, frozenTopRows: 1 };
    }

    const dataChangeHandler = (dataChanges: DataChange[]): void => {

        dataChanges.forEach(dataChange => {
            if (dataChange.type === 'columnHeader') {
                if (dataChange.rowId === 'header') {
                    const newCollapsedLabels = { ...collapsedLabels };
                    newCollapsedLabels.columns[dataChange.columnId] = dataChange.newData.isCollapsed;
                    setCollapsedLabels(newCollapsedLabels);
                } else {
                    const newBudgetData: DataRow[] = [...budgetData];
                    const entry = newBudgetData.find(x => x.id === dataChange.rowId)
                    if (!entry) {
                        return;
                    }
                    entry.isCollapsed = dataChange.newData.isCollapsed;
                    setBudgetData(newBudgetData)
                }
            } else if (dataChange.type === 'number') {
                const newBudgetData: DataRow[] = [...budgetData];
                for (const category of newBudgetData) {
                    const subcategory = category.subcategories.find(x => x.id === dataChange.rowId);
                    if (!subcategory) {
                        continue;
                    }
                    let columnData: string[] = (dataChange.columnId as string).split(',');

                    if (columnData[0] !== 'month') {
                        continue
                    }
                    const entry: Entry = subcategory.entries.find(x => (x.year === parseInt(columnData[1]) && x.month === parseInt(columnData[2])))!;
                    if (!entry) {
                        subcategory.entries.push({ year: parseInt(columnData[1]), month: parseInt(columnData[2]) as MonthIdx, value: dataChange.newData })
                    } else {
                        entry.value = dataChange.newData || 0;
                    }
                    setBudgetData(newBudgetData);
                    break;
                }
            }
        })
    }

    const myCellTemplates: CellTemplates = {
        text: new BudgetPlannerTextCellTemplate(),
        bpNumber: new BudgetPlannerNumberCellTemplate(),
        columnHeader: new BudgetPlannerColumnHeaderCellTemplate(),
    }

    return (
        <ReactGrid
            style={{
                marginTop: 20,
                top: 50,
                position: 'relative'
            }}
            license='non-commercial'
            cellMatrixProps={generateCellMatrixProps()}
            disableRowSelection={true}
            cellTemplates={myCellTemplates}
            onDataChanged={dataChangeHandler}
        />
    )
}

export const BudgetPlannerSample: React.FC = () => {
    return (
        <ReactGridContainer id="budget-planner-sample">
            <BudgetPlanner
                budgetData={BudgetPlannerSampleData.budgetData}
                dateRange={BudgetPlannerSampleData.dateRange}
            />
        </ReactGridContainer>
    );
}