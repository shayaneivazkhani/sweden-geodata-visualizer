import React from "react";
import {  memo } from "react";

const Footer = () => {
    const footerStyle = {
        height: "75px",
        width: "100%",
        backgroundColor: "var(--header-NavBar-Color)",
        borderTop: "1px solid var(--doc-divider-horisontal-Color)",
        boxShadow: "0 3px 20px 0 rgba(162,155,254,0.68)",
    };

    return (
        <React.Fragment>
            <div className="content5_body" style={footerStyle}></div>
        </React.Fragment>
    );
};

export default memo(Footer);