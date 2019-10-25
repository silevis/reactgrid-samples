var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import styled from 'styled-components';
import { FeatureItem } from './FeatureItem';
var StyledFeatureList = styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    min-width: 200px;\n    font-family: 'Arial', Helvetica, sans-serif;\n"], ["\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    min-width: 200px;\n    font-family: 'Arial', Helvetica, sans-serif;\n"])));
var StyledFeatureListHeader = styled.h3(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    font-family: 'Arial', Helvetica, sans-serif;\n    margin-top: 0;\n    margin-bottom: 10px;\n"], ["\n    font-family: 'Arial', Helvetica, sans-serif;\n    margin-top: 0;\n    margin-bottom: 10px;\n"])));
var FeatureListHeader = function (props) { return React.createElement(StyledFeatureListHeader, null, props.children); };
var FeatureListItem = styled.li(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    &:not(:last-child ){\n        border-bottom: 1px solid #cccccc;\n    }\n    font-size: 14px;\n    cursor: pointer;\n"], ["\n    &:not(:last-child ){\n        border-bottom: 1px solid #cccccc;\n    }\n    font-size: 14px;\n    cursor: pointer;\n"])));
var StyledFeatureListContainer = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
var FeatureList = function (props) { return React.createElement(StyledFeatureList, null, props.children); };
export var FeatureListContainer = function (props) {
    return (React.createElement(StyledFeatureListContainer, null,
        React.createElement(FeatureListHeader, null, "Feature list"),
        React.createElement(FeatureList, null,
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Resize", action: props.demoActions.toggleResizeAction, currentState: props.state.resizing })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Column reorder", action: props.demoActions.toggleColumnReorderAction, currentState: props.state.columnReordering })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Row reorder", action: props.demoActions.toggleRowReorderAction, currentState: props.state.rowReordering })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Freeze pane", action: props.demoActions.toggleFreezePaneAction, currentState: props.state.frozenPanes.active })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Multiple focus", action: props.demoActions.toggleVirtualUsersAction, currentState: props.state.virtualUsers })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Enable flag cell", action: props.demoActions.toggleFlagCellAction, currentState: props.state.flagCell })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Disable fill handle", action: props.demoActions.toggleDisableFillHandleAction, currentState: props.state.disableFillHandle })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Disable range selection", action: props.demoActions.toggleDisableRangeSelectionAction, currentState: props.state.disableRangeSelection })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Add new record", action: props.demoActions.addNewRecordAction })),
            React.createElement(FeatureListItem, null,
                React.createElement(FeatureItem, { name: "Add new field", action: props.demoActions.addNewFieldAction })),
            props.children)));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
