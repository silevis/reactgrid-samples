import * as React from 'react';
import styled from 'styled-components';

interface IFeatureItemProps {
    name: string;
    currentState?: boolean;
    action(): void;
    children?: any;
}

const StyledFeatureItem = styled.div`
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
    padding: 3px;
    border: 1px solid #bbbbbb;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    background-color: white;
`;

const StyledSpan = styled.span`
    color: ${props => props.color || "#000000"};
`;

const StyledFeatureCheckboxActive = styled(StyledFeatureCheckbox)`
    border: 1px solid #8BC34A;
    background-color: #8BC34A;
`;

export const FeatureItem = (props: IFeatureItemProps) => {
    const { currentState, action, name } = props;
    const checkboxState = currentState ? <StyledFeatureCheckboxActive/> : <StyledFeatureCheckbox/>
    const spanColor = currentState == undefined ? '' : currentState ? '' : '#999999' ;
    return (
        <StyledFeatureItem onClick={action}>
            <StyledSpan color={spanColor}>{name}</StyledSpan>
            {currentState == undefined || checkboxState }
        </StyledFeatureItem>
    )
}
