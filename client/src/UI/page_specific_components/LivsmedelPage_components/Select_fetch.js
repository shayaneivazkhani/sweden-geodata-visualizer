import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import { useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoMercator } from "d3-geo-projection";
import { positions } from "@mui/system";

const MapComponent = () => {
    const svgRef = useRef(); // Ref for SVG element
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const platserData = await d3.json(
                    "/GeoJSON/kommuner_sverige.geojson",
                );
                setGraphData(platserData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData(); // Call fetchData to fetch data and setGraphData
    }, []);

    useEffect(() => {
        const svg = d3
            .select(svgRef.current)
            //.style("max-width", "100%")
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

        const colorbrewer = {
            YlGn: {
                3: ["#f7fcb9", "#addd8e", "#31a354"],
                4: ["#ffffcc", "#c2e699", "#78c679", "#238443"],
                5: ["#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"],
                6: [
                    "#ffffcc",
                    "#d9f0a3",
                    "#addd8e",
                    "#78c679",
                    "#31a354",
                    "#006837",
                ],
                7: [
                    "#ffffcc",
                    "#d9f0a3",
                    "#addd8e",
                    "#78c679",
                    "#41ab5d",
                    "#238443",
                    "#005a32",
                ],
                8: [
                    "#ffffe5",
                    "#f7fcb9",
                    "#d9f0a3",
                    "#addd8e",
                    "#78c679",
                    "#41ab5d",
                    "#238443",
                    "#005a32",
                ],
                9: [
                    "#ffffe5",
                    "#f7fcb9",
                    "#d9f0a3",
                    "#addd8e",
                    "#78c679",
                    "#41ab5d",
                    "#238443",
                    "#006837",
                    "#004529",
                ],
            },
            YlGnBu: {
                3: ["#edf8b1", "#7fcdbb", "#2c7fb8"],
                4: ["#ffffcc", "#a1dab4", "#41b6c4", "#225ea8"],
                5: ["#ffffcc", "#a1dab4", "#41b6c4", "#2c7fb8", "#253494"],
                6: [
                    "#ffffcc",
                    "#c7e9b4",
                    "#7fcdbb",
                    "#41b6c4",
                    "#2c7fb8",
                    "#253494",
                ],
                7: [
                    "#ffffcc",
                    "#c7e9b4",
                    "#7fcdbb",
                    "#41b6c4",
                    "#1d91c0",
                    "#225ea8",
                    "#0c2c84",
                ],
                8: [
                    "#ffffd9",
                    "#edf8b1",
                    "#c7e9b4",
                    "#7fcdbb",
                    "#41b6c4",
                    "#1d91c0",
                    "#225ea8",
                    "#0c2c84",
                ],
                9: [
                    "#ffffd9",
                    "#edf8b1",
                    "#c7e9b4",
                    "#7fcdbb",
                    "#41b6c4",
                    "#1d91c0",
                    "#225ea8",
                    "#253494",
                    "#081d58",
                ],
            },
            GnBu: {
                3: ["#e0f3db", "#a8ddb5", "#43a2ca"],
                4: ["#f0f9e8", "#bae4bc", "#7bccc4", "#2b8cbe"],
                5: ["#f0f9e8", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac"],
                6: [
                    "#f0f9e8",
                    "#ccebc5",
                    "#a8ddb5",
                    "#7bccc4",
                    "#43a2ca",
                    "#0868ac",
                ],
                7: [
                    "#f0f9e8",
                    "#ccebc5",
                    "#a8ddb5",
                    "#7bccc4",
                    "#4eb3d3",
                    "#2b8cbe",
                    "#08589e",
                ],
                8: [
                    "#f7fcf0",
                    "#e0f3db",
                    "#ccebc5",
                    "#a8ddb5",
                    "#7bccc4",
                    "#4eb3d3",
                    "#2b8cbe",
                    "#08589e",
                ],
                9: [
                    "#f7fcf0",
                    "#e0f3db",
                    "#ccebc5",
                    "#a8ddb5",
                    "#7bccc4",
                    "#4eb3d3",
                    "#2b8cbe",
                    "#0868ac",
                    "#084081",
                ],
            },
            BuGn: {
                3: ["#e5f5f9", "#99d8c9", "#2ca25f"],
                4: ["#edf8fb", "#b2e2e2", "#66c2a4", "#238b45"],
                5: ["#edf8fb", "#b2e2e2", "#66c2a4", "#2ca25f", "#006d2c"],
                6: [
                    "#edf8fb",
                    "#ccece6",
                    "#99d8c9",
                    "#66c2a4",
                    "#2ca25f",
                    "#006d2c",
                ],
                7: [
                    "#edf8fb",
                    "#ccece6",
                    "#99d8c9",
                    "#66c2a4",
                    "#41ae76",
                    "#238b45",
                    "#005824",
                ],
                8: [
                    "#f7fcfd",
                    "#e5f5f9",
                    "#ccece6",
                    "#99d8c9",
                    "#66c2a4",
                    "#41ae76",
                    "#238b45",
                    "#005824",
                ],
                9: [
                    "#f7fcfd",
                    "#e5f5f9",
                    "#ccece6",
                    "#99d8c9",
                    "#66c2a4",
                    "#41ae76",
                    "#238b45",
                    "#006d2c",
                    "#00441b",
                ],
            },
            PuBuGn: {
                3: ["#ece2f0", "#a6bddb", "#1c9099"],
                4: ["#f6eff7", "#bdc9e1", "#67a9cf", "#02818a"],
                5: ["#f6eff7", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59"],
                6: [
                    "#f6eff7",
                    "#d0d1e6",
                    "#a6bddb",
                    "#67a9cf",
                    "#1c9099",
                    "#016c59",
                ],
                7: [
                    "#f6eff7",
                    "#d0d1e6",
                    "#a6bddb",
                    "#67a9cf",
                    "#3690c0",
                    "#02818a",
                    "#016450",
                ],
                8: [
                    "#fff7fb",
                    "#ece2f0",
                    "#d0d1e6",
                    "#a6bddb",
                    "#67a9cf",
                    "#3690c0",
                    "#02818a",
                    "#016450",
                ],
                9: [
                    "#fff7fb",
                    "#ece2f0",
                    "#d0d1e6",
                    "#a6bddb",
                    "#67a9cf",
                    "#3690c0",
                    "#02818a",
                    "#016c59",
                    "#014636",
                ],
            },
            PuBu: {
                3: ["#ece7f2", "#a6bddb", "#2b8cbe"],
                4: ["#f1eef6", "#bdc9e1", "#74a9cf", "#0570b0"],
                5: ["#f1eef6", "#bdc9e1", "#74a9cf", "#2b8cbe", "#045a8d"],
                6: [
                    "#f1eef6",
                    "#d0d1e6",
                    "#a6bddb",
                    "#74a9cf",
                    "#2b8cbe",
                    "#045a8d",
                ],
                7: [
                    "#f1eef6",
                    "#d0d1e6",
                    "#a6bddb",
                    "#74a9cf",
                    "#3690c0",
                    "#0570b0",
                    "#034e7b",
                ],
                8: [
                    "#fff7fb",
                    "#ece7f2",
                    "#d0d1e6",
                    "#a6bddb",
                    "#74a9cf",
                    "#3690c0",
                    "#0570b0",
                    "#034e7b",
                ],
                9: [
                    "#fff7fb",
                    "#ece7f2",
                    "#d0d1e6",
                    "#a6bddb",
                    "#74a9cf",
                    "#3690c0",
                    "#0570b0",
                    "#045a8d",
                    "#023858",
                ],
            },
            BuPu: {
                3: ["#e0ecf4", "#9ebcda", "#8856a7"],
                4: ["#edf8fb", "#b3cde3", "#8c96c6", "#88419d"],
                5: ["#edf8fb", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"],
                6: [
                    "#edf8fb",
                    "#bfd3e6",
                    "#9ebcda",
                    "#8c96c6",
                    "#8856a7",
                    "#810f7c",
                ],
                7: [
                    "#edf8fb",
                    "#bfd3e6",
                    "#9ebcda",
                    "#8c96c6",
                    "#8c6bb1",
                    "#88419d",
                    "#6e016b",
                ],
                8: [
                    "#f7fcfd",
                    "#e0ecf4",
                    "#bfd3e6",
                    "#9ebcda",
                    "#8c96c6",
                    "#8c6bb1",
                    "#88419d",
                    "#6e016b",
                ],
                9: [
                    "#f7fcfd",
                    "#e0ecf4",
                    "#bfd3e6",
                    "#9ebcda",
                    "#8c96c6",
                    "#8c6bb1",
                    "#88419d",
                    "#810f7c",
                    "#4d004b",
                ],
            },
            RdPu: {
                3: ["#fde0dd", "#fa9fb5", "#c51b8a"],
                4: ["#feebe2", "#fbb4b9", "#f768a1", "#ae017e"],
                5: ["#feebe2", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"],
                6: [
                    "#feebe2",
                    "#fcc5c0",
                    "#fa9fb5",
                    "#f768a1",
                    "#c51b8a",
                    "#7a0177",
                ],
                7: [
                    "#feebe2",
                    "#fcc5c0",
                    "#fa9fb5",
                    "#f768a1",
                    "#dd3497",
                    "#ae017e",
                    "#7a0177",
                ],
                8: [
                    "#fff7f3",
                    "#fde0dd",
                    "#fcc5c0",
                    "#fa9fb5",
                    "#f768a1",
                    "#dd3497",
                    "#ae017e",
                    "#7a0177",
                ],
                9: [
                    "#fff7f3",
                    "#fde0dd",
                    "#fcc5c0",
                    "#fa9fb5",
                    "#f768a1",
                    "#dd3497",
                    "#ae017e",
                    "#7a0177",
                    "#49006a",
                ],
            },
            PuRd: {
                3: ["#e7e1ef", "#c994c7", "#dd1c77"],
                4: ["#f1eef6", "#d7b5d8", "#df65b0", "#ce1256"],
                5: ["#f1eef6", "#d7b5d8", "#df65b0", "#dd1c77", "#980043"],
                6: [
                    "#f1eef6",
                    "#d4b9da",
                    "#c994c7",
                    "#df65b0",
                    "#dd1c77",
                    "#980043",
                ],
                7: [
                    "#f1eef6",
                    "#d4b9da",
                    "#c994c7",
                    "#df65b0",
                    "#e7298a",
                    "#ce1256",
                    "#91003f",
                ],
                8: [
                    "#f7f4f9",
                    "#e7e1ef",
                    "#d4b9da",
                    "#c994c7",
                    "#df65b0",
                    "#e7298a",
                    "#ce1256",
                    "#91003f",
                ],
                9: [
                    "#f7f4f9",
                    "#e7e1ef",
                    "#d4b9da",
                    "#c994c7",
                    "#df65b0",
                    "#e7298a",
                    "#ce1256",
                    "#980043",
                    "#67001f",
                ],
            },
            OrRd: {
                3: ["#fee8c8", "#fdbb84", "#e34a33"],
                4: ["#fef0d9", "#fdcc8a", "#fc8d59", "#d7301f"],
                5: ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"],
                6: [
                    "#fef0d9",
                    "#fdd49e",
                    "#fdbb84",
                    "#fc8d59",
                    "#e34a33",
                    "#b30000",
                ],
                7: [
                    "#fef0d9",
                    "#fdd49e",
                    "#fdbb84",
                    "#fc8d59",
                    "#ef6548",
                    "#d7301f",
                    "#990000",
                ],
                8: [
                    "#fff7ec",
                    "#fee8c8",
                    "#fdd49e",
                    "#fdbb84",
                    "#fc8d59",
                    "#ef6548",
                    "#d7301f",
                    "#990000",
                ],
                9: [
                    "#fff7ec",
                    "#fee8c8",
                    "#fdd49e",
                    "#fdbb84",
                    "#fc8d59",
                    "#ef6548",
                    "#d7301f",
                    "#b30000",
                    "#7f0000",
                ],
            },
            YlOrRd: {
                3: ["#ffeda0", "#feb24c", "#f03b20"],
                4: ["#ffffb2", "#fecc5c", "#fd8d3c", "#e31a1c"],
                5: ["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"],
                6: [
                    "#ffffb2",
                    "#fed976",
                    "#feb24c",
                    "#fd8d3c",
                    "#f03b20",
                    "#bd0026",
                ],
                7: [
                    "#ffffb2",
                    "#fed976",
                    "#feb24c",
                    "#fd8d3c",
                    "#fc4e2a",
                    "#e31a1c",
                    "#b10026",
                ],
                8: [
                    "#ffffcc",
                    "#ffeda0",
                    "#fed976",
                    "#feb24c",
                    "#fd8d3c",
                    "#fc4e2a",
                    "#e31a1c",
                    "#b10026",
                ],
                9: [
                    "#ffffcc",
                    "#ffeda0",
                    "#fed976",
                    "#feb24c",
                    "#fd8d3c",
                    "#fc4e2a",
                    "#e31a1c",
                    "#bd0026",
                    "#800026",
                ],
            },
            YlOrBr: {
                3: ["#fff7bc", "#fec44f", "#d95f0e"],
                4: ["#ffffd4", "#fed98e", "#fe9929", "#cc4c02"],
                5: ["#ffffd4", "#fed98e", "#fe9929", "#d95f0e", "#993404"],
                6: [
                    "#ffffd4",
                    "#fee391",
                    "#fec44f",
                    "#fe9929",
                    "#d95f0e",
                    "#993404",
                ],
                7: [
                    "#ffffd4",
                    "#fee391",
                    "#fec44f",
                    "#fe9929",
                    "#ec7014",
                    "#cc4c02",
                    "#8c2d04",
                ],
                8: [
                    "#ffffe5",
                    "#fff7bc",
                    "#fee391",
                    "#fec44f",
                    "#fe9929",
                    "#ec7014",
                    "#cc4c02",
                    "#8c2d04",
                ],
                9: [
                    "#ffffe5",
                    "#fff7bc",
                    "#fee391",
                    "#fec44f",
                    "#fe9929",
                    "#ec7014",
                    "#cc4c02",
                    "#993404",
                    "#662506",
                ],
            },
            Purples: {
                3: ["#efedf5", "#bcbddc", "#756bb1"],
                4: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#6a51a3"],
                5: ["#f2f0f7", "#cbc9e2", "#9e9ac8", "#756bb1", "#54278f"],
                6: [
                    "#f2f0f7",
                    "#dadaeb",
                    "#bcbddc",
                    "#9e9ac8",
                    "#756bb1",
                    "#54278f",
                ],
                7: [
                    "#f2f0f7",
                    "#dadaeb",
                    "#bcbddc",
                    "#9e9ac8",
                    "#807dba",
                    "#6a51a3",
                    "#4a1486",
                ],
                8: [
                    "#fcfbfd",
                    "#efedf5",
                    "#dadaeb",
                    "#bcbddc",
                    "#9e9ac8",
                    "#807dba",
                    "#6a51a3",
                    "#4a1486",
                ],
                9: [
                    "#fcfbfd",
                    "#efedf5",
                    "#dadaeb",
                    "#bcbddc",
                    "#9e9ac8",
                    "#807dba",
                    "#6a51a3",
                    "#54278f",
                    "#3f007d",
                ],
            },
            Blues: {
                3: ["#deebf7", "#9ecae1", "#3182bd"],
                4: ["#eff3ff", "#bdd7e7", "#6baed6", "#2171b5"],
                5: ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"],
                6: [
                    "#eff3ff",
                    "#c6dbef",
                    "#9ecae1",
                    "#6baed6",
                    "#3182bd",
                    "#08519c",
                ],
                7: [
                    "#eff3ff",
                    "#c6dbef",
                    "#9ecae1",
                    "#6baed6",
                    "#4292c6",
                    "#2171b5",
                    "#084594",
                ],
                8: [
                    "#f7fbff",
                    "#deebf7",
                    "#c6dbef",
                    "#9ecae1",
                    "#6baed6",
                    "#4292c6",
                    "#2171b5",
                    "#084594",
                ],
                9: [
                    "#f7fbff",
                    "#deebf7",
                    "#c6dbef",
                    "#9ecae1",
                    "#6baed6",
                    "#4292c6",
                    "#2171b5",
                    "#08519c",
                    "#08306b",
                ],
            },
            Greens: {
                3: ["#e5f5e0", "#a1d99b", "#31a354"],
                4: ["#edf8e9", "#bae4b3", "#74c476", "#238b45"],
                5: ["#edf8e9", "#bae4b3", "#74c476", "#31a354", "#006d2c"],
                6: [
                    "#edf8e9",
                    "#c7e9c0",
                    "#a1d99b",
                    "#74c476",
                    "#31a354",
                    "#006d2c",
                ],
                7: [
                    "#edf8e9",
                    "#c7e9c0",
                    "#a1d99b",
                    "#74c476",
                    "#41ab5d",
                    "#238b45",
                    "#005a32",
                ],
                8: [
                    "#f7fcf5",
                    "#e5f5e0",
                    "#c7e9c0",
                    "#a1d99b",
                    "#74c476",
                    "#41ab5d",
                    "#238b45",
                    "#005a32",
                ],
                9: [
                    "#f7fcf5",
                    "#e5f5e0",
                    "#c7e9c0",
                    "#a1d99b",
                    "#74c476",
                    "#41ab5d",
                    "#238b45",
                    "#006d2c",
                    "#00441b",
                ],
            },
            Oranges: {
                3: ["#fee6ce", "#fdae6b", "#e6550d"],
                4: ["#feedde", "#fdbe85", "#fd8d3c", "#d94701"],
                5: ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
                6: [
                    "#feedde",
                    "#fdd0a2",
                    "#fdae6b",
                    "#fd8d3c",
                    "#e6550d",
                    "#a63603",
                ],
                7: [
                    "#feedde",
                    "#fdd0a2",
                    "#fdae6b",
                    "#fd8d3c",
                    "#f16913",
                    "#d94801",
                    "#8c2d04",
                ],
                8: [
                    "#fff5eb",
                    "#fee6ce",
                    "#fdd0a2",
                    "#fdae6b",
                    "#fd8d3c",
                    "#f16913",
                    "#d94801",
                    "#8c2d04",
                ],
                9: [
                    "#fff5eb",
                    "#fee6ce",
                    "#fdd0a2",
                    "#fdae6b",
                    "#fd8d3c",
                    "#f16913",
                    "#d94801",
                    "#a63603",
                    "#7f2704",
                ],
            },
            Reds: {
                3: ["#fee0d2", "#fc9272", "#de2d26"],
                4: ["#fee5d9", "#fcae91", "#fb6a4a", "#cb181d"],
                5: ["#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15"],
                6: [
                    "#fee5d9",
                    "#fcbba1",
                    "#fc9272",
                    "#fb6a4a",
                    "#de2d26",
                    "#a50f15",
                ],
                7: [
                    "#fee5d9",
                    "#fcbba1",
                    "#fc9272",
                    "#fb6a4a",
                    "#ef3b2c",
                    "#cb181d",
                    "#99000d",
                ],
                8: [
                    "#fff5f0",
                    "#fee0d2",
                    "#fcbba1",
                    "#fc9272",
                    "#fb6a4a",
                    "#ef3b2c",
                    "#cb181d",
                    "#99000d",
                ],
                9: [
                    "#fff5f0",
                    "#fee0d2",
                    "#fcbba1",
                    "#fc9272",
                    "#fb6a4a",
                    "#ef3b2c",
                    "#cb181d",
                    "#a50f15",
                    "#67000d",
                ],
            },
            Greys: {
                3: ["#f0f0f0", "#bdbdbd", "#636363"],
                4: ["#f7f7f7", "#cccccc", "#969696", "#525252"],
                5: ["#f7f7f7", "#cccccc", "#969696", "#636363", "#252525"],
                6: [
                    "#f7f7f7",
                    "#d9d9d9",
                    "#bdbdbd",
                    "#969696",
                    "#636363",
                    "#252525",
                ],
                7: [
                    "#f7f7f7",
                    "#d9d9d9",
                    "#bdbdbd",
                    "#969696",
                    "#737373",
                    "#525252",
                    "#252525",
                ],
                8: [
                    "#ffffff",
                    "#f0f0f0",
                    "#d9d9d9",
                    "#bdbdbd",
                    "#969696",
                    "#737373",
                    "#525252",
                    "#252525",
                ],
                9: [
                    "#ffffff",
                    "#f0f0f0",
                    "#d9d9d9",
                    "#bdbdbd",
                    "#969696",
                    "#737373",
                    "#525252",
                    "#252525",
                    "#000000",
                ],
            },
            PuOr: {
                3: ["#f1a340", "#f7f7f7", "#998ec3"],
                4: ["#e66101", "#fdb863", "#b2abd2", "#5e3c99"],
                5: ["#e66101", "#fdb863", "#f7f7f7", "#b2abd2", "#5e3c99"],
                6: [
                    "#b35806",
                    "#f1a340",
                    "#fee0b6",
                    "#d8daeb",
                    "#998ec3",
                    "#542788",
                ],
                7: [
                    "#b35806",
                    "#f1a340",
                    "#fee0b6",
                    "#f7f7f7",
                    "#d8daeb",
                    "#998ec3",
                    "#542788",
                ],
                8: [
                    "#b35806",
                    "#e08214",
                    "#fdb863",
                    "#fee0b6",
                    "#d8daeb",
                    "#b2abd2",
                    "#8073ac",
                    "#542788",
                ],
                9: [
                    "#b35806",
                    "#e08214",
                    "#fdb863",
                    "#fee0b6",
                    "#f7f7f7",
                    "#d8daeb",
                    "#b2abd2",
                    "#8073ac",
                    "#542788",
                ],
                10: [
                    "#7f3b08",
                    "#b35806",
                    "#e08214",
                    "#fdb863",
                    "#fee0b6",
                    "#d8daeb",
                    "#b2abd2",
                    "#8073ac",
                    "#542788",
                    "#2d004b",
                ],
                11: [
                    "#7f3b08",
                    "#b35806",
                    "#e08214",
                    "#fdb863",
                    "#fee0b6",
                    "#f7f7f7",
                    "#d8daeb",
                    "#b2abd2",
                    "#8073ac",
                    "#542788",
                    "#2d004b",
                ],
            },
            BrBG: {
                3: ["#d8b365", "#f5f5f5", "#5ab4ac"],
                4: ["#a6611a", "#dfc27d", "#80cdc1", "#018571"],
                5: ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"],
                6: [
                    "#8c510a",
                    "#d8b365",
                    "#f6e8c3",
                    "#c7eae5",
                    "#5ab4ac",
                    "#01665e",
                ],
                7: [
                    "#8c510a",
                    "#d8b365",
                    "#f6e8c3",
                    "#f5f5f5",
                    "#c7eae5",
                    "#5ab4ac",
                    "#01665e",
                ],
                8: [
                    "#8c510a",
                    "#bf812d",
                    "#dfc27d",
                    "#f6e8c3",
                    "#c7eae5",
                    "#80cdc1",
                    "#35978f",
                    "#01665e",
                ],
                9: [
                    "#8c510a",
                    "#bf812d",
                    "#dfc27d",
                    "#f6e8c3",
                    "#f5f5f5",
                    "#c7eae5",
                    "#80cdc1",
                    "#35978f",
                    "#01665e",
                ],
                10: [
                    "#543005",
                    "#8c510a",
                    "#bf812d",
                    "#dfc27d",
                    "#f6e8c3",
                    "#c7eae5",
                    "#80cdc1",
                    "#35978f",
                    "#01665e",
                    "#003c30",
                ],
                11: [
                    "#543005",
                    "#8c510a",
                    "#bf812d",
                    "#dfc27d",
                    "#f6e8c3",
                    "#f5f5f5",
                    "#c7eae5",
                    "#80cdc1",
                    "#35978f",
                    "#01665e",
                    "#003c30",
                ],
            },
            PRGn: {
                3: ["#af8dc3", "#f7f7f7", "#7fbf7b"],
                4: ["#7b3294", "#c2a5cf", "#a6dba0", "#008837"],
                5: ["#7b3294", "#c2a5cf", "#f7f7f7", "#a6dba0", "#008837"],
                6: [
                    "#762a83",
                    "#af8dc3",
                    "#e7d4e8",
                    "#d9f0d3",
                    "#7fbf7b",
                    "#1b7837",
                ],
                7: [
                    "#762a83",
                    "#af8dc3",
                    "#e7d4e8",
                    "#f7f7f7",
                    "#d9f0d3",
                    "#7fbf7b",
                    "#1b7837",
                ],
                8: [
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837",
                ],
                9: [
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#f7f7f7",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837",
                ],
                10: [
                    "#40004b",
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837",
                    "#00441b",
                ],
                11: [
                    "#40004b",
                    "#762a83",
                    "#9970ab",
                    "#c2a5cf",
                    "#e7d4e8",
                    "#f7f7f7",
                    "#d9f0d3",
                    "#a6dba0",
                    "#5aae61",
                    "#1b7837",
                    "#00441b",
                ],
            },
            PiYG: {
                3: ["#e9a3c9", "#f7f7f7", "#a1d76a"],
                4: ["#d01c8b", "#f1b6da", "#b8e186", "#4dac26"],
                5: ["#d01c8b", "#f1b6da", "#f7f7f7", "#b8e186", "#4dac26"],
                6: [
                    "#c51b7d",
                    "#e9a3c9",
                    "#fde0ef",
                    "#e6f5d0",
                    "#a1d76a",
                    "#4d9221",
                ],
                7: [
                    "#c51b7d",
                    "#e9a3c9",
                    "#fde0ef",
                    "#f7f7f7",
                    "#e6f5d0",
                    "#a1d76a",
                    "#4d9221",
                ],
                8: [
                    "#c51b7d",
                    "#de77ae",
                    "#f1b6da",
                    "#fde0ef",
                    "#e6f5d0",
                    "#b8e186",
                    "#7fbc41",
                    "#4d9221",
                ],
                9: [
                    "#c51b7d",
                    "#de77ae",
                    "#f1b6da",
                    "#fde0ef",
                    "#f7f7f7",
                    "#e6f5d0",
                    "#b8e186",
                    "#7fbc41",
                    "#4d9221",
                ],
                10: [
                    "#8e0152",
                    "#c51b7d",
                    "#de77ae",
                    "#f1b6da",
                    "#fde0ef",
                    "#e6f5d0",
                    "#b8e186",
                    "#7fbc41",
                    "#4d9221",
                    "#276419",
                ],
                11: [
                    "#8e0152",
                    "#c51b7d",
                    "#de77ae",
                    "#f1b6da",
                    "#fde0ef",
                    "#f7f7f7",
                    "#e6f5d0",
                    "#b8e186",
                    "#7fbc41",
                    "#4d9221",
                    "#276419",
                ],
            },
            RdBu: {
                3: ["#ef8a62", "#f7f7f7", "#67a9cf"],
                4: ["#ca0020", "#f4a582", "#92c5de", "#0571b0"],
                5: ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"],
                6: [
                    "#b2182b",
                    "#ef8a62",
                    "#fddbc7",
                    "#d1e5f0",
                    "#67a9cf",
                    "#2166ac",
                ],
                7: [
                    "#b2182b",
                    "#ef8a62",
                    "#fddbc7",
                    "#f7f7f7",
                    "#d1e5f0",
                    "#67a9cf",
                    "#2166ac",
                ],
                8: [
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#d1e5f0",
                    "#92c5de",
                    "#4393c3",
                    "#2166ac",
                ],
                9: [
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#f7f7f7",
                    "#d1e5f0",
                    "#92c5de",
                    "#4393c3",
                    "#2166ac",
                ],
                10: [
                    "#67001f",
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#d1e5f0",
                    "#92c5de",
                    "#4393c3",
                    "#2166ac",
                    "#053061",
                ],
                11: [
                    "#67001f",
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#f7f7f7",
                    "#d1e5f0",
                    "#92c5de",
                    "#4393c3",
                    "#2166ac",
                    "#053061",
                ],
            },
            RdGy: {
                3: ["#ef8a62", "#ffffff", "#999999"],
                4: ["#ca0020", "#f4a582", "#bababa", "#404040"],
                5: ["#ca0020", "#f4a582", "#ffffff", "#bababa", "#404040"],
                6: [
                    "#b2182b",
                    "#ef8a62",
                    "#fddbc7",
                    "#e0e0e0",
                    "#999999",
                    "#4d4d4d",
                ],
                7: [
                    "#b2182b",
                    "#ef8a62",
                    "#fddbc7",
                    "#ffffff",
                    "#e0e0e0",
                    "#999999",
                    "#4d4d4d",
                ],
                8: [
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#e0e0e0",
                    "#bababa",
                    "#878787",
                    "#4d4d4d",
                ],
                9: [
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#ffffff",
                    "#e0e0e0",
                    "#bababa",
                    "#878787",
                    "#4d4d4d",
                ],
                10: [
                    "#67001f",
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#e0e0e0",
                    "#bababa",
                    "#878787",
                    "#4d4d4d",
                    "#1a1a1a",
                ],
                11: [
                    "#67001f",
                    "#b2182b",
                    "#d6604d",
                    "#f4a582",
                    "#fddbc7",
                    "#ffffff",
                    "#e0e0e0",
                    "#bababa",
                    "#878787",
                    "#4d4d4d",
                    "#1a1a1a",
                ],
            },
            RdYlBu: {
                3: ["#fc8d59", "#ffffbf", "#91bfdb"],
                4: ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"],
                6: [
                    "#d73027",
                    "#fc8d59",
                    "#fee090",
                    "#e0f3f8",
                    "#91bfdb",
                    "#4575b4",
                ],
                7: [
                    "#d73027",
                    "#fc8d59",
                    "#fee090",
                    "#ffffbf",
                    "#e0f3f8",
                    "#91bfdb",
                    "#4575b4",
                ],
                8: [
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee090",
                    "#e0f3f8",
                    "#abd9e9",
                    "#74add1",
                    "#4575b4",
                ],
                9: [
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee090",
                    "#ffffbf",
                    "#e0f3f8",
                    "#abd9e9",
                    "#74add1",
                    "#4575b4",
                ],
                10: [
                    "#a50026",
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee090",
                    "#e0f3f8",
                    "#abd9e9",
                    "#74add1",
                    "#4575b4",
                    "#313695",
                ],
                11: [
                    "#a50026",
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee090",
                    "#ffffbf",
                    "#e0f3f8",
                    "#abd9e9",
                    "#74add1",
                    "#4575b4",
                    "#313695",
                ],
            },
            Spectral: {
                3: ["#fc8d59", "#ffffbf", "#99d594"],
                4: ["#d7191c", "#fdae61", "#abdda4", "#2b83ba"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#abdda4", "#2b83ba"],
                6: [
                    "#d53e4f",
                    "#fc8d59",
                    "#fee08b",
                    "#e6f598",
                    "#99d594",
                    "#3288bd",
                ],
                7: [
                    "#d53e4f",
                    "#fc8d59",
                    "#fee08b",
                    "#ffffbf",
                    "#e6f598",
                    "#99d594",
                    "#3288bd",
                ],
                8: [
                    "#d53e4f",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#e6f598",
                    "#abdda4",
                    "#66c2a5",
                    "#3288bd",
                ],
                9: [
                    "#d53e4f",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#ffffbf",
                    "#e6f598",
                    "#abdda4",
                    "#66c2a5",
                    "#3288bd",
                ],
                10: [
                    "#9e0142",
                    "#d53e4f",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#e6f598",
                    "#abdda4",
                    "#66c2a5",
                    "#3288bd",
                    "#5e4fa2",
                ],
                11: [
                    "#9e0142",
                    "#d53e4f",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#ffffbf",
                    "#e6f598",
                    "#abdda4",
                    "#66c2a5",
                    "#3288bd",
                    "#5e4fa2",
                ],
            },
            RdYlGn: {
                3: ["#fc8d59", "#ffffbf", "#91cf60"],
                4: ["#d7191c", "#fdae61", "#a6d96a", "#1a9641"],
                5: ["#d7191c", "#fdae61", "#ffffbf", "#a6d96a", "#1a9641"],
                6: [
                    "#d73027",
                    "#fc8d59",
                    "#fee08b",
                    "#d9ef8b",
                    "#91cf60",
                    "#1a9850",
                ],
                7: [
                    "#d73027",
                    "#fc8d59",
                    "#fee08b",
                    "#ffffbf",
                    "#d9ef8b",
                    "#91cf60",
                    "#1a9850",
                ],
                8: [
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#d9ef8b",
                    "#a6d96a",
                    "#66bd63",
                    "#1a9850",
                ],
                9: [
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#ffffbf",
                    "#d9ef8b",
                    "#a6d96a",
                    "#66bd63",
                    "#1a9850",
                ],
                10: [
                    "#a50026",
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#d9ef8b",
                    "#a6d96a",
                    "#66bd63",
                    "#1a9850",
                    "#006837",
                ],
                11: [
                    "#a50026",
                    "#d73027",
                    "#f46d43",
                    "#fdae61",
                    "#fee08b",
                    "#ffffbf",
                    "#d9ef8b",
                    "#a6d96a",
                    "#66bd63",
                    "#1a9850",
                    "#006837",
                ],
            },
            Accent: {
                3: ["#7fc97f", "#beaed4", "#fdc086"],
                4: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99"],
                5: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0"],
                6: [
                    "#7fc97f",
                    "#beaed4",
                    "#fdc086",
                    "#ffff99",
                    "#386cb0",
                    "#f0027f",
                ],
                7: [
                    "#7fc97f",
                    "#beaed4",
                    "#fdc086",
                    "#ffff99",
                    "#386cb0",
                    "#f0027f",
                    "#bf5b17",
                ],
                8: [
                    "#7fc97f",
                    "#beaed4",
                    "#fdc086",
                    "#ffff99",
                    "#386cb0",
                    "#f0027f",
                    "#bf5b17",
                    "#666666",
                ],
            },
            Dark2: {
                3: ["#1b9e77", "#d95f02", "#7570b3"],
                4: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a"],
                5: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"],
                6: [
                    "#1b9e77",
                    "#d95f02",
                    "#7570b3",
                    "#e7298a",
                    "#66a61e",
                    "#e6ab02",
                ],
                7: [
                    "#1b9e77",
                    "#d95f02",
                    "#7570b3",
                    "#e7298a",
                    "#66a61e",
                    "#e6ab02",
                    "#a6761d",
                ],
                8: [
                    "#1b9e77",
                    "#d95f02",
                    "#7570b3",
                    "#e7298a",
                    "#66a61e",
                    "#e6ab02",
                    "#a6761d",
                    "#666666",
                ],
            },
            Paired: {
                3: ["#a6cee3", "#1f78b4", "#b2df8a"],
                4: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c"],
                5: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99"],
                6: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                ],
                7: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                ],
                8: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                    "#ff7f00",
                ],
                9: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                    "#ff7f00",
                    "#cab2d6",
                ],
                10: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                    "#ff7f00",
                    "#cab2d6",
                    "#6a3d9a",
                ],
                11: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                    "#ff7f00",
                    "#cab2d6",
                    "#6a3d9a",
                    "#ffff99",
                ],
                12: [
                    "#a6cee3",
                    "#1f78b4",
                    "#b2df8a",
                    "#33a02c",
                    "#fb9a99",
                    "#e31a1c",
                    "#fdbf6f",
                    "#ff7f00",
                    "#cab2d6",
                    "#6a3d9a",
                    "#ffff99",
                    "#b15928",
                ],
            },
            Pastel1: {
                3: ["#fbb4ae", "#b3cde3", "#ccebc5"],
                4: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4"],
                5: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6"],
                6: [
                    "#fbb4ae",
                    "#b3cde3",
                    "#ccebc5",
                    "#decbe4",
                    "#fed9a6",
                    "#ffffcc",
                ],
                7: [
                    "#fbb4ae",
                    "#b3cde3",
                    "#ccebc5",
                    "#decbe4",
                    "#fed9a6",
                    "#ffffcc",
                    "#e5d8bd",
                ],
                8: [
                    "#fbb4ae",
                    "#b3cde3",
                    "#ccebc5",
                    "#decbe4",
                    "#fed9a6",
                    "#ffffcc",
                    "#e5d8bd",
                    "#fddaec",
                ],
                9: [
                    "#fbb4ae",
                    "#b3cde3",
                    "#ccebc5",
                    "#decbe4",
                    "#fed9a6",
                    "#ffffcc",
                    "#e5d8bd",
                    "#fddaec",
                    "#f2f2f2",
                ],
            },
            Pastel2: {
                3: ["#b3e2cd", "#fdcdac", "#cbd5e8"],
                4: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4"],
                5: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9"],
                6: [
                    "#b3e2cd",
                    "#fdcdac",
                    "#cbd5e8",
                    "#f4cae4",
                    "#e6f5c9",
                    "#fff2ae",
                ],
                7: [
                    "#b3e2cd",
                    "#fdcdac",
                    "#cbd5e8",
                    "#f4cae4",
                    "#e6f5c9",
                    "#fff2ae",
                    "#f1e2cc",
                ],
                8: [
                    "#b3e2cd",
                    "#fdcdac",
                    "#cbd5e8",
                    "#f4cae4",
                    "#e6f5c9",
                    "#fff2ae",
                    "#f1e2cc",
                    "#cccccc",
                ],
            },
            Set1: {
                3: ["#e41a1c", "#377eb8", "#4daf4a"],
                4: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3"],
                5: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"],
                6: [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                ],
                7: [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                ],
                8: [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                ],
                9: [
                    "#e41a1c",
                    "#377eb8",
                    "#4daf4a",
                    "#984ea3",
                    "#ff7f00",
                    "#ffff33",
                    "#a65628",
                    "#f781bf",
                    "#999999",
                ],
            },
            Set2: {
                3: ["#66c2a5", "#fc8d62", "#8da0cb"],
                4: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3"],
                5: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"],
                6: [
                    "#66c2a5",
                    "#fc8d62",
                    "#8da0cb",
                    "#e78ac3",
                    "#a6d854",
                    "#ffd92f",
                ],
                7: [
                    "#66c2a5",
                    "#fc8d62",
                    "#8da0cb",
                    "#e78ac3",
                    "#a6d854",
                    "#ffd92f",
                    "#e5c494",
                ],
                8: [
                    "#66c2a5",
                    "#fc8d62",
                    "#8da0cb",
                    "#e78ac3",
                    "#a6d854",
                    "#ffd92f",
                    "#e5c494",
                    "#b3b3b3",
                ],
            },
            Set3: {
                3: ["#8dd3c7", "#ffffb3", "#bebada"],
                4: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072"],
                5: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3"],
                6: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                ],
                7: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                ],
                8: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                    "#fccde5",
                ],
                9: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                    "#fccde5",
                    "#d9d9d9",
                ],
                10: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                    "#fccde5",
                    "#d9d9d9",
                    "#bc80bd",
                ],
                11: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                    "#fccde5",
                    "#d9d9d9",
                    "#bc80bd",
                    "#ccebc5",
                ],
                12: [
                    "#8dd3c7",
                    "#ffffb3",
                    "#bebada",
                    "#fb8072",
                    "#80b1d3",
                    "#fdb462",
                    "#b3de69",
                    "#fccde5",
                    "#d9d9d9",
                    "#bc80bd",
                    "#ccebc5",
                    "#ffed6f",
                ],
            },
        };

        if (graphData) {
            createMap(graphData);
        }

        function createMap(platser) {
            var projection = d3.geoMercator().scale(100).translate([250, 250]);

            var geoPath = d3.geoPath().projection(projection);
            var featureSize = d3.extent(platser.features, (d) =>
                geoPath.area(d),
            );
            var countryColor = d3
                .scaleQuantize()
                .domain(featureSize)
                .range(colorbrewer.Reds[6]);

            // Append paths for map features
            svg.selectAll("path")
                .data(platser.features)
                .enter()
                .append("path")
                .attr("d", geoPath)
                .attr("class", "platser")
                .style("fill", (d) => countryColor(geoPath.area(d)))
                .style("stroke", (d) =>
                    d3.rgb(countryColor(geoPath.area(d))).darker(),
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
                .translate(-250, 3510)
                .scale(2100);

            // Call zoom on SVG element and apply initial zoom
            svg.call(mapZoom).call(mapZoom.transform, zoomSettings);

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

                svg.transition()
                    .duration(200)
                    .call(mapZoom.transform, newZoomSettings);
            }

            // Append zoom buttons only if not already present
            if (svg.selectAll("#controls").empty()) {
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
                    svg.append("text")
                        .attr("class", "feature-name")
                        .attr("x", thisCenter[0])
                        .attr("y", thisCenter[1])
                        .attr("dy", "-0.5em") // Offset the text slightly above the centroid
                        .style("text-anchor", "middle") // Center the text horizontally
                        .style("font-family", "monospace")
                        .style("font-size", "clamp(10px, 0.85vw, 22px)")
                        .text(name);

                    // Draw a rectangle to highlight the bounds
                    svg.append("rect")
                        .attr("class", "bbox")
                        .attr("x", thisBounds[0][0])
                        .attr("y", thisBounds[0][1])
                        .attr("width", thisBounds[1][0] - thisBounds[0][0])
                        .attr("height", thisBounds[1][1] - thisBounds[0][1]);

                    // Draw a circle to mark the centroid
                    svg.append("circle")
                        .attr("class", "centroid")
                        .attr("r", 5)
                        .attr("cx", thisCenter[0])
                        .attr("cy", thisCenter[1]);
                })
                .on("mouseout", function () {
                    svg.selectAll("text.feature-name").remove();
                    svg.selectAll("circle.centroid").remove();
                    svg.selectAll("rect.bbox").remove();
                });

            return () => {
                d3.selectAll("").remove();
            };
        }
    }, [graphData]);

    const dataDiagramStyle = {
        //minWidth: "900px",
        paddingRight: "10px",
        paddingTop: "0px",
        paddingLeft: "10px",
        //backgroundColor: "rgba(0, 90, 90, 0.18)",
        //backgroundColor: "rgba(0, 0, 70, 0.18)",
    };

    return (
        <div>
            {/* <div className="dataDiagram" style={dataDiagramStyle}> */}
            <div id="controls"></div>
            <div id="viz">
                <svg
                    ref={svgRef}
                    width={window.innerWidth - window.innerWidth / 8}
                    height={window.innerHeight - window.innerHeight / 14}
                />
            </div>
            {/*  </div> */}
        </div>
    );
};

