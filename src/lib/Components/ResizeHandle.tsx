import * as React from "react";

export const ResizeHandle: React.FunctionComponent = () => {
    const [hover, setHover] = React.useState(false)
    return (
        <div
            style={{
                position: 'absolute',
                right: 0,
                width: 10,
                height: '100%',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
                style={{
                    width: 4,
                    height: '100%',
                    cursor: hover ? 'w-resize' : '',
                    background: hover ? '#3498db' : '',
                    position: 'absolute',
                    right: 0
                }}
            />
        </div>)
}
