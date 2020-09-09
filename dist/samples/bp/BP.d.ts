import * as React from "react";
import { Row, DefaultCellTypes } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import "./styling.scss";
import { HorizontalChevronCell } from '../../cell-templates/horizontalChevronCellTemplate/HorizontalChevronCellTemplate';
import { NonEditableNumberCell } from './CellTemplates';
export declare type RowCells = DefaultCellTypes | HorizontalChevronCell | NonEditableNumberCell;
export declare type BPRow = Row<RowCells>;
export declare type RowPair = {
    from: BPRow;
    to: BPRow;
};
export declare const BPSample: React.FC;
