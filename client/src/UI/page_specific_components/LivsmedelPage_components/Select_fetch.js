import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useRef } from "react";
import * as d3 from "d3";
import zIndex from "@mui/material/styles/zIndex";

const MyD3Component = () => {
    const svgRef = useRef();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const width = 600;
        const height = 600;

        const svg = d3.select(svgRef.current);

        if (graphData) {
            const pack = d3.pack()
                .size([width, height])
                .padding(5);

            const root = d3.hierarchy(graphData)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value);

            const packedData = pack(root);

            const colorScale = d3.scaleSequential()
                .domain([0, 50])
                .interpolator(d3.interpolateYlOrRd);

            const node = svg.selectAll("g")
                .data(packedData.descendants())
                .enter().append("g")
                .attr("transform", d => `translate(${d.x},${d.y})`);

            node.append("circle")
                .attr("r", d => d.r)
                .attr("fill", d => colorScale(d.data.value))
                .attr("fill-opacity", 0.7) 
                .on("mouseover", function (event, d) {
                    var originalColor = d3.select(this).attr("fill"); // Store the original color
                    d3.select(this).attr("fill", "white"); // Change the fill color to blue upon mouseover
                    svg.append("text")
                        .attr("id", "nodeValue")
                        .attr("x", d.x + 20)
                        .attr("y", d.y - 20)
                        .text(d.value + "KG");
                    // Restore the original color when the mouse leaves
                    d3.select(this).on("mouseout", function () {
                        d3.select(this).attr("fill", originalColor);
                        d3.select("#nodeValue").remove();
                    });
                });

            node.append("text")
                .attr("dy", "0.3em")
                .attr("text-anchor", "middle")
                .text(d => d.data.name);

            return () => {
                svg.selectAll("*").remove();
            };
        }
    }, [graphData]);

    useEffect(() => {
        fetch('http://localhost:3001/api/column/D3Result?livsmedel=Köttbullar')
            .then(response => response.json())
            .then(data => {
                const processedData = data.map(item => ({
                    name: item.name,
                    value: parseFloat(item.value),
                }));

                setGraphData({ children: processedData });
            });
    }, []);

    return (
        <div className="ropiojw">
            <svg ref={svgRef} width="100%" height="90vw" />
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


var H1BGraph = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <svg width="700" height="500"></svg>{" "}
            </div>{" "}
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

function SelectMainGroup({ onChange }) {
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
    }, [loading]);

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
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "flex-end", // Center items vertically
        backgroundColor: "rgba(0, 0, 70, 0.18)",
    };

    const textStyle = {
        color: "var(--accent_color3)",
        paddingRight: "50px",
        borderRadius: "20px",
    };

    function handleChangeMain(newInputValue) {
        setMain(newInputValue);
        setSub(newInputValue);
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
                    borderRadius: 1,
                    paddingTop: "35px",
                    paddingBottom: "35px",
                    backgroundColor: "rgba(0, 0, 70, 0.18)",
                    boxShadow: "0 0px 18px 0 rgba(162,155,254,0.28)",
                }}
            >
                <div style={containerStyle}>
                    <div style={textStyle}>{`Main: '${main}'`}</div>
                    <div style={textStyle}>{`Sub: '${sub}'`}</div>
                    {/*<div style={textStyle}>{`Sub_sub: '${sub_sub}'`}</div> */}
                    <br />

                    {/* Pass main and onChange props */}
                    <SelectMainGroup onChange={handleChangeMain} />
                    <SelectSubGroup main={sub} onChange={handleChangeSub} />
                    {/*  
                        <SelectSubSubGroup
                            main={sub}
                            sub={sub_sub}
                            onChange={handleChangeSubSub}
                        />
                    */}
                </div>
                <div>
                    <MyD3Component />
                </div>
            </Box>
        </React.Fragment>
    );
}