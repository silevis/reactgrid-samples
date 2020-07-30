export var columns = function (reorderable, resizable) { return [
    { columnId: 'id', reorderable: reorderable, resizable: resizable, width: 250 },
    { columnId: 'branchName', reorderable: reorderable, resizable: resizable, width: 150 },
    { columnId: 'commitHash', reorderable: reorderable, resizable: resizable, width: 400 },
    { columnId: 'added', reorderable: reorderable, resizable: resizable, width: 100 },
    { columnId: 'removed', reorderable: reorderable, resizable: resizable, width: 100 },
    { columnId: 'author', reorderable: reorderable, resizable: resizable, width: 150 },
    { columnId: 'date', reorderable: reorderable, resizable: resizable, width: 100 },
]; };
