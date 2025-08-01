export function moveBug(bug, x, y) {
    bug.style.transition = 'left 0.7s cubic-bezier(.4,2,.6,1), top 0.7s cubic-bezier(.4,2,.6,1)';
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
}