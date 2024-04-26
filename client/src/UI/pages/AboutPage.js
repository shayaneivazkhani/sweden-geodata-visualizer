import React from "react";

const AboutPage = () => {

    const body_style = {
        height: "90vh",
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
