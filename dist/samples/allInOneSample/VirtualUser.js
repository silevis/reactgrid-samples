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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
var ReactGridDataGenerator = (function () {
    function ReactGridDataGenerator() {
    }
    ReactGridDataGenerator.prototype.getDataAttrByKey = function (key) {
        var randomArray = ReactGridDataGenerator.data[key];
        if (randomArray !== undefined)
            return randomArray[getRandomInt(0, randomArray.length)];
        return null;
    };
    ReactGridDataGenerator.prototype.getRandomName = function () {
        var names = ReactGridDataGenerator.data.name;
        return names[getRandomInt(0, names.length)];
    };
    ReactGridDataGenerator.prototype.getRandomSurname = function () {
        var surnames = ReactGridDataGenerator.data.surname;
        return surnames[getRandomInt(0, surnames.length)];
    };
    ReactGridDataGenerator.prototype.getRandomCountry = function () {
        var countries = ReactGridDataGenerator.data.country;
        return countries[getRandomInt(0, countries.length)];
    };
    ReactGridDataGenerator.prototype.getRandomAge = function (min, max) {
        if (min === void 0) { min = 10; }
        if (max === void 0) { max = 70; }
        return getRandomInt(min, max);
    };
    ReactGridDataGenerator.prototype.getRandomPosition = function () {
        var positions = ReactGridDataGenerator.data.position;
        return { name: positions[getRandomInt(0, positions.length)], depth: 1 };
    };
    ReactGridDataGenerator.prototype.getRandomBoolean = function () {
        return Math.random() < .5;
    };
    ReactGridDataGenerator.prototype.createNewUser = function () {
        ++ReactGridDataGenerator.nextId;
        var id = ReactGridDataGenerator.nextId;
        var name = this.getRandomName();
        var surname = this.getRandomSurname();
        var age = this.getRandomAge();
        var country = this.getRandomCountry();
        var position = this.getRandomPosition();
        var onHoliday = this.getRandomBoolean();
        return { id: id, name: name, surname: surname, age: age, country: country, position: position, onHoliday: onHoliday, pinned: false };
    };
    ReactGridDataGenerator.nextId = 12;
    ReactGridDataGenerator.data = {
        name: ['Jacob', 'Tom', 'John', 'Allie', 'Zoe', 'Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry'],
        surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer'],
        country: ['fra', 'hun', 'lbn', 'mli', 'deu', 'pol', 'prt', 'svk', 'gbr', 'alb', 'aut', 'bra'],
        position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner']
    };
    return ReactGridDataGenerator;
}());
export { ReactGridDataGenerator };
var VirtualEnv = (function () {
    function VirtualEnv(state, handleData) {
        var _this = this;
        this.virtualUsers = [];
        this.updateView = function (state) {
            var modifiedState = state;
            _this.virtualUsers.forEach(function (virtualUser) {
                modifiedState = virtualUser.makeChanges(modifiedState, _this.handleData);
            });
            return modifiedState;
        };
        this.state = state;
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
    function VirtualUser(color) {
        this.count = 0;
        this.focusX = 0;
        this.focusY = 0;
        this.color = color;
    }
    VirtualUser.prototype.updateFocusesState = function (state) {
        var _this = this;
        this.focusX = getRandomInt(1, state.fields.length);
        this.focusY = getRandomInt(1, state.records.length);
        var focuses = __spreadArrays(state.focuses).filter(function (f) { return f.color !== _this.color; });
        var newFocus = state.records.length !== 1 && state.fields[this.focusX] ? { colId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, color: this.color } : {};
        return __assign(__assign({}, state), { focuses: __spreadArrays(focuses, [newFocus]) });
    };
    VirtualUser.prototype.getUpdatedFieldState = function (state, handleData) {
        if (state == null || state.fields[this.focusX] == undefined || state.records[this.focusY] == undefined)
            return null;
        var _a = state.fields[this.focusX], name = _a.name, type = _a.type;
        var dataGen = new ReactGridDataGenerator();
        var newFieldData = dataGen.getDataAttrByKey(name);
        if (newFieldData == null) {
            switch (type) {
                case 'checkbox': {
                    newFieldData = dataGen.getRandomBoolean();
                    break;
                }
                case 'number': {
                    newFieldData = dataGen.getRandomAge(10, 70);
                    break;
                }
                case 'text': {
                    newFieldData = dataGen.getRandomName() + ' and ' + dataGen.getRandomName();
                    break;
                }
                default:
                    break;
            }
        }
        return __assign(__assign({}, handleData([{ columnId: state.fields[this.focusX].id, rowId: state.records[this.focusY].id, type: type, initialData: '', newData: newFieldData }])), { focuses: state.focuses });
    };
    VirtualUser.prototype.makeChanges = function (state, handleData) {
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
    };
    return VirtualUser;
}());
export { VirtualUser };