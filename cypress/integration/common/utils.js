class Utils {
    visit() {
        cy.visit('http://localhost:3000/');
    }

    selectCell(clientX, clientY, customEventArgs) {
        if (customEventArgs != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('pointerdown', clientX, clientY, customEventArgs);
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('pointerdown', clientX, clientY);
        }
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(100);
    }

    selectCellInEditMode(clientX, clientY) {
        cy.get('[data-cy=dyna-grid]').trigger('dblclick', clientX, clientY);
    }

    randomText() {
        return Math.random()
            .toString(36)
            .substring(7);
    }

    selectRange(fromX, fromY, toX, toY, customEventArgs) {
        if (customEventArgs != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('pointerdown', fromX, fromY, customEventArgs);
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('pointerdown', fromX, fromY);
        }

        cy.get('[data-cy=dyna-grid]').trigger('pointermove', toX, toY);
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(100);
    }

    selectCellByTouch(clientX, clientY) {
        cy.get('[data-cy=dyna-grid]').click(clientX, clientY, { clientX: clientX, clientY: clientY });
    }

    selectRangeByTouch(fromX, fromY, toX, toY, autoScroll = false) {
        cy.get('[data-cy=dyna-grid]').click(fromX, fromY, { clientX: fromX, clientY: fromY, force: true });
        cy.get('[data-cy=dyna-grid]').trigger('touchstart', fromX, fromY, {
            changedTouches: [{ clientX: fromX, clientY: fromY + 100 }]
        });
        cy.get('[data-cy=dyna-grid]').trigger('touchmove', toX, toY, {
            changedTouches: [{ clientX: toX, clientY: toY + 100 }],
            force: true
        });
        if (!autoScroll) {
            cy.get('body').trigger('touchend');
        }
    }

    fillCells(toX, toY) {
        cy.get('[data-cy=dg-fill-handle]').trigger('pointerdown', { force: true });
        cy.get('[data-cy=dyna-grid]').trigger('pointermove', { clientX: toX, clientY: toY, force: true });
        cy.get('[data-cy=dyna-grid]').trigger('pointerup', { force: true });
        cy.wait(100);
    }

    fillCellsByTouch(fromX, fromY, toX, toY, type, autoScroll = false) {
        if (type === 'cell') {
            this.selectCellByTouch(fromX, fromY);
        } else if (type === 'range') {
            this.selectRangeByTouch(500, 135, 500, 200);
        }
        cy.get('[data-cy=touch-fill-handle]').trigger('touchstart', { force: true });
        cy.wait(200);
        cy.get('[data-cy=dyna-grid]').trigger('touchmove', toX, toY, {
            changedTouches: [{ clientX: toX, clientY: toY + 100 }],
            force: true
        });
        cy.wait(200);
        if (!autoScroll) {
            cy.get('[data-cy=touch-fill-handle]').trigger('touchend');
        }
    }

    resizeColumnByTouch(index, offset) {
        cy.get('[data-cy=touch-resize-button]')
            .eq(index)
            .then(element => {
                const x = element[0].getBoundingClientRect().x;
                const y = element[0].getBoundingClientRect().y;
                const endOffset =
                    offset < 0
                        ? element[0].parentElement.getBoundingClientRect().width - -offset < 40
                            ? -offset
                            : offset
                        : offset;

                cy.get('[data-cy=touch-resize-button]')
                    .eq(index)
                    .trigger('touchstart', x, y, { changedTouches: [{ clientX: x, clientY: y }], force: true });
                cy.get('body').trigger('touchmove', x + endOffset, y, {
                    changedTouches: [{ clientX: x + endOffset, clientY: y }]
                });
                cy.get('[data-cy=touch-resize-button]')
                    .eq(index)
                    .trigger('touchend', x + endOffset, y, {
                        changedTouches: [{ clientX: x + endOffset, clientY: y }],
                        force: true
                    });
                cy.get('[data-cy=touch-resize-button]')
                    .eq(index)
                    .trigger('touchend');
            });
    }

    typeTextByTouch(x, y) {
        this.selectCellByTouch(x, y);
        this.selectCellInEditMode(x, y);
        cy.focused().clear();
        cy.focused().type(this.randomText());
        cy.focused().blur();
    }

    openContextMenu(clientX, clientY, optionValue) {
        if (optionValue != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
            cy.wait(300);
            cy.get('.context-menu-option')
                .contains(optionValue)
                .click();
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
        }
    }

    openContextMenu(clientX, clientY, optionValue) {
        if (optionValue != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
            cy.wait(300);
            cy.get('.context-menu-option')
                .contains(optionValue)
                .click();
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
        }
    }

    openContextMenu(clientX, clientY, optionValue) {
        if (optionValue != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
            cy.wait(300);
            cy.get('.context-menu-option')
                .contains(optionValue)
                .click();
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
        }
    }

    openContextMenu(clientX, clientY, optionValue) {
        if (optionValue != undefined) {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
            cy.wait(300);
            cy.get('.context-menu-option')
                .contains(optionValue)
                .click();
        } else {
            cy.get('[data-cy=dyna-grid]').trigger('contextmenu', { clientX: clientX, clientY: clientY });
        }
    }

    keyDown(keyCode, times = 1, customEventArgs) {
        while (times > 0) {
            if (customEventArgs != undefined) {
                cy.get('[data-cy=dyna-grid]').trigger(
                    'keydown',
                    Object.assign({}, { keyCode: keyCode }, customEventArgs)
                );
            } else {
                cy.get('[data-cy=dyna-grid]').trigger('keydown', { keyCode: keyCode });
            }
            times--;
        }
        cy.get('[data-cy=dyna-grid]').trigger('keyup', { force: true })
    }
}
var utils = new Utils();
module.exports = utils;
