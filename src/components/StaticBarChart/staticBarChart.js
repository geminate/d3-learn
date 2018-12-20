import * as d3 from 'd3';
import d3Tip from 'd3-tip';

class staticBarChart {

    constructor({svg, data = [], svgPadding = [80, 80, 40, 40]}) {
        // svg dom 对象
        this.svg = svg;

        // 数据源
        this.data = data;

        // svg 容器大小
        this.svgSize = {width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height};
console.log(svg.getBoundingClientRect());
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

    // 初始化
    create() {
        this.tips = this._createTips();
        this.svgContainer = this._drawSvgContainer();
        this.drawContainer = this._drawDrawContainer(this.svgContainer);
        this.drawContainer.call(this.tips);
        this.scaleX = this._createScaleX();
        this.axisX = this._drawAxisX(this.drawContainer, this.scaleX);
        this.scaleY = this._createScaleY();
        this.axisY = this._drawAxisY(this.drawContainer, this.scaleY);
        this.axisYText = this._drawAxisYText(this.axisY);
        this.background = this._drawBackground(this.drawContainer, this.scaleY);
        this.bar = this._drawBar(this.drawContainer, this.scaleX, this.scaleY);
    }

    // 绘制 SVG 容器
    _drawSvgContainer() {
        return d3.select(this.svg).style("border", "1px solid #EFEFEF");
    }

    // 绘制 绘图区 容器
    _drawDrawContainer(svgContainer) {
        return svgContainer.append("g").attr("transform", `translate(${this.svgPadding.left},${this.svgPadding.top})`);
    }

    // 创建 x 比例尺
    _createScaleX() {
        return d3.scaleBand().rangeRound([0, this.drawSize.width]).padding(this.barPadding).domain(this.data.map(d => d.letter));
    }

    // 绘制 x 轴
    _drawAxisX(drawContainer, scaleX) {
        return drawContainer.append("g").attr("transform", "translate(0," + this.drawSize.height + ")").call(d3.axisBottom(scaleX));
    }

    // 创建 y 比例尺
    _createScaleY() {
        return d3.scaleLinear().rangeRound([this.drawSize.height, 0]).domain([0, d3.max(this.data, d => d.frequency)]);
    }

    // 绘制 y 轴
    _drawAxisY(drawContainer, scaleY) {
        return drawContainer.append("g").call(d3.axisLeft(scaleY));
    }

    // 绘制 y 轴文字
    _drawAxisYText(axisY) {
        return axisY.append("text")
            .text("百分比")
            .style("transform", "translate(0, -16px)")
            .style("fill", "gray")
            .style("text-anchor", "middle")
            .style("font-size", "14px");
    }

    // 绘制 条状斑马背景
    _drawBackground(drawContainer, scaleY) {
        const stepArray = d3.ticks(0, d3.max(this.data, d => d.frequency), 10);
        const colors = ['#ccc', '#ddd'];
        drawContainer.append("g")
            .selectAll('rect')
            .data(d3.range(stepArray.length - 1))
            .enter()
            .append('rect')
            .attr('fill', i => colors[i % 2])
            .attr('x', 1)
            .attr('width', this.drawSize.width)
            .attr('height', i => (scaleY(stepArray[i]) - scaleY(stepArray[i + 1])))
            .attr('y', i => scaleY(((i + 1) * stepArray[1])));
    }

    // 绘制 数据柱
    _drawBar(drawContainer, scaleX, scaleY) {
        drawContainer.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "#8a2be2")
            .attr("x", item => scaleX(item.letter) + scaleX.bandwidth() / 4)
            .attr("y", this.drawSize.height)
            .attr("width", scaleX.bandwidth() / 2)
            .attr("height", 0)
            .on('mouseover', this.tips.show)
            .on('mouseout', this.tips.hide)
            .transition()
            .duration(200)
            .ease(d3.easeBounceInOut)
            .delay((d, i) => i * 100)
            .attr("y", d => scaleY(d.frequency))
            .attr("height", d => (this.drawSize.height - scaleY(d.frequency)));
    }

    // 创建 tips
    _createTips() {
        return d3Tip().attr('class', 'd3-tip')
            .offset([-10, 0])
            .html((d) => {
                return "<strong>星期" + d.letter + "<br>百分比:</strong> <span style='color:#ffeb3b'>" + (d.frequency * 100).toFixed(2) + "%</span>";
            });
    }
}

export default staticBarChart;
