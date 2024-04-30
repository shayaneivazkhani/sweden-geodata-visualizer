import React, { useRef, useEffect } from 'react';

import "../styles/pageStyles/Shayan.css";

const Shayan = () => {
    
    const body_style = {
        height: "100%",
    };
    const animation_style = {
        marginLeft: "50px",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <div className="shayan_main">
                    <h2>Shayan Page</h2>  
                </div>
                <div className="shayan_main">
                    <h2>Lololo</h2>  
                </div>
            </div>
        </React.Fragment>
    );
};

export default Shayan;
