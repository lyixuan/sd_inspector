import React,{Component}from 'react';
import * as d3 from "d3";
import {mapData} from './mapData';
import './styles.less';
import styles from './styles.less'

const lended=`
<path id="lenged_path_1" data-name="矩形 528" class=${styles.cls1} d="M115,764.977h16v16H115v-16Z"/>
<path id="lenged_path_2" data-name="矩形 528 拷贝 3" class=${styles.cls2} d="M115,735.978h16v16H115v-16Z"/>
<path id="lenged_path_3" data-name="矩形 528 拷贝" class=${styles.cls3} d="M115,793.976h16v16H115v-16Z"/>
<path id="lenged_path_4" data-name="矩形 528 拷贝 2" class=${styles.cls4} d="M115,824.975h16v16H115v-16Z"/>
<rect id="lenged_rect_1" data-name="矩形 528 拷贝 2" class=${styles.cls5} x="115" y="853.969" width="16" height="16"/>
<rect id="lenged_rect_2" data-name="矩形 528 拷贝 4" class=${styles.cls6} x="115" y="883.969" width="16" height="16"/>
<rect id="lenged_rect_3" data-name="矩形 528 拷贝 5" class=${styles.cls7} x="115" y="912.969" width="16" height="16"/>
<text id="tlenged_text_1" data-name="＜1万" class=${styles.cls8} transform="translate(145.12 926.355)">＜1万</text>
<rect id="lenged_rect_4" data-name="矩形 528 拷贝 5" class=${styles.cls9} x="115" y="942.969" width="16.062" height="16"/>
<text id="tlenged_text_2" class=${styles.cls8} transform="translate(145.215 956.354)">即将开始</text>
<text id="tlenged_text_3" data-name="1万 ≤N＜ 2万" class=${styles.cls8} transform="translate(147.281 895.924)">1万 ≤N＜ 2万</text>
<text id="tlenged_text_4" data-name="2万≤N＜3万" class=${styles.cls8} transform="translate(147.281 867.217)">2万≤N＜3万</text>
<text id="t5" data-name="3万≤N＜5万" class=${styles.cls8} transform="translate(147.281 837.218)">3万≤N＜5万</text>
<text id="t6" data-name="5万≤N＜7万 拷贝" class=${styles.cls8} transform="translate(147.281 807.219)">5万≤N＜7万</text>
<text id="t7" data-name="7万≤N＜10万" class=${styles.cls8} transform="translate(147.281 777.221)">7万≤N＜10万</text>
<text id="t8" data-name="≥10万" class=${styles.cls8} transform="translate(147.281 748.222)">≥10万</text>`

const scaleNum=0.70;
let HEIGHT=0;
let WIDTH=0

class ChinaMap extends Component{
    componentDidMount(){
        this.initMap();
    }
    initMap=()=>{
        WIDTH=this.svgDom.parentElement.offsetWidth;
        HEIGHT=this.svgDom.parentElement.offsetHeight;
        this.drewMap(mapData);
      
    }
   
    drewMap=(data)=>{
        const chart=d3.select(this.svgDom).attr('width',WIDTH).attr('height',HEIGHT);
        this.svgFirstG = chart.append("g")// 设最外包层在总图上的相对位置
        this.svgFirstG.style('fill-opacity', 1)
        .attr("transform", `translate(${(1-scaleNum)/2*WIDTH},${(1-scaleNum)/2*HEIGHT}) scale(${scaleNum})`)
        ;
    //    ;
        // 设置省path
        this.drewPath(data)
        // 设置省名字title
        this.drewText(data);
        // 设置图例
        this.drewLended(chart);
    }
    drewLended=(svg)=>{
        this.lended=svg.append('g').html(lended)
        // this.lended.attr('dy',100)
        // this.lended.attr('x',-200)
        .attr("transform", `translate(${(scaleNum-1)/2*WIDTH+10},${(scaleNum-1)/2*HEIGHT+100})`)
    }
    drewPath=(data)=>{
        this.provincePath = this.svgFirstG.append('g')
        .attr('class','pathClass')
        .selectAll("path") // 定义省容器
       .data(data.pathData)
       .enter()
       // // 向省容器添加path以及text
       this.provincePath.append('path')
       .attr("class",`state ${styles.province}`)
       .attr("transform", `translate(${(scaleNum-1)/2*WIDTH-150},${(scaleNum-1)/2*HEIGHT+100})`)
       .attr("d", (d)=>d.d)
      .on('mouseover',this.onMouseover)
      .on('mouseout',this.onMouseout)
      .on('click',this.onClick);
    }
    drewText=()=>{
        this.allText=this.svgFirstG.append('g')
        .attr("transform", `translate(${(scaleNum-1)/2*WIDTH-150},${(scaleNum-1)/2*HEIGHT+100})`)
        .attr('class','textClass')
        .selectAll("text")
        .data( mapData.textData )
        .enter()
        .append("text")
        .attr('class',styles.cls19)
        .html(d=>{
            return d.tspan?d.tspan:d.dataName;
           
        })
        .attr("transform",(d) => d.transform)
    }
    onMouseover(d,i){
        d3.select(this).raise()
        .attr("class",`${styles.province} ${styles.mouseoverStyle}`)
    }
    onMouseout(d,i){
        d3.select(this)
        .attr("class",`state ${styles.province}`)
    }
    onClick(){
        d3.select(this).raise()
        .attr("class",`${styles.province} ${styles.mouseoverStyle}`)
    }
    render(){
        return(
            <div className={styles.container}>
             <svg ref={dom=>{this.svgDom=dom}} width={1000} height={1000}></svg>
            </div>
            )
    }
}
export default ChinaMap;