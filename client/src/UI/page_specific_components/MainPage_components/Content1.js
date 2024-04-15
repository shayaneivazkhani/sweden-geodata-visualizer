import React from "react";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {  Grid } from '@mui/material';
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import StatisticSubpageMenu from "./miniComponents/ThreeSubpagesMenu.js"
import BuildMenu from "./miniComponents/BuildMenu.js"


import "./MainPage_Content1To8_styles/MainPage_content1.css";


const Content1 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const headerStyle = {
        width: "100%",
        height: "82px",
        justifyContent: 'space-between',
        backgroundColor: "rgb(0,0,0)",
        borderBottom: "1px solid rgb(163,239,243)", // Add a white border at the bottom
        boxShadow: "0 3px 20px 0 rgba(162,155,254,0.68)"
    };

    const imageStyle = {
        width: "105px",
        height: "70px",
        backgroundColor: "rgba(0,0,0,0.08)",
        display: "block", // Ensure proper display of the image
        transition: "transform 0.4s", // Add transition for smoother effect
        transform: isHovered ? "scale(1.1)" : "scale(1)", // Apply transform based on hover state
    };

    const TypographyText = styled(Typography)(() => ({
        fontFamily: "Copperplate",
        fontSize: "25px",
        color: "rgb(163,239,243)",
        fontWeight: 500,
        fontSize: 20,
        textTransform: "uppercase",
        paddingTop: "20px",
        "&:hover": {
          transform: "scale(1.03)",
        }
      }));

    const buttonStyle = {
        height: "50px",
        paddingBottom: "20px",
        display: "flex",
        flexDirection: "column", // Arrange children vertically
        alignItems: "center", // Center items horizontally
    };
    

      return (
        <React.Fragment>
            <div className="header_row" style={headerStyle}>
                <div className="Homepage_picture_link"
                    onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
                    onMouseLeave={() => setIsHovered(false)} // Handle mouse leave event
                >
                    <Box
                        sx={{
                            borderRadius: 1,
                            height: "50px",
                        }}
                    >
                        <a href="/">
                            <img src="./images/project_logo_no_background.jpg" alt="return to homepage" style={imageStyle}></img>
                        </a>
                    </Box>
                    
                </div>
    
                <div className="Section_with_navigation_link">
                    <Box
                        sx={{
                            borderRadius: 1,
                            height: "50px",
                            width: "300px",
                            paddingLeft: "55px",
                            paddingRight: "45px",
                            backgroundColor: "rgba(0, 0, 70, 0.0)"
                        }}
                    >
                        <div style={{ display: 'flex' , justifyContent: 'space-between', alignItems: 'center'  }}>
                            <div style={buttonStyle}>
                                <StatisticSubpageMenu />
                            </div>
                            <div style={{ borderRight: '0.1px solid #5b5958', marginTop: "10px", marginLeft: '12px', marginRight: '12px', height: '60px' }}></div>
                            <div style={buttonStyle}>
                                <a href="/about">
                                    <Button >
                                        <TypographyText>
                                            About
                                        </TypographyText>
                                    </Button>
                                </a>
                            </div>
                            <div style={{ borderRight: '0.1px solid #5b5958', marginTop: "10px", marginLeft: '12px', marginRight: '12px', height: '60px' }}></div>
                            <div style={buttonStyle}>
                                <BuildMenu />
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Content1;
