export var rows = function (reorderable) { return [
    {
        id: 'header',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'header', data: 'Company' },
            { type: 'header', data: 'Country' },
            { type: 'header', data: 'Creation date' },
            { type: 'header', data: 'Revenues ($ Mil.)' },
            { type: 'header', data: 'Rating' }
        ]
    },
    {
        id: '1',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Walmart' },
            { type: 'flag', data: 'USA' },
            { type: 'date', data: '1962-09-04' },
            { type: 'number', data: 514.405 },
            { type: 'rating', data: 2 }
        ]
    },
    {
        id: '2',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Sinopec Group' },
            { type: 'flag', data: 'CHN' },
            { type: 'date', data: '2000-06-25' },
            { type: 'number', data: 414.649 },
            { type: 'rating', data: 3.5 }
        ]
    },
    {
        id: '3',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Royal Dutch Shell' },
            { type: 'flag', data: 'NLD' },
            { type: 'date', data: '1907-04-19' },
            { type: 'number', data: 396.556 },
            { type: 'rating', data: 4.5 }
        ]
    },
    {
        id: '4',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'ExxonMobil' },
            { type: 'flag', data: 'USA' },
            { type: 'date', data: '1999-02-12' },
            { type: 'number', data: 343.427 },
            { type: 'rating', data: 3.5 }
        ]
    },
    {
        id: '5',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Saudi Aramco' },
            { type: 'flag', data: 'SAU' },
            { type: 'date', data: '1933-11-09' },
            { type: 'number', data: 355.905 },
            { type: 'rating', data: 5 }
        ]
    },
    {
        id: '6',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Volkswagen' },
            { type: 'flag', data: 'DEU' },
            { type: 'date', data: '1937-05-28' },
            { type: 'number', data: 278.342 },
            { type: 'rating', data: 5 }
        ]
    },
    {
        id: '7',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Toyota' },
            { type: 'flag', data: 'JPN' },
            { type: 'date', data: '1937-08-28' },
            { type: 'number', data: 192.724 },
            { type: 'rating', data: 3 }
        ]
    },
    {
        id: '8',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Visa' },
            { type: 'flag', data: 'USA' },
            { type: 'date', data: '1958-06-15' },
            { type: 'number', data: 351.913 },
            { type: 'rating', data: 4 }
        ]
    },
    {
        id: '9',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Taiwan Semiconductor' },
            { type: 'flag', data: 'CHN' },
            { type: 'date', data: '1987-11-17' },
            { type: 'number', data: 264.256 },
            { type: 'rating', data: 5 }
        ]
    },
    {
        id: '10',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Samsung Electronics' },
            { type: 'flag', data: 'KOR' },
            { type: 'date', data: '1969-01-13' },
            { type: 'number', data: 221.569 },
            { type: 'rating', data: 5 }
        ]
    },
    {
        id: '11',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Glencore' },
            { type: 'flag', data: 'CHE' },
            { type: 'date', data: '1974-07-17' },
            { type: 'number', data: 219.754 },
            { type: 'rating', data: 4 }
        ]
    },
    {
        id: '12',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Total' },
            { type: 'flag', data: 'FRA' },
            { type: 'date', data: '1924-03-28' },
            { type: 'number', data: 184.106 },
            { type: 'rating', data: 3 }
        ]
    },
    {
        id: '13',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Trafigura' },
            { type: 'flag', data: 'SGP' },
            { type: 'date', data: '1993-06-15' },
            { type: 'number', data: 180.744 },
            { type: 'rating', data: 3 }
        ]
    },
    {
        id: '14',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Daimler' },
            { type: 'flag', data: 'DEU' },
            { type: 'date', data: '1926-06-28' },
            { type: 'number', data: 197.515 },
            { type: 'rating', data: 4 }
        ]
    },
    {
        id: '15',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Exor' },
            { type: 'flag', data: 'ITA' },
            { type: 'date', data: '1927-07-27' },
            { type: 'number', data: 175.009 },
            { type: 'rating', data: 4 }
        ]
    },
    {
        id: '16',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'Chevron' },
            { type: 'flag', data: 'USA' },
            { type: 'date', data: '1879-09-10' },
            { type: 'number', data: 166.339 },
            { type: 'rating', data: 4 }
        ]
    },
    {
        id: '17',
        height: 25,
        reorderable: reorderable,
        cells: [
            { type: 'text', data: 'BP' },
            { type: 'flag', data: 'GBR' },
            { type: 'date', data: '1909-04-14' },
            { type: 'number', data: 303.738 },
            { type: 'rating', data: 5 }
        ]
    },
]; };
