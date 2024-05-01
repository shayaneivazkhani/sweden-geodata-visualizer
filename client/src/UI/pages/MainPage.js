import React from "react";

import Content2 from "../page_specific_components/MainPage_components/Content2";
import Content3 from "../page_specific_components/MainPage_components/Content3";
import Content4 from "../page_specific_components/MainPage_components/Content4";

import "../styles/pageStyles/MainPage.css"; 

const MainPage = () => {

    const body_style = {
        //minHeight: `calc(${window.innerHeight}px - 211px)`,
        //width: "80vw",
        maxWidth: "1200px",
        margin: "0 auto",
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
                </div>
            </div>
        </React.Fragment>
    );
};

export default MainPage;
