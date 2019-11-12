import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { navLinks } from './navlinks';
import { ISampleNavLink } from '../navigationSample/navlinks';
import { SideNav } from './SideNav';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import './styling.scss';

export class NavigationSample extends React.Component {
  render() {
    let routes = navLinks.map((navLink: ISampleNavLink) => {
      return <Route key={navLink.url} path={navLink.url} exact={true} component={navLink.component} />
    });
    routes = [...routes, <Route key={-1} render={() => { return <h1>Select sample from nav</h1> }} />];
    return (
      <BrowserRouter>
        <div className="ms-Grid" id="navigation-sample" dir="ltr">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3 ms-xl2" style={{ padding: 20 }}>
              <SideNav navLinks={navLinks} />
            </div>
            <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9 ms-xl10">
              <Switch>
                {routes}
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  };
};


