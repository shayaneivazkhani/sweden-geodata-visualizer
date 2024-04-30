import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Typography from "@mui/material/Typography";


// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/*
    Two sorting functions (descendingComparator and getComparator) are defined to facilitate sorting of data rows based on specific attributes.
*/
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

// The minus sign (-) in front of the second descendingComparator() function call is used to reverse the sorting order.
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
/* 
    The stableSort function is defined to provide stable sorting of data rows. It ensures that the relative order of equal elements remains unchanged after sorting.
*/
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* 
    Data Preparation: The createData function is defined to create rows of data with specific attributes like 
    id, name, produkt, units, unit, and andel. Then, an array of data rows (rows) is created using this function.
*/
function createData(name, produkt, units, unit, andel) {
    return { name, produkt, units, unit, andel };
}

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* 
    Table Head Configuration: The headCells array is defined to configure the headers of the table columns. 
    Each object in this array represents a column header with properties like id, numeric (boolean), 
    disablePadding (boolean), and label.
*/
const headCells = [
    {
        id: "name",
        disablePadding: false,
        label: "Kommun",
        width: 170,
        align: "left",
        sortable: true,
    },
    {
        id: "produkt",
        disablePadding: false,
        label: "Livsmedel",
        width: 80,
        align: "center",
        sortable: false,
    },
    {
        id: "units",
        disablePadding: false,
        label: "mängd",
        width: 100,
        align: "right",
        format: (value) => value.toLocaleString("sv-SE"),
        sortable: false,
    },
    {
        id: "unit",
        disablePadding: false,
        label: "enhet",
        width: 50,
        align: "right",
        sortable: false,
    },
    {
        id: "andel",
        disablePadding: false,
        label: "% 🇸🇪 förbrukning",
        width: 160,
        align: "right",
        format: (value) => value.toLocaleString("sv-SE"),
        sortable: true,
    },
];

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* 
    'EnhancedTableHead.propTypes = ...': In React, the propTypes property is used to define the types of props that a component should receive. 
    It's a way to enforce type checking in React components, helping catch bugs early in development.
*/
EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

