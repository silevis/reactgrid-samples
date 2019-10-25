import * as React from 'react';
import styled from 'styled-components';
import { IReactgridAllInOneActions, IReactgridAllInOneState } from '../AllInOneSample'
import { FeatureItem } from './FeatureItem'

interface IFeatureListContainer {
    demoActions: IReactgridAllInOneActions;
    state: IReactgridAllInOneState;
    children?: any;
}

const StyledFeatureList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    min-width: 200px;
    font-family: 'Arial', Helvetica, sans-serif;
`;

const StyledFeatureListHeader = styled.h3`
    font-family: 'Arial', Helvetica, sans-serif;
    margin-top: 0;
    margin-bottom: 10px;
`;

const FeatureListHeader = (props: any) => <StyledFeatureListHeader>{props.children}</StyledFeatureListHeader>

const FeatureListItem = styled.li`
    &:not(:last-child ){
        border-bottom: 1px solid #cccccc;
    }
    font-size: 14px;
    cursor: pointer;
`;

const StyledFeatureListContainer = styled.div``;

const FeatureList = (props: any) => <StyledFeatureList>{props.children}</StyledFeatureList>

export const FeatureListContainer = (props: IFeatureListContainer) => {
    return (
        <StyledFeatureListContainer>
            <FeatureListHeader>Feature list</FeatureListHeader>
            <FeatureList>
                <FeatureListItem>
                    <FeatureItem name="Resize" action={props.demoActions.toggleResizeAction} currentState={props.state.resizing} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Column reorder" action={props.demoActions.toggleColumnReorderAction} currentState={props.state.columnReordering} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Row reorder" action={props.demoActions.toggleRowReorderAction} currentState={props.state.rowReordering} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Freeze pane" action={props.demoActions.toggleFreezePaneAction} currentState={props.state.frozenPanes.active} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Multiple focus" action={props.demoActions.toggleVirtualUsersAction} currentState={props.state.virtualUsers} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Enable flag cell" action={props.demoActions.toggleFlagCellAction} currentState={props.state.flagCell}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Disable fill handle" action={props.demoActions.toggleDisableFillHandleAction} currentState={props.state.disableFillHandle}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Disable range selection" action={props.demoActions.toggleDisableRangeSelectionAction} currentState={props.state.disableRangeSelection}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Add new record" action={props.demoActions.addNewRecordAction}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Add new field" action={props.demoActions.addNewFieldAction} />
                </FeatureListItem>
                {props.children}
            </FeatureList>
        </StyledFeatureListContainer>
    )
}