import React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie";

import animationLaptopPeople from "./miniComponents/lotties/laptopPeople.json";
import SubpagesCardsLink from "./miniComponents/LinkToSubpagesCard.js";

import "./MainPage_Content1To8_styles/MainPage_content2.css";

const Content2 = () => {
    
    const bodyStyle = {
    };

    const animation = {
        loop: true,
        autoplay: true,
        animationData: animationLaptopPeople,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };


    const TextTypographyStyle = {
        color: "var(--mainPage-Content2-textColor1)",
        fontFamily: "var(--mainpage--content2-font1)",
        fontSize: "var(--mainpage--content23--font--size)",
        textAlign: "left", 
    };


    return (
        <React.Fragment>
            <div className="content2_main_outer_body" style={bodyStyle}>
                <div className="text_and_animation">
                    <div className="animationLaptopPeople">
                        <Lottie options={animation} height={220} width={220} />
                    </div>

                    <div className="text" style={TextTypographyStyle}>
                            Each month, municipalities across Sweden submit
                            their food sales data 
                            to the Tendmills database. Our project involves
                            processing this data and 
                            extract useful information from it, organize it into
                            three distinct pages 
                            for easy navigation.
                    
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
