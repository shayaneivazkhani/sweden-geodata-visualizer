import React from "react";
import { Suspense, memo } from "react";
import {
    Card,
    CardActionArea,
    Box,
    Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Lottie from "react-lottie";

// Lazy loading CardMedia component
//const LazyCardMedia = React.lazy(() => import("@mui/material/CardMedia"));

import animationGroupOfGraphs from "./lotties/groupOfGraphs.json";

const CardActionAreaActionArea = styled(CardActionArea)(() => ({
    width: "220px",
    height: "300px",
    borderRadius: 1,
    transition: "0.20s",
    "&:hover": {
        transform: "scale(1.02)",
    },
}));

const StyledCard = styled(Card)(() => ({
    width: "220px",
    height: "300px",
    borderRadius: 1,
    boxShadow: "0 0px 5px 0 rgb(0, 0, 0)",
    transition: "0.15s",
    "&:hover": {
        border: "2.1px solid var(--mainPage-3CardLinks-Border-Color1)",
        borderRadius: 1,
        boxShadow: "0 4px 20px 0 rgb(0, 0, 0)",
    },
}));

const TypographyTitleStyle = {
    fontFamily: "var(--mainpage--content2-3card-font1)",
    color: "var(--mainPage-3CardLinks-Title-Color1)",
    fontSize: 25,
    //textTransform: "uppercase"
};
const TypographySubtitleStyle = {
    marginTop:"5px",
    fontFamily: "var(--mainpage--content2-3card-font2)",
    color: "var(--mainPage-3CardLinks-subTitle-Color1)",
    opacity: 0.80,
    // marginTop: "1rem",
    fontSize: 13,
};

const CustomCard = ({ color, imageWEBp, imageJPG, title, subtitle }) => (
    <CardActionAreaActionArea>
        <StyledCard>
            <Suspense
                fallback={
                    <Box
                        sx={{
                            width: "100%",
                            height: 0,
                            paddingBottom: "75%",
                            backgroundColor: "rgba(0,0,0,0.08)",
                        }}
                    >
                        <CircularProgress color="inherit" size={40} />
                        <div>Loading...</div>
                    </Box>
                }
            >
                <Box
                    sx={{
                        height: "50%",
                        backgroundColor: "rgba(0,0,0,0.08)",
                        boxShadow: "0 0px 5px 0 rgb(0, 0, 0)",
                        transition: "0.15s",
                        "& img": {
                            // style the <img> element inside <a>
                            width: "220px", // make the image width fill the container
                            height: "100%", // make the image height fill the container
                        },
                    }}
                >
                    <picture>
                        {/* Provide alternative image formats using source tags */}
                        {/* <source type="image/webp" srcSet={imageWEBp} /> */}
                        {/* <source type="image/jpeg" srcSet={imageJPG} /> */}
                        {/* Fallback image for browsers that don't support source tags */}
                        <img src={imageWEBp} alt="Custom Card Image" />
                    </picture>
                </Box>
            </Suspense>
            <div
                style={{
                    backgroundColor: color,
                    height: "40%",
                    padding: "25px 13px 30px",
                }}
            >
                <div style={TypographyTitleStyle}>{title}</div>
                <div style={TypographySubtitleStyle}>{subtitle}</div>
            </div>
        </StyledCard>
    </CardActionAreaActionArea>
);

function SubPagesCard() {
    const animation = {
        loop: true,
        autoplay: true,
        animationData: animationGroupOfGraphs,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const containerStyle = {
        maxWidth: "1300px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };

    const firstColumnStyle = {
        /*display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Center items vertically 
        */
    };

    const secondColumnStyle = {
        flex: "1", // Make inner card columns flexible to occupy equal space
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };

    const cardStyle = {};

    const TypographyTextStyle = {
        color: "var(--accent_color2)",
        fontFamily: "var(--accent-font1)",
        fontSize: 14,
        textAlign: "left",
        textTransform: "uppercase",
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    borderRadius: "1rem",
                    paddingTop: "35px",
                    paddingBottom: "35px",
                    backgroundColor: "rgba(0, 0, 70, 0.18)",
                    boxShadow: "0 0px 18px 0 rgba(162,155,254,0.28)",
                }}
            >
                <div style={containerStyle}>
                    <div className="first_column" style={firstColumnStyle}>
                        <div className="first_card" style={cardStyle}>
                            <Link href="/livsmedel" underline="none">
                                <CustomCard
                                    color={
                                        "var(--mainPage-3CardLinks-BgColor1)"
                                    }
                                    title={"Food sales"}
                                    subtitle={
                                        "Review comprehensive statistics on reported food sales across Sweden during year 2023"
                                    }
                                    imageWEBp={
                                        "http://localhost:3001/images/livsmedel_card_img.webp"
                                    }
                                    imageJPG={"/images/livsmedel_card_img.jpg"}
                                />
                            </Link>
                        </div>

                        <div className="second_card" style={cardStyle}>
                            <Link href="/ekologiskt" underline="none">
                                <CustomCard
                                    color={
                                        "var(--mainPage-3CardLinks-BgColor1)"
                                    }
                                    title={"Organic sales"}
                                    subtitle={
                                        "Explore the proportion of organic food sales within these municipalities across Sweden during year 2023"
                                    }
                                    imageWEBp={
                                        "http://localhost:3001/images/ekologiskt_card_img.webp"
                                    }
                                    imageJPG={"/images/ekologiskt_card_img.jpg"}
                                />
                            </Link>
                        </div>

                        <div className="third_card" style={cardStyle}>
                            <Link href="/deals" underline="none">
                                <CustomCard
                                    color="var(--mainPage-3CardLinks-BgColor1)"
                                    title={"Deals Made"}
                                    subtitle={
                                        "Statistics revealing the profitability of deals made by each municipality with food vendors in 2023"
                                    }
                                    imageWEBp={
                                        "http://localhost:3001/images/deals_card_img.webp"
                                    }
                                    imageJPG={"/images/deals_card_img.jpg"}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className="second_column" style={secondColumnStyle}>
                        <Lottie
                            options={animation}
                            height={"min(150px, 300px)"}
                            width={"min(150px, 560px)"}
                        />
                        <div style={TypographyTextStyle}>
                          ⬅︎  Navigate to these sections
                        </div>
                    </div>
                </div>
            </Box>
        </React.Fragment>
    );
}

export default memo(SubPagesCard);
