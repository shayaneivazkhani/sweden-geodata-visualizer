import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import SelectFetch from "../page_specific_components/LivsmedelPage_components/Select_fetch";

import "../styles/pageStyles/LivsmedelPage.css";

const Livsmedel = () => {
    
    const TextTypography = styled(Typography)(() => ({
        color: "var(--mainPage--textColor1)",
        fontFamily: "var(--mainpage--content2-font1)",
        fontSize: "clamp(15px, 2.5vw, 60px)",
        fontWeight: 400,
        textAlign: "center",
    }));

    const body_style = {
        height: "100%",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <TextTypography>Livsmedel Page</TextTypography>
                <div>
                    <SelectFetch />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Livsmedel;
