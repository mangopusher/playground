export function createBug(xPx, yPx) {
    const bug = document.createElement('div');
    bug.className = 'bug';
    const size = Math.random() * 4 + 8;

    bug.style.width = `${size}px`;
    bug.style.height = `${size}px`;
    bug.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    bug.style.position = 'absolute';
    bug.style.left = `${xPx}px`;
    bug.style.top = `${yPx}px`;
    return bug;
}