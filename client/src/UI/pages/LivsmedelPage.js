import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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
    };

    const TextTypography = styled(Typography)(() => ({
        color: "var(--mainPage-Content2-textColor1)",
        fontFamily: "var(--mainpage--content2-font1)",
        fontSize: "clamp(15px, 1.5vw, 40px)",
        fontWeight: 400,
        textAlign: "center",
    }));

    return (
        <React.Fragment>
            <div style={topFixedStyle}>
                <Header />
            </div>
            <div style={scrollableStyle}>
                <div style={body_style}>
                    <TextTypography>Livsmedel Page</TextTypography>
                    <div>
                        <SelectFetch />
                    </div> 
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Livsmedel;
