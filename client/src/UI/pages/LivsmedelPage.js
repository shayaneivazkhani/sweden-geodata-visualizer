import React from "react";

import Header from "../general_components/Header_NavBar/HeaderBar";
import Footer from "../general_components/Header_NavBar/Footer";

//import SelectAttributesBox from "../page_specific_components/LivsmedelPage_components/Select_attributes_box";
import SelectFetch from "../page_specific_components/LivsmedelPage_components/Select_fetch";

import "../styles/pageStyles/LivsmedelPage.css";

const Livsmedel = () => {
    const topFixedStyle = {
        width: "100%",
        position: "fixed",
        zIndex: "1",
    };

    const scrollableStyle = {
        paddingTop: "85px",
        zIndex: 0,
    };

    const body_style = {
        width: "100%",
        height: "100vh",
    };

    return (
        <React.Fragment>
            <div style={topFixedStyle}>
                <Header />
            </div>
            <div style={scrollableStyle}>
                <div style={body_style}>
                    <h2>Livsmedel Page</h2>
                    <a href="/">Main Page</a>
                    <div>
                        <SelectFetch />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Livsmedel;
