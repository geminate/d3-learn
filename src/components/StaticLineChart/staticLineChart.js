import * as d3 from 'd3';

class staticLineChart {

    constructor({svg, data = [], svgPadding = [80, 80, 40, 40]}) {
        // svg dom 对象
        this.svg = svg;

        // 数据源
        this.data = data;

        // svg 容器大小
        this.svgSize = {width: svg.getBoundingClientRect().width, height: svg.getBoundingClientRect().height};

        // svg 容器内边距
        this.svgPadding = {top: svgPadding[0], right: svgPadding[1], bottom: svgPadding[2], left: svgPadding[3]};

        // 绘图容器大小
        this.drawSize = {
            width: this.svgSize.width - this.svgPadding.left - this.svgPadding.right,
            height: this.svgSize.height - this.svgPadding.top - this.svgPadding.bottom
        };
    }

    create() {
        this.svgContainer = this._drawSvgContainer();
        this.drawContainer = this._drawDrawContainer(this.svgContainer);
        this.scaleX = this._createScaleX();
        this.axisX = this._drawAxisX(this.drawContainer, this.scaleX);
        this.scaleY = this._createScaleY();
        this.axisY = this._drawAxisY(this.drawContainer, this.scaleY);
        this.axisYText = this._drawAxisYText(this.axisY);
        this.line = this._drawLine(this.drawContainer, this.scaleX, this.scaleY);
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
        return d3.scaleBand().rangeRound([0, this.drawSize.width]).padding(0).domain(this.data.map(d => d.letter));
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

    // 绘制折线
    _drawLine() {

    }
}

export default staticLineChart;