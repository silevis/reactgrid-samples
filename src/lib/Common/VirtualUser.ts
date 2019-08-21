import * as React from 'react';
import { ColumnProps, RowProps, CellMatrixProps, DataChange, Id, MenuOption, Range } from '.';
import { DynaGrid } from '../Components/DynaGrid';
import { IDynaGridDemoState, Record } from '../../demo/Views/DynaGridDemo';
import { State } from './State';

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

export class DynaGridDataGenerator {

    static nextId: number = 3;
    static data: any = {
        name: ['Jacob','Tom','John','Allie','Zoe','Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry'],
        surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer'],
        country: ['Poland', 'Czech Republic', 'Russian Federation', 'USA', 'Slovakia', 'Spain', 'Norway', 'Japan', 'Mexico', 'France', 'Hungary'],
        position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner'],
    }

    constructor() {  
    }

    getDataAttrByKey(key: string) : any{
        const randomArray = DynaGridDataGenerator.data[key];
        if (randomArray !== undefined)
            return randomArray[getRandomInt(0, randomArray.length)];
        return null
    }

    getRandomName() : string{
        const names = DynaGridDataGenerator.data.name;
        return names[getRandomInt(0, names.length)];
    }

    getRandomSurname() : string{
        const surnames = DynaGridDataGenerator.data.surname;
        return surnames[getRandomInt(0, surnames.length)];
    }

    getRandomCountry() : string{
        const countries = DynaGridDataGenerator.data.country;
        return countries[getRandomInt(0, countries.length)];
    }

    getRandomAge(min: number = 10, max: number = 70): number{
        return getRandomInt(min, max)
    }

    getRandomPosition() : string{
        const positions = DynaGridDataGenerator.data.position;
        return positions[getRandomInt(0, positions.length)];
    }

    getRandomBoolean(): boolean {
        return Math.random() < .5;
    }

    createNewUser (): Record  {
        ++DynaGridDataGenerator.nextId;
        const id = DynaGridDataGenerator.nextId;
        const name = this.getRandomName();
        const surname = this.getRandomSurname();
        const age = this.getRandomAge();
        const country = this.getRandomCountry();
        const position = this.getRandomPosition();
        const onHoliday = this.getRandomBoolean();
        return { id, name, surname, age, country, position, onHoliday }
    }

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

    updateView = (state: IDynaGridDemoState) => {
        let modifiedState: IDynaGridDemoState = state;
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

        const { name, type } = state.fields[this.focusX];
        const dataGen: DynaGridDataGenerator = new DynaGridDataGenerator();
        
        let newFieldData: any = dataGen.getDataAttrByKey(name);
        if (newFieldData == null) {
            switch(type) { 
                case 'checkbox': { 
                    // newFieldData = state.records[this.focusY].onHoliday // ... TODO odwracanie stanu checkboxa
                    newFieldData = dataGen.getRandomBoolean();
                    break; 
                } 
                case 'number': { 
                    newFieldData = dataGen.getRandomAge(10, 70);
                    break; 
                } 
                default:
                   break; 
            } 
        }
        return { ...handleData([{ columnId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, type: type, initialData: '', newData: newFieldData }]), focuses: state.focuses }
    }

    makeChanges(state: IDynaGridDemoState, handleData: (data: any) => IDynaGridDemoState) {
        state = { ...state, virtualUsers: true }
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