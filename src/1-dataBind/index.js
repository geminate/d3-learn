const data = [1, 2, 3];

const p = d3.select("body")
    .selectAll("p")
    .data(data)
    .enter()
    .append("p")
    .text("hello");
