import * as React from 'react';
import { ReactGrid, ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, CellTemplates, Focus } from '@silevis/reactgrid';
import { VirtualEnv, VirtualUser, DynaGridDataGenerator } from './VirtualUser';
import styled from 'styled-components';
import { FeatureListContainer } from './styled-components/FeatureListContainer'
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';

interface Column {
    id: number;
    name: string;
    type: string;
    width: number;
    pinned: boolean;
}

export interface Record {
    id: number;
    name: string;
    surname: string;
    age: number;
    country: string;
    position: {
        name: string,
        isExpanded: boolean | undefined,
        depth: number
    };
    onHoliday: boolean;
    pinned: boolean;
    parentId?: number;
}


export interface IDynaGridDemoState {
    fields: Column[];
    records: Record[];
    focuses: Focus[];
    virtualUsers: boolean;
    resizing: boolean;
    columnReordering: boolean;
    rowReordering: boolean;
    flagCell: boolean;
    disableFillHandle: boolean;
    disableRangeSelection: boolean;
    frozenPanes: { top: number, bottom: number, left: number, right: number, active: boolean };
}

export interface IDemoActions {
    toggleResizeAction(): void;
    toggleColumnReorderAction(): void;
    toggleRowReorderAction(): void;
    toggleFreezePaneAction(): void;
    toggleVirtualUsersAction(): void;
    toggleFlagCellAction(): void;
    toggleDisableFillHandleAction(): void;
    toggleDisableRangeSelectionAction(): void;
    addNewRecordAction(): void;
    addNewFieldAction(): void;
}

const DemoContainer = styled.div`
    margin: 0;
    padding: 0;
`;

const DemoBody = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
`;

const DynaGridContainer = styled.div`
    position: relative;
    margin-left: 10px;
    width: 100%;
    min-height: 400px;
    font-family: Arial  , Helvetica, sans-serif;
