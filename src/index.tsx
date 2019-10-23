import * as React from 'react'
import * as ReactDOM from 'react-dom'
import DynaGridDemo from "./demo/Views/DynaGridDemo"
import RateCellDemo from './rate-cell-template-sample/RateCellDemo';
// TODO how to remove this?
import "core-js/stable";

// DO NOT MOVE
// this index.tsx is required by react-scripts-ts

ReactDOM.render(
  <>
    {/* <DynaGridDemo/>,  */}
    <RateCellDemo />
  </>,
  document.getElementById('root') as HTMLElement
);