const MyD3Component = (props) => {
    const svgRef = useRef();
    const [graphData, setGraphData] = useState(null);

    useEffect(() => {
        //const width = 850;
        //const height = 600;
        let height = window.innerHeight - window.innerHeight / 9;
        let width = window.innerWidth - window.innerWidth / 13;

        const svg = d3
            .select(svgRef.current)
            .style("max-width", "100%")
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
        //.style("padding-left", "3vw");

        if (graphData) {
            const pack = d3
                .pack()
                .size([width - 40, height - 50])
                .padding(110);

            const root = d3
                .hierarchy(graphData)
                .sum((d) => d.value)
                .sort((a, b) => b.value - a.value);

            const packedData = pack(root);

            // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            //const colorScale = d3.scaleSequential().domain([0, 500]).interpolator(d3.interpolateYlOrRd);

            // Define your custom color classes and corresponding colors
            const colorClasses = [
                { range: [0, 50], color: "#edf960" },
                { range: [51, 150], color: "#f6fcaf" },
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
                { range: [200001, 1000000], color: "#6c00e3" },

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
                return "white";
            };

            const node = svg
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
                    d3.select(this).attr("fill", (d) => {
                        if (d.data.value) {
                            // Use the getColor function to set the fill color of your circles
                            return "#4bc2a0"; // Use the getColor function to set the fill color of circles with data values
                        } else {
                            return "none"; // Or any default color for circles without data values
                        }
                    });
                    // Append a <g> (group) element to contain both <text> elements
                    const textGroup = svg.append("g").attr("id", "nodeGroup");

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
                    });
                });

            node.append("text")
                .attr("dy", "0.3em")
                .attr("text-anchor", "middle")
                .style("font-family", "monospace") // Change the font family here
                .style("font-size", "clamp(10px, 1vw, 20px)") // Change the font size here
                .text((d) => (d.data.value ? d.data.value : ""));

            return () => {
                svg.selectAll("*").remove();
            };
        }
    }, [graphData]);

    useEffect(() => {
        fetch(
            `http://localhost:3001/api/column/D3Result?main_g=${props.main_grupp}&sub_g=${props.sub_grupp}`,
        )
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.map((item) => ({
                    place: item.place,
                    name: item.name,
                    mengd: item.mengd,
                    value: parseFloat(item.value),
                    andel_sverige: item.andel_sverige,
                }));

                setGraphData({ children: processedData });
            });
    }, [props.main_grupp, props.sub_grupp]);

    const dataDiagramStyle = {
        //minWidth: "900px",
        paddingRight: "10px",
        paddingTop: "0px",
        paddingLeft: "0px",
        //backgroundColor: "rgba(0, 90, 90, 0.18)",
        //backgroundColor: "rgba(0, 0, 70, 0.18)",
    };

    return (
        <div className="dataDiagram" style={dataDiagramStyle}>
            <svg
                ref={svgRef}
                width={window.innerWidth - window.innerWidth / 17}
                height={window.innerHeight - window.innerHeight / 14}
            />
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
        zIndex: 1000,
        position: "absolut",
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

    React.useEffect(() => {
        localStorage.setItem("main-grupp", JSON.stringify(""));
    }, []);

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
                    <MapComponent />
                </div>
                <div></div>
            </Box>
        </React.Fragment>
    );
}
