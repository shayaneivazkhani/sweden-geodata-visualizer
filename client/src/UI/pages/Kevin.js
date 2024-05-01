import React from "react";

const Kevin = () => {
    
    const body_style = {
        //minHeight: `calc(${window.innerHeight}px - 231px)`,
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>Kevin Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default Kevin;
