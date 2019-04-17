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

const data=[{name:'d1',val:10},{name:'d2',val:30},{name:'d3',val:40},
{name:'d4',val:10},{name:'d5',val:30},{name:'d6',val:40},
{name:'d7',val:10},{name:'d8',val:30},{name:'d9',val:40},
{name:'d10',val:10},{name:'d11',val:10},{name:'d12',val:50},{name:'d13',val:63},{name:'d14',val:70},{name:'d15',val:80}]

let tip={}
class KoDetailPage extends React.Component {
  constructor(props) {
    super(props);
    KoDetailPage.that = this;
    KoDetailPage.tip = {};
    this.state = {
      mapData: {},
      examineStepList: [], // 选中状态
      selectedProvince: 'SD', // 默认选中省份的id
      pushNum: 0,
      province: '',
    };
  }
  componentDidMount() {
    this.drewLended();
  
  }
  getColorFn = () => {// 对data数据处理，加上颜色
     data.map(item1=>{
      const colorVal = HOT_RANGE.filter(item2=>item1.val>=item2.minVal&&item1.val<=item2.maxVal)[0];
      if(colorVal) return item1.color=colorVal.color
    })
    return data;
  }
  drewTip = ()=>{
    const that = this;
    let div = d3.select('#mapTooltip');
    if (!d3.select('#mapTooltip').node()) {
      div = d3
        .select('body')
        .append('div')
        .attr('class', `${styles.tooltip} tooltip`) //用于css设置类样式
        .attr('id', 'mapTooltip')
    }
    tip.show = function() {
      // const showOriginData = d3.select(this).datum();
      // if (!showOriginData) return;
      const { pageX, pageY } = d3.event;
      div
        .style('display', 'block')
        .style('top', `${pageY}px`)
        .style('left', `${pageX + 20}px`)
        .html(that.tooltipText());
    };
    tip.hide = () => {
      div.style('display', 'none');
    };
  }
  tooltipText = id => {
    return `<ul class=${styles.tootipPanl}>
    <li class=${styles.tooltipItem}>点击人数：20人</li>
    <li class=${styles.tooltipItem}>人数占比：${(0.22 * 100).toFixed(2)}%
    <li class=${styles.tooltipItem}>点击次数：200次</li>
    <li class=${styles.tooltipItem}>次数占比：${(0.22 * 100).toFixed(2)}%
    </ul>`;
  };
  drewLended = () => {
    this.chart = d3.select(this.svgDom).html(IndexPage);
    const colorArr = this.getColorFn()
  
    // 修改数据
    this.chart.selectAll('.text').text(function(){
      const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.name)[0];
      if(val) return val.val;
    });
    // 修改颜色
    this.chart.selectAll('.mask').style('fill',function(){
      const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.name)[0];
      if(val) return val.color;
    })
    .on('mouseover', KoDetailPage.that.drewTip())
    .on('mouseout', tip.hide)
    .on('mousemove', tip.show);
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
