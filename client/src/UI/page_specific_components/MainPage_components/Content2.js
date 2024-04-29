import React from "react";
import Typography from "@mui/material/Typography";

import styled, { keyframes } from "styled-components";
import Lottie from "react-lottie";

import animationLaptopPeople from "./miniComponents/lotties/laptopPeople.json";
import SubpagesCardsLink from "./miniComponents/LinkToSubpagesCard.js";

import "./MainPage_Content1To8_styles/MainPage_content2.css";

const ClockContainer = styled.div`
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    outline: 10px solid #333;
    background: repeating-radial-gradient(
            circle at 50% 50%,
            rgba(200, 200, 200, 0.2) 0%,
            rgba(200, 200, 200, 0.2) 2%,
            transparent 2%,
            transparent 3%,
            rgba(200, 200, 200, 0.2) 3%,
            transparent 3%
        ),
        conic-gradient(
            white 0%,
            silver 10%,
            white 35%,
            silver 45%,
            white 60%,
            silver 70%,
            white 80%,
            silver 95%,
            white 100%
        );
    box-shadow: inset 0 0 20px #0007;
`;

const HourHand = styled.div`
    position: absolute;
    width: 5px;
    height: 60px;
    background: #aaa;
    left: 87.5px;
    top: 43px;
    border-radius: 3px 3px 1px 1px;
    transform-origin: 2px 47px;
    box-shadow: 0 0 5px #0005, inset 1.5px 3px 0px #333,
        inset -1.5px -3px 0px #333;
    z-index: 1;
    animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 43200s linear infinite;
`;

const MinuteHand = styled.div`
    position: absolute;
    width: 4px;
    height: 78px;
    background: #aaa;
    left: 88px;
    top: 25px;
    border-radius: 3px 3px 1px 1px;
    transform-origin: 2px 65px;
    box-shadow: 0 0 5px #0005, inset 1.5px 3px 0px #333,
        inset -1.5px -3px 0px #333;
    z-index: 2;
    animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 3600s linear infinite;
`;

const SecondHand = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
    left: 85px;
    top: 85px;
    border-radius: 50%;
    border: 1px solid #eee;
    z-index: 3;
    animation: ${keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `} 60s steps(60, end) infinite;
`;

const SecondHandBefore = styled.div`
    content: "";
    position: absolute;
    width: 1px;
    height: 85px;
    left: 3px;
    bottom: -10px;
    background: red;
    border-radius: 2px;
    box-shadow: 5px 0 2px rgba(128, 128, 128, 0.2);
`;

const SecondHandAfter = styled.div`
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    left: 2px;
    top: 2px;
    background: #555;
    border-radius: 50%;
`;

const VerticalIndex = styled.p`
    position: absolute;
    color: #333;
    font-size: 24px;
    left: 83.5px;
    top: -3px;
    text-shadow: 0 157px 0 #333;
    z-index: 1;
`;

const HorizontalIndex = styled.p`
    position: absolute;
    color: #333;
    font-size: 24px;
    top: 72px;
    left: 5px;
    transform: rotate(-90deg);
    text-shadow: 0 158px 0 #333;
    z-index: 1;
`;

const Clock = () => {
    return (
        <ClockContainer>
            <VerticalIndex>II</VerticalIndex>
            <HorizontalIndex>II</HorizontalIndex>
            <HourHand />
            <MinuteHand />
            <SecondHand />
            <SecondHandBefore />
            <SecondHandAfter />
        </ClockContainer>
    );
};

const Content2 = () => {
    const bodyStyle = {};

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
                        Each month, municipalities across Sweden submit their
                        food sales data to the Tendmills database. Our project
                        involves processing this data and extract useful
                        information from it, organize it into three distinct
                        pages for easy navigation.
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
