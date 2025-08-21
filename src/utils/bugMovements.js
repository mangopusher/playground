export function moveBug(bug, x, y) {
    bug.style.transition = 'left 0.7s cubic-bezier(.4,2,.6,1), top 0.7s cubic-bezier(.4,2,.6,1)';
    bug.style.left = `${x}px`;
    bug.style.top = `${y}px`;
}

export function spawnArrow(arrow, x, y) {
    arrow.style.left = `${x}px`;
    arrow.style.top = `${y}px`;
}

export function moveBugPartially(bug, xPx, yPx) {
    const midX = (bug.offsetLeft + xPx) * 0.5;
    const midY = (bug.offsetTop + yPx) * 0.5;
    bug.style.transition = 'left 0.7s ease-in-out, top 0.7s ease-in-out';
    bug.style.left = `${midX}px`;
    bug.style.top = `${midY}px`;

    setTimeout(() => {
        bug.style.transition = 'left 0.7s linear, top 0.7s linear';
        bug.style.left = `${xPx}px`;
        bug.style.top = `${yPx}px`;
    }, 700);
}

export function shootArrow(arrow, startPos, vector) {
    const frequency = 10;
    const gravity = 9.81;
    const renderTime = 0.8;

    // Calculate initial angle in degrees
    const initialAngle = Math.atan2(vector.y, vector.x) * (180 / Math.PI);
    arrow.style.transform = `rotate(${initialAngle}deg)`;

    let prevAngle = initialAngle;

    for (let step = 1; step < frequency; step++) {
        let nextPos = renderNextPos(startPos, step, vector, frequency, gravity);

        // Calculate velocity vector at this step for rotation
        let prevPos = step === 1 ? startPos : renderNextPos(startPos, step - 1, vector, frequency, gravity);
        const vx = nextPos.x - prevPos.x;
        const vy = nextPos.y - prevPos.y;
        let angle = Math.atan2(vy, vx) * (180 / Math.PI);

        console.log({angle});


        setTimeout(() => {
            arrow.style.transition = `left ${renderTime / frequency}s linear, top ${renderTime / frequency}s linear, transform 0.1s linear`;
            arrow.style.left = `${nextPos.x}px`;
            arrow.style.top = `${nextPos.y}px`;
            arrow.style.transform = `rotate(${angle}deg)`;
        }, ((renderTime * 1000) / frequency) * step);
    }
}

function renderNextPos(startPos, step, vector, frequency, gravity) {
    const impulse = 2000;
    console.log({startPos, step, vector, frequency, gravity})
    const x = startPos.x + ((step * impulse * vector.x) / frequency);
    const y = startPos.y + (step * (vector.y * impulse + (gravity * step))/ frequency);

    return {x, y};
}