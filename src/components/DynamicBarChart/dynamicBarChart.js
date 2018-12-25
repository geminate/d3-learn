import * as d3 from 'd3';
import d3Tip from 'd3-tip';

class dynamicBarChart {

    constructor({svg, svgPadding = [80, 80, 40, 40]}) {
        // svg dom 对象
        this.svg = svg;


        // svg 容器大小
        this.svgSize = {width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height};

        // svg 容器内边距
        this.svgPadding = {top: svgPadding[0], right: svgPadding[1], bottom: svgPadding[2], left: svgPadding[3]};

        // 绘图容器大小
        this.drawSize = {
            width: this.svgSize.width - this.svgPadding.left - this.svgPadding.right,
            height: this.svgSize.height - this.svgPadding.top - this.svgPadding.bottom
        };

        // 柱间距
        this.barPadding = 0;
    }

    create(data) {
        this.svgContainer = this._drawSvgContainer();
        this.drawContainer = this._drawDrawContainer(this.svgContainer);

        this.axisXG = this._createAxisXG(this.drawContainer);
        this.scaleX = this._createScaleX();
        this.axisX = this._createAxisX(this.scaleX);

        this.axisYG = this._createAxisYG(this.drawContainer);
        this.scaleY = this._createScaleY();
        this.axisY = this._createAxisY(this.scaleY);

        this.update(data);
    }

    update(data, sizeUpdate = false) {
        this.data = data;

        this.scaleX.rangeRound([0, this.drawSize.width]).domain(this.data.map(d => d[0]));
        this.scaleY.rangeRound([this.drawSize.height, 0]).domain([0, d3.max(this.data, d => d[1])]);
        this.axisYG.transition().duration(sizeUpdate ? 0 : 200).ease(d3.easeLinear).call(this.axisY);
        this.axisXG.transition().duration(sizeUpdate ? 0 : 200).ease(d3.easeLinear).call(this.axisX);

        this._drawBar(this.drawContainer, this.scaleX, this.scaleY, sizeUpdate);
    }

    updateSvg() {

        this.svgSize = {width: this.svg.getBoundingClientRect().width, height: this.svg.getBoundingClientRect().height};
        this.drawSize = {
            width: this.svgSize.width - this.svgPadding.left - this.svgPadding.right,
            height: this.svgSize.height - this.svgPadding.top - this.svgPadding.bottom
        };
        this.axisXG.attr("transform", "translate(0," + this.drawSize.height + ")").call(this.axisX);
        this.update(this.data, true);
    }

    // 绘制 SVG 容器
    _drawSvgContainer() {
        return d3.select(this.svg).style("border", "1px solid #EFEFEF");
    }

    // 绘制 绘图区 容器
    _drawDrawContainer(svgContainer) {
        return svgContainer.append("g").attr("transform", `translate(${this.svgPadding.left},${this.svgPadding.top})`);
    }

    _createAxisXG(svgContainer) {
        return svgContainer.append('g').attr("transform", "translate(0," + this.drawSize.height + ")");
    }

    // 创建 x 比例尺
    _createScaleX() {
        return d3.scaleBand();
    }

    // 创建 x 轴
    _createAxisX(scaleX) {
        return d3.axisBottom().scale(scaleX).tickFormat(d => new Date(d).getSeconds());
    }

    _createAxisYG(svgContainer) {
        return svgContainer.append('g');
    }

    // 创建 y 比例尺
    _createScaleY() {
        return d3.scaleLinear();
    }

    // 创建 y 轴
    _createAxisY(scaleY) {
        return d3.axisLeft().scale(scaleY);
    }

    _drawBar(drawContainer, scaleX, scaleY, sizeUpdate = false) {
        const bar = drawContainer.selectAll(".bar").data(this.data, i => i[0]);
        const barEnter = bar.enter();
        const barExit = bar.exit();

        barEnter.append("rect")
            .attr("class", "bar")
            .attr("fill", "#8a2be2")
            .attr("x", item => scaleX(item[0]) + scaleX.bandwidth() / 4)
            .attr("y", item => scaleY(item[1]))
            .attr("width", scaleX.bandwidth() / 2)
            .attr("height", d => (this.drawSize.height - scaleY(d[1])))
            .style("opacity", 0)
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .style("opacity", 1);


        bar.attr("y", item => scaleY(item[1]))
            .attr("width", scaleX.bandwidth() / 2)
            .attr("height", d => (this.drawSize.height - scaleY(d[1])))
            .transition()
            .duration(200)
            .ease(d3.easeLinear)
            .attr("x", item => scaleX(item[0]) + scaleX.bandwidth() / 4);


        barExit.transition()
            .duration(200)
            .ease(d3.easeLinear)
            .style("opacity", 0)
            .remove();

        sizeUpdate && bar.style("opacity", 1);

    }


}

export default dynamicBarChart;
