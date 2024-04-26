import React from "react";

import "../styles/pageStyles/DealsPage.css";

const Deals = () => {
    const body_style = {
        height: "90vh",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>Deals Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default Deals;
