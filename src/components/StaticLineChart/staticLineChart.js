import * as d3 from 'd3';
import d3Tip from 'd3-tip';

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
        this.tips = this._createTips();
        this.svgContainer = this._drawSvgContainer();
        this.drawContainer = this._drawDrawContainer(this.svgContainer);
        this._createTipsCycle();
        this.drawContainer.call(this.tips);
        this.scaleX = this._createScaleX();
        this.axisX = this._drawAxisX(this.drawContainer, this.scaleX);
        this.scaleY = this._createScaleY();
        this.axisY = this._drawAxisY(this.drawContainer, this.scaleY);
        this.axisYText = this._drawAxisYText(this.axisY);
        this.line = this._drawLine(this.drawContainer, this.scaleX, this.scaleY);
        this.tipsBar = this._drawTipsBar(this.drawContainer, this.scaleX, this.scaleY);
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
        return d3.scalePoint().rangeRound([0, this.drawSize.width]).padding(0).align(0).domain(this.data.map(d => d.letter));
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

    // 绘制折线
    _drawLine(drawContainer, scaleX, scaleY) {
        return drawContainer.append("path")
            .datum(this.data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", d3.line()
                .defined(d => !isNaN(d.frequency))
                .x(d => scaleX(d.letter))
                .y(d => scaleY(d.frequency)));
    }

    // 创建 tips
    _createTips() {
        return d3Tip().attr('class', 'd3-tip')
            .html((d) => {
                return "<strong>星期" + d.letter + "<br>百分比:</strong> <span style='color:#ffeb3b'>" + (d.frequency * 100).toFixed(2) + "%</span>";
            });
    }

    _createTipsCycle() {
        this.drawContainer.append('circle').attr('id', 'tipFollowCursor');
    }

    // 绘制 tips 背景块
    _drawTipsBar(drawContainer, scaleX, scaleY) {
        return drawContainer.selectAll(".bar")
            .data(this.data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", "transparent")
            .attr("x", item => scaleX(item.letter) - scaleX.step() / 2)
            .attr("y", 0)
            .attr("width", scaleX.step())
            .attr("height", this.drawSize.height)
            .on('mouseover', (d) => {
                this._drawTipsLine(d);
            }).on('mousemove', (d) => {
                const tipX = d3.event.offsetX - this.svgPadding.left;
                const tipY = d3.event.offsetY - this.svgPadding.top;
                const target = d3.select('#tipFollowCursor')
                    .attr('cx', tipX)
                    .attr('cy', tipY - 10)
                    .node();
                if (tipX <= 0 || tipY <= 0 || tipX >= this.drawSize.width || tipY >= this.drawSize.height) {
                    this.tips.hide();
                } else {
                    this.tips.show(d, target);
                }
            }).on('mouseout', (d) => {
                this.tips.hide();
            });
    }

    // 绘制提示线
    _drawTipsLine(d) {
        this.drawContainer.selectAll(".tips-line").remove();
        this.drawContainer.selectAll(".tips-line")
            .data([d])
            .enter().append("line")
            .attr("class", "tips-line")
            .attr("stroke", "#CCCCCC")
            .attr("stroke-width", "1px")
            .attr("stroke-dasharray", "5,5")
            .attr("z-index", "-1")
            .attr("x1", this.scaleX(d.letter) + 1)
            .attr("y1", 0)
            .attr("x2", this.scaleX(d.letter) + 1)
            .attr("y2", this.drawSize.height);
    }
}

export default staticLineChart;