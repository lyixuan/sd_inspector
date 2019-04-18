import React from 'react';
import * as d3 from 'd3';
import {HOT_RANGE} from '@/utils/constants'
import {
  IndexPage,
  ShopPage,
  StartList,
  KoDetail,
  KoList,
  CertifiCate,
  SelfExam} from './SVG';
  import styles from './style.less';

let tip={}
class KoDetailPage extends React.Component {
  constructor(props) {
    super(props);
    KoDetailPage.that = this;
    KoDetailPage.tip = {};
  }
  componentDidMount() {
    this.drewLended([]);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.behavior.hotDataList.length&&nextProps.behavior.hotDataList!==this.props.behavior.hotDataList){
      this.drewLended(nextProps.behavior.hotDataList);
    }
  }
  getColorFn = (hotData) => {// 对data数据处理，加上颜色
    hotData.map(item1=>{
      const colorVal = HOT_RANGE.filter(item2=>item1.countRate>=item2.minVal&&item1.countRate<=item2.maxVal)[0];
      if(colorVal) return item1.color=colorVal.color
    });
    return hotData;
  };
  drewTip = (hotData)=>{
    const that = this;
    let div = d3.select('#mapTooltip');
    if (!div.node()) {
      div = d3
        .select('body')
        .append('div')
        .attr('class', `${styles.tooltip} tooltip`) //用于css设置类样式
        .attr('id', 'mapTooltip')
    }
    tip.show = function() {
      const id = d3.select(this).attr('data-name');
      const { pageX, pageY } = d3.event;
      div
        .style('display', 'block')
        .style('top', `${pageY}px`)
        .style('left', `${pageX + 20}px`)
        .html(that.tooltipText(hotData,id));
    };
    tip.hide = () => {
      div.style('display', 'none');
    };
  }
  tooltipText = (hotData,id) => {
    const newHotData = hotData.filter(item=>item.name===id)[0];
    return `<ul class=${styles.tootipPanl}>
    <li class=${styles.tooltipItem}>点击人数：${newHotData.clickPeople}人</li>
    <li class=${styles.tooltipItem}>人数占比：${newHotData.peopoleRate}%</li>
    <li class=${styles.tooltipItem}>点击次数：${newHotData.clickCountPre}次</li>
    <li class=${styles.tooltipItem}>次数占比：${newHotData.countRate}%</li>
    </ul>`;
  };
  drewLended = (data) => {
    if(data&&data.length){
      this.chart = d3.select(this.svgDom).html(StartList);
      const colorArr = this.getColorFn(data);
      this.chart.selectAll('text').attr('dominant-baseline',"inherit").attr('text-anchor',"middle");
      // 修改数据
      this.chart.selectAll('.text').text(function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.name)[0];
        if(val) return val.clickCountPre;
      });
      // 修改颜色
      this.chart.selectAll('.mask').style('fill',function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.name)[0];
        if(val) return val.color;
      })
      .on('mouseover', KoDetailPage.that.drewTip(data))
      .on('mouseout', tip.hide)
      .on('mousemove', tip.show);
    }
  };

  render() {
    return (
      <div style={{width:'254px',height:'525px',}} ref={dom => {
        this.svgDom = dom;
      }}></div>
    );
  }
}

export default KoDetailPage;
