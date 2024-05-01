import React from "react";
import { styled } from "@mui/material/styles";
import Tab, { tabClasses } from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import { Box } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import Table__meatball2_sweden from "./Data_Visualization_Components/Table_sticky_column_name_autoSort";

import "./MainPage_Content1To8_styles/MainPage_content3.css";

const TabItem = styled(Tab)(({ theme }) => ({
    borderRadius: "30px",
    textAlign: "center",
    transition: "all .5s",
    //padding: "10px 15px",
    height: "auto",
    //width: "auto",
    //margin: "10px 0",
    float: "none",
    color: "var(--tab_item_color_not_selected)",
    fontFamily: "var(--fifth-font)",
    fontSize: "var(--mainpage--tab_table--font--size_not_selected)",
    [theme.breakpoints.up("md")]: {
        minWidth: 90,
    },
    [`&.${tabClasses.selected}, &:hover`]: {
        color: "var(--tab_item_color_selected)",
        backgroundColor: "#00acc1",
        fontSize: "var(--mainpage--tab_table--font--size_selected)",
        boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)",
    },
}));

const Content3 = () => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const outerBodyStyle = {
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
        fontSize: "var(--mainpage--content23--font--size)",
        fontWeight: 400,
        textAlign: "left",
        textTransform: "uppercase",
    };
    const tabs_headStyle = {
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };
    const tabs_bodyStyle = {
        userSelect: "none",
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };

    return (
        <React.Fragment>
            <div className="content3_main_outer_body" style={outerBodyStyle}>
                <div
                    className="content3_main_inner_body"
                    style={innerBodyStyle}
                >
                    <div className="content3_text" style={text_Style}>
                        See a quick example
                    </div>
                    <div className="content3_main_inner_body card-inner">
                        <Box
                            sx={{
                                borderRadius: 1,

                                paddingTop: "20px",
                                paddingBottom: "40px",
                                backgroundColor: "rgba(0, 0, 70, 0.18)",
                                boxShadow: "inset 0 1px 10px 0 #050307",
                            }}
                        >
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div
                                className="content3_tabs_head"
                                style={tabs_headStyle}
                            >
                                <Tabs
                                    value={tabIndex}
                                    onChange={(e, index) => setTabIndex(index)}
                                    sx={{
                                        
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
                            >
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
                            </div>
                        </Box>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Content3;
