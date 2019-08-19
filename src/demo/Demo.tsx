import * as React from 'react'
import { Spreadsheet } from './Views/Spreadsheet';
import { DynaGridDemo } from './Views/DynaGridDemo';
// import { Field } from './Views/HorizontalDataGrid';
// import { PlanningGroup, PlanningItem, PlanningRecord } from './Views/PlanningDataGrid';

export default class Demo extends React.Component<{}, { gridType: 'planning' | 'vertical' | 'horizontal' | 'spreadsheet' | 'pivot' }> {
    private records: any[] = []
    // private fields: Field[] = [
    //     { prop: "id", width: 50, name: "UID" },
    //     { prop: "name", width: 200, name: 'Name' },
    //     { prop: "surname", width: 200, name: ' Surname' },
    //     { prop: "age", width: 120, name: 'Age' },
    //     { prop: "task", width: 140, name: 'Task' },
    //     { prop: "country", width: 70, name: 'Country' },
    //     { prop: "color", width: 200, name: 'Color' },
    //     { prop: "language", width: 120, name: 'Language' },
    //     { prop: "work", width: 140, name: 'Work' },
    //     { prop: "salary", width: 70, name: 'Salary' },
    //     { prop: "pets", width: 100, name: 'Pets' },
    //     { prop: "family", width: 120, name: 'Family' },
    //     { prop: "house", width: 140, name: 'House' },
    //     { prop: "father", width: 70, name: 'Father' },
    //     { prop: "mother", width: 200, name: 'Mother' },
    //     { prop: "grandmother", width: 120, name: 'Grandmother' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },
    //     { prop: "eye_color", width: 70, name: 'Eye color' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },
    //     { prop: "grandfather", width: 140, name: 'Grandfather' },
    //     { prop: "siblings", width: 70, name: 'Siblings' },
    //     { prop: "second_name", width: 150, name: 'Second name' },
    //     { prop: "town", width: 200, name: 'Town' },
    //     { prop: "pets_name", width: 120, name: 'Pets name' },
    //     { prop: "hobby", width: 140, name: 'Hobby' },
    //     { prop: "sports", width: 70, name: 'Sports' },
    //     { prop: "goals", width: 200, name: 'Goals' },
    //     { prop: "bestfriend_name", width: 120, name: 'Bestfriend name' },
    //     { prop: "education", width: 140, name: 'Education' },


    // ]

    // private planningGroups: PlanningGroup[] = [
    //     { id: "1", name: "A", parentId: '' },
    //     { id: "2", name: "I", parentId: '' },
    //     { id: "3", name: "J", parentId: '1' },
    // ]

    // private planningItems: PlanningItem[] = [
    //     { id: "1", groupId: "1", name: "B" },
    //     { id: "2", groupId: "1", name: "C" },
    //     { id: "3", groupId: "1", name: "D" },
    //     { id: "4", groupId: "1", name: "E" },
    //     { id: "4", groupId: "1", name: "E" },
    //     { id: "10", groupId: "1", name: "E" },
    //     { id: "11", groupId: "1", name: "E" },
    //     { id: "12", groupId: "1", name: "E" },
    //     { id: "13", groupId: "1", name: "E" },
    //     { id: "14", groupId: "1", name: "F" },
    //     { id: "15", groupId: "1", name: "E" },
    //     { id: "16", groupId: "1", name: "E" },
    //     { id: "17", groupId: "1", name: "E" },
    //     { id: "18", groupId: "1", name: "F" },
    //     { id: "19", groupId: "1", name: "G" },
    //     { id: "20", groupId: "1", name: "G" },
    //     { id: "21", groupId: "1", name: "G" },
    //     { id: "7", groupId: "2", name: "I1" },
    //     { id: "8", groupId: "2", name: "I2" },
    //     { id: "9", groupId: "3", name: "J1" },
    //     { id: "10", groupId: "3", name: "J2" },
    //     { id: "21", groupId: "3", name: "J3" },
    //     { id: "22", groupId: "3", name: "J4" },
    //     { id: "23", groupId: "3", name: "J5" },
    //     { id: "11", groupId: "2", name: "I3" },
    //     { id: "12", groupId: "2", name: "I4" },
    //     { id: "13", groupId: "2", name: "I5" },
    //     { id: "14", groupId: "2", name: "I6" },
    //     { id: "15", groupId: "2", name: "I7" },
    //     { id: "16", groupId: "2", name: "I8" },
    //     { id: "17", groupId: "2", name: "I9" },
    //     { id: "18", groupId: "2", name: "I10" },
    //     { id: "19", groupId: "2", name: "I11" },
    //     { id: "20", groupId: "2", name: "I12" },
    // ]

