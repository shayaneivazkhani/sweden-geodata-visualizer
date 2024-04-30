import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useRef } from "react";
import * as d3 from "d3";

const MyD3Component = (props) => {
    const svgBubbleRef = useRef();
    const [bubbleData, setBubbleData] = useState(null);

    const svgMapRef = useRef(); // Ref for SVG element
    const [mapData, setMapData] = useState(null);

    // set Map data från GeoJSON
    useEffect(() => {
        const cachedData = localStorage.getItem("platserCachedData");
        
        if (cachedData) {
            setMapData(JSON.parse(cachedData));
        } else {
            const fetchData = async () => {
                try {
                    const platserData = await d3.json(
                        "/GeoJSON/kommuner_sverige.geojson",
                    );
                    setMapData(platserData);
                    localStorage.setItem(
                        `platserCachedData`,
                        JSON.stringify(platserData),
                    );
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData(); 
        }
    }, []);

    useEffect(() => {
        if (mapData && mapData.features) {
            const svgMap = d3.select(svgMapRef.current);

            var projection = d3.geoMercator().scale(100).translate([250, 250]);

            var geoPath = d3.geoPath().projection(projection);

            function getMengdFor(data, kommunNamn) {
                for (const obj of data) {
                    if (obj.place2 === kommunNamn) {
                        return parseInt(obj.value, 10);
                    }
                }
                return -1;
            }
            function getMengdFor2(data, kommunNamn) {
                const result = data.find((obj) => obj.place2 === kommunNamn);
                return result ? result.value : -1;
            }
         
            svgMap
                .selectAll("path")
                .data(mapData.features)
                .enter()
                .append("path")
                .attr("d", geoPath)
                .attr("class", (d) => "platser " + d.properties.name)
                .style(
                    "fill",
                    (d) => "var(--livsmedelPage-Map-uunmappedPlaces)",
                )
                .style(
                    "stroke",
                    (d) => "var(--livsmedelPage-Map-Places-Border)",
                );

            // Define zoom behavior
            const mapZoom = d3.zoom().on("zoom", function (event) {
                projection
                    .translate([event.transform.x, event.transform.y])
                    .scale(event.transform.k);
                d3.selectAll("path.platser").attr("d", geoPath);
            });

            // Initialize zoom settings
            const zoomSettings = d3.zoomIdentity
                .translate(-190, 1780)
                .scale(1050);

            // Call zoom on SVG element and apply initial zoom
            svgMap.call(mapZoom).call(mapZoom.transform, zoomSettings);

            // Function to handle zooming in/out
            function zoomButton(zoomDirection) {
                const width = 50;
                const height = 50;
                let newZoom, newX, newY;
                if (zoomDirection === "in") {
                    newZoom = projection.scale() * 1.5;
                    newX =
                        (projection.translate()[0] - width / 2) * 1.5 +
                        width / 2;
                    newY =
                        (projection.translate()[1] - height / 2) * 1.5 +
                        height / 2;
                } else if (zoomDirection === "out") {
                    newZoom = projection.scale() * 0.75;
                    newX =
                        (projection.translate()[0] - width / 2) * 0.75 +
                        width / 2;
                    newY =
                        (projection.translate()[1] - height / 2) * 0.75 +
                        height / 2;
                }

                const newZoomSettings = d3.zoomIdentity
                    .translate(newX, newY)
                    .scale(newZoom);

                svgMap
                    .transition()
                    .duration(100)
                    .call(mapZoom.transform, newZoomSettings);
            }
            // Append zoom buttons
            if (svgMap.selectAll("#controls").empty()) {
                const controlsContainer = d3.select("#controls");
                controlsContainer
                    .append("button")
                    .on("click", () => zoomButton("in"))
                    .html("Zoom In");
                controlsContainer
                    .append("button")
                    .on("click", () => zoomButton("out"))
                    .html("Zoom Out");
            }

            // Add hover actions
            d3.select(svgMapRef.current)
                .selectAll("path")
                .on("mouseover", function (event, d) {
                    if (!d || !d.properties || !geoPath(d)) {
                        console.log("has no properties maybe");
                        return;
                    }

                    const thisBounds = geoPath.bounds(d);
                    const thisCenter = geoPath.centroid(d);

                    // Check if the centroid coordinates are valid
                    if (isNaN(thisCenter[0]) || isNaN(thisCenter[1])) {
                        console.log("has no centroid coordinates maybe");
                        return;
                    }

                    // Display the name property if available
                    const name = d.properties.name || "NULL";

                    // Append the name as text
                    svgMap
                        .append("text")
                        .attr("id", "feature-name")
                        .attr("x", thisCenter[0])
                        .attr("y", thisCenter[1])
                        .attr("dy", "-0.5em") // Offset the text slightly above the centroid
                        .style("text-anchor", "middle") // Center the text horizontally
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(12px, 0.95vw, 22px)")
                        .text(name)
                        .attr("fill", "var(--mainPage--textColor2)");

                    // Draw a rectangle to highlight the bounds
                    svgMap
                        .append("rect")
                        .attr("id", "bbox")
                        .attr("x", thisBounds[0][0])
                        .attr("y", thisBounds[0][1])
                        .attr("width", thisBounds[1][0] - thisBounds[0][0])
                        .attr("height", thisBounds[1][1] - thisBounds[0][1])
                        .attr("fill", "none");

                    // Draw a circle to mark the centroid
                    svgMap
                        .append("circle")
                        .attr("id", "centroid")
                        .attr("r", 5)
                        .attr("cx", thisCenter[0])
                        .attr("cy", thisCenter[1])
                        .attr("fill", "var(--mainPage--textColor3)");

                    d3.select(this).on("mouseout", function () {
                        svgMap.selectAll("#feature-name").remove();
                        svgMap.selectAll("#centroid").remove();
                        svgMap.selectAll("#bbox").remove();
                    });
                });
        }
    }, [mapData]);

    // set data baserad på input i Main_group och Sub_group från USER och sedan fetch korrekt data från backend
    useEffect(() => {
        fetch(
            `http://localhost:3001/api/column/D3Result?main_g=${props.main_grupp}&sub_g=${props.sub_grupp}`,
        )
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.map((item) => ({
                    place: item.place,
                    place2: item.place2,
                    name: item.name,
                    mengd: item.mengd,
                    value: parseFloat(item.value),
                    andel_sverige: item.andel_sverige,
                }));

                setBubbleData({ children: processedData }); // { children: processedData }: This is an object literal in JavaScript. You're creating an object with a property named children, and its value is set to processedData.
            });
    }, [props.main_grupp, props.sub_grupp]); // The effect will re-run whenever props.main_grupp or props.sub_grupp change.

    useEffect(() => {
        const colorClasses = [
            {
                range: [-10, -1],
                color: "var(--livsmedelPage-Map-uunmappedPlaces)",
            },
            { range: [0, 10], color: "#ffffff" },
            { range: [11, 20], color: "#ffffc0" },
            { range: [21, 50], color: "#fafdd7" },
            { range: [51, 100], color: "#f6fcaf" },
            { range: [101, 150], color: "#edf960" },
            { range: [151, 500], color: "#fdc066" },
            { range: [501, 1000], color: "#fd9700" },
            { range: [1001, 2000], color: "#fd9132" },
            { range: [2001, 3000], color: "#fd7600" },
            { range: [3001, 4000], color: "#fd7e32" },
            { range: [4001, 5000], color: "#fd5f00" },
            { range: [5001, 6000], color: "#fd6432" },
            { range: [6001, 8000], color: "#fd3e00" },
            { range: [8001, 10000], color: "#fd196e" },
            { range: [10001, 30000], color: "#e30054" },
            { range: [30001, 40000], color: "#fd4cd5" },
            { range: [40001, 50000], color: "#ca009c" },
            { range: [50001, 60000], color: "#d332fd" },
            { range: [60001, 70000], color: "#b400e3" },
            { range: [70001, 80000], color: "#b94cfd" },
            { range: [80001, 90000], color: "#b94cfd" },
            { range: [90001, 100000], color: "#9b00fd" },
            { range: [100001, 110000], color: "#9b00fd" },
            { range: [110001, 120000], color: "#a14cfd" },
            { range: [120001, 130000], color: "#a14cfd" },
            { range: [130001, 140000], color: "#8619fd" },
            { range: [140001, 150000], color: "#8619fd" },
            { range: [150001, 160000], color: "#7900fd" },
            { range: [160001, 170000], color: "#7900fd" },
            { range: [170001, 180000], color: "#6c00e3" },
            { range: [180001, 190000], color: "#6c00e3" },
            { range: [190001, 200000], color: "#6c00e3" },
            { range: [200001, 10000000], color: "#6c00e3" },

            // Add more ranges and colors as needed
        ];

        const getColor = (value) => {
            for (const { range, color } of colorClasses) {
                if (value >= range[0] && value <= range[1]) {
                    return color;
                }
            }
            return "white";
        };

        let width = window.innerWidth - window.innerWidth / 2 - window.innerWidth / 20;
        let height = window.innerHeight - window.innerHeight / 4;

        const svgBubble = d3.select(svgBubbleRef.current);
      
        const svgMap = d3.select(svgMapRef.current);

        var projection = d3.geoMercator().scale(100).translate([250, 250]);

        var geoPath = d3.geoPath().projection(projection);

        function getMengdFor(data, kommunNamn) {
            for (const obj of data) {
                if (obj.place2 === kommunNamn) {
                    return parseInt(obj.value, 10);
                }
            }
            return -1;
        }
        function getMengdFor2(data, kommunNamn) {
            const result = data.find((obj) => obj.place2 === kommunNamn);
            return result ? result.value : -1;
        }

        if (bubbleData) {
            svgMap
                .selectAll("path")
                .style("fill", (d) =>
                    getColor(
                        getMengdFor2(bubbleData.children, d.properties.name),
                    ),
                )
                .style(
                    "stroke",
                    (d) => "var(--livsmedelPage-Map-Places-Border)",
                );

            const pack = d3
                .pack()
                .size([width - 40, height - 50])
                .padding(110);

            const root = d3
                .hierarchy(bubbleData)
                .sum((d) => d.value)
                .sort((a, b) => b.value - a.value);

            const packedData = pack(root);;

            const node = svgBubble
                .selectAll("g")
                .data(packedData.descendants())
                .enter()
                .append("g")
                .attr(
                    "transform",
                    (d) => `translate(${d.x + 110},${d.y - 15})`,
                );

            node.append("circle")
                .attr("r", (d) => {
                    if (d.data.value) {
                        const minValue = 15;
                        return d.value <= minValue ? minValue : d.r + 16;
                    } else {
                        return width / 2.95;
                    }
                })
                .attr("class", (d) => d.data.place2)
                .attr("fill", (d) => {
                    if (d.data.value) {
                        return getColor(d.data.value);
                    } else {
                        return "none";
                    }
                })
                .attr("fill-opacity", 0.68)
                .style("stroke", (d) => {
                    if (d.data.value) {
                        return "var(--livsmedelPage-Map-Places-Border)";
                    } else {
                        return "none"; 
                    }
                })
                .style("stroke-width", (d) => {
                    if (d.data.value) {
                        return 0.6;
                    } else {
                        return 0;
                    }
                })
                .on("mouseover", function (event, d) {
                    var originalColor = d3.select(this).attr("fill");
                    var originalClassName = d3.select(this).attr("class");

                    d3.select(svgMapRef.current)
                        .selectAll("path")
                        .filter(function (d) {
                            return d.properties.name === originalClassName;
                        })
                        .style("fill", "#4bc2a0");

                    d3.select(this).attr("fill", (d) => {
                        if (d.data.value) {
                            return "#4bc2a0"; 
                        } else {
                            return "none"; 
                        }
                    });
                    const textGroup = svgBubble
                        .append("g")
                        .attr("id", "nodeGroup");

                    textGroup
                        .append("text") 
                        .attr("id", "nodeValue1")
                        .attr("x", 5)
                        .attr("y", 15)
                        .text(d.data.place)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.80vw, 18px)")
                        .attr("fill", "var(--mainPage--textColor1)");

                    textGroup
                        .append("text") 
                        .attr("id", "nodeValue2")
                        .attr("x", 5)
                        .attr("y", 37)
                        .text(d.data.name)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.80vw, 18px)")
                        .attr("fill", "var(--mainPage--textColor1)");

                    textGroup
                        .append("text")
                        .attr("id", "nodeValue3") 
                        .attr("x", 5)
                        .attr("y", 57)
                        .text(d.data.mengd)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.80vw, 18px)")
                        .attr("fill", "var(--mainPage--textColor1)");

                    textGroup
                        .append("text") 
                        .attr("id", "nodeValue4") 
                        .attr("x", 5)
                        .attr("y", 78)
                        .text(d.data.andel_sverige)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.80vw, 18px)")
                        .attr("fill", "var(--mainPage--textColor1)");

                    d3.select(this).on("mouseout", function () {
                        // Restore the original color when the mouse leaves
                        d3.select(this).attr("fill", originalColor);
                        d3.select("#nodeValue1").remove();
                        d3.select("#nodeValue2").remove();
                        d3.select("#nodeValue3").remove();
                        d3.select("#nodeValue4").remove();

                        d3.select(svgMapRef.current)
                            .selectAll("path")
                            .filter(function (d) {
                                return d.properties.name === originalClassName;
                            })
                            .style("fill", originalColor)
                    });
                });

            node.append("text")
                .attr("dy", "0.3em")
                .attr("text-anchor", "middle")
                .style("font-family", "monospace") // Change the font family here
                .style("font-size", "clamp(10px, 1vw, 20px)") // Change the font size here
                .text((d) => (d.data.value ? d.data.value : ""));
        }
        return () => {
            svgBubble.selectAll("*").remove();
            svgMap.selectAll("path").style("fill", (d) => "#706e71");
        };
    }, [bubbleData, mapData]);

    const dataDiagramStyle = {
        paddingRight: "10px",
        paddingTop: "0px",
        paddingLeft: "0px",
        display: "flex",
        flexDirection: "row", // Arrange children vertically
        alignItems: "center", // Center items horizontally
    };

    return (
        <div>
            <div className="dataDiagram" style={dataDiagramStyle}>
                <svg
                    ref={svgBubbleRef}
                    width={
                        window.innerWidth -
                        window.innerWidth / 2 -
                        window.innerWidth / 35
                    }
                    height={window.innerHeight - window.innerHeight / 4}
                />
                <svg
                    ref={svgMapRef}
                    width={
                        window.innerWidth -
                        window.innerWidth / 2 -
                        window.innerWidth / 4
                    }
                    height={window.innerHeight - window.innerHeight / 4}
                    style={{ paddingLeft: "20px" }}
                />
            </div>

            <div>
                <div id="viz">
                    <div id="controls">
                        <div class="controls"></div>
                    </div>
                </div>
                {/*  </div> */}
            </div>
        </div>
    );
};

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

