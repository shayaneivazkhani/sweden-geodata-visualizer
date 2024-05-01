import React, { useRef, useEffect } from "react";

import "../styles/pageStyles/Shayan.css";

const Nice = () => {
    const cubeStyle = {
        "--x": -1,
        "--y": 0,
    };
    const cubeStyle4 = {
        "--x": -1,
        "--y": -1,
    };
    const cubeStyle5 = {
        "--x": 0,
        "--y": -1,
    };
    const cubeStyle6 = {
        "--x": -1,
        "--y": -1,
    };
    const cubeStyle7 = {
        "--x": 1,
        "--y": 0,
    };
    return (
        <div className="container">
            <div className="cube" style={cubeStyle}>
                <div>
                    <span style={{ "--i": 3 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 1 }}></span>
                </div>
                <div className="cube" style={cubeStyle4}>
                    <div>
                        <span style={{ "--i": 3 }}></span>
                        <span style={{ "--i": 2 }}></span>
                        <span style={{ "--i": 1 }}></span>
                    </div>
                    <div className="cube" style={cubeStyle5}>
                        <div>
                            <span style={{ "--i": 3 }}></span>
                            <span style={{ "--i": 2 }}></span>
                            <span style={{ "--i": 1 }}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cube" style={cubeStyle}>
                <div>
                    <span style={{ "--i": 3 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 1 }}></span>
                </div>
                <div className="cube" style={cubeStyle4}>
                    <div>
                        <span style={{ "--i": 3 }}></span>
                        <span style={{ "--i": 2 }}></span>
                        <span style={{ "--i": 1 }}></span>
                    </div>
                </div>
            </div>
            <div className="cube" style={cubeStyle}>
                <div>
                    <span style={{ "--i": 3 }}></span>
                    <span style={{ "--i": 2 }}></span>
                    <span style={{ "--i": 1 }}></span>
                </div>
                <div className="cube" style={cubeStyle6}>
                    <div>
                        <span style={{ "--i": 3 }}></span>
                        <span style={{ "--i": 2 }}></span>
                        <span style={{ "--i": 1 }}></span>
                    </div>
                    <div className="cube" style={cubeStyle5}>
                        <div>
                            <span style={{ "--i": 3 }}></span>
                            <span style={{ "--i": 2 }}></span>
                            <span style={{ "--i": 1 }}></span>
                        </div>
                    </div>
                    <div className="cube" style={cubeStyle7}>
                        <div>
                            <span style={{ "--i": 3 }}></span>
                            <span style={{ "--i": 2 }}></span>
                            <span style={{ "--i": 1 }}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Shayan = () => {
    const body_style = {
        // minHeight: `calc(${window.innerHeight}px - 231px)`, // You may need to calculate this dynamically in a useEffect hook
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "center", // Center items vertically
    };

    return (
        <React.Fragment>
            <div className="shayan" style={body_style}>
                <div className="shayan_main">
                   { /* <h2>Shayan Page</h2> */ } 
                </div>
                <div className="shayan_main">
                    <Nice />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Shayan;
