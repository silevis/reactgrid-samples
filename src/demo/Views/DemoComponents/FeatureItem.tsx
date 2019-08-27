import * as React from 'react';
import styled from 'styled-components';

interface IFeatureItemProps {
    name: string;
    currentState?: boolean;
    action(): void;
}

const StyledFeatureItemWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    background-color: transparent;
    height: 40px;
    align-items: center;
    padding: 0px 10px;
    justify-content: space-between;
`;

const StyledFeatureCheckbox = styled.div`
    display: block;
    padding: 10px;
    border: 1px solid #bbbbbb;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: white;
`;

const StyledFeatureCheckboxActive = styled(StyledFeatureCheckbox)`
    border: 1px solid green;
    background-color: green;
`;

export class FeatureItem extends React.Component<IFeatureItemProps> {
    render() {
        return (
            <StyledFeatureItemWrapper onClick={this.props.action}>
                <span>{this.props.name}</span>
                {this.props.currentState !== undefined ? this.props.currentState ? <StyledFeatureCheckboxActive/> : <StyledFeatureCheckbox/> : <></> }
            </StyledFeatureItemWrapper>
        )
    }
}