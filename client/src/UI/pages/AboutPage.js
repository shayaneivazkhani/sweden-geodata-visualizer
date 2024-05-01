import React from "react";

const AboutPage = () => {

    const body_style = {
        //minHeight: `calc(${window.innerHeight}px - 75px)`,
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>About Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default AboutPage;
