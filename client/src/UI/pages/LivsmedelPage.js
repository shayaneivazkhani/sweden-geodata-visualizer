import React from "react";
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import Header from "../general_components/Header_NavBar/HeaderBar";
import Footer from "../general_components/Header_NavBar/Footer";

//import SelectAttributesBox from "../page_specific_components/LivsmedelPage_components/Select_attributes_box";
import SelectFetch from "../page_specific_components/LivsmedelPage_components/Select_fetch";

import "../styles/pageStyles/LivsmedelPage.css";
import zIndex from "@mui/material/styles/zIndex";

const MyD3Component = () => {
    const svgRef = useRef();
  
    useEffect(() => {
      const width = 1000;
      const height = 400;
  
      const svg = d3.select(svgRef.current);
  
      const graphData = {
        nodes: [{ name: "A", value: 15, x: 300, y: 100 }, { name: "B", value: 20, x: 200, y: 200 }, { name: "C", value: 30, x: 300, y: 300 }, { name: "D", value: 50, x: 500, y: 500 }],
        links: [
          { source: "A", target: "B" },
          { source: "B", target: "C" },
          { source: "A", target: "C" },
          { source: "B", target: "D" },
          { source: "D", target: "C" }
        ]
      };
  
      const nodesMap = {};
      graphData.nodes.forEach((node) => {
        nodesMap[node.name] = node;
      });
  
      graphData.links.forEach((link) => {
        link.source = nodesMap[link.source];
        link.target = nodesMap[link.target];
      });
  
      const simulation = d3.forceSimulation(graphData.nodes)
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide(40).strength(1))
        .force("link", d3.forceLink(graphData.links).id((d) => d.name))
        .on("tick", ticked);
  
      const links = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .enter()
        .append("line")
        .attr("stroke-width", 3)
        .style("stroke", "blue");
  
      const drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  
      const textsAndNodes = svg.append("g")
        .selectAll("g")
        .data(graphData.nodes)
        .enter()
        .append("g")
        .call(drag);
  
      const colorScale = d3.scaleSequential()
        .domain([0, 50])
        .interpolator(d3.interpolateYlOrRd);
  
        var circles = textsAndNodes.append("circle")
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
            d3.select(this).attr("fill", "blue"); // Change the fill color to blue upon mouseover
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
  
      const texts = textsAndNodes.append("text")
        .text((d) => d.name);
  
      function ticked() {
        textsAndNodes.attr("transform", (d) => `translate(${d.x},${d.y})`);
  
        links.attr("x1", (d) => d.source.x)
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
    }, []);
  
    const d3componentStyle = {
    };
    return (
        <div className="ropiojw" style= {d3componentStyle}>
            <svg ref={svgRef} width="100%" height="800px"/>
        </div>
    );
  };

var H1BGraph = () => {
    return (
        <div className="row">
            <div className="col-md-12">
                <svg width="700" height="500"></svg>{" "}
            </div>{" "}
        </div>
    );
};

const Livsmedel = () => {
    const topFixedStyle = {
        width: "100%",
        position: "fixed",
        zIndex: "1",
    };

    const scrollableStyle = {
        paddingTop: "85px",
        zIndex: 0,
    };

    const body_style = {
        width: "100%",
        height: "100vh",
    };

    return (
        <React.Fragment>
            <div style={topFixedStyle}>
                <Header />
            </div>
            <div style={scrollableStyle}>
                <div style={body_style}>
                    <h2>Livsmedel Page</h2>
                    <a href="/">Main Page</a>
                    <div>
                        <SelectFetch />
                    </div>
                    <div>
                        <MyD3Component />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Livsmedel;
