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
import React from 'react';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import { navLinks } from './navlinks';
import { SideNav } from './SideNav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
var NavigationSample = (function (_super) {
    __extends(NavigationSample, _super);
    function NavigationSample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationSample.prototype.render = function () {
        var routes = navLinks.map(function (navLink) {
            return React.createElement(Route, { key: navLink.url, path: navLink.url, exact: true, component: navLink.component });
        });
        routes = routes.concat([React.createElement(Route, { key: -1, render: function () { return React.createElement("h1", null, "Select sample from nav"); } })]);
        return (React.createElement(BrowserRouter, null,
            React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md4 ms-lg3 ms-xl2", style: { padding: 20 } },
                        React.createElement(SideNav, { navLinks: navLinks })),
                    React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md8 ms-lg9 ms-xl10" },
                        React.createElement(Switch, null, routes))))));
    };
    ;
    return NavigationSample;
}(React.Component));
export default NavigationSample;
;
