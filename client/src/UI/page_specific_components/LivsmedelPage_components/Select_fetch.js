import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

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
            <div>{`inputValue: '${inputValue}'`}</div>
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
                    return (
                        /[^\d]/.test(item.id) &&
                        item.id !== "NULL"
                    );
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
            <div>{`Sub Value: '${inputValue}'`}</div>
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
                    option.id === value.id
                }
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
                    return (
                        /[^\d]/.test(item.id) &&
                        item.id !== "NULL"
                    );
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
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                }
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
    const [sub_sub, setSub_sub] = useState("");

    const containerStyle = {
        width: "100%",
        display: "flex",
        alignItems: "center", // Center items horizontally
        justifyContent: "flex-end", // Center items vertically
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
        setSub_sub(newInputValue);
    }

    function handleChangeSubSub(newInputValue) {
        setSub_sub(newInputValue);
    }

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
                    <SelectSubSubGroup main={sub} sub={sub_sub} onChange={handleChangeSubSub} />
                </div>
            </Box>
        </React.Fragment>
    );
}
