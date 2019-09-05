import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DynaGridDemo from "./demo/Views/DynaGridDemo"
import 'babel-polyfill';
import smoothscroll from 'smoothscroll-polyfill';

// DO NOT MOVE
// this index.tsx is required by react-scripts-ts
smoothscroll.polyfill();
ReactDOM.render(
  <DynaGridDemo />,
  document.getElementById('root') as HTMLElement
)