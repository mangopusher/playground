import './App.css'
import { useEffect, useRef, useState } from 'react'
import { TopNav } from './TopNav.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Blogspace from './Blogspace.jsx'
import EscapeTheLabWrapper from './EscapeTheLabWrapper.jsx'
import Impressum from './Impressum.jsx'
import Datenschutz from './Datenschutz.jsx'
import { createBug } from './utils/createBug.js'
import { moveBug } from './utils/moveBug.js'
import { locateContactPoint } from './utils/locateContactPoint.js'

function App() {
    const [lastPress, setLastPress] = useState(null);
    const [lastRelease, setLastRelease] = useState(null);
    const bugRef = useRef(null);

    useEffect(() => {
        const screen = document.getElementById('layer0');
        if (!screen) return;

        function handlePress(e) {
            const rect = screen.getBoundingClientRect();

            const { xPx, yPx, xRelative, yRelative } = locateContactPoint(e, rect);
            setLastPress({
                x: xRelative,
                y: yRelative,
                triggeredEvents: e.type
            });
            let bug = bugRef.current;

            // Create bug if it doesn't exist
            if (!bug) {
                bug = createBug(xPx, yPx);
                screen.appendChild(bug);
                bugRef.current = bug;
            } else {
                moveBug(bug, xPx, yPx);
            }        
        }

        function handleRelease(e) {
            const rect = screen.getBoundingClientRect();

            const { xRelative, yRelative } = locateContactPoint(e, rect);
            setLastRelease({
                x: xRelative,
                y: yRelative,
                triggeredEvents: e.type 
            });
        }

        window.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });

        screen.addEventListener('mousedown', handlePress);
        screen.addEventListener('mouseup', handleRelease);
        screen.addEventListener('touchstart', handlePress);
        screen.addEventListener('touchend', handleRelease);

        // Cleanup on unmount
        return () => {
            screen.removeEventListener('mousedown', handlePress);
            screen.removeEventListener('mouseup', handleRelease);
            screen.removeEventListener('touchstart', handlePress);
            screen.removeEventListener('touchend', handleRelease);
            if (bugRef.current) {
                screen.removeChild(bugRef.current);
                bugRef.current = null;
            }
            screen.innerHTML = '';
        };
    }, []);

    return (
        <>
            <div className="layer0" id="layer0"></div>
            <div className="content-container">
                <TopNav />
                <p className="subtle-text"></p>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogspace" element={<Blogspace />} />
                    <Route path="/escape-the-lab" element={<EscapeTheLabWrapper />} />
                    <Route path="/impressum" element={<Impressum />} />
                    <Route path="/datenschutz" element={<Datenschutz />} />
                </Routes>
                {/* Debug output for last click */}
                {lastPress && (
                    <div style={{ fontSize: "0.9em", color: "#888", marginTop: "1em" }}>
                        Last press: x={lastPress.x}, y={lastPress.y}, triggeredEvent={lastPress.triggeredEvents}
                    </div>
                )}
                {lastRelease && (
                    <div style={{ fontSize: "0.9em", color: "#888", marginTop: "0.5em" }}>
                        Last release: x={lastRelease.x}, y={lastRelease.y}, triggeredEvent={lastRelease.triggeredEvents}
                    </div>
                )}
            </div>  
        </>
    )
}

export default App
