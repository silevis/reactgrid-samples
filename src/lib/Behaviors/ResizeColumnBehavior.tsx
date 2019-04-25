import { Grid } from '../Components/Gridonents/Grid'
import { DelegateBehavior } from "./DelegateBehavior";
import { BasicGridBehavior } from './BasicGridBehavior'
import { DrawExternalFocusedLocationsBehavior } from './DrawExternalFocusedLocationsBehavior';
import { Column } from '../Common';

export class ResizeColumnBehavior extends DelegateBehavior {
    private moveHandler = this.handleMove.bind(this)
    private mouseUpAndTouchEndHandler = this.handleMouseUpAndTouchEnd.bind(this)
    private minColumnWidth: number = 40
    private frozenColumnsWidth: number

    constructor(grid: Grid, private resizedColumn: Column, event: any) {
        super(new DrawExternalFocusedLocationsBehavior(new BasicGridBehavior(grid)))
        // doesn't seem like a best way to do that...
        this.frozenColumnsWidth = grid.props.cellMatrix.frozenLeftRange.width;

        this.grid.setState({ linePosition: resizedColumn.left + resizedColumn.width + this.frozenColumnsWidth, lineOrientation: 'vertical' })

        if (event.type === 'mousedown') {
            window.addEventListener('mousemove', this.moveHandler)
            window.addEventListener('mouseup', this.mouseUpAndTouchEndHandler)
        } else if (event.type === 'touchstart') {
            window.addEventListener('touchmove', this.moveHandler)
            window.addEventListener('touchend', this.mouseUpAndTouchEndHandler)
        }
    }

    handleMove(event: any) {
        const positionX = event.type === 'mousemove' ? event.clientX : event.type === 'touchmove' ? event.changedTouches[0].clientX : null
        if ((positionX) >= this.grid.gridElement.clientWidth - this.grid.props.cellMatrix.frozenRightRange.width) {
            this.grid.setState({ linePosition: positionX, lineOrientation: 'vertical' })
        } else {
            const mousePosition = (positionX + this.grid.gridElement.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
                positionX + this.grid.gridElement.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth
            this.grid.setState({ linePosition: mousePosition, lineOrientation: 'vertical' })
        }
    }

    private handleMouseUpAndTouchEnd(event: any) {
        const positionX = event.type === 'mouseup' ? event.clientX : event.type === 'touchend' ? event.changedTouches[0].clientX : null
        const mousePosition = (positionX + this.grid.gridElement.scrollLeft > (this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth)) ?
            positionX + this.grid.gridElement.scrollLeft : this.resizedColumn.left + this.minColumnWidth + this.frozenColumnsWidth;
        const newWidth = mousePosition - this.resizedColumn.left - this.frozenColumnsWidth;
        this.grid.resetToDefaultBehavior()
        this.grid.setState({ linePosition: undefined })
        if (this.resizedColumn.onColResize) {
            this.resizedColumn.onColResize(this.resizedColumn, newWidth)
        }
        this.grid.commitChanges()
        if (event.type === 'mouseup') {
            window.removeEventListener('mousemove', this.moveHandler)
            window.removeEventListener('mouseup', this.mouseUpAndTouchEndHandler)
        } else if (event.type === 'touchend') {
            window.removeEventListener('touchmove', this.moveHandler)
            window.removeEventListener('touchend', this.mouseUpAndTouchEndHandler)
        }
    }
}