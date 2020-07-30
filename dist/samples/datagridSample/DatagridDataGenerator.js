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
        name: ['Jacob', 'Tom', 'John', 'Allie', 'Zoe', 'Ashe', 'Fred', 'Rob', 'Alison', 'Arcady', 'Tom', 'Jerry', '   '],
        surname: ['Hudson', 'Perkins', 'Mason', 'Armstrong', 'King', 'Collins', 'Bush', 'Maddison', 'Del Rey', 'Goletz', 'Ferrer', '   '],
        country: ['fra', 'hun', 'lbn', 'mli', 'deu', 'pol', 'prt', 'svk', 'gbr', 'alb', 'aut', 'bra', '   '],
        city: ['Pekin', 'Newark', 'Acapulco', 'El Paso', 'Warsaw', 'Athens', 'Moscow', 'Mexico', 'Toronto', 'Los Angeles', '   '],
        position: ['Director', 'Manager', 'Software Dev', 'QA', 'Automated Tester', 'Unemployed', 'Scrum Master', 'Project owner', '   '],
        email: ['j.sandberg@gmail.com', 'mr.asgo@gmail.com', 'e.hudson@gmail.com', 'l.aaker@gmail.com', 'o.abtahi@gmail.com', 'j.adams@gmail.com', 'j.balasko@gmail.com', 's.bianchetti@gmail.com', '   '],
        'birth-date': ['e', 'm', 'a Dev', 'i',],
        'is-active': ['false', 'true'],
        skills: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '   '],
        sex: ['male', 'female', '---'],
        phone: ['645654654', '654234987', '305732948', '94740349', '4028343', '543929348', '58473532', '120954368', '432875483', '54385439', '   '],
        street: ['Jizhou Qu', 'Calle Oriente', 'Via Blanca', 'Dr. Ricardo Gutiérrez', 'Essex', 'Agar St', 'Boulevard Alexis-Nihon', '   '],
        registered: ['10.10.2020'],
    };
    return DatagridDataGenerator;
}());
export { DatagridDataGenerator };
