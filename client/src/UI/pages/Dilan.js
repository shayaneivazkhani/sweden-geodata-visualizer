import React from "react";

const Dilan = () => {
    
    const body_style = {
        //minHeight: `calc(${window.innerHeight}px - 231px)`,
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>Dilan Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default Dilan;
