import React from "react";

const Footer = () => {
    const footerStyle = {
        height: "80px",
        width: "100%",
        paddingTop: "5px",
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

export default Footer;
