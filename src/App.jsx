import './App.css'
import { TopNav } from './TopNav.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import Blogspace from './Blogspace.jsx'
import Impressum from './Impressum.jsx'
import Datenschutz from './Datenschutz.jsx'

function App() {
    return (
        <>
            <TopNav />
            <p className="subtle-text">
            </p>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogspace" element={<Blogspace />} />
                <Route path="/impressum" element={<Impressum />} />
                <Route path="/datenschutz" element={<Datenschutz />} />
            </Routes>
        </>
    )
}

export default App
