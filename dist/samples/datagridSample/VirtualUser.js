var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var DatagridDataGenerator = (function () {
    function DatagridDataGenerator() {
    }
    DatagridDataGenerator.getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };
    DatagridDataGenerator.prototype.getDataAttrByKey = function (key) {
        var selectedDataArray = DatagridDataGenerator.data[key];
        if (selectedDataArray !== undefined)
            return selectedDataArray[DatagridDataGenerator.getRandomInt(0, selectedDataArray.length)];
        return undefined;
    };
    DatagridDataGenerator.prototype.getRandomName = function () {
        var names = DatagridDataGenerator.data.name;
        return names[DatagridDataGenerator.getRandomInt(0, names.length)];
    };
    DatagridDataGenerator.prototype.getRandomEmail = function () {
        var names = DatagridDataGenerator.data.name;
        var surnames = DatagridDataGenerator.data.surname;
        return names[DatagridDataGenerator.getRandomInt(0, names.length)][0].toLowerCase() + "." + names[DatagridDataGenerator.getRandomInt(0, surnames.length)].toLowerCase() + "@gmail.com";
    };
    DatagridDataGenerator.prototype.getRandomSurname = function () {
        var surnames = DatagridDataGenerator.data.surname;
        return surnames[DatagridDataGenerator.getRandomInt(0, surnames.length)];
    };
    DatagridDataGenerator.prototype.getRandomCountry = function () {
        var countries = DatagridDataGenerator.data.country;
        return countries[DatagridDataGenerator.getRandomInt(0, countries.length)];
    };
    DatagridDataGenerator.prototype.getRandomAge = function (min, max) {
        if (min === void 0) { min = 10; }
        if (max === void 0) { max = 70; }
        return DatagridDataGenerator.getRandomInt(min, max);
    };
    DatagridDataGenerator.prototype.getRandomDate = function (start, end) {
        if (start === void 0) { start = new Date(1955, 0, 1); }
        if (end === void 0) { end = new Date(1990, 0, 1); }
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    DatagridDataGenerator.prototype.getRandomPosition = function () {
        var positions = DatagridDataGenerator.data.position;
        return { name: positions[DatagridDataGenerator.getRandomInt(0, positions.length)], depth: 1 };
    };
    DatagridDataGenerator.prototype.getRandomBoolean = function () {
        return Math.random() < .5;
    };
    DatagridDataGenerator.nextId = 0;
    DatagridDataGenerator.data = {
        name: ['Jacob', 'Tom', 'John', 'Allie', 'Zoe', 'Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry'],
        surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer'],
        country: ['fra', 'hun', 'lbn', 'mli', 'deu', 'pol', 'prt', 'svk', 'gbr', 'alb', 'aut', 'bra'],
        city: ['Pekin', 'Newark', 'Acapulco', 'El Paso', 'Warsaw', 'Athens', 'Moscow', 'Mexico', 'Toronto', 'Los Angeles'],
        position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner'],
        sex: ['male', 'female'],
        phone: [645654654, 654234987, 305732948, 94740349, 4028343, 543929348, 58473532, 120954368, 432875483, 54385439],
        street: ['Jizhou Qu', 'Calle Oriente', 'Via Blanca', 'Dr. Ricardo Gutiérrez', 'Essex', 'Agar St', 'Boulevard Alexis-Nihon']
    };
    return DatagridDataGenerator;
}());
export { DatagridDataGenerator };
var VirtualEnv = (function () {
    function VirtualEnv(handleData) {
        var _this = this;
        this.virtualUsers = [];
        this.updateView = function (state) {
            var modifiedState = __assign({}, state);
            _this.virtualUsers.forEach(function (virtualUser) {
                modifiedState = virtualUser.makeChanges(modifiedState, _this.handleData);
            });
            return modifiedState;
        };
        this.handleData = handleData;
    }
    VirtualEnv.prototype.addUser = function (virtualUser) {
        this.virtualUsers = __spreadArrays(this.virtualUsers, [virtualUser]);
        return this;
    };
    return VirtualEnv;
}());
export { VirtualEnv };
var VirtualUser = (function () {
    function VirtualUser(borderColor) {
        this.borderColor = borderColor;
        this.count = 0;
        this.highlightColumnIdx = 0;
        this.highlightRowIdx = 0;
        this.borderColor = borderColor;
    }
    VirtualUser.prototype.getHighlightedCell = function (state) {
        return this.getHighlightedRow(state).cells[this.highlightColumnIdx];
    };
    VirtualUser.prototype.getHighlightedColumn = function (state) {
        return state.columns[this.highlightColumnIdx];
    };
    VirtualUser.prototype.getHighlightedRow = function (state) {
        return state.rows[this.highlightRowIdx];
    };
    VirtualUser.prototype.updateHighlightsState = function (state) {
        var _this = this;
        this.highlightColumnIdx = DatagridDataGenerator.getRandomInt(0, state.columns.length);
        this.highlightRowIdx = DatagridDataGenerator.getRandomInt(1, state.rows.length);
        var highlightLocations = __spreadArrays(state.highlights).filter(function (highlight) { return highlight.borderColor !== _this.borderColor; });
        if (state.rows.length > 0 && state.columns[this.highlightColumnIdx]) {
            var highlight = {
                columnId: this.getHighlightedColumn(state).columnId,
                rowId: this.getHighlightedRow(state).rowId,
                borderColor: this.borderColor
            };
            return __assign(__assign({}, state), { highlights: __spreadArrays(highlightLocations, [highlight]) });
        }
        return __assign({}, state);
    };
    VirtualUser.prototype.getUpdatedFieldState = function (state, handleData) {
        if (state === null || (!this.getHighlightedColumn(state) || !this.getHighlightedRow(state) || !this.getHighlightedCell(state))) {
            return null;
        }
        var cell = this.getHighlightedCell(state);
        var dataGen = new DatagridDataGenerator();
        var newFieldData = dataGen.getDataAttrByKey(this.getHighlightedColumn(state).columnId);
        var overridedProperties = __assign({}, cell);
        if (newFieldData === undefined) {
            switch (cell.type) {
                case 'checkbox': {
                    overridedProperties = __assign(__assign({}, cell), { checked: !cell.checked });
                    break;
                }
                case 'number': {
                    overridedProperties = __assign(__assign({}, cell), { value: dataGen.getRandomAge(10, 70) });
                    break;
                }
                case 'date': {
                    overridedProperties = __assign(__assign({}, cell), { date: dataGen.getRandomDate() });
                    break;
                }
                case 'email': {
                    overridedProperties = __assign(__assign({}, cell), { text: dataGen.getRandomEmail() });
                    break;
                }
                case 'flag': {
                    overridedProperties = __assign(__assign({}, cell), { text: dataGen.getRandomCountry() });
                    break;
                }
                case 'dropdownNumber': {
                    overridedProperties = __assign(__assign({}, cell), { value: DatagridDataGenerator.getRandomInt(0, 100) });
                    break;
                }
                default:
                    break;
            }
        }
        else {
            var text = newFieldData.toString();
            overridedProperties = __assign(__assign({}, cell), { value: parseInt(text, 10), text: text });
        }
        return __assign(__assign({}, handleData([{
                columnId: this.getHighlightedColumn(state).columnId,
                rowId: this.getHighlightedRow(state).rowId,
                type: cell.type,
                initialCell: __assign({}, cell),
                newCell: __assign({}, overridedProperties),
            }])), { highlightLocations: state.highlights });
    };
    VirtualUser.prototype.makeChanges = function (state, handleData) {
        switch (this.count) {
            case 0: {
                state = this.updateHighlightsState(state);
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
                state = this.updateHighlightsState(state);
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
        this.count++;
        return state;
    };
    return VirtualUser;
}());
export { VirtualUser };
