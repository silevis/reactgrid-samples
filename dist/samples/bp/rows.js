var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var generateMonthHeader = function (year, quarter, month) {
    var formattedMonth = ("" + month).padStart(2, '0');
    return { type: 'horizontalGroup', text: quarter + "-" + formattedMonth, className: 'month', parentId: year + "-" + quarter };
};
var generateQuarterHeader = function (year, quarter, hasChildren, isExpanded) {
    if (hasChildren === void 0) { hasChildren = false; }
    if (isExpanded === void 0) { isExpanded = false; }
    return { type: 'horizontalGroup', text: quarter, className: 'quarter', parentId: "" + year, hasChildren: hasChildren, isExpanded: isExpanded };
};
var generateQuarter = function (year, quarter, month) {
    return [
        generateQuarterHeader(year, quarter),
        generateMonthHeader(year, quarter, month),
        generateMonthHeader(year, quarter, month + 1),
        generateMonthHeader(year, quarter, month + 2),
    ];
};
var generateYear = function (year, hasChildren) {
    if (hasChildren === void 0) { hasChildren = false; }
    return __spread([
        { type: 'horizontalGroup', text: "" + year, className: 'year', parentId: undefined, hasChildren: hasChildren }
    ], generateQuarter(year, 'Q1', 1), generateQuarter(year, 'Q2', 4), generateQuarter(year, 'Q3', 7), generateQuarter(year, 'Q4', 10));
};
export var topHeaderRow = {
    rowId: 'topHeader',
    cells: __spread([
        { type: 'text', text: 'Organization / Period' }
    ], generateYear(2020), generateYear(2021))
};
var generateNumberCell = function (value, className, nanToZero) {
    if (className === void 0) { className = ''; }
    if (nanToZero === void 0) { nanToZero = false; }
    return { type: 'number', value: value, className: className, nanToZero: nanToZero };
};
var generateNonEditableNumberCell = function (value, className, nanToZero) {
    if (className === void 0) { className = ''; }
    if (nanToZero === void 0) { nanToZero = false; }
    return { type: 'nonEditableNumber', value: value, className: className, nanToZero: nanToZero };
};
var emptyYear = function () { return [
    generateNonEditableNumberCell(0, 'year'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'quarter'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
    generateNonEditableNumberCell(0, 'month'),
]; };
var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
var filledYear = function (min, max, bonus) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 10000; }
    if (bonus === void 0) { bonus = 0; }
    return [
        generateNonEditableNumberCell(0, 'year'),
        generateNumberCell(0, 'quarter editable'),
        generateNumberCell(getRandomInt(min, max), 'month editable'),
        generateNumberCell(getRandomInt(min, max), 'month editable'),
        generateNumberCell(getRandomInt(min, max), 'month editable'),
        generateNumberCell(0, 'quarter editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 1, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 1, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 1, 'month editable'),
        generateNumberCell(0, 'quarter editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 2, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 2, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 2, 'month editable'),
        generateNumberCell(0, 'quarter editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 3, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 3, 'month editable'),
        generateNumberCell(getRandomInt(min, max) + bonus * 3, 'month editable'),
    ];
};
export var dataRows = [
    {
        rowId: 'Silevis',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Silevis organization', parentId: undefined, isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Expenses',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Expenses', parentId: 'Silevis', isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Fixed',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Fixed', parentId: 'Expenses', isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Salaries',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Salaries', parentId: 'Fixed', isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Serge Gainsbourg',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Serge Gainsbourg', parentId: 'Salaries', isExpanded: true }
        ], filledYear(5500, 5500, 300.32), filledYear(6400, 6400, 300))
    },
    {
        rowId: 'Jacob Sandberg',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Jacob Sandberg', parentId: 'Salaries' }
        ], filledYear(4500, 4500, 100), filledYear(6000, 6000, 50.12))
    },
    {
        rowId: 'Elizabeth Hudson',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Elizabeth Hudson', parentId: 'Salaries' }
        ], filledYear(5500, 5500, 300), filledYear(6400, 6400, 300))
    },
    {
        rowId: 'Office costs',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Office costs', parentId: 'Fixed', isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Gas',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Gas', parentId: 'Office costs' }
        ], filledYear(1000, 1200, 10.1), filledYear(1050, 1100, 12.02))
    },
    {
        rowId: 'Electricity',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Electricity', parentId: 'Office costs' }
        ], filledYear(90, 110, 1.2), filledYear(80, 120, 1.02))
    },
    {
        rowId: 'Rent',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Electricity', parentId: 'Rent' }
        ], filledYear(2200, 2200), filledYear(2300, 2300))
    },
    {
        rowId: 'Insurence',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'Insurence', parentId: 'Fixed', isExpanded: true }
        ], filledYear(1520, 1520), filledYear(1530, 1540))
    },
    {
        rowId: 'One-time',
        reorderable: true,
        cells: __spread([
            { type: 'group', text: 'One-time', parentId: 'Expenses', isExpanded: true }
        ], emptyYear(), emptyYear())
    },
    {
        rowId: 'Vehicle',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Vehicle', parentId: 'One-time' },
            generateNonEditableNumberCell(0, 'year'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(35000, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(25000, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNonEditableNumberCell(0, 'year'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(25000, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
        ]
    },
    {
        rowId: 'Computer',
        reorderable: true,
        cells: [
            { type: 'group', text: 'Computer', parentId: 'One-time' },
            generateNonEditableNumberCell(0, 'year'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(3000, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(3200, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNonEditableNumberCell(0, 'year'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(3000, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'quarter editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
            generateNumberCell(0, 'month editable'),
        ]
    },
];
