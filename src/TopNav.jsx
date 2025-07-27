import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './TopNav.css';

export function TopNav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="topnav">
            <button
                className={`burger ${open ? 'open' : ''}`}
                onClick={() => setOpen(!open)}
                aria-label="Menü öffnen/schließen"
            >
                <span />
                <span />
                <span />
            </button>
            <div className={`nav-links ${open ? 'show' : ''}`}>
                <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/blogspace" onClick={() => setOpen(false)}>Blogspace</NavLink>
                <NavLink to="/impressum" onClick={() => setOpen(false)}>Impressum</NavLink>
                <NavLink to="/datenschutz" onClick={() => setOpen(false)}>Datenschutzerklärung</NavLink>
            </div>
        </nav>
    );
}