/**
 * Converts a relative coordinate (0..1) to absolute pixel value based on a DOMRect.
 * @param {DOMRect} rect - The bounding client rect of the element.
 * @param {number} xRelative - The relative x coordinate (0..1, up to 5 digits).
 * @param {number} yRelative - The relative y coordinate (0..1, up to 5 digits).
 * @returns {{ xPx: number, yPx: number }}
 */
export function relativeToPx(rect, xRelative, yRelative) {
    const x = rect.left + rect.width * xRelative;
    const y = rect.top + rect.height * yRelative;
    return { x, y };
}