import * as React from "react";
import { Location, State } from "../Common";
import { changeBehavior } from "../Functions";
import { FillHandleBehavior } from "../Behaviors/FillHandleBehavior";

interface FillHandleProps {
    state: State,
    location: Location
}

export const FillHandle: React.FunctionComponent<FillHandleProps> = (props) =>
    <div
        style={{
            position: 'absolute',
            top: props.location.row.bottom - 13,
            left: props.location.col.right - 11,
            width: 20,
            height: 20,
            touchAction: 'none', // prevent scrolling
            background: 'rgba(255, 255, 255, 0.01)'
        }}
        data-cy="touch-fill-handle"
        onPointerDown={event => {
            if (event.pointerType !== 'mouse' && event.pointerType !== undefined) { // !== undefined only for cypress tests
                props.state.updateState(state => changeBehavior(state, new FillHandleBehavior()));
                event.stopPropagation();
            }
        }}
    >
        <div
            className="dg-fill-handle"
            style={{
                position: 'absolute',
                top: 9,
                left: 7,
                width: 4.2,
                height: 4.5,
                backgroundColor: '#3579f8',
                border: '1px solid white',
                cursor: 'crosshair'
            }}
            data-cy="dg-fill-handle"
            onPointerDown={event => {
                event.preventDefault();
                event.stopPropagation();
                if (event.pointerType === 'mouse' && event.pointerType === undefined) { // !== undefined only for cypress tests
                    props.state.updateState(state => changeBehavior(state, new FillHandleBehavior()));

                }
            }}
        />
    </div>
