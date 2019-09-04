import * as React from 'react';
import styled from 'styled-components';
import { IDemoActions, IDynaGridDemoState } from '../DynaGridDemo'
import { FeatureItem } from '../DemoComponents/FeatureItem'

interface IFeatureListContainer {
    demoActions: IDemoActions;
    state: IDynaGridDemoState;
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
`;

const FeatureListHeader = (props: any) => <StyledFeatureListHeader>{props.children}</StyledFeatureListHeader>

const FeatureListItem = styled.li`
    &:not(:last-child ){
        border-bottom: 1px solid #cccccc;
        padding-bottom: 5px;
    }
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
                    <FeatureItem name="Reorder" action={props.demoActions.toggleReorderAction} currentState={props.state.reordering} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Freeze pane" action={props.demoActions.toggleFreezePaneAction} currentState={props.state.frozenPanes.active} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Virtual users" action={props.demoActions.toggleVirtualUsersAction} currentState={props.state.virtualUsers} />
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Add new record" action={props.demoActions.addNewRecordAction} />
                </FeatureListItem>
                {props.children}
            </FeatureList>
        </StyledFeatureListContainer>
    )
}