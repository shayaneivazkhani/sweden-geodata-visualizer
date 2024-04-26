import React from "react";

import "../styles/pageStyles/EkologisktPage.css";

const Ekologiskt = () => {
    const body_style = {
        height: "90vh",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <h2>Ekologiskt Page</h2>
                <a href="/">Main Page</a>
            </div>
        </React.Fragment>
    );
};

export default Ekologiskt;
