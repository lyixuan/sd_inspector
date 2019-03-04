import React, { Component } from 'react';
import * as d3 from "d3";
import ProcessStep from '../ProcessStep'
import { mapData } from './mapData';
import './styles.less';
import styles from './styles.less'

const lended = `
<path id="lenged_path_1" data-name="矩形 528" class=${styles.cls1} d="M115,764.977h16v16H115v-16Z"/>
<path id="lenged_path_2" data-name="矩形 528 拷贝 3" class=${styles.cls2} d="M115,735.978h16v16H115v-16Z"/>
<path id="lenged_path_3" data-name="矩形 528 拷贝" class=${styles.cls3} d="M115,793.976h16v16H115v-16Z"/>
<path id="lenged_path_4" data-name="矩形 528 拷贝 2" class=${styles.cls4} d="M115,824.975h16v16H115v-16Z"/>
<rect id="lenged_rect_1" data-name="矩形 528 拷贝 2" class=${styles.cls5} x="115" y="853.969" width="16" height="16"/>
<rect id="lenged_rect_2" data-name="矩形 528 拷贝 4" class=${styles.cls6} x="115" y="883.969" width="16" height="16"/>
<rect id="lenged_rect_3" data-name="矩形 528 拷贝 5" class=${styles.cls7} x="115" y="912.969" width="16" height="16"/>
<text id="tlenged_text_1" data-name="＜1万" class=${styles.cls8} transform="translate(145.12 926.355)">＜1万</text>
<rect id="lenged_rect_4" data-name="矩形 528 拷贝 5" class=${styles.cls9} x="115" y="942.969" width="16.062" height="16"/>
<text id="tlenged_text_2" class=${styles.worn} transform="translate(115.215 986.354)">注：本次报考通知数据，仅统计了“微信消息模板”和“APP系统通知”渠道的数据。</text>
<text id="tlenged_text_3" class=${styles.cls8} transform="translate(145.215 956.354)">即将开始</text>
<text id="tlenged_text_4" data-name="1万 ≤N＜ 2万" class=${styles.cls8} transform="translate(147.281 895.924)">1万 ≤N＜ 2万</text>
<text id="tlenged_text_5" data-name="2万≤N＜3万" class=${styles.cls8} transform="translate(147.281 867.217)">2万≤N＜3万</text>
<text id="t5" data-name="3万≤N＜5万" class=${styles.cls8} transform="translate(147.281 837.218)">3万≤N＜5万</text>
<text id="t6" data-name="5万≤N＜7万 拷贝" class=${styles.cls8} transform="translate(147.281 807.219)">5万≤N＜7万</text>
<text id="t7" data-name="7万≤N＜10万" class=${styles.cls8} transform="translate(147.281 777.221)">7万≤N＜10万</text>
<text id="t8" data-name="≥10万" class=${styles.cls8} transform="translate(147.281 748.222)">≥10万</text>`

const scaleNum = 0.70;
let tip = {};
let HEIGHT = 0;
let WIDTH = 0


class ChinaMap extends Component {
    constructor(props) {
        super(props);
        ChinaMap.that = this;
        this.state = {
            mapData: {},
            examineStepList: [],      // 选中状态
            selectedProvince: 'SD',   // 默认选中省份的id

        }
    }