/* 
    EnhancedTableHead Component: This component renders the table header row with checkboxes 
    for selection and sortable column headers. It handles sorting and selection functionalities.
*/
function EnhancedTableHead(props) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ width: headCell.width }}
                        sx={{
                            backgroundColor: "#00acc1",
                            borderBottom: "2px solid rgb(0,0,0)",
                        }}
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : "asc"
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "monospace", // Specify the desired font family
                                        fontSize: "12px", // Specify the desired font size
                                    }}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box
                                            component="span"
                                            sx={visuallyHidden}
                                        >
                                            {order === "desc"
                                                ? "sorted descending"
                                                : "sorted ascending"}
                                        </Box>
                                    ) : null}
                                </Typography>
                            </TableSortLabel>
                        ) : (
                            <Typography
                                sx={{
                                    fontFamily: "monospace", // Specify the desired font family
                                    fontSize: "12px", // Specify the desired font size
                                }}
                            >
                                {headCell.label}
                            </Typography>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

/* 
    EnhancedTable Component: This is the main component that renders the enhanced table. 
    It manages the table state, including sorting order, selected items, pagination, and density padding. 
    It also renders the table body, rows, pagination, and toolbar components.
*/
export default function EnhancedTable(props) {
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("andel");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    // Empty array to hold fetched data
    const [rows, setRows] = useState([]); // Initialize rows state with an empty array
    // Inside your component function
    const [forceUpdate, setForceUpdate] = useState(false); // Step 1: State for manual triggering

    // Function to manually trigger recalculation because the first time this table gets viewed then it doesnt show the data untill USER select a column to get sorted or changed table "show rows" attribute
    const triggerRecalculation = () => {
        setForceUpdate((prevState) => !prevState); // Step 2: Modify the state variable
    };

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows, forceUpdate], // Step 3: Include forceUpdate
    );

    /*
        In React functional components, you can't directly check if a component is mounted or not as you
        would in class components with 'this state' or this isMounted() *. Instead, you typically use the
        useEffect ' hook to manage side effects such as fetching data and cleaning up.
        However, you can simulate the concept of a component being mounted or unmounted using a variable.
        This variable can be updated in the 'useEffect hook's cleanup function. When the component
        mounts, the cleanup function from the previous render will be called, setting the variable to false'.
        When the component unmounts, the cleanup function of the current render won't be called, leaving the
        variable as true.
    */
    useEffect(() => {
        const cachedData = localStorage.getItem(`${props.produkt}`);
        // Check local storage for cached data
        if (cachedData) {
            setRows(JSON.parse(cachedData));
        } else {
            /* Fetch data from the endpoint
            MENU:
                props.sub_group == -1 ——> main_group LIKE props.produkt
                props.sub_group == 0 ——> sub_group LIKE props.produkt
                props.sub_group == -1 ——> sub_sub_group LIKE props.produkt
        */
            fetch(
                `http://localhost:3001/api/purchase?sub_g=${props.sub_group}&livsmedel=${props.produkt}`,
            )
                .then((response) => {
                    // Check if response is ok
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    // Parse JSON response
                    return response.json();
                })
                .then((data) => {
                    // Assuming the JSON response is an array of objects with properties constellation_name, sub_sub_group, totalunits, and percentage_of_total_units
                    // Iterate over each object in the array and create data objects using createData function
                    const newData = data
                        .filter((item) => item.totalunits > 5 && item.percentage_of_total_units !== 'NULL')
                        .map((item) =>
                            createData(
                                item.constellation_name,
                                item.group,
                                item.totalunits,
                                item.unit,
                                parseFloat(item.percentage_of_total_units),
                            ),
                        );

                    // Set the new data to state
                    setRows(newData);

                    // Save fetched data to local storage så att nya updateringar av sidan inte orsakar extra Fetch requests till servern ——> minskar belastning på servern med ökad användare
                    localStorage.setItem(
                        `${props.produkt}`,
                        JSON.stringify(newData),
                    );
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [props.sub_group, props.produkt]); // Empty dependency array ensures this effect runs only once on component mount (ComponentDidMount)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <React.Fragment>
            <FormControlLabel
                label={
                    <Typography
                        sx={{
                            fontFamily: "monospace", // Specify the desired font family
                            fontSize: "13px", // Specify the desired font size
                        }}
                    >
                        dense
                    </Typography>
                }
                style={{
                    color: "var(--accent_color3)",
                    paddingRight: "20px",
                    borderRadius: "20px",
                }}
                control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                }
            />
            {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
            <Paper sx={{ width: "760px", height: "500px", overflow: "hidden" }}>
                <TableContainer
                    sx={{
                        height: "450px",
                        "&::-webkit-scrollbar": {
                            width: "9px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(255, 134, 18, 0.98)",
                            borderRadius: "3px",
                            transition: "background-color 0.2s", // Add transition for smooth effect
                            "&:hover": {
                                backgroundColor: "rgba(255,106,50, 0.97)", // Change opacity on hover
                            },
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "rgba(0,172,193, 1.0)",
                            //backgroundColor: "rgba(163,239,243, 0.97)",
                            "&:hover": {
                                backgroundColor: "rgba(0,172,193, 0.97)", // Change opacity on hover
                            },
                        },
                    }}
                >
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        size={dense ? "small" : "medium"}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={
                                            index % 2 === 0
                                                ? {
                                                      backgroundColor:
                                                          "rgba(187,176,219, 0.23)",
                                                  }
                                                : {
                                                      backgroundColor:
                                                          "rgba(187,176,219, 0.30)",
                                                  }
                                        }
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                            style={{ width: "170px" }}
                                        >
                                            {row.name}
                                        </TableCell>

                                        <TableCell align="center">
                                            {row.produkt}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.units}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.unit}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{ width: "100px" }}
                                        >
                                            {row.andel}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 30 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[
                        25,
                        50,
                        100,
                        { label: "All", value: -1 },
                    ]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        ".MuiTablePagination-toolbar": {
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderTop: "2px solid rgb(0,0,0)",
                        },
                        ".MuiTablePagination-displayedRows": {
                            color: "black",
                        },
                        ".MuiTablePagination-selectLabel": {
                            color: "black",
                        },
                    }}
                />
            </Paper>
        </React.Fragment>
    );
}
