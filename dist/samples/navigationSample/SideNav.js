import React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { useHistory } from 'react-router-dom';
export var SideNav = function (props) {
    var history = useHistory();
    return (React.createElement(Nav, { groups: [{
                links: props.navLinks.map(function (navLink) { return ({
                    name: navLink.name,
                    key: navLink.key,
                    url: navLink.url,
                }); })
            }], onLinkClick: function (ev, navLink) {
            if (ev && navLink) {
                history.push(navLink.url);
                ev.preventDefault();
            }
        }, selectedKey: history.location.pathname }));
};
