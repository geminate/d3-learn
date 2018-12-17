"use strict";

var data = [1, 2, 3];

// const p = d3.select("body")
//     .selectAll("p")
//     .data(data)
//     .enter()
//     .append("p")
//     .text("hello");


var p = d3.select("body").selectAll("p").data(data).enter().append("p").text(function (item, i) {
    console.log(item + "/" + i);
    return item;
});