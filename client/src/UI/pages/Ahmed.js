import React from "react";

const Ahmed = () => {

    const body_style = {
        //minHeight: `calc(${window.innerHeight}px - 231px)`,
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>Ahmed Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default Ahmed;
