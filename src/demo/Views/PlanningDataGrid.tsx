import * as React from 'react'
import { Grid, CellMatrix, Cell } from 'lib'
import { HeaderCell, ToggleCell, NumberCell } from "lib"
import {  ColProps } from 'lib/Model';
import { RowProps } from 'lib/Model';

export interface PlanningGroup {
    id: string, name: string, parentId: string
}
export interface Map<T> {
    [key: string]: T;
}
export interface PlanningItem {
    id: string, groupId: string, name: string
}
export interface PlanningRecord {
    id: string
    itemId: string,
    month: number, value: number
}
export class GroupPlanning {

    constructor(public id: string, public name: string, public collapsed: boolean, public items: Map<ItemPlanning>, public groups: Map<GroupPlanning>) {

    }

    getValue() {
        let sum: number = 0
        Object.keys(this.items).forEach(iKey => {
            sum += Number(this.items[iKey].getValue())
        })
        return sum
    }


    setValue(newValue: number) {
        let oldValue = this.getValue()
        Object.keys(this.items).forEach(iKey => {
            (newValue === 0) ? this.items[iKey].setValue(0) : this.items[iKey].setValue(Number(((this.items[iKey].getValue() / oldValue) * newValue).toFixed(2)))
        })
    }

    getMonthSummary(month: number) {
        let sum: number = 0
        Object.keys(this.items).forEach(iKey => {
            sum += this.items[iKey].records[month] ? Number(this.items[iKey].records[month].value) : 0
        })
        return sum
    }

    setMonthSummary(newValue: number, month: number) {
        const oldValue = this.getMonthSummary(month);
        Object.keys(this.items).forEach(iKey => {
            this.items[iKey].records[month] ? this.items[iKey].records[month].value = Number(((this.items[iKey].records[month].value / oldValue) * newValue).toFixed(2)) : this.items[iKey].records[month] = new RecordPlanning()

        })
    }

    setQuarterSummary(quater: Quarter, newValue: number) {
        let oldValue: number = Number(quater.getValue(Object.keys(this.items).map(key => this.items[key])))
        Object.keys(this.items).forEach(itemKey => {
            let qValue = (Number(quater.getValue([this.items[itemKey]])) / oldValue) * newValue
            quater.setValue(qValue, this.items[itemKey])
        })

    }

}

export class ViewModel {
    constructor(public groups: Map<GroupPlanning>, public quarters: Quarter[]) {

    }
}

export class ItemPlanning {

    constructor(public id: string, public name: string, public records: Map<RecordPlanning>) {

    }


    getValue() {
        let sum: number = 0
        Object.keys(this.records).forEach(rKey => {
            sum += Number(this.records[rKey].value)
        })
        return sum
    }

    setValue(newValue: number) {
        let oldValue = this.getValue()
        Object.keys(this.records).forEach(rKey => {
            newValue === 0 ? this.records[rKey].value : this.records[rKey].value = Number(((this.records[rKey].value / oldValue * newValue).toFixed(2))
            )
        })
    }
}

export class RecordPlanning {
    id: string
    itemId: string
    value: number = 0
}

export interface Field {
    name: string
    width: number
}

export class Quarter {

    constructor(public id: string, public months: number[], public colapsed: boolean) {

    }
    getValue(items: ItemPlanning[]) {
        let sum = 0
        Object.keys(items).forEach((itemkey: any) => {
            this.months.forEach(m => {
                sum += Number(items[itemkey].records[m] ? items[itemkey].records[m].value : '0')
            })
        })
        return sum.toString()
    }
    setValue(value: any, item: ItemPlanning) {
        let oldValue = Number(this.getValue([item]))
        if (value != 0) Object.keys(item.records).forEach(iKey => {
            (item.records[iKey]) ? Number((item.records[iKey].value = (item.records[iKey].value / oldValue) * value)) : new RecordPlanning()
        })

    }
}
export interface PlanningDataGridProps {
    groups: PlanningGroup[]
    items: PlanningItem[]
    records: PlanningRecord[]
}

export class PlanningDataGrid extends React.Component<PlanningDataGridProps, { cellMatrix: CellMatrix }> {


    private viewModel: ViewModel

    componentWillMount() {
        this.viewModel = this.generateViewModel()
        this.generateCellMatrix()
    }
    componentWillReceiveProps() {
        this.generateCellMatrix()
    }

    generateCellMatrix() {
        const cells = this.generateGrid();
        const columns: ColProps[] = cells[0].map(_ => { return { width: 200, context: undefined } });
        const rows: RowProps[] = cells.map(_ => { return { height: 25, context: undefined } })
        this.setState({ cellMatrix: new CellMatrix({ rows, columns, cells, frozenTopRows: 1, frozenLeftColumns: 1 }) })
    }

    generateViewModel(): ViewModel {
        let groups: Map<GroupPlanning> = {}
        this.props.groups.filter(g => g.parentId === '').forEach(group => {
            groups[group.id] = this.generateGroup(group, this.props.groups, this.props.items, this.props.records)
        })
        let quarters: Quarter[] = [
            new Quarter('1', [1, 2, 3], false),
            new Quarter('2', [4, 5, 6], false),
            new Quarter('3', [7, 8, 9], false),
            new Quarter('4', [10, 11, 12], false),
        ]
        return { groups, quarters }
    }

