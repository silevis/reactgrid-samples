import {
    IMultiUserSampleState,
} from './MultiUserSample';

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export class ReactGridDataGenerator {

    static nextId: number = 0;
    static data: any = {
        name: ['Jacob', 'Tom', 'John', 'Allie', 'Zoe', 'Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry'],
        surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer'],
        // country: ['fra', 'hun', 'lbn', 'mli', 'deu', 'pol', 'prt', 'svk', 'gbr', 'alb', 'aut', 'bra'],
        city: ['Pekin', 'Newark', 'Acapulco', 'El Paso', 'Warsaw', 'Athens', 'Moscow', 'Mexico', 'Toronto', 'Los Angeles'],
        position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner'],
        sex: ['male', 'female'],
        phone: [645654654, 654234987, 305732948, 94740349, 4028343, 543929348, 58473532, 120954368, 432875483, 54385439],
        street: ['Jizhou Qu', 'Calle Oriente', 'Via Blanca', 'Dr. Ricardo Gutiérrez', 'Essex', 'Agar St', 'Boulevard Alexis-Nihon']
    }

    getDataAttrByKey(key: string): any {
        const randomArray = ReactGridDataGenerator.data[key];
        if (randomArray !== undefined)
            return randomArray[getRandomInt(0, randomArray.length)];
        return null
    }

    getRandomName(): string {
        const names = ReactGridDataGenerator.data.name;
        return names[getRandomInt(0, names.length)];
    }

    getRandomEmail(): string {
        const names = ReactGridDataGenerator.data.name;
        const surnames = ReactGridDataGenerator.data.surname;
        return `${names[getRandomInt(0, names.length)][0].toLowerCase()}.${names[getRandomInt(0, surnames.length)].toLowerCase()}@gmail.com`
    }


    getRandomSurname(): string {
        const surnames = ReactGridDataGenerator.data.surname;
        return surnames[getRandomInt(0, surnames.length)];
    }

    // getRandomCountry(): string {
    //     const countries = ReactGridDataGenerator.data.country;
    //     return countries[getRandomInt(0, countries.length)];
    // }

    getRandomAge(min: number = 10, max: number = 70): number {
        return getRandomInt(min, max)
    }

    //     getRandomDate(start = new Date(1955, 0, 1), end = new Date(1990, 0, 1)): string {
    //         let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();
    //         if (month.length < 2) month = '0' + month;
    //         if (day.length < 2) day = '0' + day;
    //         return [year, month, day].join('-');
    //     }

    getRandomPosition(): any {
        const positions = ReactGridDataGenerator.data.position;
        return { name: positions[getRandomInt(0, positions.length)], depth: 1 };
    }

    getRandomBoolean(): boolean {
        return Math.random() < .5;
    }
}

export class VirtualEnv {

    handleData: (data: any) => IMultiUserSampleState;
    private virtualUsers: VirtualUser[] = [];
    state: IMultiUserSampleState;

    constructor(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState) {
        this.state = state;
        this.handleData = handleData;
    }

    addUser(virtualUser: VirtualUser): VirtualEnv {
        this.virtualUsers = [... this.virtualUsers, virtualUser]
        return this;
    }

    updateView = (state: IMultiUserSampleState) => {
        let modifiedState: IMultiUserSampleState = state;
        this.virtualUsers.forEach(virtualUser => {
            modifiedState = virtualUser.makeChanges(modifiedState, this.handleData);
        });
        return modifiedState
    }
}

export class VirtualUser {

    constructor(public color: string) {
        this.color = color;
    }

    private count = 0;
    private highlightX = 0;
    private highlightY = 0;

    updateFocusesState(state: IMultiUserSampleState): IMultiUserSampleState {
        this.highlightX = getRandomInt(0, state.columns.length);
        this.highlightY = getRandomInt(1, state.rows.length);
        const highlightLocations = [...state.highlightLocations].filter(highlight => highlight.color !== this.color);
        let newHighlight: any =
            state.rows.length !== 1 && state.columns[this.highlightX]
                ? { columnId: state.columns[this.highlightX].columnId, rowId: state.rows[this.highlightY].rowId, color: this.color }
                : {};
        return { ...state, highlightLocations: [...highlightLocations, newHighlight] }
    }

    getUpdatedFieldState(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState): any {
        if (state == null || state.columns[this.highlightX] == undefined || state.rows[this.highlightY] == undefined || state.rows[this.highlightY].cells[this.highlightX] == undefined) {
            return null;
        }
        const { type } = state.rows[this.highlightY].cells[this.highlightX];
        const dataGen: ReactGridDataGenerator = new ReactGridDataGenerator();
        let newFieldData: any = dataGen.getDataAttrByKey(state.columns[this.highlightX].columnId as string);
        if (newFieldData == null) {
            switch (type) {
                case 'checkbox': {
                    // TODO use another soluton for below ..
                    const data: any = state.rows[this.highlightY].cells[this.highlightX];
                    newFieldData = !data.value
                    break;
                }
                case 'number': {
                    newFieldData = dataGen.getRandomAge(10, 70);
                    break;
                }
                // case 'date': {
                //     newFieldData = dataGen.getRandomDate();
                //     break;
                // }
                case 'email': {
                    newFieldData = dataGen.getRandomEmail();
                    break;
                }
                // case 'flag': {
                //     newFieldData = dataGen.getRandomCountry();
                //     break;
                // }
                // case 'dropdownNumber': {
                //     newFieldData = { value: getRandomInt(0, 100), isOpened: false };
                //     break;
                // }
                default:
                    break;
            }
        }
        return {
            ...handleData(
                [
                    {
                        columnId: state.columns[this.highlightX].columnId,
                        rowId: state.rows[this.highlightY].rowId,
                        initialCell: { text: '', type, value: undefined },
                        newCell: { text: newFieldData.toString(), type, value: newFieldData },
                    }
                ]
            ), highlightLocations: state.highlightLocations
        }
    }

    makeChanges(state: IMultiUserSampleState, handleData: (data: any) => IMultiUserSampleState) {
        switch (this.count++) {
            case 0: {
                state = this.updateFocusesState(state);
                break;
            }
            case 1: {
                state = this.getUpdatedFieldState(state, handleData);
                break;
            }
            case 2: {
                break;
            }
            case 3: {
                state = this.updateFocusesState(state);
                break;
            }
            case 4: {
                state = this.getUpdatedFieldState(state, handleData);
                break;
            }
            case 5: {
                this.count = 0;
                break;
            }
        }
        return state;
    }
}