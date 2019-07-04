// <reference types="Cypress" />
const Utils = require('./common/utils');
const Constants = require('./common/constants');

context('Keyboard', () => {
    beforeEach(() => {
        Utils.visit();
    });

    it('End & home should navigate to last and first cell', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Home, { force: true });
        Utils.keyDown(Constants.keyCodes.End, { force: true });
    });

    it('PageUp and PageDown should navigate to first and last visible row', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.PageUp, { force: true });
        for (var i = 0; i < 5; i++) Utils.keyDown(Constants.keyCodes.PagdeDown, { force: true });
        for (var i = 0; i < 5; i++) Utils.keyDown(Constants.keyCodes.PageUp, { force: true });
    });

    it('Arrows should navigate up/down/left/right', () => {
        Utils.selectCell(300, 100);
        for (var i = 0; i < 4; i++) Utils.keyDown(Constants.keyCodes.ArrowUp, { force: true });
        for (var i = 0; i < 4; i++) Utils.keyDown(Constants.keyCodes.ArrowDown, { force: true });
        for (var i = 0; i < 2; i++) Utils.keyDown(Constants.keyCodes.ArrowLeft, { force: true });
        for (var i = 0; i < 4; i++) Utils.keyDown(Constants.keyCodes.ArrowRight, { force: true });
    });

    it('TAB navigate to next cell, Shift + TAB navigate to previous cell', () => {
        Utils.selectCell(200, 100);
        for (var i = 0; i < 7; i++) Utils.keyDown(Constants.keyCodes.Tab, { force: true });
        for (var i = 0; i < 8; i++) Utils.keyDown(Constants.keyCodes.Tab, { shiftKey: true, force: true });
    });

    it('Navigate inside selected range shift tab/enter or only tab/enter', () => {
        Utils.selectCell(200, 100);
        for (var i = 0; i < 2; i++) Utils.keyDown(Constants.keyCodes.ArrowDown, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, { shiftKey: true, force: true }, 50);
        // for (var i = 0; i < 6; i++) Utils.keyDown(Constants.keyCodes.Tab, { force: true });
        // for (var i = 0; i < 6; i++) Utils.keyDown(Constants.keyCodes.Tab, { shiftKey: true, force: true });
        // for (var i = 0; i < 6; i++) Utils.keyDown(Constants.keyCodes.Enter, { force: true });
        // for (var i = 0; i < 6; i++) Utils.keyDown(Constants.keyCodes.Enter, { shiftKey: true, force: true });
        Utils.selectCell(500, 200, { ctrlKey: true });
        for (var i = 0; i < 2; i++) Utils.keyDown(Constants.keyCodes.ArrowDown, { shiftKey: true, force: true }, 50);
        Utils.keyDown(Constants.keyCodes.ArrowRight, { shiftKey: true, force: true }, 50);
        Utils.selectCell(200, 500, { ctrlKey: true });
        for (var i = 0; i < 2; i++) Utils.keyDown(Constants.keyCodes.ArrowDown, { shiftKey: true, force: true }, 50);
        Utils.keyDown(Constants.keyCodes.ArrowRight, { shiftKey: true, force: true }, 50);
        for (var i = 0; i < 18; i++) Utils.keyDown(Constants.keyCodes.Tab, { force: true }, 50);
        for (var i = 0; i < 18; i++) Utils.keyDown(Constants.keyCodes.Tab, { shiftKey: true, force: true }, 50);
        for (var i = 0; i < 18; i++) Utils.keyDown(Constants.keyCodes.Enter, { force: true }, 50);
        for (var i = 0; i < 18; i++) Utils.keyDown(Constants.keyCodes.Enter, { shiftKey: true, force: true }, 50);
    });


    it('Enter key pressed should activate cell edit mode ', () => {
        Utils.selectCell(200, 100);
        cy.wait(500);
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
    });

    it('Delete key pressed should delete data from the cell ', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
        cy.focused().type(Utils.randomText(), { force: true });
        Utils.selectCell(200, 200);
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Delete, { force: true });
    });

    it('Backspace key pressed should delete data from the cell', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
        cy.focused().type(Utils.randomText(), { force: true });
        Utils.selectCell(200, 200);
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Backspace, { force: true });
    });

    it('Tab key pressed should exit from cell edit mode and move to next column ', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
        Utils.keyDown(Constants.keyCodes.Tab, { force: true });
    });

    it('Enter key pressed should exit from cell edit mode and move to next row', () => {
        Utils.selectCell(200, 100);
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
        Utils.keyDown(Constants.keyCodes.Enter, { force: true });
    });
});
