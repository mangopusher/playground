import './App.css'
import { useEffect, useRef, useState } from 'react'
import { TopNav } from './TopNav.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Blogspace from './Blogspace.jsx'
import EscapeTheLabWrapper from './EscapeTheLabWrapper.jsx'
import Impressum from './Impressum.jsx'
import Datenschutz from './Datenschutz.jsx'
import { createBug } from './bugUtils/createBug.js'

function App() {
    const [lastClick, setLastClick] = useState(null);
    const [lastMouseUp, setLastMouseUp] = useState(null);
    const bugRef = useRef(null);

    useEffect(() => {
        const screen = document.getElementById('layer0');
        if (!screen) return;

        function moveBugTo(xPx, yPx) {
            let bug = bugRef.current;

            // Create bug if it doesn't exist
            if (!bug) {
                bug = createBug(xPx, yPx);
                screen.appendChild(bug);
                bugRef.current = bug;
            } else {
                // Animate movement to new position
                bug.style.transition = 'left 0.7s cubic-bezier(.4,2,.6,1), top 0.7s cubic-bezier(.4,2,.6,1)';
                bug.style.left = `${xPx}px`;
                bug.style.top = `${yPx}px`;
            }
        }

        function handleGlobalClick(e) {
            // Get click position relative to the screen
            
            const rect = screen.getBoundingClientRect();
            const xPx = e.clientX - rect.left;
            const yPx = e.clientY - rect.top;
            const xPercent = ((xPx / rect.width) * 100).toFixed(2) + '%';
            const yPercent = ((yPx / rect.height) * 100).toFixed(2) + '%';

            setLastClick({
                x: xPercent,
                y: yPercent,
                triggeredEvents: 'ButtonEvent'
            });

            moveBugTo(xPx, yPx);
        }

        function handleGlobalMouseUp(e) {
            const rect = screen.getBoundingClientRect();
            const xPx = e.clientX - rect.left;
            const yPx = e.clientY - rect.top;
            const xPercent = ((xPx / rect.width) * 100).toFixed(2) + '%';
            const yPercent = ((yPx / rect.height) * 100).toFixed(2) + '%';

            setLastMouseUp({
                x: xPercent,
                y: yPercent,
                triggeredEvents: 'ButtonEvent'
            });
        }

        window.addEventListener('mousedown', handleGlobalClick);
        window.addEventListener('mouseup', handleGlobalMouseUp);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('mousedown', handleGlobalClick);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
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
                {lastClick && (
                    <div style={{ fontSize: "0.9em", color: "#888", marginTop: "1em" }}>
                        Last click: x={lastClick.x}, y={lastClick.y}, triggeredEvents={lastClick.triggeredEvents}
                    </div>
                )}
                {lastMouseUp && (
                    <div style={{ fontSize: "0.9em", color: "#888", marginTop: "0.5em" }}>
                        Last mouseUp: x={lastMouseUp.x}, y={lastMouseUp.y}, triggeredEvents={lastMouseUp.triggeredEvents}
                    </div>
                )}
            </div>  
        </>
    )
}

export default App
