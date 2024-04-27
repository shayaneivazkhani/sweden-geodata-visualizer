import React from "react";
import { useState, useEffect, memo } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentSharpIcon from "@mui/icons-material/AssessmentSharp";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 60,
    height: 34,
    padding: 8,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff",
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        width: 32,
        height: 32,
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                "#fff",
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2,
    },
}));

function DarkLightModeSwitch() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize dark mode state from localStorage
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
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
        paddingTop: "4px",
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

const data = [
    { icon: <AssessmentSharpIcon />, label: "Food Sales", link: "/livsmedel" },
    {
        icon: <AssessmentSharpIcon />,
        label: "Organic Sales",
        link: "/ekologiskt",
    },
    { icon: <AssessmentSharpIcon />, label: "Deals Made", link: "/deals" },
];

function StatisticSubpageMenu() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const TypographyTitle = styled(Typography)(() => ({
        color: "var(--accent_color2)",
        fontFamily: "var(--accent-font1)",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "left",
        textTransform: "uppercase",
    }));

    const list = (anchor) => (
        <Box
            bgcolor="rgba(0,0,0,0.9)"
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                paddingTop: "20px", // Add padding to the top
                paddingLeft: "20px", // Add padding to the left
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <TypographyTitle>Pages with statistics</TypographyTitle>

            <List>
                {data.map((item) => (
                    <ListItemButton
                        component="a"
                        href={item.link}
                        key={item.label}
                        sx={{
                            py: 0,
                            marginLeft: "7px",
                            minHeight: 36,
                        }}
                        style={{ color: "#fb9062" }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: "auto",
                                marginRight: "10px",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontFamily:
                                    "var(--secondary-font), Arial, sans-serif",
                                fontSize: 16,
                                fontWeight: 400,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    const TypographyText = styled(Typography)(() => ({
        color: "var(--accent_color1)",
        fontFamily: "var(--secondary-font), Arial, sans-serif",
        fontSize: 20,
        fontWeight: 500,
        //textTransform: "uppercase"
        paddingTop: "var(--padding-top-text-navbar)",
        transition: "0.10s",
        "&:hover": {
            transform: "scale(1.03)",
        },
    }));

    return (
        <div>
            {["top"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <TypographyText>Statistics</TypographyText>
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

const data2 = [
    { icon: <AssessmentSharpIcon />, label: "Ali", link: "/ali" },
    { icon: <AssessmentSharpIcon />, label: "Ahmed", link: "/ahmed" },
    { icon: <AssessmentSharpIcon />, label: "Dilan", link: "/dilan" },
    { icon: <AssessmentSharpIcon />, label: "Daniel", link: "/daniel" },
    { icon: <AssessmentSharpIcon />, label: "Hassim", link: "/hassim" },
    { icon: <AssessmentSharpIcon />, label: "Kevin", link: "/kevin" },
    { icon: <AssessmentSharpIcon />, label: "Lucas", link: "/lucas" },
    { icon: <AssessmentSharpIcon />, label: "Shayan", link: "/shayan" },
];

function BuildMenu() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const TypographyTitle = styled(Typography)(() => ({
        color: "var(--accent_color2)",
        fontFamily: "var(--accent-font1)",
        fontSize: 16,
        fontWeight: 400,
        textAlign: "left", // Center the text
        textTransform: "uppercase",
    }));

    const list = (anchor) => (
        <Box
            bgcolor="rgba(0,0,0,0.9)"
            sx={{
                width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
                paddingTop: "20px", // Add padding to the top
                paddingLeft: "20px", // Add padding to the left
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <TypographyTitle>Individual custom subpages</TypographyTitle>

            <List>
                {data2.map((item) => (
                    <ListItemButton
                        component="a"
                        href={item.link}
                        key={item.label}
                        sx={{
                            py: 0,
                            marginLeft: "7px",
                            minHeight: 36,
                        }}
                        style={{ color: "#fb9062" }}
                    >
                        <ListItemIcon
                            sx={{
                                color: "inherit",
                                minWidth: "auto",
                                marginRight: "10px",
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                                fontFamily:
                                    "var(--secondary-font), Arial, sans-serif",
                                fontSize: 16,
                                fontWeight: 400,
                            }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    const TypographyText = styled(Typography)(() => ({
        color: "var(--accent_color1)",
        fontFamily: "var(--secondary-font), Arial, sans-serif",
        fontSize: 20,
        fontWeight: 500,
        //textTransform: "uppercase"
        paddingTop: "var(--padding-top-text-navbar)",
        "&:hover": {
            transform: "scale(1.03)",
        },
    }));

    return (
        <div>
            {["top"].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                        <TypographyText>Build</TypographyText>
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

function HomepagePictureLink() {
    const [isHovered, setIsHovered] = useState(false);

    // Function to handle image loading
    const loadImage = () => {
        const image = new Image();
        image.src = "./images/project_logo_no_background.jpg";
        image.onload = () => {
            // Image loaded successfully, set the state to trigger re-render
            setIsLoaded(true);
        };
        image.onerror = () => {
            // Handle error
            console.error("Failed to load image");
        };
    };

    // Call the function to load the image when component mounts
    useEffect(() => {
        loadImage();
    }, []);

    const homepage_pictureLinkStyle = {
        width: "90px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
    };

    return (
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
                    "& a": {
                        // style the <a> element inside Box
                        display: "block",
                        width: "115px",
                        height: "75px",
                        backgroundColor: "rgba(0, 0, 0, 0.00)",
                        transition: "transform 0.4s",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                        "& img": {
                            // style the <img> element inside <a>
                            width: "100%", // make the image width fill the container
                            height: "100%", // make the image height fill the container
                        },
                    },
                }}
            >
                {isLoaded && (
                    <a href="/">
                        <img
                            src="./images/project_logo_no_background.webp"
                            alt="return to homepage"
                        />
                    </a>
                )}
            </Box>
        </div>
    );
}

const Header = () => {
    const [isHovered, setIsHovered] = useState(false);

    const headerStyle = {
        width: "100%",
        height: "55px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "var(--header-NavBar-Color)",
        borderBottom: "1px solid var(--doc-divider-horisontal-Color)", // Add a white border at the bottom
        boxShadow: "0 3px 20px 0 rgba(162,155,254,0.68)",
    };

    const homepage_pictureLinkStyle = {
        width: "90px",
        marginTop: "10px",
        marginLeft: "10px",
        marginRight: "10px",
        //fontSize: "clamp(10px, 0.9vw, 30px)",
    };

    const navLinkStyle = {
        marginRight: "20px",
    };

    const imageStyle = {
        width: "115px",
        height: "75px",
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
        paddingTop: "var(--padding-top-text-navbar)",
        "&:hover": {
            transform: "scale(1.03)",
        },
    }));

    const buttonStyle = {
        height: "100%",
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
                            "& a": {
                                // style the <a> element inside Box
                                display: "block",
                                width: "115px",
                                height: "75px",
                                backgroundColor: "rgba(0, 0, 0, 0.00)",
                                transition: "transform 0.4s",
                                transform: isHovered
                                    ? "scale(1.1)"
                                    : "scale(1)",
                                "& img": {
                                    // style the <img> element inside <a>
                                    width: "100%", // make the image width fill the container
                                    height: "100%", // make the image height fill the container
                                },
                            },
                        }}
                    >
                        <a href="/">
                            {/*
                            <picture>
                                <source
                                    type="image/webp"
                                    srcSet="./images/project_logo_no_background.webp"
                                />
                                <source
                                    type="image/jpeg"
                                    srcSet="./images/project_logo_no_background.jpg"
                                />
                                <img
                                    src="./images/project_logo_no_background.jpg"
                                    alt="return to homepage"
                                />
                            </picture>
                            */}
                            <img
                                src="http://localhost:3001/images/project_logo_no_background.webp"
                                alt="return to homepage"
                            />
                        </a>
                    </Box>
                </div>

                <div
                    className="Section_with_navigation_link"
                    style={navLinkStyle}
                >
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
                            <div
                                style={{
                                    paddingTop: "1px",
                                    marginBottom: "20px",

                                    "&:hover": {
                                        // Apply border styles on hover
                                        border: `0.7px solid var(--mainPage-3CardLinks-Border-Color1)`, // Change border color on hover
                                    },
                                }}
                            >
                                <DarkLightModeSwitch />
                            </div>

                            <div
                                style={{
                                    borderRight: "0.1px solid #5b5958",
                                    marginTop: "10px",
                                    marginLeft: "1px",
                                    marginRight: "12px",
                                    height: "35px",
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
                                    height: "35px",
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
                                    height: "35px",
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

export default memo(Header);
