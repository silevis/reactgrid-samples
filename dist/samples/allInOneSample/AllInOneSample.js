var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import { VirtualEnv, VirtualUser, ReactGridDataGenerator } from './VirtualUser';
import styled from 'styled-components';
import { FeatureListContainer } from './styled-components/FeatureListContainer';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import './styling.scss';
var DemoContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    margin: 0;\n    padding: 0;\n"], ["\n    margin: 0;\n    padding: 0;\n"])));
var DemoBody = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    margin: 0;\n    padding: 0;\n"], ["\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    margin: 0;\n    padding: 0;\n"])));
var ReactGridContainer = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    position: relative;\n    margin-left: 10px;\n    width: 100%;\n    min-height: 400px;\n"], ["\n    position: relative;\n    margin-left: 10px;\n    width: 100%;\n    min-height: 400px;\n"])));
var fields = [
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
];
var records = [
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
];
var AllInOneSample = (function (_super) {
    __extends(AllInOneSample, _super);
    function AllInOneSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            fields: fields.slice(),
            records: records.slice(),
            focuses: [],
            virtualUsers: false,
            resizing: false,
            columnReordering: false,
            rowReordering: true,
            flagCell: true,
            disableFillHandle: false,
            disableRangeSelection: false,
            frozenPanes: { top: 0, bottom: 0, left: 0, right: 0, active: false },
        };
        _this.intervalId = 0;
        _this.prepareDataChanges = function (dataChanges) {
            var state = __assign({}, _this.state);
            dataChanges.forEach(function (change) {
                state.records.forEach(function (r) {
                    if (r.id == change.rowId) {
                        var field = _this.state.fields.find(function (c) { return c.id == change.columnId; });
                        if (field !== undefined) {
                            r[field.name] = change.newData;
                        }
                    }
                });
            });
            return state;
        };
        _this.demoActions = {
            toggleResizeAction: function () {
                _this.setState({ resizing: !_this.state.resizing });
            },
            toggleColumnReorderAction: function () {
                _this.setState({ columnReordering: !_this.state.columnReordering });
            },
            toggleRowReorderAction: function () {
                _this.setState({ rowReordering: !_this.state.rowReordering });
            },
            toggleFreezePaneAction: function () {
                _this.setState({
                    frozenPanes: _this.state.frozenPanes.active ? { top: 0, bottom: 0, left: 0, right: 0, active: false } :
                        { top: 1, bottom: 1, left: 1, right: 1, active: true }
                });
            },
            toggleVirtualUsersAction: function () {
                _this.state.virtualUsers ? _this.unsetVirtualEnv() : _this.setVirtualEnv();
            },
            addNewRecordAction: function () {
                _this.addNewRecord();
            },
            addNewFieldAction: function () {
                _this.addNewField();
            },
            toggleFlagCellAction: function () {
                _this.setState({ flagCell: !_this.state.flagCell });
            },
            toggleDisableFillHandleAction: function () {
                _this.setState({ disableFillHandle: !_this.state.disableFillHandle });
            },
            toggleDisableRangeSelectionAction: function () {
                _this.setState({ disableRangeSelection: !_this.state.disableRangeSelection });
            }
        };
        return _this;
    }
    AllInOneSample.prototype.setVirtualEnv = function () {
        var _this = this;
        this.setState({ virtualUsers: true });
        var virtEnv = new VirtualEnv(this.state, this.prepareDataChanges);
        virtEnv
            .addUser(new VirtualUser('#fff700'))
            .addUser(new VirtualUser('#03fceb'))
            .addUser(new VirtualUser('#5b5b73'));
        this.intervalId = window.setInterval(function () {
            var state = virtEnv.updateView(_this.state);
            _this.setState(state);
        }, 1000);
    };
    AllInOneSample.prototype.addNewRecord = function () {
        var dataGen = new ReactGridDataGenerator();
        var records = this.state.records.slice();
        for (var x = 0; x < 10; x++) {
            records.push(dataGen.createNewUser());
        }
        this.setState({ records: records });
    };
    AllInOneSample.prototype.addNewField = function () {
        var _a;
        var nextId = Math.max.apply(Math, this.state.fields.map(function (field) { return field.id; }).concat([1])) + 1;
        var randomCapitalLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var fieldName = nextId + randomCapitalLetter;
        var newField = {
            id: nextId,
            name: fieldName,
            type: 'text',
            width: 125,
            pinned: false,
        };
        var updatedHeaderRecord = __assign({}, this.state.records.find(function (record) { return record.id === 'Id' ? record : undefined; }), (_a = {}, _a[fieldName] = fieldName, _a));
        var updatedRecords = this.state.records.map(function (record) { return record.id === 'Id' ? updatedHeaderRecord : record; }).slice();
        this.setState({ fields: this.state.fields.concat([newField]), records: updatedRecords });
    };
    AllInOneSample.prototype.unsetVirtualEnv = function () {
        this.setState({ virtualUsers: false, focuses: [] });
        window.clearInterval(this.intervalId);
    };
    AllInOneSample.prototype.generateMatrix = function () {
        var _this = this;
        var records = this.state.records.reduce(function (prev, curr) {
            if (_this.findParent(curr)) {
                prev.push(curr);
            }
            return prev;
        }, []);
        var columns = this.state.fields.map(function (field, idx) { return ({
            id: field.id,
            width: field.width,
            reorderable: _this.state.columnReordering,
            resizable: _this.state.resizing,
            onDrop: function (ids) { return _this.setState({ fields: _this.reorderedColumns(ids, idx) }); },
            onResize: function (width) { _this.state.fields[idx].width = width, _this.forceUpdate(); }
        }); });
        var rows = records.map(function (record, rowIdx) { return ({
            id: record.id,
            height: 25,
            reorderable: _this.state.rowReordering,
            cells: _this.state.fields.map(function (field) { return { data: record[field.name], type: (rowIdx == 0) ? 'header' : field.type }; }),
            onDrop: function (ids, position) {
                _this.setState({ records: _this.reorderedRows(ids, record.id, position) });
            },
            canDrop: function (ids) {
                var records = _this.state.records.slice();
                var movedRecords = records.filter(function (record) { return ids.includes(record.id); });
                movedRecords = _this.prepareMovedRecords(movedRecords).movedRecords;
                if (movedRecords.some(function (r) { return r.id === record.id; })) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }); });
        var frozenPanes = {
            frozenBottomRows: this.state.frozenPanes.bottom,
            frozenLeftColumns: this.state.frozenPanes.left,
            frozenRightColumns: this.state.frozenPanes.right,
            frozenTopRows: this.state.frozenPanes.top
        };
        return Object.assign({ columns: columns, rows: rows }, frozenPanes);
    };
    AllInOneSample.prototype.calculateColumnReorder = function (fields, colIdxs, direction, destination) {
        var movedColumns = fields.filter(function (_, idx) { return colIdxs.includes(idx); });
        var clearedFields = fields.filter(function (_, idx) { return !colIdxs.includes(idx); });
        if (direction === 'right') {
            destination = destination - colIdxs.length + 1;
        }
        clearedFields.splice.apply(clearedFields, [destination, 0].concat(movedColumns));
        return clearedFields;
    };
    AllInOneSample.prototype.reorderedColumns = function (colIdxs, to) {
        var direction = to > colIdxs[0] ? 'right' : 'left';
        return this.calculateColumnReorder(this.state.fields.slice(), colIdxs, direction, to);
    };
    AllInOneSample.prototype.findParent = function (currentRecord) {
        var records = this.state.records.slice();
        if (!currentRecord.parentId) {
            return true;
        }
        var parent = records.find(function (record) {
            if (record.id === currentRecord.parentId) {
                return record;
            }
        });
        if (!parent.position.isExpanded) {
            return false;
        }
        return this.findParent(parent);
    };
    AllInOneSample.prototype.getChildren = function (records, id) {
        var children = [];
        var findNestedChildren = function (records, id) {
            return records
                .filter(function (item) { return item['parentId'] === id; })
                .reduce(function (_, current) {
                var parent = records.find(function (record) { return record.id === id; });
                if (parent) {
                    current.position.depth = parent.position.depth + 1;
                    children.push(current);
                }
                return findNestedChildren(records, current.id);
            }, []);
        };
        findNestedChildren(records, id);
        return children;
    };
    AllInOneSample.prototype.prepareMovedRecords = function (movedRecords) {
        var movedChildren = [];
        var tempMovedRecords = movedRecords.slice();
        var _loop_1 = function (i) {
            var children = this_1.getChildren(records, movedRecords[i].id);
            if (children.length > 0) {
                var _loop_2 = function (j) {
                    if (!movedRecords.some(function (record) { return record.id === children[j].id; }))
                        tempMovedRecords.splice(i + 1 + j, 0, children[j]);
                };
                for (var j = 0; j < children.length; j++) {
                    _loop_2(j);
                }
                movedChildren = movedChildren.concat(children);
            }
        };
        var this_1 = this;
        for (var i = 0; i < movedRecords.length; i++) {
            _loop_1(i);
        }
        movedRecords = tempMovedRecords;
        return { movedRecords: movedRecords, movedChildren: movedChildren };
    };
    AllInOneSample.prototype.reorderedRows = function (rowIds, targetId, position) {
        var records = this.state.records;
        var targetElementIdx = records.findIndex(function (record) { return record.id === targetId; });
        var targetElement = position === 'before' ? records[targetElementIdx - 1] : records[targetElementIdx];
        var targetElementChildren = this.getChildren(records, targetElement.id);
        var movedRecords = records.filter(function (record) { return rowIds.includes(record.id); });
        var updatedParents = [];
        var _loop_3 = function (i) {
            var parent_1 = records.find(function (record) { return record.id === movedRecords[i].parentId; });
            if (parent_1) {
                updatedParents.push(parent_1);
            }
        };
        for (var i = 0; i < movedRecords.length; i++) {
            _loop_3(i);
        }
        if (position === 'on') {
            if (targetElementChildren.length === 0)
                targetElement.position.isExpanded = true;
            for (var i = 0; i < movedRecords.length; i++) {
                movedRecords[i].parentId = targetElement.id;
                movedRecords[i].position.depth = targetElement.position.depth + 1;
            }
        }
        else {
            if (targetElementChildren.length > 0 && targetElement.position.isExpanded) {
                var _loop_4 = function (i) {
                    if (!movedRecords.some(function (record) { return record.id === movedRecords[i].parentId; })) {
                        movedRecords[i].parentId = targetElement.id;
                        movedRecords[i].position.depth = targetElement.position.depth + 1;
                    }
                };
                for (var i = 0; i < movedRecords.length; i++) {
                    _loop_4(i);
                }
            }
            else {
                var _loop_5 = function (i) {
                    if (!targetElement.parentId) {
                        if (!movedRecords.some(function (record) { return record.id === movedRecords[i].parentId; })) {
                            movedRecords[i].parentId = undefined;
                            movedRecords[i].position.depth = 1;
                        }
                    }
                    else {
                        var parentTargetElement = records.find(function (record) { return record.id === targetElement.parentId; });
                        movedRecords[i].parentId = parentTargetElement.id;
                        movedRecords[i].position.depth = parentTargetElement.position.depth + 1;
                    }
                };
                for (var i = 0; i < movedRecords.length; i++) {
                    _loop_5(i);
                }
            }
        }
        var preparedMovedRecords = this.prepareMovedRecords(movedRecords);
        var movedChildren = preparedMovedRecords.movedChildren;
        var movedChildrenIds = movedChildren.length > 0 ? movedChildren.reduce(function (result, curr) { result.push(curr.id); return result; }, []) : [];
        movedRecords = preparedMovedRecords.movedRecords;
        var clearedRecords = records.filter(function (record, idx) { return !rowIds.includes(record.id) && !movedChildrenIds.includes(records[idx].id); });
        if (updatedParents.length > 0) {
            updatedParents.forEach(function (record) {
                if (!records.some(function (r) { return record.id === r.parentId; })) {
                    var index = clearedRecords.findIndex(function (r) { return r.id === record.id; });
                    if (index !== -1) {
                        clearedRecords[index].position.isExpanded = undefined;
                    }
                }
            });
        }
        var targetIdx = clearedRecords.findIndex(function (record) { return record.id === targetId; });
        if (position === 'on') {
            clearedRecords[targetIdx] = targetElement;
            targetIdx = targetIdx + 1;
        }
        else if (position === 'after') {
            targetIdx = targetIdx + 1 + (targetElement.position.isExpanded === false ? targetElementChildren.length : 0);
        }
        clearedRecords.splice.apply(clearedRecords, [targetIdx, 0].concat(movedRecords));
        return clearedRecords;
    };
    AllInOneSample.prototype.handleRowContextMenu = function (selectedRowIds, menuOptions) {
        var _this = this;
        if (selectedRowIds.length === 0)
            return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete row', handler: function () { return _this.setState({ records: _this.deleteRows(selectedRowIds), focuses: _this.deleteRowsFocuses(selectedRowIds) }); }
            },
            {
                title: 'Pin row to the top', handler: function () { return _this.setState(_this.pinRows(selectedRowIds, 'top')); }
            },
            {
                title: 'Pin row to the bottom', handler: function () { return _this.setState(_this.pinRows(selectedRowIds, 'bottom')); }
            },
            {
                title: 'Unpin row(s)', handler: function () { return _this.setState(_this.unpinRows(selectedRowIds)); }
            },
        ]);
        if (this.state.records.filter(function (r) { return selectedRowIds.includes(r.id); }).some(function (r) { return r.pinned == true; }))
            menuOptions = menuOptions.filter(function (o) { return o.title !== 'Pin row to the top' && o.title !== 'Pin row to the bottom'; });
        else if (this.state.records.filter(function (r) { return selectedRowIds.includes(r.id); }).some(function (r) { return r.pinned == false; }))
            menuOptions = menuOptions.filter(function (o) { return o.title !== 'Unpin row(s)'; });
        return menuOptions;
    };
    AllInOneSample.prototype.handleColContextMenu = function (selectedColIds, menuOptions) {
        var _this = this;
        if (selectedColIds.length === 0)
            return menuOptions;
        menuOptions = menuOptions.concat([
            {
                title: 'Delete Column', handler: function () { return _this.setState({ fields: _this.deleteColumns(selectedColIds), focuses: _this.deleteColumnsFocuses(selectedColIds) }); }
            },
            {
                title: 'Pin column to the left', handler: function () { return _this.setState(_this.pinColumns(selectedColIds, 'left')); }
            },
            {
                title: 'Pin column to the right', handler: function () { return _this.setState(_this.pinColumns(selectedColIds, 'right')); }
            },
            {
                title: 'Unpin column(s)', handler: function () { return _this.setState(_this.unpinColumns(selectedColIds)); }
            },
        ]);
        if (this.state.fields.filter(function (f) { return selectedColIds.includes(f.id); }).some(function (f) { return f.pinned == true; }))
            menuOptions = menuOptions.filter(function (o) { return o.title !== 'Pin column to the left' && o.title !== 'Pin column to the right'; });
        else if (this.state.fields.filter(function (f) { return !selectedColIds.includes(f.id); }).some(function (f) { return f.pinned == false; }))
            menuOptions = menuOptions.filter(function (o) { return o.title !== 'Unpin column(s)'; });
        return menuOptions;
    };
    AllInOneSample.prototype.deleteRows = function (selectedRowIds) {
        var _this = this;
        var records = this.state.records.slice();
        selectedRowIds.forEach(function (id) {
            var childrenIds = _this.getChildren(records, id).map(function (c) { return c.id; });
            selectedRowIds = selectedRowIds.concat(childrenIds);
        });
        return records.filter(function (r) { return !selectedRowIds.includes(r.id); });
    };
    AllInOneSample.prototype.deleteColumns = function (selectedColIds) {
        return this.state.fields.slice().filter(function (f) { return !selectedColIds.includes(f.id); });
    };
    AllInOneSample.prototype.deleteRowsFocuses = function (selectedRowIds) {
        return this.state.focuses.slice().filter(function (focusRow) { return !selectedRowIds.includes(focusRow.rowId); });
    };
    AllInOneSample.prototype.deleteColumnsFocuses = function (selectedColIds) {
        return this.state.focuses.slice().filter(function (focusRow) { return !selectedColIds.includes(focusRow.columnId); });
    };
    AllInOneSample.prototype.pinColumns = function (ids, direction) {
        var _this = this;
        var indexes = ids.map(function (id) { return _this.state.fields.findIndex(function (f) { return f.id == id; }); });
        if (direction == 'left') {
            return __assign({}, this.state, { fields: this.reorderedColumns(indexes, this.state.frozenPanes.left).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: true }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { left: this.state.frozenPanes.left + indexes.length }) });
        }
        else {
            return __assign({}, this.state, { fields: this.reorderedColumns(indexes, this.state.fields.length - this.state.frozenPanes.right - 1).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: true }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { right: this.state.frozenPanes.right + indexes.length }) });
        }
    };
    AllInOneSample.prototype.unpinColumns = function (ids) {
        var _this = this;
        var indexes = ids.map(function (id) { return _this.state.fields.findIndex(function (f) { return f.id == id; }); }).filter(function (i) { return _this.state.fields[i].pinned == true; });
        if (indexes[0] > this.state.frozenPanes.left) {
            return __assign({}, this.state, { fields: this.calculateColumnReorder(this.state.fields.slice(), indexes, 'right', this.state.fields.length - this.state.frozenPanes.right).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: false }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { right: this.state.frozenPanes.right - indexes.length }) });
        }
        else {
            return __assign({}, this.state, { fields: this.calculateColumnReorder(this.state.fields.slice(), indexes, 'left', this.state.frozenPanes.left - indexes.length).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: false }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { left: this.state.frozenPanes.left - indexes.length }) });
        }
    };
    AllInOneSample.prototype.unpinRows = function (ids) {
        var _this = this;
        var indexes = ids.map(function (id) { return _this.state.records.findIndex(function (r) { return r.id == id; }); }).filter(function (i) { return _this.state.records[i].pinned == true; });
        if (indexes[0] > this.state.frozenPanes.top) {
            return __assign({}, this.state, { records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: false }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { bottom: this.state.frozenPanes.bottom - indexes.length }) });
        }
        else {
            return __assign({}, this.state, { records: this.reorderedRows(indexes, this.state.frozenPanes.top - 1).map(function (f) { return ids.includes(f.id) ? __assign({}, f, { pinned: false }) : f; }), frozenPanes: __assign({}, this.state.frozenPanes, { top: this.state.frozenPanes.top - indexes.length }) });
        }
    };
    AllInOneSample.prototype.pinRows = function (ids, direction) {
        var _this = this;
        var indexes = [];
        ids.forEach(function (id) { return indexes.push(_this.state.records.findIndex(function (r) { return r.id == id; })); });
        if (direction == 'top') {
            return __assign({}, this.state, { records: this.reorderedRows(indexes, this.state.frozenPanes.top).map(function (r) { return ids.includes(r.id) ? __assign({}, r, { pinned: true }) : r; }), frozenPanes: __assign({}, this.state.frozenPanes, { top: this.state.frozenPanes.top + indexes.length }) });
        }
        else {
            return __assign({}, this.state, { records: this.reorderedRows(indexes, this.state.records.length - this.state.frozenPanes.bottom - 1).map(function (r) { return ids.includes(r.id) ? __assign({}, r, { pinned: true }) : r; }), frozenPanes: __assign({}, this.state.frozenPanes, { bottom: this.state.frozenPanes.bottom + indexes.length }) });
        }
    };
    AllInOneSample.prototype.handleRangeContextMenu = function (selectedRowIds, selectedColIds, menuOptions) {
        var _this = this;
        return menuOptions.concat([
            {
                title: 'Delete row', handler: function () { return _this.setState({ records: _this.deleteRows(selectedRowIds), focuses: _this.deleteRowsFocuses(selectedRowIds) }); }
            },
            {
                title: 'Delete column', handler: function () { return _this.setState({ fields: _this.deleteColumns(selectedColIds), focuses: _this.deleteColumnsFocuses(selectedColIds) }); }
            },
        ]);
    };
    AllInOneSample.prototype.getCustomCellTemplates = function () {
        var cellTemplates = {
            'flag': new FlagCellTemplate,
        };
        return this.state.flagCell ? cellTemplates : {};
    };
    AllInOneSample.prototype.render = function () {
        var _this = this;
        return React.createElement(DemoContainer, null,
            React.createElement(DemoBody, null,
                React.createElement(FeatureListContainer, { demoActions: this.demoActions, state: this.state }),
                React.createElement(ReactGridContainer, { className: "all-in-one" },
                    React.createElement(ReactGrid, { cellMatrixProps: this.generateMatrix(), onDataChanged: function (changes) { return _this.setState(_this.prepareDataChanges(changes)); }, customFocuses: this.state.focuses, onRowContextMenu: function (selectedRowIds, menuOptions) { return _this.handleRowContextMenu(selectedRowIds, menuOptions); }, onColumnContextMenu: function (selectedColIds, menuOptions) { return _this.handleColContextMenu(selectedColIds, menuOptions); }, cellTemplates: this.getCustomCellTemplates(), disableFillHandle: this.state.disableFillHandle, disableRangeSelection: this.state.disableRangeSelection, disableRowSelection: false, disableColumnSelection: false, license: "non-commercial" }))));
    };
    return AllInOneSample;
}(React.Component));
export default AllInOneSample;
var templateObject_1, templateObject_2, templateObject_3;
