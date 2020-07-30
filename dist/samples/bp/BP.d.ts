import * as React from "react";
import { Row, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import { HorizontalGroupCell } from '../../cell-templates/horizontalGroupCellTemplate/HorizontalGroupCellTemplate';
import { NonEditableNumberCell } from './CellTemplates';
export declare type RowCells = DefaultCellTypes | HorizontalGroupCell | NonEditableNumberCell;
export declare type BPRow = Row<RowCells>;
export declare type RowPair = {
    from: BPRow;
    to: BPRow;
};
export declare const BPSample: React.FC;
