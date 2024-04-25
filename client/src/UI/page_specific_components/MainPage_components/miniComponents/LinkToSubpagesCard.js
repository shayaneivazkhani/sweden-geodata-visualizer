import React from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, ThemeProvider } from "@mui/material";
import Stack from "@mui/system/Stack";
import Color from "color";
import Lottie from "react-lottie";

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
const StyledCard = styled(Card)(({ color }) => ({
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
const CardContentContent = styled(CardContent)(({ color }) => {
    return {
        backgroundColor: color,
        padding: "1.5rem 1rem 1.5rem",
    };
});

const TypographyTitle = styled(Typography)(() => ({
    fontFamily: "var(--mainpage--content2-3card-font1)",
    fontSize: "25px",
    color: "var(--mainPage-3CardLinks-Title-Color1)",
    fontWeight: 500,
    fontSize: 26,
    //textTransform: "uppercase"
}));
const TypographySubtitle = styled(Typography)(() => ({
    fontFamily: "var(--mainpage--content2-3card-font2)",
    color: "var(--mainPage-3CardLinks-subTitle-Color1)",
    opacity: 0.87,
    // marginTop: "1rem",
    fontWeight: 400,
    fontSize: 11,
}));



const CustomCardFaster = ({ color, imageJPG, imageWEBp, title, subtitle }) => (
    <CardActionAreaActionArea>
        <StyledCard color={color}>
            <Box
                sx={{
                    width: "100%",
                    height: "55%",
                    backgroundColor: "rgba(0,0,0,0.08)",
                    borderRadius: 1,
                    boxShadow: "0 0px 5px 0 rgb(0, 0, 0)",
                    transition: "0.15s",
                    "&:hover": {
                        border: "2.1px solid var(--mainPage-3CardLinks-Border-Color1)",
                        borderRadius: 1,
                        boxShadow: "0 4px 20px 0 rgb(0, 0, 0)",
                    },
                    "& img": {
                        // style the <img> element inside <a>
                        width: "220px", // make the image width fill the container
                        height: "100%", // make the image height fill the container
                    },
                }}
            >
                    <picture>
                        <source
                            type="image/webp"
                            srcSet={imageWEBp}
                        />
                        <source
                            type="image/jpeg"
                            srcSet={imageJPG}
                        />
                        <img
                            src={imageJPG}
                        />
                    </picture>
                
            </Box>
            <CardContentContent color={color}>
                <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
                <TypographySubtitle>{subtitle}</TypographySubtitle>
            </CardContentContent>
        </StyledCard>
    </CardActionAreaActionArea>
);


export default function SubPagesCard() {
    const animation = {
        loop: false,
        autoplay: true,
        animationData: animationGroupOfGraphs,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "flex-end", // Center items vertically
    };

    const firstColumnStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Center items vertically
    };

    const secondColumnStyle = {
        flex: "1", // Make inner card columns flexible to occupy equal space
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        paddingLeft: "30px",
    };

    const cardStyle = {
        paddingRight: "40px",
    };

    const TypographyTitle = styled(Typography)(() => ({
        color: "var(--accent_color2)",
        fontFamily: "var(--accent-font1)",
        fontSize: 14,
        fontWeight: 400,
        textAlign: "left",
        textTransform: "uppercase",
    }));

    const Item = styled("div")(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: "left",
        borderRadius: 0,
    }));

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    borderRadius: 1,
                    paddingTop: "35px",
                    paddingBottom: "35px",
                    paddingLeft: "55px",
                    paddingRight: "55px", // Add padding for both sides
                    backgroundColor: "rgba(0, 0, 70, 0.18)",
                    boxShadow: "0 0px 18px 0 rgba(162,155,254,0.28)",
                }}
            >
                <div style={containerStyle}>
                    <div className="first_column" style={firstColumnStyle}>
                        <Item>
                            <div className="first_card" style={cardStyle}>
                                <Link href="/livsmedel" underline="none">
                                    <CustomCardFaster
                                        color={
                                            "var(--mainPage-3CardLinks-BgColor1)"
                                        }
                                        title={"Food sales"}
                                        subtitle={
                                            "Review comprehensive statistics on reported food sales from municipalities across Sweden during year 2023"
                                        }
                                        imageWEBp={
                                            "/images/livsmedel_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/livsmedel_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                        <Item>
                            <div className="second_card" style={cardStyle}>
                                <Link href="/ekologiskt" underline="none">
                                    <CustomCardFaster
                                        color={
                                            "var(--mainPage-3CardLinks-BgColor1)"
                                        }
                                        title={"Organic sales"}
                                        subtitle={
                                            "Explore the proportion of organic food sales within these municipalities across Sweden during year 2023"
                                        }
                                        imageWEBp={
                                            "/images/ekologiskt_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/ekologiskt_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                        <Item>
                            <div className="third_card" style={cardStyle}>
                                <Link href="/deals" underline="none">
                                    <CustomCardFaster
                                        color="var(--mainPage-3CardLinks-BgColor1)"
                                        title={"Deals Made"}
                                        subtitle={
                                            "Statistics revealing the profitability of deals made by each municipality with food vendors in 2023."
                                        }
                                        imageWEBp={
                                            "/images/deals_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/deals_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                    </div>

                    <div className="second_column" style={secondColumnStyle}>
                        <Lottie options={animation} height={220} width={220} />
                        <TypographyTitle>
                            ⬅︎ Navigate to these sections
                        </TypographyTitle>
                    </div>
                </div>
            </Box>
        </React.Fragment>
    );
}



/*
const CustomCard = ({ color, image, title, subtitle }) => (
    <CardActionAreaActionArea>
        <StyledCard color={color}>
            <CardMedia
                image={image}
                sx={{
                    width: "100%",
                    height: 0,
                    paddingBottom: "75%",
                    backgroundColor: "rgba(0,0,0,0.08)",
                }}
            />
            <CardContentContent color={color}>
                <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
                <TypographySubtitle>{subtitle}</TypographySubtitle>
            </CardContentContent>
        </StyledCard>
    </CardActionAreaActionArea>
);

export default function SubPagesCard2() {
    const animation = {
        loop: false,
        autoplay: true,
        animationData: animationGroupOfGraphs,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "flex-end", // Center items vertically
    };

    const firstColumnStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center", // Center items vertically
    };

    const secondColumnStyle = {
        flex: "1", // Make inner card columns flexible to occupy equal space
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
        paddingLeft: "30px",
    };

    const cardStyle = {
        paddingRight: "40px",
    };

    const TypographyTitle = styled(Typography)(() => ({
        color: "var(--accent_color2)",
        fontFamily: "var(--accent-font1)",
        fontSize: 14,
        fontWeight: 400,
        textAlign: "left",
        textTransform: "uppercase",
    }));

    const Item = styled("div")(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: "left",
        borderRadius: 0,
    }));

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    borderRadius: 1,
                    paddingTop: "35px",
                    paddingBottom: "35px",
                    paddingLeft: "55px",
                    paddingRight: "55px", // Add padding for both sides
                    backgroundColor: "rgba(0, 0, 70, 0.18)",
                    boxShadow: "0 0px 18px 0 rgba(162,155,254,0.28)",
                }}
            >
                <div style={containerStyle}>
                    <div className="first_column" style={firstColumnStyle}>
                        <Item>
                            <div className="first_card" style={cardStyle}>
                                <Link href="/livsmedel" underline="none">
                                    <CustomCardFaster
                                        color={
                                            "var(--mainPage-3CardLinks-BgColor1)"
                                        }
                                        title={"Food sales"}
                                        subtitle={
                                            "Review comprehensive statistics on reported food sales from municipalities across Sweden during year 2023"
                                        }
                                        imageWEBp={
                                            "/images/livsmedel_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/livsmedel_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                        <Item>
                            <div className="second_card" style={cardStyle}>
                                <Link href="/ekologiskt" underline="none">
                                    <CustomCardFaster
                                        color={
                                            "var(--mainPage-3CardLinks-BgColor1)"
                                        }
                                        title={"Organic sales"}
                                        subtitle={
                                            "Explore the proportion of organic food sales within these municipalities across Sweden during year 2023"
                                        }
                                        imageWEBp={
                                            "/images/ekologiskt_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/ekologiskt_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                        <Item>
                            <div className="third_card" style={cardStyle}>
                                <Link href="/deals" underline="none">
                                    <CustomCardFaster
                                        color="var(--mainPage-3CardLinks-BgColor1)"
                                        title={"Deals Made"}
                                        subtitle={
                                            "Statistics revealing the profitability of deals made by each municipality with food vendors in 2023."
                                        }
                                        imageWEBp={
                                            "/images/deals_card_img.webp"
                                        }
                                        imageJPG={
                                            "/images/deals_card_img.jpg"
                                        }
                                    />
                                </Link>
                            </div>
                        </Item>
                    </div>

                    <div className="second_column" style={secondColumnStyle}>
                        <Lottie options={animation} height={220} width={220} />
                        <TypographyTitle>
                            ⬅︎ Navigate to these sections
                        </TypographyTitle>
                    </div>
                </div>
            </Box>
        </React.Fragment>
    );
}

*/