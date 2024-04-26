import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useRef } from "react";
import * as d3 from "d3";

const MyD3Component = (props) => {
    /* Example working with JSON
    // Sample JSON data stored in a variable
    const jsonData = [
        { name: 'Stockholm', mengd: 100 },
        { name: 'Gothenburg', mengd: 200 },
        { name: 'Malmo', mengd: 150 }
    ];

    // Function to search for 'Stockholm' and return its 'mengd' property
    function getMengdForStockholm(data, kommunNamn) {
        for (const obj of data) {
            if (obj.name === kommunNamn) {
                return obj.mengd;
            }
        }
        // Return null if 'Stockholm' is not found
        return null;
    }
    function getMengdForKommun2(data, kommunNamn) {
        const result = data.find(obj => obj.name === kommunNamn);
        return result ? result.mengd : null;
    }

    // Call the function and log the result
    console.log(getMengdForStockholm(jsonData, "Stockholm"));
    console.log(getMengdForKommun2(jsonData, "Stockholm"));
*/

    const svgBubbleRef = useRef();
    const [bubbleData, setBubbleData] = useState(null);

    const svgMapRef = useRef(); // Ref for SVG element
    const [mapData, setMapData] = useState(null);

    // set Map data från GeoJSON
    useEffect(() => {
        const cachedData = localStorage.getItem("platserCachedData");
        // Check local storage for cached data
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
            fetchData(); // Call fetchData to fetch data and setGraphData
        }
    }, []);

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

    // rita Bubble
    useEffect(() => {
        const colorClasses = [
            { range: [-10, -1], color: "none" },
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

        // Create a function to map a value to its corresponding color based on the defined classes
        const getColor = (value) => {
            for (const { range, color } of colorClasses) {
                if (value >= range[0] && value <= range[1]) {
                    return color;
                }
            }
            // Default color if no match is found
            return "none";
        };


        const width = 850;
        const height = 600;
        //let height = window.innerHeight - window.innerHeight / 9;
        //let width = window.innerWidth - window.innerWidth / 13;

        const svgBubble = d3.select(svgBubbleRef.current);
        /*.style("max-width", "100%")
            .style("height", "auto")
            //.style("display", "block")
            .style("margin", "-5 -1px")
            .style(
                "border",
                "1px solid var(--livsmedelPage-Diagram-BorderColor1)",
            )
            .style("border-radius", "5px")
            .style("background", `var(--livsmedelPage-Diagram-BgColor1)`)
            .style("cursor", "pointer");
            //.style("padding-left", "3vw")*/


        const svgMap = d3.select(svgMapRef.current);
        /*.style("max-width", "100%")
            .style("height", "auto")
            .style("display", "block")
            .style("margin", "-5 -1px")
            .style(
                "border",
                "1px solid var(--livsmedelPage-Diagram-BorderColor1)",
            )
            .style("border-radius", "5px")
            .style("background", `var(--livsmedelPage-Diagram-BgColor1)`)
            .style("cursor", "pointer")*/

        if (mapData) {
            var projection = d3.geoMercator().scale(100).translate([250, 250]);

            var geoPath = d3.geoPath().projection(projection);
            //var featureSize = d3.extent(platser.features, (d) => geoPath.area(d),);
            //var countryColor = d3.scaleQuantize().domain(featureSize).range(colorbrewer.YlGn[3]);

            function getMengdFor(data, kommunNamn) {
                for (const obj of data) {
                    if (obj.place2 === kommunNamn) {
                        return parseInt(obj.value, 10);
                    }
                }
                // Return null if 'Stockholm' is not found
                return -1;
            }
            function getMengdFor2(data, kommunNamn) {
                const result = data.find((obj) => obj.place2 === kommunNamn);
                return result ? result.value : -1;
            }
            // Append paths for map features
            svgMap
                .selectAll("path")
                .data(mapData.features)
                .enter()
                .append("path")
                .attr("d", geoPath)
                .attr("class", (d) => "platser "+ d.properties.name)
                .style("fill", (d) =>
                    getColor(
                        getMengdFor2(bubbleData.children, d.properties.name),
                    ),
                )
                .style("stroke", "black");
            //.style("fill", (d) => countryColor(geoPath.area(d)))
            //.style("stroke", (d) => d3.rgb(countryColor(geoPath.area(d))).darker(),);

            // Define zoom behavior
            const mapZoom = d3.zoom().on("zoom", function (event) {
                projection
                    .translate([event.transform.x, event.transform.y])
                    .scale(event.transform.k);
                d3.selectAll("path.platser").attr("d", geoPath);
            });

            // Initialize zoom settings
            const zoomSettings = d3.zoomIdentity
                .translate(-290, 3590)
                .scale(2100);

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

            // Append zoom buttons only if not already present
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
            d3.selectAll("path")
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
                        .attr("class", "feature-name")
                        .attr("x", thisCenter[0])
                        .attr("y", thisCenter[1])
                        .attr("dy", "-0.5em") // Offset the text slightly above the centroid
                        .style("text-anchor", "middle") // Center the text horizontally
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .text(name);

                    // Draw a rectangle to highlight the bounds
                    svgMap
                        .append("rect")
                        .attr("class", "bbox")
                        .attr("x", thisBounds[0][0])
                        .attr("y", thisBounds[0][1])
                        .attr("width", thisBounds[1][0] - thisBounds[0][0])
                        .attr("height", thisBounds[1][1] - thisBounds[0][1]);

                    // Draw a circle to mark the centroid
                    svgMap
                        .append("circle")
                        .attr("class", "centroid")
                        .attr("r", 5)
                        .attr("cx", thisCenter[0])
                        .attr("cy", thisCenter[1]);
                })
                .on("mouseout", function () {
                    svgMap.selectAll("text.feature-name").remove();
                    svgMap.selectAll("circle.centroid").remove();
                    svgMap.selectAll("rect.bbox").remove();
                });
        }

        if (bubbleData) {
            const pack = d3
                .pack()
                .size([width - 40, height - 50])
                .padding(110);

            const root = d3
                .hierarchy(bubbleData)
                .sum((d) => d.value)
                .sort((a, b) => b.value - a.value);

            const packedData = pack(root);

            // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            //const colorScale = d3.scaleSequential().domain([0, 500]).interpolator(d3.interpolateYlOrRd);

            const node = svgBubble
                .selectAll("g")
                .data(packedData.descendants()) // This binds the data to the selection. packedData.descendants() returns an array of all nodes in the hierarchy, including the root node and its descendants. Each node represents a circle in the pack layout.
                .enter() // This enters the data and creates placeholders for each data element that doesn't have a corresponding element in the selection. This prepares to append new g elements for data elements that are not yet represented in the SVG.
                .append("g") //.append("g"): This appends a g element for each data element that doesn't have a corresponding element in the selection. Each g element will represent a node in the pack layout and serve as a container for the circle and its associated text.
                .attr(
                    "transform",
                    (d) => `translate(${d.x + 110},${d.y - 15})`,
                ); // .attr("transform", (d) => translate(${d.x},${d.y})): This sets the transformation (position) of each g element based on the x and y coordinates of the corresponding data element. The translate() function is used to move the g element to the specified coordinates. d.x and d.y are properties of each data element (d), representing the coordinates where the node should be positioned within the SVG container.
               
            node.append("circle")
                .attr("r", (d) => {
                    if (d.data.value) {
                        const minValue = 15; // Adjust this to your minimum value
                        return d.value <= minValue ? minValue : d.r + 16;
                    } else {
                        return width / 2.95;
                    }
                }) 
                .attr("class", (d) => d.data.place2)
                .attr("fill", (d) => {
                    if (d.data.value) {
                        // Use the getColor function to set the fill color of your circles
                        return getColor(d.data.value); // Use the getColor function to set the fill color of circles with data values
                    } else {
                        return "none"; // Or any default color for circles without data values
                    }
                })
                //attr("fill", d => colorScale(d.data.value))
                .attr("fill-opacity", 0.68)
                .style("stroke", (d) => {
                    if (d.data.value) {
                        return "black";
                    } else {
                        return "none"; // Or any default color for circles without data values
                    }
                })
                .style("stroke-width", (d) => {
                    if (d.data.value) {
                        return 0.6;
                    } else {
                        return 0; // Or any default color for circles without data values
                    }
                })
                .on("mouseover", function (event, d) {
                    var originalColor = d3.select(this).attr("fill"); // Store the original color
                    var originalClassName = d3.select(this).attr("class"); // Store the original color

                    d3.select(svgMapRef.current).selectAll("path")
                    .filter(function(d) {
                        // Example condition: Change the fill of paths with certain names
                        return d.properties.name === originalClassName;
                    })
                    .style("fill", "#4bc2a0"); // Update the fill attribute
                  
                    d3.select(this).attr("fill", (d) => {
                        if (d.data.value) {
                            // Use the getColor function to set the fill color of your circles
                            return "#4bc2a0"; // Use the getColor function to set the fill color of circles with data values
                        } else {
                            return "none"; // Or any default color for circles without data values
                        }
                    });
                    // Append a <g> (group) element to contain both <text> elements
                    const textGroup = svgBubble
                        .append("g")
                        .attr("id", "nodeGroup");

                    textGroup
                        .append("text") // Append the first <text> element
                        .attr("id", "nodeValue1")
                        .attr("x", 5)
                        .attr("y", 25)
                        .text(d.data.place)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .attr("fill", "#2a2828");

                    textGroup
                        .append("text") // Append the second <text> element
                        .attr("id", "nodeValue2") // Adjusted ID to make it unique
                        .attr("x", 5)
                        .attr("y", 65)
                        .text(d.data.name)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .attr("fill", "#2a2828");

                    textGroup
                        .append("text") // Append the second <text> element
                        .attr("id", "nodeValue3") // Adjusted ID to make it unique
                        .attr("x", 5)
                        .attr("y", 105)
                        .text(d.data.mengd)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .attr("fill", "#2a2828");

                    textGroup
                        .append("text") // Append the second <text> element
                        .attr("id", "nodeValue4") // Adjusted ID to make it unique
                        .attr("x", 5)
                        .attr("y", 145)
                        .text(d.data.andel_sverige)
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .attr("fill", "#2a2828");

                    d3.select(this).on("mouseout", function () {
                        // Restore the original color when the mouse leaves
                        d3.select(this).attr("fill", originalColor);
                        d3.select("#nodeValue1").remove();
                        d3.select("#nodeValue2").remove();
                        d3.select("#nodeValue3").remove();
                        d3.select("#nodeValue4").remove();

                        d3.select(svgMapRef.current).selectAll("path")
                        .filter(function(d) {
                            // Example condition: Change the fill of paths with certain names
                            return d.properties.name === originalClassName;
                        })
                        .style("fill", originalColor); // Update the fill attribute
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
            svgMap.selectAll("*").remove();
        };
    }, [bubbleData]);

    const dataDiagramStyle = {
        //minWidth: "900px",
        paddingRight: "10px",
        paddingTop: "0px",
        paddingLeft: "0px",
        //backgroundColor: "rgba(0, 90, 90, 0.18)",
        //backgroundColor: "rgba(0, 0, 70, 0.18)",
    };

    return (
        <div>
            <div className="dataDiagram" style={dataDiagramStyle}>
                <svg
                    ref={svgBubbleRef}
                    width={window.innerWidth - window.innerWidth / 3}
                    height={window.innerHeight - window.innerHeight / 4}
                />
            </div>
            <div>
                <div id="controls"></div>
                <div id="viz">
                    <svg
                        ref={svgMapRef}
                        width={600}
                        height={window.innerHeight - window.innerHeight / 4}
                    />
                </div>
                {/*  </div> */}
            </div>
        </div>
    );
};

/*

const MyD3Component = () => {
    const svgRef = useRef();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        //const width = window.innerWidth;
        //const height = window.innerHeight;
        const width = 600;
        const height = 600;

        const svg = d3.select(svgRef.current);

        if (graphData) {
            const nodesMap = {};
            graphData.nodes.forEach((node) => {
                nodesMap[node.name] = node;
            });

            graphData.links.forEach((link) => {
                link.source = nodesMap[link.source];
                link.target = nodesMap[link.target];
            });

            const simulation = d3
                .forceSimulation(graphData.nodes)
                .force("charge", d3.forceManyBody().strength(300))
                .force("center", d3.forceCenter(width, height))
                .force("collide", d3.forceCollide(40).strength(0.5))
                .force(
                    "link",
                    d3.forceLink(graphData.links).id((d) => d.name),
                )
                .on("tick", ticked);

            const links = svg
                .append("g")
                .selectAll("line")
                .data(graphData.links)
                .enter()
                .append("line")
                .attr("stroke-width", 3)
                .style("stroke", "blue");

            const drag = d3
                .drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);

            const textsAndNodes = svg
                .append("g")
                .selectAll("g")
                .data(graphData.nodes)
                .enter()
                .append("g")
                .call(drag);

            const colorScale = d3
                .scaleSequential()
                .domain([0, 50])
                .interpolator(d3.interpolateYlOrRd);

            var circles = textsAndNodes
                .append("circle")
                .attr("r", function (d) {
                    return d.value; // Set the radius to the value of d.value
                })
                .attr("fill", function (d) {
                    d.originalColor = colorScale(d.value); // Store the original color in a custom property
                    return d.originalColor; // Set the fill color based on d.value
                })
                .text(function (d) {
                    return d.value;
                })
                .on("mouseover", function (event, d) {
                    var originalColor = d3.select(this).attr("fill"); // Store the original color
                    d3.select(this).attr("fill", "white"); // Change the fill color to blue upon mouseover
                    svg.append("text")
                        .attr("id", "nodeValue")
                        .attr("x", d.x + 20)
                        .attr("y", d.y - 20)
                        .text("value: " + d.value);
                    // Restore the original color when the mouse leaves
                    d3.select(this).on("mouseout", function () {
                        d3.select(this).attr("fill", originalColor);
                        d3.select("#nodeValue").remove();
                    });
                });

            const texts = textsAndNodes.append("text").text((d) => d.name);

            function ticked() {
                textsAndNodes.attr("transform", (d) => `translate(${d.x},${d.y})`);

                links
                    .attr("x1", (d) => d.source.x)
                    .attr("y1", (d) => d.source.y)
                    .attr("x2", (d) => d.target.x)
                    .attr("y2", (d) => d.target.y);
            }

            function dragstarted(event, d) {
                if (!event.active) {
                    simulation.alphaTarget(0.3).restart();
                }
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) {
                    simulation.alphaTarget(0);
                }
                d.fx = null;
                d.fy = null;
            }

            return () => {
                // Clean up any d3-related resources here if needed // Clean up any d3-related resources here if needed
                svg.selectAll("*").remove(); // Remove all elements added by D3
                simulation.stop(); // Stop the D3 simulation
            };
        }
    }, [graphData]);

    useEffect(() => {

        // Fetch data from the API endpoint
        fetch('http://localhost:3001/api/column/D3Result?livsmedel=Köttbullar')
            .then(response => response.json())
            .then(data => {
                // Process fetched data and assign it to graphData
                const processedData = {
                    nodes: data.map(item => ({
                        name: item.name,
                        value: parseFloat(item.value), // Convert value to a float
                        x: parseFloat(item.x), // Convert x-coordinate to a float
                        y: parseFloat(item.y), // Convert y-coordinate to a float
                    })),
                    links: [],
                };

                // Add links based on the nodes data
                // Example: connect nodes sequentially
                for (let i = 0; i < processedData.nodes.length - 1; i++) {
                    processedData.links.push({ source: processedData.nodes[i].name, target: processedData.nodes[i + 1].name });
                }

                setGraphData(processedData);
            });
    }, []);

    const d3componentStyle = {
        zIndex: 0,
    };
    return (
        <div className="ropiojw" style={d3componentStyle}>
            <svg ref={svgRef} width="100%" height="90vw" />
        </div>
    );
};

*/

/*
var H1BGraph = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <svg width="700" height="500"></svg>{" "}
            </div>{" "}
        </div>
    );
};
*/

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

function SelectSubSubGroup({ main, sub, onChange }) {
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
                    `http://localhost:3001/api/column/sub_sub_group?&sub_group=${sub}`,
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

                localStorage.setItem(
                    "column_subsub_group",
                    JSON.stringify(filteredData),
                );
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
            <div>{`Sub_sub Value: '${inputValue}'`}</div>
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
    //const [sub_sub, setSub_sub] = useState("");

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
        //setSub_sub(newInputValue);
    }
    /*function handleChangeSubSub(newInputValue) {
        setSub_sub(newInputValue);
    }*/

    return (
        <React.Fragment>
            <Box
                sx={{
                    flexGrow: 1,
                    margin: "3%",

                    borderRadius: 1,

                    paddingTop: "20px",
                    paddingLeft: "60px",
                    paddingRight: "55px",
                    paddingBottom: "40px",
                    backgroundColor: "rgba(0, 0, 70, 0.18)",
                    boxShadow: "inset 0 1px 10px 0 #050307",
                }}
            >
                <div style={containerStyle}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingRight: "15px",
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
                    {/* <MapComponent /> */}
                </div>
                <div></div>
            </Box>
        </React.Fragment>
    );
}