    generateGroup(group: PlanningGroup, groups: PlanningGroup[], items: PlanningItem[], records: PlanningRecord[]): GroupPlanning {
        let itemMap: Map<ItemPlanning> = {}
        items.filter(ip => ip.groupId === group.id).forEach(item => {
            const newItem = this.generateItem(item, records)
            itemMap[item.id] = newItem
        })
        let groupMap: Map<GroupPlanning> = {}
        groups.filter(g => g.parentId === group.id).forEach(g => {
            groupMap[g.id] = this.generateGroup(g, groups, items, records)
        })
        return new GroupPlanning(group.id, group.name, false, itemMap, groupMap)
    }

    generateItem(item: PlanningItem, records: PlanningRecord[]): ItemPlanning {
        //let itemSum = 0;
        let recordMap: Map<RecordPlanning> = {}
        records.filter(r => r.itemId === item.id).forEach(record => {
            //itemSum += record.value
            recordMap[record.month] = {
                id: record.id,
                value: record.value,
                itemId: item.id
            }
        })
        return new ItemPlanning(item.id, item.name, recordMap)
    }

    private generateGrid(): Cell[][] {
        let cells: Cell[][] = []
        let rowIndex = 0

        cells.push([])
        cells[0].push(HeaderCell.Create('horizontal', '', value => { }, false))
        cells[0].push(HeaderCell.Create('horizontal', 'Year', value => { }, false))
        this.viewModel.quarters.forEach(quater => {

            cells[0].push(ToggleCell.Create('Q' + quater.id, quater.colapsed,
                () => {
                    quater.colapsed = !quater.colapsed
                    this.generateCellMatrix()
                },
                value => { }))
            if (!quater.colapsed) {
                quater.months.forEach(
                    (month, monthi) => { cells[0].push(HeaderCell.Create('horizontal', month.toString(), value => { }, false)) }
                )
            }

        }
        )

        Object.keys(this.viewModel.groups).forEach((gkey, i) => {
            let group: GroupPlanning | undefined = this.viewModel.groups[gkey];
            rowIndex++
            this.generateGroupRow(rowIndex, group, cells);
            if (!group.collapsed) {
                Object.keys(group.items).forEach(itemKey => {
                    rowIndex++
                    let item = group.items[itemKey]
                    cells.push([])
                    this.generateItemRow(cells, rowIndex, item);

                })
                Object.keys(group.groups).forEach(groupInGroupKey => {
                    rowIndex++
                    let innerGroup = group.groups[groupInGroupKey]
                    this.generateGroupRow(rowIndex, innerGroup, cells);
                    if (!innerGroup.collapsed)
                        Object.keys(group.groups[groupInGroupKey].items).forEach(itemInGroupKey => {
                            rowIndex++
                            let item = group.groups[groupInGroupKey].items[itemInGroupKey]
                            cells.push([])
                            this.generateItemRow(cells, rowIndex, item);

                        })
                })
            }
        })
        return cells;

    }



    handleRowReorder = (movedRowIds: number[], rowIdUnderCursor: number, positionChange: number) => {
        this.forceUpdate()
    }

    handleColReorder = (movedColumnIds: number[], columnIdUnderCursor: number, positionChange: number) => {
        this.forceUpdate()
    }

    ha4ndleColResize = (resizedColumnIdx: number, newColWidth: number) => {
        this.generateCellMatrix()
        this.forceUpdate()
    }


    private generateGroupRow(rowIndex: number, group: GroupPlanning, cells: Cell[][]) {
        cells.push([]);
        cells[rowIndex].push(ToggleCell.Create(group.name, group.collapsed, () => {
            group.collapsed = !group.collapsed;
            this.generateCellMatrix();
        }, value => { }));
        cells[rowIndex].push(NumberCell.Create(group.getValue().toString(), value => {
            group.setValue(value);
            //this.generateCellMatrix();
        }, 2, { background: '#E8F5E9' }));
        this.viewModel.quarters.forEach(quater => {
            cells[rowIndex].push(NumberCell.Create(quater.getValue(Object.keys(group.items).map(key => group.items[key])), value => {
                group.setQuarterSummary(quater, value);
                //this.generateCellMatrix();
            }, 2, { background: '#E8F5E9' }));
            if (!quater.colapsed)
                quater.months.forEach((rKey) => {
                    cells[rowIndex].push(NumberCell.Create(group.getMonthSummary(rKey).toString(), value => {
                        group.setMonthSummary(value, rKey);
                        //this.generateCellMatrix();
                    }, 2, { background: '#E8F5E9' }));
                });
        });
        return { group, rowIndex };
    }

    private generateItemRow(cells: Cell[][], rowIndex: number, item: ItemPlanning) {
        cells[rowIndex].push(HeaderCell.Create('vertical', '→ ' + item.name, value => { }, false));
        cells[rowIndex].push(NumberCell.Create(item.getValue().toString(), value => { item.setValue(value); }, 2, { background: '#E8F5E9' }));
        this.viewModel.quarters.forEach(quater => {
            let items = [];
            items.push(item);
            cells[rowIndex].push(NumberCell.Create(quater.getValue(items), value => {
                quater.setValue(value, item)
                //this.generateCellMatrix()
            }, 2, { background: '#E8F5E9' }));
            if (!quater.colapsed) {
                quater.months.forEach((rKey) => {
                    cells[rowIndex].push(NumberCell.Create((item.records[rKey]) ? item.records[rKey].value.toString() : '0', value => {
                        if (!item.records[rKey]) {

                            item.records[rKey] = {
                                itemId: item.id,
                                id: '0',
                                value: 0
                            };
                        }
                        item.records[rKey].value = value;
                    }, 2));
                })
            };
        });
    }

    render() {
        return <Grid style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, fontFamily: ' Sans-Serif' }}
            cellMatrix={this.state.cellMatrix}
            onValuesChanged={() => { this.generateCellMatrix(); this.forceUpdate() }} />

    }
}