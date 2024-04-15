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
        borderBottom: "1px solid rgb(163,239,243)" // Add a white border at the bottom
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
        fontFamily: "Optima",
        color: "#e6e5e6",
        fontSize: "23px",
        fontWeight: 400,
        fontSize: 21
        //textTransform: "uppercase" 
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

/*
const Content2 = () => {
    const defaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: animationGroupOfGraphs,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultOptions2 = {
        loop: false,
        autoplay: true,
        animationData: animationwave,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="content2_main_body centered"> 

            <div className="waveAnimation">
                <Lottie 
                    options={defaultOptions2}
                    height={500}
                    width={250}
                />
            </div>

            <div className="animationGroupOfGraphs">
                <Lottie 
                    options={defaultOptions1}
                    height={350}
                    width={350}
                />
            </div>
        </div>
    );
};
*/

/*
const Content2 = () => {
  return (
    <div>
        <StyledEngineProvider injectFirst>
             <SectionsWithActions />
        </StyledEngineProvider>
    </div>
  );
}
*/

export default Content2;
