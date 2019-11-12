import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { NavigationSample } from './samples/navigationSample/NavigationSample';

// TODO how to remove this?
import "core-js/stable";

// DO NOT MOVE
// this index.tsx is required by react-scripts-ts

ReactDOM.render(
  <NavigationSample />,
  document.getElementById('root') as HTMLElement
);