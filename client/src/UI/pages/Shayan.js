import React from "react";

import "../styles/pageStyles/Shayan.css";

const Shayan = () => {
    
    const body_style = {
        height: "90vh",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <div className="shayan_main">
                    <h2>Shayan Page</h2>
                    <a href="/">Main Page</a>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Shayan;
