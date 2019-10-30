var BudgetPlannerSampleData = {
    dateRange: { start: { year: 2018, month: 0 }, end: { year: 2020, month: 11 } },
    budgetData: [
        {
            id: 'fuel_foo',
            category: 'fuel',
            isCollapsed: false,
            subcategories: [
                {
                    subcategory: 'LPG',
                    id: 'fuel_lpg',
                    entries: [{
                            year: 2017,
                            month: 0,
                            value: 750,
                        }, {
                            year: 2017,
                            month: 2,
                            value: 200,
                        }, {
                            year: 2019,
                            month: 0,
                            value: 50
                        }, {
                            year: 2019,
                            month: 1,
                            value: 10
                        }, {
                            year: 2019,
                            month: 2,
                            value: 20,
                        }, {
                            year: 2019,
                            month: 3,
                            value: 40
                        }]
                }, {
                    subcategory: 'CNG',
                    id: 'fuel_cng',
                    entries: [{
                            year: 2017,
                            month: 0,
                            value: 220,
                        }, {
                            year: 2019,
                            month: 0,
                            value: 2,
                        }, {
                            year: 2019,
                            month: 1,
                            value: 4,
                        }, {
                            year: 2019,
                            month: 2,
                            value: 8
                        }]
                }
            ]
        }, {
            id: 'clothing_bar',
            category: 'clothing',
            isCollapsed: false,
            subcategories: [
                {
                    subcategory: 't-shirts',
                    id: 'clothing_tshirts',
                    entries: [{
                            year: 2019,
                            month: 0,
                            value: 120
                        }, {
                            year: 2019,
                            month: 1,
                            value: 90
                        }, {
                            year: 2019,
                            month: 2,
                            value: 30,
                        }]
                }, {
                    subcategory: 'trousers',
                    id: 'clothing_trousers',
                    entries: [{
                            year: 2019,
                            month: 0,
                            value: 60,
                        }, {
                            year: 2019,
                            month: 1,
                            value: 20,
                        }, {
                            year: 2019,
                            month: 2,
                            value: 30
                        }]
                }
            ]
        }, {
            id: 'food_baz',
            category: 'food',
            isCollapsed: false,
            subcategories: [
                {
                    subcategory: 'meat',
                    id: 'food_meat',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 40
                        }, {
                            year: 2018,
                            month: 6,
                            value: 600
                        }, {
                            year: 2018,
                            month: 7,
                            value: 700
                        }, {
                            year: 2018,
                            month: 8,
                            value: 800,
                        }]
                }, {
                    subcategory: 'vegetables',
                    id: 'food_vegetables',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 100,
                        }, {
                            year: 2018,
                            month: 6,
                            value: 850,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 900
                        }]
                }, {
                    subcategory: 'fruit',
                    id: 'food_fruit',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 60,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 20,
                        }, {
                            year: 2018,
                            month: 8,
                            value: 30
                        }]
                }, {
                    subcategory: 'sweets',
                    id: 'food_sweets',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 15,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 38,
                        }, {
                            year: 2018,
                            month: 8,
                            value: 12
                        }]
                }
            ]
        }, {
            id: 'entertainment_waz',
            category: 'entertainment',
            isCollapsed: false,
            subcategories: [
                {
                    subcategory: 'gifts',
                    id: 'entertainment_gifts',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 40
                        }, {
                            year: 2018,
                            month: 6,
                            value: 600
                        }, {
                            year: 2018,
                            month: 7,
                            value: 700
                        }, {
                            year: 2018,
                            month: 8,
                            value: 800,
                        }]
                }, {
                    subcategory: 'cinema',
                    id: 'entertainment_cinema',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 100,
                        }, {
                            year: 2018,
                            month: 6,
                            value: 850,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 900
                        }]
                }, {
                    subcategory: 'restaurant',
                    id: 'entertainment_restaurant',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 60,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 20,
                        }, {
                            year: 2018,
                            month: 8,
                            value: 30
                        }]
                }, {
                    subcategory: 'other',
                    id: 'entertainment_other',
                    entries: [{
                            year: 2018,
                            month: 5,
                            value: 15,
                        }, {
                            year: 2018,
                            month: 7,
                            value: 38,
                        }, {
                            year: 2018,
                            month: 8,
                            value: 12
                        }]
                }
            ]
        }
    ]
};
export default BudgetPlannerSampleData;
