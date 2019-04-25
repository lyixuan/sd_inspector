import React from 'react';
import * as d3 from 'd3';
import {HOT_RANGE} from '@/utils/constants';
import pages from './SVG';
// import {
//   homepage,
//   storelist,
//   studypage,
//   kogoodsdetail,
//   kolist,
//   majordetail} from './SVG';
  import styles from './style.less';
import { func } from 'prop-types';

let tip={}
class KoDetailPage extends React.Component {
  constructor(props) {
    super(props);
    KoDetailPage.that = this;
    KoDetailPage.tip = {};
  }
  componentDidMount() {
    this.drewLended([],pages.homepage);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.behavior.hotDataList!==this.props.behavior.hotDataList){
      if(JSON.stringify(nextProps.behavior.hotDataList)!=='{}' ){
        this.drewLended(nextProps.behavior.hotDataList.newIds,nextProps.behavior.hotDataList.page);
      }
    }
  }
  // 对data数据处理，加上颜色
  getColorFn = (hotData) => {
    hotData.map(item1=>{
      const val = typeof(item1.countRate)==='number'?Number(item1.countRate.toString().split('%')[0]):Number(item1.countRate.split('%')[0])
      const colorVal = HOT_RANGE.filter(item2=> val >= item2.minVal && val<=item2.maxVal)[0];
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
      console.log(id)
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
    const newHotData = hotData.filter(item=>item.actionKeyId===id)[0];
    if(newHotData)
    return `<ul class=${styles.tootipPanl}>
    <li class=${styles.tooltipItem}>点击人数：${newHotData.clickPeople}人</li>
    <li class=${styles.tooltipItem}>人数占比：${newHotData.peopoleRate}%</li>
    <li class=${styles.tooltipItem}>点击次数：${newHotData.clickCountPre}次</li>
    <li class=${styles.tooltipItem}>次数占比：${newHotData.countRate}%</li>
    </ul>`;
  };
  // 处理特殊actionids
  specialData = (data,keyArr,id)=>{
    const newIdArr = [];
    let new_click={
      actionKeyId:id,
      clickCountPre:0,
      clickPeople:0,
      countRate:0,
      peopoleRate:0,
    };
    data.forEach(item=>{
      keyArr.forEach(el=>{
        if(item.actionKeyId===el){
          newIdArr.push(item)
        }
      })
    })
    newIdArr.forEach(item=>{
      const clickNumPro= item.clickNumPro?Number(item.clickNumPro.split('%')[0]):0;
      const clickPeoplePro= item.clickPeoplePro?Number(item.clickPeoplePro.split('%')[0]):0;
      new_click.name=item.name;
      new_click.clickCountPre+=Number(item.clickNum);
      new_click.clickPeople+=Number(item.clickPeople);
      new_click.countRate+=clickNumPro;
      new_click.peopoleRate+=clickPeoplePro;
    })
    data.push(new_click)
    return data
  }
  drewLended = (data,page) => {
    if(data&&data.length){
      if(page==='homepage'){
        this.specialData(data,['homepage_click_testregion_-1','homepage_Click_city_-1'],'homepage_click_city')
      }else if(page==='studypage'){
        this.specialData(data,['studypage_click_golesson_-1','homepage_click_golesson_free_-1'],'studypage_click_golesson');
        this.specialData(data,['studypage_click_record_free_-1','homepage_click_record_-1'],'studypage_click_record');
        this.specialData(data,['studypage_click_livebroadcast_free_-1','homepage_click_livebroadcast-1'],'studypage_click_livebroadcast');
      }
      this.chart = d3.select(this.svgDom).html(pages[page]);
      const colorArr = this.getColorFn(data);
      this.chart.selectAll('text').attr('dominant-baseline',"inherit").attr('text-anchor',"middle");
      // 修改数据
      this.chart.selectAll('.text').text(function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickCountPre;
      }).style('font-weight','600');

      // // 修改商城列表和kolist name
      // this.chart.selectAll('.textVal').nodes().map((item,i)=>{
      //     item.setAttribute('data-name',data[i].actionKeyId)
      //   }
      // )
      // if(page==='storelist'){
      //   this.chart.selectAll('.textName').text(function(){
      //     const val = data.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId);
      //     if(val) return val[0].name;
      //   })
      // }
      // this.chart.selectAll('.textName').text(function(){
      //   const val = data.filter(item=>d3.select(this).attr('data-name')===item.actionKeyId);
      //   if(val) return val[0].clickCountPre;
      // })
      // 修改颜色
      this.chart.selectAll('.mask').style('fill',function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
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