function SelectMainGroup({ main, onChange }) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const [value, setValue] = useState(options[0]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e2); // For demo purposes.

            if (active) {
                const cachedData = localStorage.getItem("column_main_group");

                if (cachedData) {
                    setOptions(JSON.parse(cachedData));
                } else {
                    const response = await fetch(
                        "http://localhost:3001/api/column/main_group",
                    );

                    if (!response.ok) {
                        throw new Error(
                            "Failed to fetch data in Select_fetch.js",
                        );
                    }

                    const jsonData = await response.json();

                    // Filter the jsonData before setting options and storing it in localStorage
                    const filteredData = jsonData.filter((item) => {
                        /*
                            Apply your filtering logic here
                            Check if the propertyName is not all numbers and not equal to 'NULL'
                        */
                        return (
                            /[^\d]/.test(item.main_group) &&
                            item.main_group !== "NULL"
                        );
                    });

                    setOptions([...filteredData]);

                    // Save fetched data to local storage
                    localStorage.setItem(
                        "column_main_group",
                        JSON.stringify(filteredData),
                    );
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, main]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <React.Fragment>
            {/* <div>{`inputValue: '${inputValue}'`}</div> */}
            <br />
            <Autocomplete
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    onChange(newInputValue); // Pass newInputValue to onChange prop
                }}
                id="sub group"
                sx={{ width: 360 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) =>
                    option.main_group === value.main_group
                }
                getOptionLabel={(option) => option.main_group}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Main group"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </React.Fragment>
    );
}

