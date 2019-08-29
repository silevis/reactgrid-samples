import * as React from "react";

export const ResizeHandle: React.FunctionComponent = () => {
    const [hover, setHover] = React.useState(false)
    return (
        <div
            className="dg-touch-resize-handle"
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
            style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 11,
                height: '100%',
                pointerEvents: 'auto',
                zIndex: 1
            }}
        >
            <div
                className="dg-resize-handle"
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
                style={{
                    width: 6,
                    height: '100%',
                    cursor: hover ? 'w-resize' : '',
                    background: hover ? '#3498db' : '',
                    position: 'absolute',
                    right: 0
                }}
            />
        </div>
    )
}