`

const fields: Column[] = [
    {
        id: 1,
        name: 'position',
        type: 'text',
        width: 170,
        pinned: false,
    },
    {
        id: 2,
        name: 'name',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 3,
        name: 'surname',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 4,
        name: 'age',
        type: 'number',
        width: 125,
        pinned: false,
    },
    {
        id: 5,
        name: 'country',
        type: 'text',
        width: 125,
        pinned: false,
    },
    {
        id: 6,
        name: 'onHoliday',
        type: 'checkbox',
        width: 125,
        pinned: false,
    },
]

const records: any[] = [
    {
        id: 'Id',
        position: { name: 'Position' },
        name: 'Name',
        surname: 'Surname',
        age: 'age',
        country: 'Country',
        onHoliday: 'On Holiday',
        pinned: false
    },
    {
        id: 12,
        position: { name: '1.0', depth: 1 },
        name: 'Marcin',
        surname: 'Kowalski',
        age: 21,
        country: 'pol',
        onHoliday: false,
        pinned: false
    },
    {
        id: 1,
        position: { name: '1.0', isExpanded: true, depth: 1 },
        name: 'Marcin',
        surname: 'Kowalski',
        age: 21,
        country: 'pol',
        onHoliday: false,
        pinned: false
    },
    {
        id: 2,
        position: { name: '1.1', isExpanded: undefined, depth: 2 },
        name: 'Artur',
        surname: 'Kowalewski',
        age: 19,
        country: 'can',
        onHoliday: true,
        pinned: false,
        parentId: 1
    },
    {
        id: 3,
        position: { name: '1.2', isExpanded: undefined, depth: 2 },
        name: 'Marlena',
        surname: 'Zalewska',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 1
    },
    {
        id: 4,
        position: { name: '1.3', isExpanded: true, depth: 2 },
        name: 'Piotr',
        surname: 'Mikosza',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 1
    },
    {
        id: 5,
        position: { name: '1.3.1', depth: 3 },
        name: 'Paweł',
        surname: 'Tomkowski',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 4
    },
    {
        id: 6,
        position: { name: '1.3.2', isExpanded: true, depth: 3 },
        name: 'Michał',
        surname: 'Matejko',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 4
    },
    {
        id: 7,
        position: { name: '1.3.2.1', isExpanded: true, depth: 4 },
        name: 'Michal',
        surname: 'Czerwiec',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 6
    },
    {
        id: 8,
        position: { name: '1.3.2.1.1', isExpanded: true, depth: 5 },
        name: 'Maciek',
        surname: 'Czerwiec',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 7
    },
    {
        id: 9,
        position: { name: '1.3.2.1.1.1', depth: 6 },
        name: 'Paweł',
        surname: 'Czerwiec',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false,
        parentId: 8
    },
    {
        id: 10,
        position: { name: '2.0', depth: 1 },
        name: 'Paweł',
        surname: 'Czerwiec',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false
    },
    {
        id: 11,
        position: { name: '2.1', depth: 1 },
        name: 'Maciek',
        surname: 'Zaręba',
        age: 34,
        country: 'ven',
        onHoliday: false,
        pinned: false
    },
]

export default class AllInOneSample extends React.Component<{}, IDynaGridDemoState> {
    state = {
        fields: [...fields],
        records: [...records],
        focuses: [],
        virtualUsers: false,
        resizing: false,
        columnReordering: false,
        rowReordering: true,
        flagCell: true,
        disableFillHandle: false,
        disableRangeSelection: false,
        frozenPanes: { top: 0, bottom: 0, left: 0, right: 0, active: false },
    }

    intervalId: number = 0;

    private setVirtualEnv() {
        this.setState({ virtualUsers: true })
        const virtEnv: VirtualEnv = new VirtualEnv(this.state, this.prepareDataChanges);

        virtEnv
            .addUser(new VirtualUser('#fff700'))
            .addUser(new VirtualUser('#03fceb'))
            .addUser(new VirtualUser('#5b5b73'));

        this.intervalId = window.setInterval(() => {
            const state = virtEnv.updateView(this.state);
            this.setState(state);
        }, 1000)

    }

    private addNewRecord() {
        const dataGen: DynaGridDataGenerator = new DynaGridDataGenerator();
        const records = [...this.state.records];
        for (let x = 0; x < 10; x++) {
            records.push(dataGen.createNewUser());
        }
        this.setState({ records });
    }

    private addNewField() {
        const nextId = Math.max(...this.state.fields.map(field => field.id), 1) + 1;
        const randomCapitalLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const fieldName = nextId + randomCapitalLetter;
        const newField: Column = {
            id: nextId,
            name: fieldName,
            type: 'text',
            width: 125,
            pinned: false,
        };
        // TODO ... identyfikowanie headera po innym  Id
        const updatedHeaderRecord: Record = { ...this.state.records.find((record: any) => { return record.id === 'Id' ? record : undefined }), [fieldName]: fieldName };
        const updatedRecords: Record[] = [...this.state.records.map((record: any): Record => { return record.id === 'Id' ? updatedHeaderRecord : record })];

        this.setState({ fields: [...this.state.fields, newField], records: updatedRecords });
    }

    private unsetVirtualEnv() {
        this.setState({ virtualUsers: false, focuses: [] });
        window.clearInterval(this.intervalId)
    }

    private generateMatrix(): CellMatrixProps {
        const records = this.state.records.reduce((prev: any, curr: any) => {
            if (this.findParent(curr)) {
                prev.push(curr);
            }
            return prev;
        }, [])


        const columns: ColumnProps[] = this.state.fields.map((field, idx) => ({
            id: field.id,
            width: field.width,
            reorderable: this.state.columnReordering,
            resizable: this.state.resizing,
            onDrop: (ids) => this.setState({ fields: this.reorderedColumns(ids as number[], idx) }),
            onResize: width => { this.state.fields[idx].width = width, this.forceUpdate(); }
        }));


        const rows: RowProps[] = records.map((record: any, rowIdx: number) => ({
            id: record.id,
            height: 25,
            reorderable: this.state.rowReordering,
            cells: this.state.fields.map(field => { return { data: record[field.name], type: (rowIdx == 0) ? 'header' : field.type } }),
            onDrop: (ids: any[], position: string) => {
                this.setState({ records: this.reorderedRows(ids as any[], record.id, position) })
            },
            canDrop: (ids: any[]) => {
                const records = [...this.state.records];
                let movedRecords: Record[] = records.filter(record => ids.includes(record.id));
                movedRecords = this.prepareMovedRecords(movedRecords).movedRecords;

                if (movedRecords.some(r => r.id === record.id)) {
                    return false;
                } else {
                    return true;
                }
            }
        }))

        const frozenPanes = {
            frozenBottomRows: this.state.frozenPanes.bottom,
            frozenLeftColumns: this.state.frozenPanes.left,
            frozenRightColumns: this.state.frozenPanes.right,
            frozenTopRows: this.state.frozenPanes.top
        }
        return Object.assign({ columns, rows }, frozenPanes)
    }

    private prepareDataChanges = (dataChanges: DataChange[]): IDynaGridDemoState => {
        const state = { ...this.state }
        dataChanges.forEach(change => {
            state.records.forEach(r => {
                if (r.id == change.rowId) {
                    const field = this.state.fields.find(c => c.id == change.columnId)
                    if (field !== undefined) {
                        r[field.name] = change.newData;
                    }
                }
            })
        })
        return state
    }

    private calculateColumnReorder(fields: Column[], colIdxs: number[], direction: string, destination: number): Column[] {
        const movedColumns: Column[] = fields.filter((_, idx) => colIdxs.includes(idx));
        const clearedFields: Column[] = fields.filter((_, idx) => !colIdxs.includes(idx));
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1
        }
        clearedFields.splice(destination, 0, ...movedColumns)
        return clearedFields
    }

    private reorderedColumns(colIdxs: number[], to: number) {
        const direction = to > colIdxs[0] ? 'right' : 'left'
        return this.calculateColumnReorder([...this.state.fields], colIdxs, direction, to)
    }

    private findParent(currentRecord: Record): boolean {
        const records = [...this.state.records];
        if (!currentRecord.parentId) {
            return true;
        }
        const parent = records.find(record => {
            if (record.id === currentRecord.parentId) {
                return record;
            }
        });
        if (!parent.position.isExpanded) {
            return false;
        }
        return this.findParent(parent);
    }

    private getChildren(records: Record[], id: Id) {
        let children: Record[] = [];
        const findNestedChildren = (records: Record[], id: Id): Record[] =>
            records
                .filter((item: Record) => item['parentId'] === id)
                .reduce((_: Record[], current) => {
                    const parent = records.find(record => record.id === id);
                    if (parent) {
                        current.position.depth = parent.position.depth + 1;
                        children.push(current);
                    }
                    return findNestedChildren(records, current.id);
                }, []);
        findNestedChildren(records, id);
        return children;
    }

    private prepareMovedRecords(movedRecords: Record[]): { movedRecords: Record[], movedChildren: Record[] } {
        let movedChildren: Record[] = [];
        let tempMovedRecords: Record[] = [...movedRecords];
        for (let i = 0; i < movedRecords.length; i++) {
            const children = this.getChildren(records, movedRecords[i].id);
            if (children.length > 0) {
                for (let j = 0; j < children.length; j++) {
                    if (!movedRecords.some(record => record.id === children[j].id))
                        tempMovedRecords.splice(i + 1 + j, 0, children[j]);
                }
                movedChildren = movedChildren.concat(children);
            }
        }
        movedRecords = tempMovedRecords;
        return { movedRecords, movedChildren };
    }

    private reorderedRows(rowIds: any[], targetId: Id, position?: string) {
        const records = this.state.records;
        const targetElementIdx: number = records.findIndex(record => record.id === targetId);
        const targetElement: Record = position === 'before' ? records[targetElementIdx - 1] : records[targetElementIdx];
        const targetElementChildren: Record[] = this.getChildren(records, targetElement.id);
        let movedRecords: Record[] = records.filter(record => rowIds.includes(record.id));
        let updatedParents: Record[] = [];

        for (let i = 0; i < movedRecords.length; i++) {
            const parent = records.find(record => record.id === movedRecords[i].parentId);
            if (parent) {
                updatedParents.push(parent);
            }
        }

        if (position === 'on') {
            if (targetElementChildren.length === 0)
                targetElement.position.isExpanded = true;
            for (let i = 0; i < movedRecords.length; i++) {
                movedRecords[i].parentId = targetElement.id;
                movedRecords[i].position.depth = targetElement.position.depth + 1;
            }
        } else {
            if (targetElementChildren.length > 0 && targetElement.position.isExpanded) {
                for (let i = 0; i < movedRecords.length; i++) {
                    if (!movedRecords.some(record => record.id === movedRecords[i].parentId)) {
                        movedRecords[i].parentId = targetElement.id;
                        movedRecords[i].position.depth = targetElement.position.depth + 1;
                    }
                }
            } else {
                for (let i = 0; i < movedRecords.length; i++) {
                    if (!targetElement.parentId) {
                        if (!movedRecords.some(record => record.id === movedRecords[i].parentId)) {
                            movedRecords[i].parentId = undefined;
                            movedRecords[i].position.depth = 1;
                        }
                    } else {
                        const parentTargetElement = records.find(record => record.id === targetElement.parentId);
                        movedRecords[i].parentId = parentTargetElement.id;
                        movedRecords[i].position.depth = parentTargetElement.position.depth + 1;
                    }
                }
            }
        }

        const preparedMovedRecords = this.prepareMovedRecords(movedRecords);
        const movedChildren: Record[] = preparedMovedRecords.movedChildren;
        const movedChildrenIds: Id[] = movedChildren.length > 0 ? movedChildren.reduce((result: Id[], curr: Record) => { result.push(curr.id); return result }, []) : [];
        movedRecords = preparedMovedRecords.movedRecords;

        const clearedRecords = records.filter((record, idx) => !rowIds.includes(record.id) && !movedChildrenIds.includes(records[idx].id));

        if (updatedParents.length > 0) {
            updatedParents.forEach(record => {
                if (!records.some(r => record.id === r.parentId)) {
                    const index = clearedRecords.findIndex(r => r.id === record.id);
                    if (index !== -1) {
                        clearedRecords[index].position.isExpanded = undefined;
                    }
                }
            });
        }

        let targetIdx = clearedRecords.findIndex(record => record.id === targetId);

        if (position === 'on') {
            clearedRecords[targetIdx] = targetElement;
            targetIdx = targetIdx + 1;
        } else if (position === 'after') {
            targetIdx = targetIdx + 1 + (targetElement.position.isExpanded === false ? targetElementChildren.length : 0);
        }

        clearedRecords.splice(targetIdx, 0, ...movedRecords);
        return clearedRecords;
    }

    private handleRowContextMenu(selectedRowIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedRowIds.length === 0) return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete row', handler: () => this.setState({ records: this.deleteRows(selectedRowIds), focuses: this.deleteRowsFocuses(selectedRowIds) })
            },
            {
                title: 'Pin row to the top', handler: () => this.setState(this.pinRows(selectedRowIds, 'top'))
            },
            {
                title: 'Pin row to the bottom', handler: () => this.setState(this.pinRows(selectedRowIds, 'bottom'))
            },
            {
                title: 'Unpin row(s)', handler: () => this.setState(this.unpinRows(selectedRowIds))
            },
        ]);

        if (this.state.records.filter(r => selectedRowIds.includes(r.id)).some(r => r.pinned == true))
            menuOptions = menuOptions.filter(o => o.title !== 'Pin row to the top' && o.title !== 'Pin row to the bottom')
        else if (this.state.records.filter(r => selectedRowIds.includes(r.id)).some(r => r.pinned == false))
            menuOptions = menuOptions.filter(o => o.title !== 'Unpin row(s)')

        return menuOptions
    }

    private handleColContextMenu(selectedColIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        if (selectedColIds.length === 0) return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete Column', handler: () => this.setState({ fields: this.deleteColumns(selectedColIds), focuses: this.deleteColumnsFocuses(selectedColIds) })
            },
            {
                title: 'Pin column to the left', handler: () => this.setState(this.pinColumns(selectedColIds, 'left'))
            },
            {
                title: 'Pin column to the right', handler: () => this.setState(this.pinColumns(selectedColIds, 'right'))
            },
            {
                title: 'Unpin column(s)', handler: () => this.setState(this.unpinColumns(selectedColIds))
            },
        ]);

        if (this.state.fields.filter(f => selectedColIds.includes(f.id)).some(f => f.pinned == true))
            menuOptions = menuOptions.filter(o => o.title !== 'Pin column to the left' && o.title !== 'Pin column to the right')
        else if (this.state.fields.filter(f => !selectedColIds.includes(f.id)).some(f => f.pinned == false))
            menuOptions = menuOptions.filter(o => o.title !== 'Unpin column(s)')

        return menuOptions
    }

    private deleteRows(selectedRowIds: Id[]): Record[] {
        const records = [...this.state.records]
        selectedRowIds.forEach(id => {
            const childrenIds = this.getChildren(records, id).map(c => c.id)
            selectedRowIds = selectedRowIds.concat(childrenIds)
        })
        return records.filter(r => !selectedRowIds.includes(r.id));
    }

    private deleteColumns(selectedColIds: Id[]): Column[] {
        return [...this.state.fields].filter(f => !selectedColIds.includes(f.id));
    }

    private deleteRowsFocuses(selectedRowIds: Id[]): Focus[] {
        return [...this.state.focuses].filter((focusRow: Focus) => !selectedRowIds.includes(focusRow.rowId));
    }

    private deleteColumnsFocuses(selectedColIds: Id[]): Focus[] {
        return [...this.state.focuses].filter((focusRow: Focus) => !selectedColIds.includes(focusRow.columnId));
    }

    private pinColumns(ids: Id[], direction: 'left' | 'right'): IDynaGridDemoState {
        const indexes: number[] = ids.map(id => this.state.fields.findIndex(f => f.id == id));
        if (direction == 'left') {
            return {
                ...this.state,
                fields: this.reorderedColumns(indexes, this.state.frozenPanes.left).map(f => ids.includes(f.id) ? { ...f, pinned: true } : f),
                frozenPanes: { ...this.state.frozenPanes, left: this.state.frozenPanes.left + indexes.length }
            }

        } else {
            return {
                ...this.state,
                fields: this.reorderedColumns(indexes, this.state.fields.length - this.state.frozenPanes.right - 1).map(f => ids.includes(f.id) ? { ...f, pinned: true } : f),
                frozenPanes: { ...this.state.frozenPanes, right: this.state.frozenPanes.right + indexes.length },
            }
        }
    }

    private unpinColumns(ids: Id[]) {
        const indexes: number[] = ids.map(id => this.state.fields.findIndex(f => f.id == id)).filter(i => this.state.fields[i].pinned == true)
        if (indexes[0] > this.state.frozenPanes.left) {
            return {
                ...this.state,
                fields: this.calculateColumnReorder([...this.state.fields], indexes, 'right', this.state.fields.length - this.state.frozenPanes.right).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    right: this.state.frozenPanes.right - indexes.length
                }
            }
        } else {
            return {
                ...this.state,
                fields: this.calculateColumnReorder([...this.state.fields], indexes, 'left', this.state.frozenPanes.left - indexes.length).map(f => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    left: this.state.frozenPanes.left - indexes.length,
                }
            }
        }
    }

    private unpinRows(ids: Id[]) {
        const indexes: number[] = ids.map(id => this.state.records.findIndex(r => r.id == id)).filter(i => this.state.records[i].pinned == true)
        if (indexes[0] > this.state.frozenPanes.top) {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom).map((f: any) => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    bottom: this.state.frozenPanes.bottom - indexes.length
                }
            }
        } else {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.frozenPanes.top - 1).map((f: any) => ids.includes(f.id) ? { ...f, pinned: false } : f),
                frozenPanes: {
                    ...this.state.frozenPanes,
                    top: this.state.frozenPanes.top - indexes.length,
                }
            }
        }

    }

    private pinRows(ids: Id[], direction: 'top' | 'bottom'): IDynaGridDemoState {
        const indexes: number[] = [];
        ids.forEach(id => indexes.push(this.state.records.findIndex(r => r.id == id)))
        if (direction == 'top') {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.frozenPanes.top).map((r: any) => ids.includes(r.id) ? { ...r, pinned: true } : r),
                frozenPanes: { ...this.state.frozenPanes, top: this.state.frozenPanes.top + indexes.length }
            }
        } else {
            return {
                ...this.state,
                records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom - 1).map((r: any) => ids.includes(r.id) ? { ...r, pinned: true } : r),
                frozenPanes: { ...this.state.frozenPanes, bottom: this.state.frozenPanes.bottom + indexes.length }
            }
        }
    }

    private handleRangeContextMenu(selectedRowIds: Id[], selectedColIds: Id[], menuOptions: MenuOption[]): MenuOption[] {
        return menuOptions.concat([
            {
                title: 'Delete row', handler: () => this.setState({ records: this.deleteRows(selectedRowIds), focuses: this.deleteRowsFocuses(selectedRowIds) })
            },
            {
                title: 'Delete column', handler: () => this.setState({ fields: this.deleteColumns(selectedColIds), focuses: this.deleteColumnsFocuses(selectedColIds) })
            },
        ]);
    }

    demoActions: IDemoActions = {
        toggleResizeAction: () => {
            this.setState({ resizing: !this.state.resizing })
        },
        toggleColumnReorderAction: () => {
            this.setState({ columnReordering: !this.state.columnReordering })
        },
        toggleRowReorderAction: () => {
            this.setState({ rowReordering: !this.state.rowReordering })
        },
        toggleFreezePaneAction: () => {
            this.setState({
                frozenPanes: this.state.frozenPanes.active ? { top: 0, bottom: 0, left: 0, right: 0, active: false } :
                    { top: 1, bottom: 1, left: 1, right: 1, active: true }
            })
        },
        toggleVirtualUsersAction: () => {
            this.state.virtualUsers ? this.unsetVirtualEnv() : this.setVirtualEnv()
        },
        addNewRecordAction: () => {
            this.addNewRecord();
        },
        addNewFieldAction: () => {
            this.addNewField();
        },
        toggleFlagCellAction: () => {
            this.setState({ flagCell: !this.state.flagCell });
        },
        toggleDisableFillHandleAction: () => {
            this.setState({ disableFillHandle: !this.state.disableFillHandle });
        },
        toggleDisableRangeSelectionAction: () => {
            this.setState({ disableRangeSelection: !this.state.disableRangeSelection });
        }
    }

    getCustomCellTemplates(): any {
        const cellTemplates: CellTemplates = {
            'flag': new FlagCellTemplate,
        };
        return this.state.flagCell ? cellTemplates : {};
    }

    render() {
        return <DemoContainer>
            <DemoBody>
                <FeatureListContainer
                    demoActions={this.demoActions}
                    state={this.state} />
                <DynaGridContainer>
                    <ReactGrid
                        cellMatrixProps={this.generateMatrix()}
                        onDataChanged={changes => this.setState(this.prepareDataChanges(changes))}
                        customFocuses={[]} // REMOVE after FIX 
                        // customFocuses={this.state.focuses} // UNCOMMENT after FIX
                        onRowContextMenu={(selectedRowIds: Id[], menuOptions: MenuOption[]) => this.handleRowContextMenu(selectedRowIds, menuOptions)}
                        onColumnContextMenu={(selectedColIds: Id[], menuOptions: MenuOption[]) => this.handleColContextMenu(selectedColIds, menuOptions)}
                        // onRangeContextMenu={(selectedRowIds: Id[], selectedColIds: Id[], menuOptions: MenuOption[]) => this.handleRangeContextMenu(selectedRowIds, selectedColIds, menuOptions)} 
                        cellTemplates={this.getCustomCellTemplates()}
                        disableFillHandle={this.state.disableFillHandle}
                        disableRangeSelection={this.state.disableRangeSelection}
                        disableRowSelection={false}
                        disableColumnSelection={false}
                        license="non-commercial"
                    // license="1 developers until 2030-10-07 issued for Silevis Software // 1914789361"
                    />
                </DynaGridContainer>
            </DemoBody>
        </DemoContainer>
    }
}