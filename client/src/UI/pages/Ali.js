import React from 'react';

import Header from "../general_components/Header_NavBar/HeaderBar";
import Footer from '../general_components/Header_NavBar/Footer';

const Ali = () => {

    const body_style = {
        width: "100%",
        height: "100vh",
    };

    return (
        <React.Fragment>
            <div>
                <Header />
            </div>
            <div style={body_style}>
                <h2>Ali Page</h2>
                <a href="/">Main Page</a>
            </div>
            <div>
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Ali;