import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Box } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import Single_Unit_Filled_Graph from "./Data_Visualization_Components/Single_Unit_Filled_Graph";
import Table__meatball_sweden from "./Data_Visualization_Components/Table_sticky_column_name";
import Table__meatball2_sweden from "./Data_Visualization_Components/Table_sticky_column_name_autoSort";

import "./MainPage_Content1To8_styles/MainPage_content3.css";

const TabItem = styled(Tab)(({ theme }) => ({
    position: "relative",
    borderRadius: "30px",
    textAlign: "center",
    transition: "all .5s",
    padding: "10px 15px",
    height: "auto",
    margin: "10px 0",
    float: "none",
    fontSize: "12px",
    fontWeight: "500",
    [theme.breakpoints.up("md")]: {
        minWidth: 120,
    },
    [`&.${tabClasses.selected}, &:hover`]: {
        color: "#FFFFFF",
        backgroundColor: "#00acc1",
        boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)",
    },
}));

const Content3 = () => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const outerBodyStyle = {
        width: "100%",
        minHeight: "700px",
        paddingBottom: "20px",
    };
    const innerBodyStyle = {
        display: "flex",
        flexDirection: "column", // Arrange children vertically
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };
    const text_Style = {
        color: "var(--mainPage-Content2-textColor1)",
        fontFamily: "var(--mainpage--content2-font1)",
        fontSize: "clamp(15px, 1.5vw, 40px)",
        fontWeight: 400,
        textAlign: "left", 
        textTransform: "uppercase"
    };
    const tabs_headStyle = {
        width: "100%",
    };
    const tabs_bodyStyle = {
        width: "100%",
    };

    return (
        <React.Fragment>
            <div className="content3_main_outer_body" style={outerBodyStyle}>
                <div
                    className="content3_main_inner_body"
                    style={innerBodyStyle}
                >
                    <div className="content3_text" style={text_Style}>See a quick example</div>

                    <Box
                        sx={{
                            borderRadius: 1,

                            paddingTop: "20px",
                            paddingLeft: "60px",
                            paddingRight: "55px",
                            paddingBottom: "40px",
                            backgroundColor: "rgba(0, 0, 70, 0.18)",
                            boxShadow: "inset 0 1px 10px 0 #050307",
                        }}
                    >
                        <div
                            className="content3_tabs_head"
                            style={tabs_headStyle}
                        >
                            <Tabs
                                value={tabIndex}
                                onChange={(e, index) => setTabIndex(index)}
                                sx={{
                                    width: "700px",
                                    paddingBottom: "10px",
                                    [`& .${tabsClasses.indicator}`]: {
                                        display: "none",
                                    },
                                }}
                            >
                                {/* <TabItem disableRipple label={"Meatball Sales"} />*/}
                                <TabItem label={"Meatball Sales"} />
                                <TabItem label={"Apple Sales"} />
                                <TabItem label={"Salt Sales"} />
                            </Tabs>
                        </div>

                        <div
                            className="content3_tabs_body"
                            style={tabs_bodyStyle}
                        ></div>
                        {/* Content for Food Sales tab */}
                        {tabIndex === 0 && (
                            <StyledEngineProvider injectFirst>
                                <Table__meatball2_sweden
                                    sub_group="0"
                                    produkt="Köttbullar"
                                />
                            </StyledEngineProvider>
                        )}

                        {/* Content for Organic Sales tab */}
                        {tabIndex === 1 && (
                            <StyledEngineProvider injectFirst>
                                <Table__meatball2_sweden
                                    sub_group="1"
                                    produkt="Äpplen"
                                />
                            </StyledEngineProvider>
                        )}

                        {/* Content for Deals Made tab */}
                        {tabIndex === 2 && (
                            <StyledEngineProvider injectFirst>
                                <Table__meatball2_sweden
                                    sub_group="1"
                                    produkt="Salt"
                                />
                            </StyledEngineProvider>
                        )}
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Content3;
