// <reference types="Cypress" />
const Utils = require('./common/utils');

context('Filling', () => {
    beforeEach(() => {
        Utils.visit();
    });

    it('Fill handle by one cell should duplicate last record value', () => {
        Utils.selectCell(400, 200);
        Utils.fillCells(400, 100);
        Utils.fillCells(600, 200);
        Utils.fillCells(400, 300);
        Utils.fillCells(200, 200);
    });

    it('Fill handle by range should duplicate last record value', () => {
        Utils.selectRange(400, 200, 500, 300);
        Utils.fillCells(500, 100);
        Utils.fillCells(700, 300);
        Utils.fillCells(500, 500);
        Utils.fillCells(100, 300);
    });
});
