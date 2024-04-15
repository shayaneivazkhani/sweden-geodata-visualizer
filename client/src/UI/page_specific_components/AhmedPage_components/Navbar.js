import React from "react";

import './NavBar.css';

/**
 * Gives navigation bar on top of webpage, 
 * can be easily added to any subpage by writing <Navbar />
 * Includes buttons (clickable text) that redirects to different subpages
 * @returns 
 */

const Navbar = () => {
    return (
        <div>
            <h1>Ahmed Page</h1>
            <a href="/" className="site_title">Meatball Madness</a>
        </div>
    );
}

/*
const Navbar = () => {
    return (
    <div>
        <h1>Navbar</h1>
        <a href="/" className="site_title">Meatball Madness</a>
        <ul>
            <li>
                <a href="/Counter">Counter</a>
            </li>
            <li>
                <a href="/Ahmed">Ahmed</a>
            </li>
        </ul>
        </div>
    );
}

*/

/*
const Navbar = () => {
    return (
        <div>
            <div className="nav">
                <input type="checkbox" id="nav-check" />
                <div className="nav-header"></div>
                <div className="nav-btn"></div>
                <label htmlFor="nav-check">
                    <span></span>
                    <span>b</span>
                    <span>c</span>
                </label>
            </div>
        </div>
    );
}
*/

/*
const Navbar = () => {
    return (
        <div className="nav">
            <form action="">
                <p>
                    <label for="selColor">What is your favorite color?     </label>

                    <select id="selColor">
                        <option value="#ff0000">Red</option>
                        <option value="#00ff00">Green</option>
                        <option value="#0000ff">Blue</option>
                        <option value="#00ffff">Cyan</option>
                        <option value="#ff00ff">Magenta</option>
                        <option value="#ffff00">Yellow</option>
                        <option value="#000000">Black</option>
                        <option value="#ffffff">White</option>
                    </select>
                </p>
            </form>  
        </div>
    );
}   
*/


/* The <a href="/Ahmed">Ahmed</a> line adds 
the actual route to the other subpage, can be modified
by changing href="/Chosenpage"*/

export default Navbar;