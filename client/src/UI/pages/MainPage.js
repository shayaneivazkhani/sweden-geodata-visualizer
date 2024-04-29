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

const MainPage = () => {

    const body_style = {
        width: "90vw",
        maxWidth: "1200px",
    };

    return (
        <React.Fragment>
            <div style={body_style}>
                <div className="mainpage_layout">
                    <div className="content2">
                        <Content2 />
                    </div>
                    <div className="content3">
                        <Content3 />
                    </div>
                    <div className="content4">
                        <Content4 />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;
