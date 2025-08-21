export function createBug(xPx, yPx) {
    const bug = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const size = 40;

    bug.setAttribute('width', `${size}px`);
    bug.setAttribute('height', `${size}px`);
    bug.style.position = 'absolute';
    bug.style.left = `${xPx}px`;
    bug.style.top = `${yPx}px`;

    // Use the arrow SVG as an <image> inside the SVG
    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/images/arrow.svg');
    img.setAttribute('width', `${size}px`);
    img.setAttribute('height', `${size}px`);
    bug.appendChild(img);

    return bug;
}