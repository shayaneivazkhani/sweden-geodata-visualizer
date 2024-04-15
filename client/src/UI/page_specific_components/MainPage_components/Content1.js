import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import StatisticSubpageMenu from "./miniComponents/ThreeSubpagesMenu.js";
import BuildMenu from "./miniComponents/BuildMenu.js";

import "./MainPage_Content1To8_styles/MainPage_content1.css";
import { display } from "@mui/system";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 34,
    padding: 8,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

function DarkLightModeSwitch() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize dark mode state from localStorage
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : true;
    });

    useEffect(() => {
        // Update localStorage whenever dark mode state changes
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        updateBodyBackground(); // Update body background when mode changes
    }, [darkMode]);

    const toggleMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    const updateBodyBackground = () => {
        const body = document.body;
        if (darkMode) {
            body.classList.remove("light");
            body.classList.add("dark");
        } else {
            body.classList.remove("dark");
            body.classList.add("light");
        }
    };

    const switchContainterStyle = {
        paddingTop: "15px",
    };

    return (
        <div style={switchContainterStyle}>
            <MaterialUISwitch
                sx={{ m: 1 }}
                checked={darkMode} 
                onChange={toggleMode}
            />
        </div>
    );
}

const Content1 = () => {
    const [isHovered, setIsHovered] = useState(false);

    const headerStyle = {
        width: "100%",
        height: "82px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "var(--header-NavBar-Color)",
        borderBottom: "1px solid var(--doc-divider-horisontal-Color)", // Add a white border at the bottom
        boxShadow: "0 3px 20px 0 rgba(162,155,254,0.68)",
    };

    const homepage_pictureLinkStyle = {
        width: "90px",
        marginTop: "5px",
        marginLeft: "15px",
        marginRight: "10px",
    }

    const navLinkStyle = {
        marginRight: "20px",
    }

    const imageStyle = {
        width: "105px",
        height: "70px",
        backgroundColor: "rgba(0,0,0,0.00)",
        display: "block", // Ensure proper display of the image
        transition: "transform 0.4s", // Add transition for smoother effect
        transform: isHovered ? "scale(1.1)" : "scale(1)", // Apply transform based on hover state
    };

    const TypographyText = styled(Typography)(() => ({
        fontFamily: "Copperplate",
        fontSize: "25px",
        color: "var(--accent_color1)",
        fontWeight: 500,
        fontSize: 20,
        textTransform: "uppercase",
        paddingTop: "20px",
        "&:hover": {
            transform: "scale(1.03)",
        },
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
                <div
                    className="Homepage_picture_link"
                    onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
                    onMouseLeave={() => setIsHovered(false)} // Handle mouse leave event
                    style={homepage_pictureLinkStyle}
                >
                    <Box
                        sx={{
                            borderRadius: 1,
                            height: "50px",
                        }}
                    >
                        <a href="/">
                            <img
                                src="./images/project_logo_no_background.jpg"
                                alt="return to homepage"
                                style={imageStyle}
                            ></img>
                        </a>
                    </Box>
                </div>

                <div className="Section_with_navigation_link" style={navLinkStyle}>
                    <Box
                        sx={{
                            borderRadius: 1,
                            height: "50px",
                            width: "400px",
                            paddingLeft: "55px",
                            paddingRight: "30px",
                            backgroundColor: "rgba(0, 0, 70, 0.0)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <DarkLightModeSwitch />

                            <div
                                style={{
                                    borderRight: "0.1px solid #5b5958",
                                    marginTop: "10px",
                                    marginLeft: "1px",
                                    marginRight: "12px",
                                    height: "60px",
                                }}
                            ></div>
                            <div style={buttonStyle}>
                                <StatisticSubpageMenu />
                            </div>
                            <div
                                style={{
                                    borderRight: "0.1px solid #5b5958",
                                    marginTop: "10px",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    height: "60px",
                                }}
                            ></div>
                            <div style={buttonStyle}>
                                <a href="/about">
                                    <Button>
                                        <TypographyText>About</TypographyText>
                                    </Button>
                                </a>
                            </div>
                            <div
                                style={{
                                    borderRight: "0.1px solid #5b5958",
                                    marginTop: "10px",
                                    marginLeft: "12px",
                                    marginRight: "12px",
                                    height: "60px",
                                }}
                            ></div>
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
