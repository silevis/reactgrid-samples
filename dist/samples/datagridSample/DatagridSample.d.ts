import React from 'react';
import { DefaultCellTypes, CellChange } from '@silevis/reactgrid';
import { DropdownNumberCell } from '../../cell-templates/dropdownNumberCell/DropdownNumberCellTemplate';
import { FlagCell } from '../../cell-templates/flagCell/FlagCellTemplate';
import './styling.scss';
export declare type VirtualEnvCellChange = CellChange<DefaultCellTypes | FlagCell | DropdownNumberCell>;
export declare const DatagridSample: React.FC;
