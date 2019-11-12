export var rows = function (reorderable) { return [
    {
        id: 'header',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'header', data: 'Name' },
            { type: 'header', data: 'Surname' },
            { type: 'header', data: 'Sex' },
            { type: 'header', data: 'Email' },
            { type: 'header', data: 'Phone' },
            { type: 'header', data: 'City' },
            { type: 'header', data: 'Street' },
            { type: 'header', data: 'Registered' },
            { type: 'header', data: 'Country' },
            { type: 'header', data: 'Birth date' },
            { type: 'header', data: 'Position' },
            { type: 'header', data: 'Skills' },
            { type: 'header', data: 'Is active' },
        ]
    },
    {
        id: '1',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Jacob' },
            { type: 'text', data: 'Sandberg' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'j.sandberg@gmail.com' },
            { type: 'number', data: 7958372938 },
            { type: 'text', data: 'New York' },
            { type: 'text', data: 'Wellham Ave' },
            { type: 'date', data: '2009-09-04' },
            { type: 'flag', data: 'usa' },
            { type: 'date', data: '1962-09-04' },
            { type: 'text', data: 'Director' },
            { type: 'dropdownNumber', data: { value: 20, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
    {
        id: '2',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Fred' },
            { type: 'text', data: 'Schulz' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'f.schulz@gmail.com' },
            { type: 'number', data: 7953748271 },
            { type: 'text', data: 'Ji\'an' },
            { type: 'text', data: 'Jizhou Qu' },
            { type: 'date', data: '2012-01-12' },
            { type: 'flag', data: 'chn' },
            { type: 'date', data: '1985-11-06' },
            { type: 'text', data: 'CEO' },
            { type: 'dropdownNumber', data: { value: 50, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '3',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Robin' },
            { type: 'text', data: 'Lasgo' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'r.asgo@gmail.com' },
            { type: 'number', data: 574859602 },
            { type: 'text', data: 'Ust-Ilimsk' },
            { type: 'text', data: 'Myasorubka' },
            { type: 'date', data: '2016-11-23' },
            { type: 'flag', data: 'rus' },
            { type: 'date', data: '1985-12-28' },
            { type: 'text', data: 'QA' },
            { type: 'dropdownNumber', data: { value: 100, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '4',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Elizabeth' },
            { type: 'text', data: 'Hudson' },
            { type: 'text', data: 'female' },
            { type: 'email', data: 'e.hudson@gmail.com' },
            { type: 'number', data: 574859602 },
            { type: 'text', data: 'Woods Landing-Jelm' },
            { type: 'text', data: 'Meadow Acres Rd' },
            { type: 'date', data: '2011-12-03' },
            { type: 'flag', data: 'usa' },
            { type: 'date', data: '1973-07-11' },
            { type: 'text', data: 'IT Support' },
            { type: 'dropdownNumber', data: { value: 90, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '5',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Lee' },
            { type: 'text', data: 'Aaker ' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'l.aaker@gmail.com' },
            { type: 'number', data: 697038495 },
            { type: 'text', data: 'Houston' },
            { type: 'text', data: 'Marina St' },
            { type: 'date', data: '2017-07-13' },
            { type: 'flag', data: 'usa' },
            { type: 'date', data: '1943-09-25' },
            { type: 'text', data: 'CFO' },
            { type: 'dropdownNumber', data: { value: 100, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '6',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Willie' },
            { type: 'text', data: 'Aames ' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'w.aames@gmail.com' },
            { type: 'number', data: 584729732 },
            { type: 'text', data: 'Choix' },
            { type: 'text', data: 'SIN 24' },
            { type: 'date', data: '2017-07-13' },
            { type: 'flag', data: 'mex' },
            { type: 'date', data: '1960-09-15' },
            { type: 'text', data: 'Marketing manager' },
            { type: 'dropdownNumber', data: { value: 88, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '7',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Quinton' },
            { type: 'text', data: 'Aaron' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'q.aaron@gmail.com' },
            { type: 'number', data: 5748373274 },
            { type: 'text', data: 'Guatemala' },
            { type: 'text', data: 'Calle Oriente' },
            { type: 'date', data: '2013-11-03' },
            { type: 'flag', data: 'gtm' },
            { type: 'date', data: '1954-12-01' },
            { type: 'text', data: 'CFO' },
            { type: 'dropdownNumber', data: { value: 100, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
    {
        id: '8',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Juan' },
            { type: 'text', data: 'Escobar' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'o.abtahi@gmail.com' },
            { type: 'number', data: 5478439347 },
            { type: 'text', data: 'Havana' },
            { type: 'text', data: 'Via Blanca' },
            { type: 'date', data: '2014-03-20' },
            { type: 'flag', data: 'cub' },
            { type: 'date', data: '1979-07-12' },
            { type: 'text', data: 'Vice President' },
            { type: 'dropdownNumber', data: { value: 88, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
    {
        id: '9',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Jason' },
            { type: 'text', data: 'Adams' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'j.adams@gmail.com' },
            { type: 'number', data: 958437283 },
            { type: 'text', data: 'Buenos Aires' },
            { type: 'text', data: 'Dr. Ricardo Gutiérrez' },
            { type: 'date', data: '2015-08-39' },
            { type: 'flag', data: 'arg' },
            { type: 'date', data: '1964-02-07' },
            { type: 'text', data: 'Operations manager' },
            { type: 'dropdownNumber', data: { value: 77, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '10',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Frank' },
            { type: 'text', data: 'Alesia' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'f.tyson@gmail.com' },
            { type: 'number', data: 654890374 },
            { type: 'text', data: 'Adelaide' },
            { type: 'text', data: 'Essex' },
            { type: 'date', data: '2017-12-02' },
            { type: 'flag', data: 'aus' },
            { type: 'date', data: '1944-01-04 ' },
            { type: 'text', data: 'Accountant' },
            { type: 'dropdownNumber', data: { value: 35, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
    {
        id: '11',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Alan' },
            { type: 'text', data: 'Bennion' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'a.bennion@gmail.com' },
            { type: 'number', data: 2398584578 },
            { type: 'text', data: 'London' },
            { type: 'text', data: 'Agar St' },
            { type: 'date', data: '2015-04-13' },
            { type: 'flag', data: 'gbr' },
            { type: 'date', data: '1970-04-18' },
            { type: 'text', data: 'Actor' },
            { type: 'dropdownNumber', data: { value: 70, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '12',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Joanne' },
            { type: 'text', data: 'Balasko' },
            { type: 'text', data: 'female' },
            { type: 'email', data: 'j.balasko@gmail.com' },
            { type: 'number', data: 5473895647 },
            { type: 'text', data: 'Paris' },
            { type: 'text', data: 'Elisses' },
            { type: 'date', data: '2011-11-11' },
            { type: 'flag', data: 'FRA' },
            { type: 'date', data: '1950-04-15' },
            { type: 'text', data: 'CPA' },
            { type: 'dropdownNumber', data: { value: 20, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '13',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Daniel' },
            { type: 'text', data: 'Auteuil' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'd.auteuil@gmail.com' },
            { type: 'number', data: 2309548374 },
            { type: 'text', data: 'Montrreal' },
            { type: 'text', data: 'Boulevard Alexis-Nihon' },
            { type: 'date', data: '2018-06-19' },
            { type: 'flag', data: 'can' },
            { type: 'date', data: '1950-01-24 ' },
            { type: 'text', data: '--' },
            { type: 'dropdownNumber', data: { value: 10, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
    {
        id: '14',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Suzanne' },
            { type: 'text', data: 'Bianchetti' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 's.bianchetti@gmail.com' },
            { type: 'number', data: 43878342 },
            { type: 'text', data: 'Mediolan' },
            { type: 'text', data: 'Via Francesco Melzi d\'Eril' },
            { type: 'date', data: '2018-06-19' },
            { type: 'flag', data: 'ita' },
            { type: 'date', data: '1957-02-24' },
            { type: 'text', data: 'COO' },
            { type: 'dropdownNumber', data: { value: 50, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '15',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Mohhamad' },
            { type: 'text', data: 'Ibn Al-Azhar' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 'm.ibn-al-azhar@gmail.com' },
            { type: 'number', data: 5438904375 },
            { type: 'text', data: 'Cair' },
            { type: 'text', data: 'Abd El-Khalik Tharwat' },
            { type: 'date', data: '2018-06-19' },
            { type: 'flag', data: 'egy' },
            { type: 'date', data: '1925-08-27 ' },
            { type: 'text', data: '--' },
            { type: 'dropdownNumber', data: { value: 20, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '16',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Laetitia' },
            { type: 'text', data: 'Casta' },
            { type: 'text', data: 'female' },
            { type: 'email', data: 'l.casta@gmail.com' },
            { type: 'number', data: 51187834 },
            { type: 'text', data: 'Paralia Katerinis' },
            { type: 'text', data: 'Παύλου Μελά' },
            { type: 'date', data: '2018-06-19' },
            { type: 'flag', data: 'grc' },
            { type: 'date', data: '1978-05-11' },
            { type: 'text', data: 'Manager' },
            { type: 'dropdownNumber', data: { value: 70, isOpened: false } },
            { type: 'checkbox', data: false }
        ]
    },
    {
        id: '17',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Serge' },
            { type: 'text', data: 'Gainsbourg' },
            { type: 'text', data: 'male' },
            { type: 'email', data: 's.gainsbourg@gmail.com' },
            { type: 'number', data: 99657346 },
            { type: 'text', data: 'Malmo' },
            { type: 'text', data: 'Södra Rosengård' },
            { type: 'date', data: '2018-06-19' },
            { type: 'flag', data: 'swe' },
            { type: 'date', data: '1968-04-02' },
            { type: 'text', data: 'President' },
            { type: 'dropdownNumber', data: { value: 40, isOpened: false } },
            { type: 'checkbox', data: true }
        ]
    },
]; };
