focusLocation(location: Location, resetSelection = true) {
    const cellMatrix = this.props.cellMatrix;
    const cell = cellMatrix.getCell(location);
    const isReadOnly = cell.isReadOnly;
    this.scrollIntoView(location);
    // cell.onFocusChanged(location);
    if (resetSelection) {
        this.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            isFocusedCellReadOnly: isReadOnly,
            selectedRanges: [cellMatrix.getRange(location, location)]
        });
    } else {
        this.setState({
            focusedLocation: location,
            isFocusedCellInEditMode: false,
            isFocusedCellReadOnly: isReadOnly
        });
    }
}