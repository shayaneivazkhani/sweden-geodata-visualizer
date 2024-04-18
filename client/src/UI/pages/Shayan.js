import React from 'react'

import Header from "../general_components/Header_NavBar/HeaderBar";
import Footer from '../general_components/Header_NavBar/Footer';

import "../styles/pageStyles/Shayan.css";

const Shayan = () => {

    const body_style = {
        
    };

    return (
        <React.Fragment>
            <div>
                <Header />
            </div>
            <div className='shayan_main' style={body_style}>
                <h2>Shayan Page</h2>
                <a href="/">Main Page</a>
            </div>
            <div>
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Shayan;