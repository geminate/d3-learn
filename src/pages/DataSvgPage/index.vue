<template>
    <div>

    </div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        mounted() {
            const jsonCircles = [
                {"x_axis": 100, "y_axis": 100, "radius": 40},
                {"x_axis": 300, "y_axis": 100, "radius": 20},
                {"x_axis": 500, "y_axis": 100, "radius": 80}
            ];

            const svgContainer = d3.select(this.$el)
                .append("svg")
                .attr("width", 600)
                .attr("height", 600)
                .style("border", "1px solid black");


            const circles = svgContainer.selectAll("circle")
                .data(jsonCircles)
                .enter()
                .append("circle");

            const circleAttributes = circles
                .attr("cx", ({x_axis}) => x_axis)
                .attr("cy", ({y_axis}) => y_axis)
                .attr("r", ({radius}) => radius)
                .style("fill", ({radius}) => {
                    if (radius === 40) {
                        return "green";
                    } else if (radius === 20) {
                        return "purple";
                    } else {
                        return "red";
                    }
                });

            const rectangle = svgContainer.append("rect")
                .attr("x", 10)
                .attr("y", 200)
                .attr("width", 50)
                .attr("height", 100)
                .style("fill", "yellow");

            const line = svgContainer.append("line")
                .attr("x1", 5)
                .attr("y1", 220)
                .attr("x2", 220)
                .attr("y2", 450)
                .attr("stroke", "black")
                .attr("stroke-width", 2);
        }
    }
</script>

<style lang="less" scoped>

</style>