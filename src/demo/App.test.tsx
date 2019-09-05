import React from 'react';
import ReactDOM from 'react-dom';
import DynaGridDemo from './Views/DynaGridDemo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DynaGridDemo />, div);
    ReactDOM.unmountComponentAtNode(div);
});
