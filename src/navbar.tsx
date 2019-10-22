import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import 'office-ui-fabric-react/dist/css/fabric.min.css'

import {
    useHistory,
    BrowserRouter,
    Switch,
    Route,
} from 'react-router-dom';

export interface INavLink {
    readonly name: string,
    readonly key: string,
    readonly url: string
}

export interface SideNavProps {
    navLinks: INavLink[],
}

const navLinks: INavLink[] = [
    {
        name: 'ReactGridTs',
        key: '/ReactGridTs',
        url: '/ReactGridTs',
    },
    {
        name: 'CellMatrix',
        key: '/CellMatrix',
        url: '/CellMatrix',

    },
    {
        name: 'Column',
        key: '/Column',
        url: '/Column',
    }
]

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="ms-Grid" dir="ltr">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3 ms-xl2" style={{ padding: 20 }}><SideNav navLinks={navLinks} /></div>
                        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg9 ms-xl10">
                            <Switch>
                                <Route path='/ReactGridTs' exact component={ReactGridTs} />
                                <Route path='/CellMatrix' component={CellMatrix} />
                                <Route path='/Column' component={Column} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}


export const SideNav: React.FC<SideNavProps> = (props) => {
    const history = useHistory();
    return (
        <Nav
            groups={
                [{
                    links: props.navLinks.map(navLink => ({
                        name: navLink.name,
                        key: navLink.key,
                        url: navLink.url,

                    }))

                }]}

            onLinkClick={
                (ev?: React.MouseEvent<HTMLElement>, navLink?: INavLink) => {
                    if (ev && navLink) {
                        history.push(navLink.url)
                        ev.preventDefault();
                    }
                }
            }
            selectedKey={history.location.pathname}
        ></Nav>
    );
};


const ReactGridTs = () => {
    return (
        <div>
            <h1> ReactGridTs</h1>
        </div>
    );
}
const CellMatrix = () => {
    return (
        <div>
            <h1> CellMatrix</h1>
        </div>
    );
}
const Column = () => {
    return (<>
        <h2>ColumnProp</h2>
        <ul>
            {new Array(500).fill('0').map((a, i) => <li>{i}</li>)}
        </ul>
    </>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,

    document.getElementById('root'))

export default App;


