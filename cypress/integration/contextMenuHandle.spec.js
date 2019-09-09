// <reference types="Cypress" />
const Utils = require('./common/utils');

context('Context menu', () => {
  beforeEach(() => {
    Utils.visit();
  });

  it('Open context menu', () => {
    Utils.openContextMenu(200, 200)
  });

  it('Delete rows', () => {
    Utils.selectRange(200, 100, 200, 300)
    Utils.openContextMenu(200, 200, 'Delete row')
  });

  it('Delete columns', () => {
    Utils.selectRange(200, 100, 500, 100)
    Utils.openContextMenu(300, 100, 'Delete column')
  });

  it('Pin column to left', () => {
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the left');
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the left');
    Utils.selectCell(400, 10);
  })

  it('Pin column to right', () => {
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the right');
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the right');
    Utils.selectCell(400, 10);
  })

  it('Pin row to top', () => {
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the top');
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the top');
    Utils.selectCell(100, 200);
  })

  it('Pin row to bottom', () => {
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the bottom');
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the bottom');
    Utils.selectCell(100, 200);
  })

  it('Pin row/columns to top/right/bottom/left and unpin', () => {
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the top');
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the top');
    Utils.selectCell(100, 200);

    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the right');
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the right');
    Utils.selectCell(400, 10);

    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the bottom');
    Utils.selectCell(100, 200);
    Utils.openContextMenu(100, 200, 'Pin row to the bottom');
    Utils.selectCell(100, 200);

    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the left');
    Utils.selectCell(300, 10);
    Utils.openContextMenu(300, 10, 'Pin column to the left');
    Utils.selectCell(400, 300);

    Utils.selectCell(100, 40);
    Utils.openContextMenu(100, 40, 'Unpin row(s)');

    Utils.selectCell(200, 10);
    Utils.openContextMenu(200, 10, 'Unpin column(s)');
  })
});
