var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from 'styled-components';
var StyledFeatureItem = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: flex;\n    flex-wrap: nowrap;\n    background-color: transparent;\n    height: 30px;\n    align-items: center;\n    padding: 0px 10px;\n    justify-content: space-between;\n"], ["\n    display: flex;\n    flex-wrap: nowrap;\n    background-color: transparent;\n    height: 30px;\n    align-items: center;\n    padding: 0px 10px;\n    justify-content: space-between;\n"])));
var StyledFeatureCheckbox = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: block;\n    padding: 3px;\n    border: 1px solid #bbbbbb;\n    width: 1px;\n    height: 1px;\n    border-radius: 50%;\n    background-color: white;\n"], ["\n    display: block;\n    padding: 3px;\n    border: 1px solid #bbbbbb;\n    width: 1px;\n    height: 1px;\n    border-radius: 50%;\n    background-color: white;\n"])));
var StyledSpan = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    color: ", ";\n    user-select: none;\n"], ["\n    color: ", ";\n    user-select: none;\n"])), function (props) { return props.color || "#000000"; });
var StyledFeatureCheckboxActive = styled(function (props) { return React.createElement(StyledFeatureCheckbox, __assign({}, props)); })(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    border: 1px solid #8BC34A;\n    background-color: #8BC34A;\n"], ["\n    border: 1px solid #8BC34A;\n    background-color: #8BC34A;\n"])));
export var FeatureItem = function (props) {
    var currentState = props.currentState, action = props.action, name = props.name;
    var checkboxState = currentState ? React.createElement(StyledFeatureCheckboxActive, null) : React.createElement(StyledFeatureCheckbox, null);
    var spanColor = currentState == undefined ? '' : currentState ? '' : '#999999';
    return (React.createElement(StyledFeatureItem, { onClick: action },
        React.createElement(StyledSpan, { color: spanColor }, name),
        currentState == undefined || checkboxState));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
