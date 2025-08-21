import './App.css'
import { useRef, useState } from 'react'
import { TopNav } from './TopNav.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Blogspace from './Blogspace.jsx'
import EscapeTheLabWrapper from './EscapeTheLabWrapper.jsx'
import Impressum from './Impressum.jsx'
import Datenschutz from './Datenschutz.jsx'
import { useBugScreen } from './hooks/useBugScreen.js';

function App() {
    const [lastPress, setLastPress] = useState(null);
    const [lastRelease, setLastRelease] = useState(null);
    const bugRef = useRef(null);
    const screenRef = useRef(null);
    const lastPressRef = useRef(null);

    useBugScreen(lastPress, setLastPress, lastRelease, setLastRelease, bugRef, screenRef, lastPressRef);

    return (
        <>
            <div className="layer0" id="layer0" ref={screenRef}></div>
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
