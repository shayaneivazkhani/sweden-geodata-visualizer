import React from "react";
import Lottie from "react-lottie";

import animationLaptopPeople from "./miniComponents/lotties/laptopPeople.json";
import SubpagesCardsLink from "./miniComponents/LinkToSubpagesCard.js";

import "./MainPage_Content1To8_styles/MainPage_content2.css";

const Earth = () => {

    return (
        <div className="section-banner">
            <div id="star-1">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-2">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-3">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-4">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-5">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-6">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>

            <div id="star-7">
                <div className="curved-corner-star">
                    <div id="curved-corner-bottomright"></div>
                    <div id="curved-corner-bottomleft"></div>
                </div>
                <div className="curved-corner-star">
                    <div id="curved-corner-topright"></div>
                    <div id="curved-corner-topleft"></div>
                </div>
            </div>
        </div>
    );
};

const Content2 = () => {
    const bodyStyle = {};

    const animationLottie = {
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
            <div className="content2_main_outer_body">
                <div className="text_and_animation">
                    <div className="animationLaptopPeople">
                        {/* <Lottie options={animationLottie} height={220} width={220} /> */}
                        <Earth/>
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
