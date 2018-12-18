"use strict";

var jsonCircles = [{ "x_axis": 100, "y_axis": 100, "radius": 40 }, { "x_axis": 300, "y_axis": 100, "radius": 20 }, { "x_axis": 500, "y_axis": 100, "radius": 80 }];

var svgContainer = d3.select("body").append("svg").attr("width", 600).attr("height", 600).style("border", "1px solid black");

var circles = svgContainer.selectAll("circle").data(jsonCircles).enter().append("circle");

var circleAttributes = circles.attr("cx", function (_ref) {
    var x_axis = _ref.x_axis;
    return x_axis;
}).attr("cy", function (_ref2) {
    var y_axis = _ref2.y_axis;
    return y_axis;
}).attr("r", function (_ref3) {
    var radius = _ref3.radius;
    return radius;
}).style("fill", function (_ref4) {
    var radius = _ref4.radius;

    if (radius === 40) {
        return "green";
    } else if (radius === 20) {
        return "purple";
    } else {
        return "red";
    }
});

var rectangle = svgContainer.append("rect").attr("x", 10).attr("y", 200).attr("width", 50).attr("height", 100).style("fill", "yellow");

var line = svgContainer.append("line").attr("x1", 5).attr("y1", 220).attr("x2", 220).attr("y2", 450).attr("stroke", "black").attr("stroke-width", 2);