import React from 'react';
import { CellTemplate, CellRenderProps, Cell } from '@silevis/reactgrid';
import { BudgetPlannerNumberCellData, BudgetPlannerTextCellData } from './../../samples/budgetPlannerSample/BudgetPlannerSampleTypes';
export declare class BudgetPlannerNumberCellTemplate implements CellTemplate<BudgetPlannerNumberCellData, any> {
    isValid(cellData: BudgetPlannerNumberCellData): boolean;
    textToCellData(text: string): BudgetPlannerNumberCellData;
    cellDataToText(cellData: BudgetPlannerNumberCellData): string;
    handleKeyDown(cellData: BudgetPlannerNumberCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any): {
        cellData: {
            value: number;
            isCollapsed: boolean;
            parent?: Cell | undefined;
        };
        enableEditMode: boolean;
    };
    renderContent: (props: CellRenderProps<BudgetPlannerNumberCellData, any>) => React.ReactNode;
}
export declare class BudgetPlannerTextCellTemplate implements CellTemplate<BudgetPlannerTextCellData, any> {
    isValid(cellData: BudgetPlannerTextCellData): boolean;
    textToCellData(text: string): BudgetPlannerTextCellData;
    cellDataToText(cellData: BudgetPlannerTextCellData): string;
    handleKeyDown(cellData: BudgetPlannerTextCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean, props?: any): {
        cellData: {
            value: string;
            isCollapsed: boolean;
            parent?: Cell | undefined;
        };
        enableEditMode: boolean;
    };
    renderContent: (props: CellRenderProps<BudgetPlannerTextCellData, any>) => React.ReactNode;
    getCustomStyle(cellData: BudgetPlannerTextCellData, isInEditMode: boolean, props?: any): React.CSSProperties;
}
export declare class BudgetPlannerColumnHeaderCellTemplate implements CellTemplate<BudgetPlannerTextCellData, any> {
    isValid(cellData: BudgetPlannerTextCellData): boolean;
    textToCellData(text: string): BudgetPlannerTextCellData;
    cellDataToText(cellData: BudgetPlannerTextCellData): string;
    renderContent: (props: CellRenderProps<BudgetPlannerTextCellData, any>) => React.ReactNode;
    handleKeyDown(cellData: BudgetPlannerTextCellData, keyCode: number, ctrl: boolean, shift: boolean, alt: boolean): {
        cellData: BudgetPlannerTextCellData;
        enableEditMode: boolean;
    };
    getCustomStyle(cellData: BudgetPlannerTextCellData, isInEditMode: boolean, props?: any): React.CSSProperties;
}
