import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./UI/pages/MainPage.js";

import AboutPage from "./UI/pages/AboutPage.js";

import LivsmedelPage from "./UI/pages/LivsmedelPage.js";
import EkologisktPage from "./UI/pages/EkologisktPage.js";
import DealsPage from "./UI/pages/DealsPage.js";

import Ali from "./UI/pages/Ali.js";
import Ahmed from "./UI/pages/Ahmed.js";
import Dilan from "./UI/pages/Dilan.js";
import Daniel from "./UI/pages/Daniel.js";
import Hassim from "./UI/pages/Hassim.js";
import Kevin from "./UI/pages/Kevin.js";
import Lucas from "./UI/pages/Lucas.js";
import Shayan from "./UI/pages/Shayan.js";

import Header from "./UI/general_components/HeaderBar";
import Footer from "./UI/general_components/Footer";

const WebPage = () => {
    const topFixedStyle = {
        width: "100%",
        position: "fixed",
        zIndex: "1",
    };

    const scrollableStyle = {
        width: "100%",
        paddingTop: "85px",
        zIndex: 0,
    };

    const footer_style = {
        width: "100%",
    };

    return (
        <React.Fragment>
            <div>
                <div style={topFixedStyle}>
                        <Header />
                </div>
                <div style={scrollableStyle}>
                        <Router>
                            <Routes>
                                <Route path="/" element={<MainPage />} />

                                <Route path="/about" element={<AboutPage />} />

                                <Route
                                    path="/livsmedel"
                                    element={<LivsmedelPage />}
                                />
                                <Route
                                    path="/ekologiskt"
                                    element={<EkologisktPage />}
                                />
                                <Route path="/deals" element={<DealsPage />} />

                                <Route path="/ali" element={<Ali />} />
                                <Route path="/ahmed" element={<Ahmed />} />
                                <Route path="/dilan" element={<Dilan />} />
                                <Route path="/daniel" element={<Daniel />} />
                                <Route path="/hassim" element={<Hassim />} />
                                <Route path="/kevin" element={<Kevin />} />
                                <Route path="/lucas" element={<Lucas />} />
                                <Route path="/shayan" element={<Shayan />} />
                                {/* Add routes for other components if needed */}
                            </Routes>
                        </Router>
                    
                </div>
                <div style={footer_style}>
                        <Footer />
                    </div>
            </div>
        </React.Fragment>
    );
};

ReactDOM.createRoot(document.querySelector("#root")).render(<WebPage />);
