import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie";

import animationLaptopPeople from "./miniComponents/lotties/laptopPeople.json";
import SubpagesCardsLink from "./miniComponents/LinkToSubpagesCard.js";

import "./MainPage_Content1To8_styles/MainPage_content2.css";

const Content2 = () => {
    
    const bodyStyle = {
        width: "100%",
        borderBottom: "1px solid var(--doc-divider-horisontal-Color)" // Add a white border at the bottom
    };

    const animation = {
        loop: true,
        autoplay: true,
        animationData: animationLaptopPeople,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    const TextTypography = styled(Typography)(() => ({
        color: "var(--mainPage-Content2-textColor1)",
        fontFamily: "var(--mainpage--content2-font1)",
        fontSize: "clamp(15px, 1.5vw, 40px)",
        fontWeight: 400,
        textAlign: "left", 
    }));


    return (
        <React.Fragment>
            <div className="content2_main_outer_body" style={bodyStyle}>
                <div className="text_and_animation">
                    <div className="animationLaptopPeople">
                        <Lottie options={animation} height={220} width={220} />
                    </div>

                    <div className="text">
                        <TextTypography>
                            Each month, municipalities across Sweden submit
                            their food sales data <br></br>
                            to the Tendmills database. Our project involves
                            processing this data and <br></br>
                            extract useful information from it, organize it into
                            three distinct pages <br></br>
                            for easy navigation.
                        </TextTypography>
                    </div>
                </div>
                <div className="content2_main_inner_body">
                    <div className="links_to_subpages">
                        <SubpagesCardsLink />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};


export default Content2;
