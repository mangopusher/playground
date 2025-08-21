import { useEffect } from 'react';
import { createBug } from '../utils/createBug.js';
import { shootArrow, spawnArrow, moveBug, moveBugPartially as moveBugLinear } from '../utils/bugMovements.js';
import { relativeToPx } from '../utils/relativeToPx.js';
import { locateContactPoint } from '../utils/locateContactPoint.js';

export function useBugScreen(lastPress, setLastPress, lastRelease, setLastRelease, bugRef, screenRef, lastPressRef) {
    useEffect(() => {
        const screen = screenRef.current;
        if (!screen) return;

        function handlePress(e) {
            const rect = screen.getBoundingClientRect();
            const { xPx, yPx, xRelative, yRelative } = locateContactPoint(e, rect);
            const pressData = { x: xRelative, y: yRelative, triggeredEvents: e.type };
            setLastPress(pressData);
            lastPressRef.current = pressData; // <-- update ref immediately
            // Do not move the bug yet, just record the press
            let bug = bugRef.current;
            if (!bug) {
                // Create the bug at the press position
                bug = createBug(xPx, yPx);
                screen.appendChild(bug);
                bugRef.current = bug;
            } else {
                spawnArrow(bug, xPx, yPx);
            }
        }

        function handleRelease(e) {
            const rect = screen.getBoundingClientRect();
            const { xPx, yPx, xRelative, yRelative } = locateContactPoint(e, rect);
            const pressPosition = relativeToPx(rect, lastPressRef.x, lastPressRef.y);
            console.log(lastPressRef.current.x, xRelative);

            const vector = {x: lastPressRef.current.x - xRelative, y: lastPressRef.current.y - yRelative};
            console.log(vector);

            setLastRelease({ x: xRelative, y: yRelative, triggeredEvents: e.type });
            let bug = bugRef.current;
            const press = lastPressRef.current; 
            if (bug && press) {
                // Parse bug's current position into px (relative to the screen)
                const bugRect = bug.getBoundingClientRect();
                const bugX = bug.offsetLeft;
                const bugY = bug.offsetTop;

                // Calculate the movement vector from press to release
                const start = relativeToPx(rect, press.x, press.y);
                const midX = (bugX + xPx) * 0.5;
                const midY = (bugY + yPx) * 0.5;
                const dy = yPx - start.yPx;
                // moveBugLinear(bug, xPx, yPx);
                shootArrow(bug, start, vector);
            }
        }

        window.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
        window.addEventListener('mousedown', handlePress);
        window.addEventListener('mouseup', handleRelease);
        window.addEventListener('touchstart', handlePress);
        window.addEventListener('touchend', handleRelease);

        return () => {
            window.removeEventListener('mousedown', handlePress);
            window.removeEventListener('mouseup', handleRelease);
            window.removeEventListener('touchstart', handlePress);
            window.removeEventListener('touchend', handleRelease);
            if (bugRef.current) {
                screen.removeChild(bugRef.current);
                bugRef.current = null;
            }
        };
    }, [setLastPress, setLastRelease, bugRef, screenRef, lastPressRef]);
}