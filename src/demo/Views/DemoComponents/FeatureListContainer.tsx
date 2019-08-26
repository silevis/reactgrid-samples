import * as React from 'react';
import styled from 'styled-components';
import { IDemoActions, IDynaGridDemoState } from '../DynaGridDemo'
import { FeatureItem } from '../DemoComponents/FeatureItem'

interface IFeatureListContainer {
    demoActions: IDemoActions;
    state: IDynaGridDemoState;
}

const FeatureList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const FeatureListItem = styled.li`
    &:not(:last-child ){
        border-bottom: 1px solid #bbbbbb;
        padding-bottom: 5px;
    }
    cursor: pointer;
`;

export class FeatureListContainer extends React.Component<IFeatureListContainer> {
    render() {
        return (
            <FeatureList>
                <FeatureListItem>
                    <FeatureItem name="Resize" action={this.props.demoActions.toggleResizeAction} currentState={this.props.state.resizing}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Reorder" action={this.props.demoActions.toggleReorderAction} currentState={this.props.state.reordering}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Freeze pane" action={this.props.demoActions.toogleFreezePaneAction} currentState={this.props.state.frozenPanes.active}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Virtual users" action={this.props.demoActions.toggleVirtualUsersAction} currentState={this.props.state.virtualUsers}/>
                </FeatureListItem>
                <FeatureListItem>
                    <FeatureItem name="Add new record" action={this.props.demoActions.addNewRecordAction}/>
                </FeatureListItem>
                {this.props.children}
            </FeatureList>
        )
    }
}