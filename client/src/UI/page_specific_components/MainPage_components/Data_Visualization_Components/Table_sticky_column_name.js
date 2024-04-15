import React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#00acc1",
        color: theme.palette.common.white,
        borderBottom: "2px solid rgb(0,0,0)"
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 18,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "rgba(187,176,219, 0.23)",
    },
    "&:nth-of-type(even)": {
        backgroundColor: "rgba(187,176,219, 0.30)",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 20,
    },
}));

const columns = [
    { id: "kommun", label: "Kommun", minWidth: 170 },
    { id: "produkt", label: "Livsmedel", minWidth: 80 },
    {
        id: "storlek",
        label: "mängd",
        minWidth: 100,
        align: "center",
        format: (value) => value.toLocaleString("sv-SE"),
    },
    { id: "enhet", label: "enhet", align: "right", minWidth: 50 },
    {
        id: "andel",
        label: "% av Landets förbrukning",
        minWidth: 100,
        align: "right",
        format: (value) => value.toLocaleString("sv-SE"),
    },
];

function createData(kommun, produkt, storlek, enhet, andel) {
    return { kommun, produkt, storlek, enhet, andel };
}

export default function StickyHeadTable(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    // Empty array to hold fetched data
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        // Fetch data from the endpoint
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
                    .filter((item) => item.totalunits > 5)
                    .map((item) =>
                        createData(
                            item.constellation_name,
                            item.group,
                            item.totalunits,
                            item.unit,
                            item.percentage_of_total_units,
                        ),
                    );

                // Set the new data to state
                setRows(newData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on component mount (ComponentDidMount)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "750px", height: "500px", overflow: "hidden", }}>
            <TableContainer
                sx={{
                    height: "450px",
                    "&::-webkit-scrollbar": {
                        width: 10,
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgba(0, 0, 0, 0.01)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "orange",
                        borderRadius: 0,
                    },
                }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((row) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.kommun}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[
                    50,
                    100,
                    { label: "All", value: rows.length },
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
                        borderTop: "2px solid rgb(0,0,0)"
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
    );
}