function SelectSubGroup({ main, onChange }) {
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e1); // For demo purposes.

            if (active) {
                const response = await fetch(
                    `http://localhost:3001/api/column/sub_group?main_group=${main}`,
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data in Select_fetch.js");
                }

                const jsonData = await response.json();

                // Filter the jsonData before setting options and storing it in localStorage
                const filteredData = jsonData.filter((item) => {
                    /*
                            Apply your filtering logic here
                            Check if the propertyName is not all numbers and not equal to 'NULL'
                        */
                    return /[^\d]/.test(item.id) && item.id !== "NULL";
                });

                setOptions([...filteredData]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <React.Fragment>
            {/* <div>{`Sub Value: '${inputValue}'`}</div> */}
            <br />
            <Autocomplete
                key={main} // just change main to trigger reset of the lable
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                    onChange(newInputValue); // Pass newInputValue to onChange prop
                }}
                id="sub group"
                sx={{ width: 360 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.id}
                options={options}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Sub group"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </React.Fragment>
    );
}

export default function SelectGroup() {
    const [main, setMain] = useState("");
    const [sub, setSub] = useState("");

    const containerStyle = {
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "flex-end", // Center items vertically
        backgroundColor: "rgba(0, 0, 70, 0)",
        zIndex: 2,
    };

    const textStyle = {
        color: "var(--accent_color3)",
        paddingRight: "50px",
        borderRadius: "20px",
    };

    const dataStyle = {
        width: "100%",
        height: "100%",
        color: "var(--accent_color3)",
        paddingRight: "50px",
    };

    function handleChangeMain(newInputValue) {
        setMain(newInputValue);
    }
    function handleChangeSub(newInputValue) {
        setSub(newInputValue);
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    margin: "1%",

                    borderRadius: 1,

                    paddingTop: "20px",
                    paddingLeft: "60px",
                    paddingRight: "55px",
                    paddingBottom: "40px",
                    backgroundColor: "var(--livsmedelPage-BgColor1)",
                    boxShadow: "inset 0 1px 10px 0 #050307",
                }}
            >
                <div style={containerStyle}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            borderRadius: 4,
                            background:
                                "var(--livsmedelPage-SelectAttributes-BgColor1)",
                            paddingRight: "1px",
                            paddingLeft: "1px",
                            paddingBottom: "2px",
                            paddingTop: "7px",
                        }}
                    >
                        <SelectMainGroup
                            main={main}
                            onChange={handleChangeMain}
                        />
                        <SelectSubGroup
                            main={main}
                            onChange={handleChangeSub}
                        />
                    </div>
                </div>
                <div style={dataStyle}>
                    <MyD3Component main_grupp={main} sub_grupp={sub} />
                </div>
                <div></div>
            </Box>
        </React.Fragment>
    );
}
