import React from 'react'

import Header from '../general_components/Header_NavBar/HeaderBar';
import Footer from '../general_components/Header_NavBar/Footer';

//import Content1 from '../page_specific_components/MainPage_components/Content1'
import Content2 from '../page_specific_components/MainPage_components/Content2'
import Content3 from '../page_specific_components/MainPage_components/Content3'
import Content4 from '../page_specific_components/MainPage_components/Content4'
import Content5 from '../page_specific_components/MainPage_components/Content5'
//import Content6 from '../components/MainPage_components/Content6'
//import Content7 from '../components/MainPage_components/Content7'
//import Content8 from '../components/MainPage_components/Content8'

import "../styles/pageStyles/MainPage.css";

const MainPage = () => {
    return(
        <div className="mainpage_layout">
            <React.Fragment>
                <div className="content1">
                    <Header/>
                </div>
                <div className="content2 centered">
                    <Content2/>
                </div>
                <div className="content3 centered">
                    <Content3/>
                </div>
                <div className="content4 centered">
                    <Content4/>
                </div>
                <div className="content5">
                    <Footer/>
                </div>
            </React.Fragment>
        </div>
    )
}

export default MainPage;
