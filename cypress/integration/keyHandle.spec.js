// <reference types="Cypress" />
const Utils = require('./common/utils');
const Constants = require('./common/constants');

context('Keyboard', () => {
    beforeEach(() => {
        Utils.visit();
    });

    it('End & home should navigate to last and first cell', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Home, 1, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.End, 1, { force: true });
        cy.wait(500);
    });

    it('PageUp and PageDown should navigate to first and last row', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.PageUp, 1, { force: true });
        cy.wait(500)
        Utils.keyDown(Constants.keyCodes.PagdeDown, 1, { force: true });
        cy.wait(500)
        Utils.keyDown(Constants.keyCodes.PageUp, 1, { force: true });
        cy.wait(500);
    });

    it('Arrows should navigate up/down/left/right', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.ArrowUp, 4, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 4, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowLeft, 2, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowRight, 4, { force: true });
        cy.wait(500);
    });

    it('Tab key pressed should navigate to next cell', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Tab, 5, { force: true });
        cy.wait(500);
    });

    it('Shift + Tab keys pressed should navigate to previous cell', () => {
        Utils.selectCell(500, 100);
        Utils.keyDown(Constants.keyCodes.Tab, 5, { shiftKey: true, force: true })
        cy.wait(500);
    });

    it('Shift key pressed + arrows should resize selection range', () => {
        Utils.selectCell(100, 250);
        Utils.keyDown(Constants.keyCodes.ArrowUp, 3, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowLeft, 2, { shiftKey: true, force: true });
        cy.wait(500);
    });

    it('Navigate inside selected range', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 3, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Tab, 4, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Enter, 2, { force: true });
        cy.wait(500);
        Utils.selectCell(500, 200, { ctrlKey: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 3, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true, force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Tab, 30, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Enter, 10, { force: true });
        cy.wait(500);
    });


    it('Enter key pressed should activate cell edit mode ', () => {
        Utils.selectCell(100, 100);
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
    });

    it('Delete key pressed should delete data from the cell ', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
        cy.wait(500);
        cy.focused().type(Utils.randomText(), { force: true });
        Utils.selectCell(100, 200);
        cy.wait(500);
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Delete, 1, { force: true });
        cy.wait(500);
    });

    it('Backspace key pressed should delete data from the cell', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
        cy.wait(500);
        cy.focused().type(Utils.randomText(), { force: true });
        Utils.selectCell(100, 200);
        cy.wait(500);
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Backspace, 1, { force: true });
        cy.wait(500);
    });

    it('Tab key pressed should exit from cell edit mode and move to next column ', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Tab, 1, { force: true });
    });

    it('Enter key pressed should exit from cell edit mode and move to next row', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Enter, 1, { force: true });
    });

});
