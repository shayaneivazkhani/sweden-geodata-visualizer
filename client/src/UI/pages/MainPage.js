import React from "react";

//import Content1 from '../page_specific_components/MainPage_components/Content1'
import Content2 from "../page_specific_components/MainPage_components/Content2";
import Content3 from "../page_specific_components/MainPage_components/Content3";
import Content4 from "../page_specific_components/MainPage_components/Content4";
import Content5 from "../page_specific_components/MainPage_components/Content5";
//import Content6 from '../components/MainPage_components/Content6'
//import Content7 from '../components/MainPage_components/Content7'
//import Content8 from '../components/MainPage_components/Content8'

import "../styles/pageStyles/MainPage.css";
import zIndex from "@mui/material/styles/zIndex";

const MainPage = () => {

    const body_style = {
        //height: "90vh",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <div className="mainpage_layout">
                    <div className="content2 centered">
                        <Content2 />
                    </div>
                    <div className="content3 centered">
                        <Content3 />
                    </div>
                    <div className="content4 centered">
                        <Content4 />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;
