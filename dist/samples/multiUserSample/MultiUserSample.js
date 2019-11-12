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
import { RateCellTemplate } from '../../cell-templates/rateCell/RateCellTemplate';
import { FlagCellTemplate } from '../../cell-templates/flagCell/FlagCellTemplate';
import { DropdownNumberCellTemplate } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { VirtualEnv, VirtualUser } from './VirtualUser';
import { columns } from '../../data/crm/columns';
import { rows } from '../../data/crm/rows';
import styled from 'styled-components';
import './styling.scss';
var ReactGridContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  min-height: 400px;\n"], ["\n  position: relative;\n  min-height: 400px;\n"])));
var MultiUserSample = (function (_super) {
    __extends(MultiUserSample, _super);
    function MultiUserSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            columns: columns(false, false),
            rows: rows(true),
            focuses: []
        };
        _this.prepareDataChanges = function (dataChanges) {
            var state = __assign({}, _this.state);
            dataChanges.forEach(function (change) {
                state.rows.forEach(function (row) {
                    if (row.id == change.rowId) {
                        var field = _this.state.columns.findIndex(function (column) { return column.id == change.columnId; });
                        if (field !== undefined)
                            row.cells[field].data = change.newData;
                    }
                });
            });
            return state;
        };
        return _this;
    }
    MultiUserSample.prototype.componentDidMount = function () {
        this.setVirtualEnv();
    };
    MultiUserSample.prototype.componentWillUnmount = function () {
        this.unsetVirtualEnv();
    };
    MultiUserSample.prototype.setVirtualEnv = function () {
        var _this = this;
        var virtEnv = new VirtualEnv(this.state, this.prepareDataChanges);
        virtEnv
            .addUser(new VirtualUser('#2274A5'))
            .addUser(new VirtualUser('#F75C03'))
            .addUser(new VirtualUser('#F1C40F'))
            .addUser(new VirtualUser('#D90368'))
            .addUser(new VirtualUser('#4D8802'))
            .addUser(new VirtualUser('#A771FE'));
        this.intervalId = window.setInterval(function () {
            _this.setState(virtEnv.updateView(_this.state));
        }, 1000);
    };
    MultiUserSample.prototype.unsetVirtualEnv = function () {
        this.setState({ focuses: [] });
        window.clearInterval(this.intervalId);
    };
    MultiUserSample.prototype.render = function () {
        var _this = this;
        return (React.createElement(ReactGridContainer, { id: "multi-user-sample" },
            React.createElement(ReactGrid, { cellMatrixProps: this.state, cellTemplates: {
                    'rating': new RateCellTemplate,
                    'flag': new FlagCellTemplate,
                    'dropdownNumber': new DropdownNumberCellTemplate,
                }, customFocuses: this.state.focuses, onDataChanged: function (changes) { return _this.setState(_this.prepareDataChanges(changes)); }, license: 'non-commercial' })));
    };
    return MultiUserSample;
}(React.Component));
export { MultiUserSample };
var templateObject_1;