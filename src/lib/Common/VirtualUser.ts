import * as React from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '.';
import { DynaGrid } from '../Components/DynaGrid';
import { IDynaGridDemoState } from '../../demo/Views/DynaGridDemo';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomWord() {
    const words = [
        'SHARED',
        'GRID',
        'REACT',
        'RAPID',
        'RELIABLE',
    ]
    return words[getRandomInt(0, words.length)]
}

export class VirtualEnv {

    handleData: (data: any) => IDynaGridDemoState;
    private virtualUsers: VirtualUser[] = [];
    state: IDynaGridDemoState;

    constructor(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState) {
        this.state = state;
        this.handleData = handleData;
    }

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [... this.virtualUsers, virtualUser]
        return this;
    }

    updateView = () => {
        let modifiedState: IDynaGridDemoState = this.state;
        modifiedState.virtualUsers = true;
        this.virtualUsers.forEach(virtualUser => {
            modifiedState = virtualUser.makeChanges(modifiedState, this.handleData);
        });
        return modifiedState
    }
}

export class VirtualUser {

    color: string;

    constructor(color: string) {
        this.color = color;
    }
    private count = 0;
    private focusX = 0;
    private focusY = 0;

    updateFocusesState(state: IDynaGridDemoState): IDynaGridDemoState {
        this.focusX = getRandomInt(1, state.fields.length)
        this.focusY = getRandomInt(1, state.records.length)
        var focuses = [...state.focuses].filter(f => f.color !== this.color)
        return { ...state, focuses: [...focuses, { colId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, color: this.color }] }
    }

    getUpdatedFieldState(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState): any {
        if (state.fields[this.focusX] == undefined || state.records[this.focusY] == undefined)
            return null;
        return { ...handleData([{ columnId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, type: 'text', initialData: '', newData: getRandomWord() }]), focuses: state.focuses }
    }

    makeChanges(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState) {
        switch (this.count++) {
            case 0:
                state = this.updateFocusesState(state);
                break;
            case 1:
                state = this.getUpdatedFieldState(state, handleData);
                break;
            case 2:
                break;
            case 3:
                state = this.updateFocusesState(state);
                break;
            case 4:
                state = this.getUpdatedFieldState(state, handleData);
                break;
            case 5:
                this.count = 0;
                break;
        }
        return state;
    }
}