    // private planningRecords: PlanningRecord[] = [
    //     { id: "1", itemId: "1", month: 1, value: 50 },
    //     { id: "2", itemId: "1", month: 2, value: 100 },
    //     { id: "5", itemId: "1", month: 4, value: 5 },
    //     { id: "5", itemId: "3", month: 1, value: 5 },
    //     { id: "5", itemId: "4", month: 1, value: 5 },
    //     { id: "5", itemId: "2", month: 1, value: 5 },
    //     { id: "5", itemId: "2", month: 1, value: 5 },
    //     { id: "3", itemId: "1", month: 3, value: 130 },
    //     { id: "4", itemId: "7", month: 5, value: 25 },
    //     { id: "5", itemId: "2", month: 1, value: 5 },
    //     { id: "6", itemId: "7", month: 1, value: 3 },
    // ]


    generateData() {
        for (let i = 0; i < 1000; i++) {
            this.records.push(
                {
                    name: (i % 2 === 0) ? "Peter" : (i % 3 === 0) ? "Bob" : "John",
                    surname: (i % 2 === 0) ? "Jobs" : (i % 3 === 0) ? "Gates" : "Cena",
                    age: 24 + i,
                    task: (i % 2 === 0) ? "Cooking" : (i % 3 === 0) ? "Sleeping" : "Watching",
                    country: (i % 2 === 0) ? "Poland" : (i % 3 === 0) ? "Germany" : "Russia",
                    color: 'Blue',
                    language: (i % 2 === 0) ? "Polish" : (i % 3 === 0) ? "German" : "Russian",
                    work: (i % 2 === 0) ? "programmer" : (i % 3 === 0) ? "manager" : "accountant",
                    salary: (i % 2 === 0) ? "15k" : (i % 3 === 0) ? "9k" : "6k",
                    pets: (i % 2 === 0) ? "ferret" : (i % 3 === 0) ? "dog" : "cat",
                    family: (i % 2 === 0) ? "big" : "small",
                    house: (i % 2 === 0) ? "home" : (i % 3 === 0) ? "flat" : "studio",
                    father: (i % 2 === 0) ? "Andrew" : (i % 3 === 0) ? "Michael" : "John",
                    mother: (i % 2 === 0) ? "Melanie" : (i % 3 === 0) ? "Eve" : "Kim",
                    grandmother: (i % 2 === 0) ? "Anna" : (i % 3 === 0) ? "Caroline" : "Monik",
                    grandfather: (i % 2 === 0) ? "Dominik" : (i % 3 === 0) ? "Matheo" : "Mark",
                    siblings: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    second_name: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    town: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    pets_name: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    hobby: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    sports: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    goals: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    bestfriend_name: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    education: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana",
                    eye_color: (i % 2 === 0) ? "Mark" : (i % 3 === 0) ? "Julia" : "Joana"
                })
        }
    }

    componentWillMount() {
        this.setState({ gridType: 'pivot' })
        this.generateData()
    }

    render() {
        return <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', top: 0, bottom: 0, right: 0, left: 0, fontFamily: ' Sans-Serif' }}>
            {/* <div>
                <input type="radio" name="gridType" checked={state.gridType === 'spreadsheet'} onChange={_ => this.setState({ gridType: 'spreadsheet' })} /> Spreadsheet
                <input type="radio" name="gridType" checked={state.gridType === 'vertical'} onChange={_ => this.setState({ gridType: 'vertical' })} /> VerticalDataGrid
                <input type="radio" name="gridType" checked={state.gridType === 'horizontal'} onChange={_ => this.setState({ gridType: 'horizontal' })} /> HorizontalDataGrid
                <input type="radio" name="gridType" checked={state.gridType === 'planning'} onChange={_ => this.setState({ gridType: 'planning' })} /> PlanningDataGrid
                <input type="radio" name="gridType" checked={state.gridType === 'pivot'} onChange={_ => this.setState({ gridType: 'pivot' })} /> Pivot Grid
            </div> */}
            <div style={{ position: 'relative', flexGrow: 1, }}>

                {/* {state.gridType === 'vertical' && <VerticalDataGrid
                    records={this.records}
                    fields={this.fields}
                />}

                {state.gridType === 'horizontal' && <HorizontalDataGrid
                    records={this.records}
                    fields={this.fields}
                />} */}

                {/* {<Spreadsheet columnCount={7} rowCount={20} />} */}
                {<DynaGridDemo/>}

                {/* {state.gridType === 'planning' && <PlanningDataGrid
                    groups={this.planningGroups}
                    items={this.planningItems}
                    records={this.planningRecords}
                />}

                {state.gridType === 'pivot' && <PivotGrid />} */}
            </div>
        </div>

    }
}






