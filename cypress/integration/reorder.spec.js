const Utils = require('./common/utils');
const Constants = require('./common/constants');
context('Reorder', () => {
    beforeEach(() => {
        Utils.visit();
    });


    it('Should reorder column', () => {
        Utils.selectCell(100, 10);
        cy.get('[data-cy=dyna-grid]').trigger('pointerdown', 100, 10)
        cy.get('[data-cy=dyna-grid]').trigger('pointermove', 600, 10, { force: true });
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(1000);
        Utils.selectCell(500, 10);
        cy.get('[data-cy=dyna-grid]').trigger('pointerdown', 500, 10)
        cy.get('[data-cy=dyna-grid]').trigger('pointermove', 100, 10, { force: true });
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(1000);
    });


    it('It should select and reorder many colums', () => {
        Utils.selectRange(100, 10, 200, 10);
        cy.wait(400);
        cy.get('[data-cy=dyna-grid]').trigger('pointerdown', 200, 10);
        cy.get('[data-cy=dyna-grid]').trigger('pointermove', 500, 10);
        cy.wait(500);
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(500);
    });

    it('Col shadow should be visible during reordering', () => {
        Utils.selectCell(100, 10);
        cy.get('[data-cy=dyna-grid]').trigger('pointerdown', 100, 10);
        for (let x = 100; x <= 900; x += 10) {
            cy.get('[data-cy=dyna-grid]').trigger('pointermove', x, 10);
        }
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
    });


})