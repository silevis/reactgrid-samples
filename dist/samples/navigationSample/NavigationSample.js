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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { navLinks } from './navlinks';
import { SideNav } from './SideNav';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import './styling.scss';
var NavigationSample = (function (_super) {
    __extends(NavigationSample, _super);
    function NavigationSample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationSample.prototype.render = function () {
        var routes = navLinks.map(function (navLink) {
            return React.createElement(Route, { key: navLink.url, path: navLink.url, exact: true, component: navLink.component });
        });
        routes = __spread(routes, [React.createElement(Route, { key: -1, render: function () { return React.createElement("h1", null, "Select sample from nav"); } })]);
        return (React.createElement(BrowserRouter, null,
            React.createElement("div", { className: "ms-Grid", id: "navigation-sample", dir: "ltr" },
                React.createElement("div", { className: "ms-Grid-row" },
                    React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md4 ms-lg2", style: { padding: 20 } },
                        React.createElement(SideNav, { navLinks: navLinks })),
                    React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md8 ms-lg10" },
                        React.createElement(Switch, null, routes))))));
    };
    ;
    return NavigationSample;
}(React.Component));
export { NavigationSample };
;
