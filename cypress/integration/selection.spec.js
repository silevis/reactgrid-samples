// <reference types="Cypress" />
const Utils = require('./common/utils');
const Constants = require('./common/constants');
context('Selection', () => {
    beforeEach(() => {
        Utils.visit();
    });

    it('Select one cell in click (without ctrl key)', () => {
        Utils.selectCell(150, 150);
        Utils.selectCell(150, 250);
        Utils.selectCell(250, 150);
        Utils.selectCell(350, 350);
        Utils.selectCell(500, 150);
        Utils.selectCell(150, 150);
    });

    it('Select many cell in many direction by pointermove move (up/down/right/left)', () => {
        Utils.selectRange(350, 300, 550, 100);
        Utils.selectRange(350, 300, 550, 500);
        Utils.selectRange(350, 300, 150, 500);
        Utils.selectRange(350, 300, 150, 100);
    });

    it('Select many ranges with ctrl', () => {
        Utils.selectRange(350, 300, 550, 100, { ctrlKey: true });
        Utils.selectRange(450, 400, 650, 500, { ctrlKey: true });
        Utils.selectRange(250, 400, 150, 100, { ctrlKey: true });
    });

    it('Select one column', () => {
        Utils.selectCell(100, 10);
        Utils.selectCell(500, 10);
        Utils.selectCell(700, 10);
    });

    it('Select columns with ctrl', () => {
        Utils.selectCell(100, 10);
        Utils.selectCell(500, 10, { ctrlKey: true });
        Utils.selectCell(700, 10, { ctrlKey: true });
    });

    it('Select many colums', () => {
        Utils.selectRange(100, 10, 500, 10);
    });

    it('Select one row', () => {
        Utils.selectCell(10, 50);
        Utils.selectCell(10, 200);
        Utils.selectCell(10, 500);
    });

    it('Select rows with ctrl', () => {
        Utils.selectCell(10, 50);
        Utils.selectCell(10, 200, { ctrlKey: true });
        Utils.selectCell(10, 500, { ctrlKey: true });
    });

    it('Select many rows', () => {
        Utils.selectRange(10, 50, 10, 500);
    });

    it('Select many one cell ranges, ctrl key pressed', () => {
        Utils.selectCell(500, 100);
        Utils.selectCell(500, 200, { ctrlKey: true });
        Utils.selectCell(100, 140, { ctrlKey: true });
        Utils.selectCell(800, 140, { ctrlKey: true });
    });

    it('Select one range, selection range should be changed, shift key pressed', () => {
        Utils.selectCell(500, 100);
        Utils.selectCell(100, 140, { shiftKey: true });
        Utils.selectCell(500, 300, { shiftKey: true });
        Utils.selectCell(800, 140, { shiftKey: true });
    });

    it('Select many one cell ranges, shift key pressed', () => {
        Utils.selectCell(500, 100);

        Utils.selectCell(500, 300, { ctrlKey: true });
        Utils.selectCell(800, 140, { shiftKey: true });
        Utils.selectCell(800, 330, { ctrlKey: true });
        Utils.selectCell(600, 500, { shiftKey: true });
    });

    it('Select many cell by shift + arrow press', () => {
        Utils.selectCell(500, 100);
        Utils.keyDown(Constants.keyCodes.ArrowDown, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowDown, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowUp, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowUp, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowUp, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowLeft, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 1, { shiftKey: true, force: true });
        Utils.keyDown(Constants.keyCodes.ArrowRight, 1, { shiftKey: true, force: true });
    });
});