    componentDidMount() {
        this.handleData(this.props.data)
        this.initMap();
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
            this.handleData(nextProps.data)
        }

    }
    initMap = () => {
        WIDTH = this.svgDom.parentElement.offsetWidth;
        HEIGHT = this.svgDom.parentElement.offsetHeight;
        this.drewMap(mapData);

    }
    handleData = (data) => {
        const mapData = {};
        if (!Array.isArray(data)) return;
        // 暂不做处理
        data.forEach(item => {
            mapData[item.province] = {
                ...item,
            }
        });
        this.setState({ mapData }, this.redrewMap.bind(this, mapData))

    }
    redrewMap = (data) => {
        this.changePathColor(data);
    }
    handleProvinceStep = (selectedProvince) => {
        const { mapData } = this.state;
        const { examineStepList = [] } = mapData[selectedProvince] || {};
        this.setState({ examineStepList, selectedProvince })
    }
    drewMap = (data) => {
        //设置tip框
        this.drewTip();
        // 设置path 部分
        const chart = d3.select(this.svgDom).attr('width', WIDTH).attr('height', HEIGHT);
        this.svgFirstG = chart.append("g")// 设最外包层在总图上的相对位置
        this.svgFirstG.style('fill-opacity', 1)
            .attr("transform", `translate(${(1 - scaleNum) / 2 * WIDTH - 60},${(1 - scaleNum) / 2 * HEIGHT}) scale(${scaleNum})`)
            .on('mouseout', tip.hide)
            ;
        // 设置省path
        this.drewPath(data)
        // 设置省名字title
        this.drewText(data);
        // 设置图例
        this.drewLended(this.svgFirstG);

    }
    drewTip = () => {
        const that = this;
        if (d3.select("#mapTooltip").node()) return;
        const div = d3.select("body").append("div")
            .attr("class", `${styles.tooltip} tooltip`) //用于css设置类样式
            .attr('id', 'mapTooltip')
            .html('"销售额为"');
        tip.show = function () {
            const showOriginData = d3.select(this).datum();
            if (!showOriginData) return
            const { pageX, pageY } = d3.event;
            div.style('display', 'block')
                .style('top', `${pageY}px`)
                .style('left', `${pageX + 20}px`)
                .html(that.tooltipText(showOriginData.id))

        }
        tip.hide = () => {
            div.style('display', 'none');
        }
    }
    tooltipText = (id) => {
        const { mapData } = this.state;
        const obj = mapData[id] || {};
        return (
            `<ul class=${styles.tootipPanl}>
    <li class=${styles.tooltipItem}>考试计划人数：${obj.examPlanNum || 0}人</li>
    <li class=${styles.tooltipItem}>通知人数：${obj.pushNum || 0}人</li>
    <li class=${styles.tooltipItem}>触达人数：${obj.readNum || 0}人</li>
    <li class=${styles.tooltipItem}>触达率：${obj.readRatio || 0}%</li>
    </ul>
    <ul class=${styles.tootipPanlOther}>
    <li class=${styles.tooltipItem}>准考证填写人数：${obj.admissionFillNum || 0}人</li>
    <li class=${styles.tooltipItem}>准考证填写率：${obj.admissionFillRatio || 0}%</li>
    </ul>`
        )
    }
    drewLended = (svg) => {
        this.lended = svg.append('g').html(lended)
            .attr("transform", `translate(${(scaleNum - 1) / 2 * WIDTH - 70},${(scaleNum - 1) / 2 * HEIGHT + 100})`)
    }
    drewPath = (data) => {
        this.provincePath = this.svgFirstG.append('g')
            .attr('class', 'pathClass')
            .selectAll("path") // 定义省容器
            .data(data.pathData)
            .enter()
        // // 向省容器添加path以及text
        this.provincePath.append('path')
            .attr('id', d => d.id)
            .attr("class", `state ${styles.province}`)
            .attr("transform", `translate(${(scaleNum - 1) / 2 * WIDTH - 150},${(scaleNum - 1) / 2 * HEIGHT + 100})`)
            .attr("d", (d) => d.d)
            .on('click', this.onClick)
            .on('mouseover', this.onMouseover)
            .on('mouseout', this.onMouseout)
            .on('mousemove', tip.show)
    }

    drewText = () => {
        this.allText = this.svgFirstG.append('g')
            .attr("transform", `translate(${(scaleNum - 1) / 2 * WIDTH - 150},${(scaleNum - 1) / 2 * HEIGHT + 100})`)
            .attr('class', 'textClass')
            .selectAll("text")
            .data(mapData.textData)
            .enter()
            .append("text")
            .attr('id', d => d.id)
            .attr('class', styles.cls19)
            .html(d => {
                return d.tspan ? d.tspan : d.dataName;

            })
            .attr("transform", (d) => d.transform)
            .on('mouseover', this.onMouseover)
            .on('mousemove', tip.show)
            .on('click', this.onClick)
    }
    changePathColor = (data = {}) => {
        d3.selectAll('.state').style('fill', d => {
            const { examPlanNum = 0 } = data[d.id] || {};
            if (examPlanNum >= 100000) {
                return '#e73236'
            } else if (examPlanNum < 100000 && examPlanNum >= 70000) {
                return '#eec4f44'
            } else if (examPlanNum < 70000 && examPlanNum >= 50000) {
                return '#fb7338'
            } else if (examPlanNum < 50000 && examPlanNum >= 30000) {
                return '#fd9d3c'
            } else if (examPlanNum < 30000 && examPlanNum >= 20000) {
                return '#fdbb3c'
            } else if (examPlanNum < 20000 && examPlanNum >= 10000) {
                return '#f2c71c'
            } else if (examPlanNum < 10000 && examPlanNum > 0) {
                return '#e5e323'
            } else {
                return '#008dff'
            }

        })
    }
    changePathStroke = (target) => {
        const data = d3.select(target).datum();
        if (!data) {
            return
        }
        // d3.select(`#${data.id}`).raise()
        const allPath = d3.selectAll('.state');
        allPath.style('stroke', d => {
            return d.id === data.id ? '#caf3fe' : '#0bb4f9'
        })
    }
    onMouseover(d, i) {
        d3.select(this).raise()
        ChinaMap.that.changePathStroke(this);
        tip.show(d3.event);
    }
    onMouseout(d, i) {
        const allPath = d3.selectAll('.state');
        allPath.style('stroke', '#0bb4f9')
        tip.hide()
    }
    onClick() {
        const obj = d3.select(this).datum();
        if (!obj) return;
        ChinaMap.that.handleProvinceStep(obj.id);

    }
    render() {
        const { examineStepList } = this.state;
        return (
            <>
                <div className={styles.container}>
                    <svg ref={dom => { this.svgDom = dom }} width={1000} height={1000}></svg>
                </div>
                <div className={styles.process}>
                    <ProcessStep data={examineStepList} />
                </div>
            </>
        )
    }
}
export default ChinaMap;