
import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Link } from '@mui/material';
import { styled } from "@mui/material/styles";
import { Box, ThemeProvider } from '@mui/material';
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
  }
}));
const StyledCard = styled(Card)(({ color }) => ({
  width: "220px",
  height: "300px",
  borderRadius: 1,
  boxShadow: "0 0px 5px 0 rgb(0, 0, 0)",
  transition: "0.15s",
  "&:hover": {
    border: "2.1px solid rgba(30,237,197, 0.78)",
    borderRadius: 1,
    boxShadow: "0 4px 20px 0 rgb(0, 0, 0)"
  }
}));
const CardContentContent = styled(CardContent)(({ color }) => {
  return {
    backgroundColor: color,
    padding: "1.5rem 1rem 1.5rem",
  };
});



const TypographyTitle = styled(Typography)(() => ({
  fontFamily: "Copperplate",
  fontSize: "25px",
  color: "#fb9062",
  fontWeight: 500,
  fontSize: 26,
  //textTransform: "uppercase"
}));
const TypographySubtitle = styled(Typography)(() => ({
  fontFamily: "Verdana",
  color: "#c8734e",
  opacity: 0.87,
 // marginTop: "1rem",
  fontWeight: 400,
  fontSize: 11
}));


const CustomCard = ({ color, image, title, subtitle }) => (
    <CardActionAreaActionArea>
      <StyledCard color={color}>
        <CardMedia
          image={image}
          sx={{
            width: "100%",
            height: 0,
            paddingBottom: "75%",
            backgroundColor: "rgba(0,0,0,0.08)"
          }}
        />
        <CardContentContent color={color}>
          <TypographyTitle variant={"h2"}>{title}</TypographyTitle>
          <TypographySubtitle>{subtitle}</TypographySubtitle>
        </CardContentContent>
      </StyledCard>
    </CardActionAreaActionArea>
);


export default function SubPagesCard() {

  const animation = {
    loop: true,
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

  return (
    <React.Fragment>
      <Box
          sx={{
            borderRadius: 1,
            paddingTop: "35px",
            paddingBottom: "35px",
            paddingLeft: "55px",
            paddingRight: "55px", // Add padding for both sides
            backgroundColor: "rgba(0, 0, 70, 0.18)",
            boxShadow: "0 0px 18px 0 rgba(162,155,254,0.28)"
          }}
        >
        <div style={containerStyle}>

          <div className="first_column" style={firstColumnStyle}>

              <div className="first_card" style={cardStyle}>
                <Link href="/livsmedel" underline="none">
                  <CustomCard
                    color={"#094d43"}
                    title={"Food sales"}
                    subtitle={"Review comprehensive statistics on reported food sales from municipalities across Sweden during year 2023"}
                    image={"/images/livsmedel_card_img.jpg"}
                  />
                </Link>
              </div>
              <div className="second_card" style={cardStyle}>
                <Link href="/ekologiskt" underline="none">
                  <CustomCard
                    color={"#35094D"}
                    title={"Organic sales"}
                    subtitle={"Explore the proportion of organic food sales within these municipalities across Sweden during year 2023"}
                    image={"/images/ekologiskt_card_img.jpg"}
                  />
                </Link>
              </div>
              <div className="third_card" style={cardStyle}>
                <Link href="/deals" underline="none">
                  <CustomCard
                    color="#1F094D"
                    title={"Deals Made"}
                    subtitle={"Statistics revealing the profitability of deals made by each municipality with food vendors in 2023."}
                    image={"/images/deals_card_img.jpg"}
                  />
                </Link>
              </div>

          </div>

          <div className="second_column" style={secondColumnStyle}>

            <Lottie options={animation} height={220} width={220} />
            <Typography variant="overline" color={"rgb(163,239,243)"} display="block" gutterBottom>
               ⬅︎ Navigate to these sections
            </Typography>

         </div>
        </div>
      </Box>
    </React.Fragment>
  );
};
