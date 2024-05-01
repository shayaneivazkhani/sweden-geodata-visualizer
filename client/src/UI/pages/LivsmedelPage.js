import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import SelectFetch from "../page_specific_components/LivsmedelPage_components/Select_fetch";

import "../styles/pageStyles/LivsmedelPage.css";

const Livsmedel = () => {
    const TextTypography = styled(Typography)(() => ({
        color: "var(--mainPage--textColor1)",
        fontFamily: "var(--third-font)",
        fontSize: "clamp(15px, 2.5vw, 60px)",
        fontWeight: 400,
        textAlign: "center",
        paddingBottom: "100px",
    }));

    const body_style = {
        height: "100%",
        //minHeight: `calc(${window.innerHeight}px - 231px)`,
        paddingTop: "0px",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <TextTypography></TextTypography>
                {/* <TextTypography>Livsmedel Page</TextTypography> */}
                <div>
                    <SelectFetch />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Livsmedel;
