export function locateContactPoint(e, rect) {
    function getClientXY(event) {
        if (event.touches && event.touches.length > 0) {
            return { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
        if (event.changedTouches && event.changedTouches.length > 0) {
            return { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
        }
        return { x: event.clientX, y: event.clientY };
    }

    const { x, y } = getClientXY(e);
    const xPx = x - rect.left;
    const yPx = y - rect.top;
    const xRelative = +(xPx / rect.width).toFixed(5);
    const yRelative = +(yPx / rect.height).toFixed(5);
    return { xPx, yPx, xRelative, yRelative };
}