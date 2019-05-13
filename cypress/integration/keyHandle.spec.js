// <reference types="Cypress" />
const Utils = require('./common/utils');
const Constants = require('./common/constants');

context('Keyboard', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('End & home should navigate to last and first cell', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Home);
        Utils.keyDown(Constants.keyCodes.End);
    });

    it('PageUp and PageDown should navigate to first and last row', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.PageUp);
        Utils.keyDown(Constants.keyCodes.PagdeDown);
        Utils.keyDown(Constants.keyCodes.PagdeDown);
        Utils.keyDown(Constants.keyCodes.PagdeDown);
        Utils.keyDown(Constants.keyCodes.PageUp);
        Utils.keyDown(Constants.keyCodes.PageUp);
        Utils.keyDown(Constants.keyCodes.PageUp);
    });

    it('Arrows should navigate up/down/left/right', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.ArrowUp, 4);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 4);
        Utils.keyDown(Constants.keyCodes.ArrowLeft, 2);
        Utils.keyDown(Constants.keyCodes.ArrowRight, 4);
    });

    it('Tab key pressed should navigate to next cell', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.Tab, 5);
    });

    it('Shift + Tab keys pressed should navigate to previous cell', () => {
        Utils.selectCell(500, 100);
        Utils.keyDown(Constants.keyCodes.Tab, 5, { shiftKey: true })
    });

    it('Shift key pressed + arrows should resize selection range', () => {
        Utils.selectCell(100, 250);
        Utils.keyDown(Constants.keyCodes.ArrowUp, 3, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.ArrowLeft, 2, { shiftKey: true });
    });

    it('Navigate inside selected range', () => {
        Utils.selectCell(100, 100);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 3, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.Tab, 4);
        Utils.keyDown(Constants.keyCodes.Enter, 2);
        Utils.selectCell(500, 200, { ctrlKey: true });
        Utils.keyDown(Constants.keyCodes.ArrowDown, 3, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 2, { shiftKey: true });
        Utils.keyDown(Constants.keyCodes.Tab, 30);
        Utils.keyDown(Constants.keyCodes.Enter, 10);
    });
});
