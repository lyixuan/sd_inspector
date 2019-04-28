import React from 'react';
import * as d3 from 'd3';
import {HOT_RANGE} from '@/utils/constants';
import pages from './SVG';
import styles from './style.less';

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
      this.drewLended(nextProps.behavior.hotDataList.newIds,nextProps.behavior.hotDataList.page);
    }
  }
  // 对data数据处理，加上颜色
  getColorFn = (hotData) => {
    hotData.map(item1=>{
      const val = (!item1.clickNumPro||typeof(item1.clickNumPro)==='number')?item1.clickNumPro:Number(item1.clickNumPro.split('%')[0])
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
    <li class=${styles.tooltipItem}>人数占比：${newHotData.clickPeoplePro.toFixed(2)}%</li>
    <li class=${styles.tooltipItem}>点击次数：${newHotData.clickNum}次</li>
    <li class=${styles.tooltipItem}>次数占比：${newHotData.clickNumPro.toFixed(2)}%</li>
    </ul>`;
  };
  // 处理不同id表示同一模块的actionids
  specialData = (data,keyArr,id)=>{
    const newIdArr = [];
    let new_click={};
    data.forEach(item=>{
      keyArr.forEach(el=>{
        if(item.actionKeyId===el){
          newIdArr.push(item)
        }
      })
    })
    if(newIdArr.length){
      new_click={
        actionKeyId:id,
        clickNum:0,
        clickPeople:0,
        clickNumPro:0,
        clickPeoplePro:0
      };
      newIdArr.forEach(item=>{
        new_click.name=item.name;
        new_click.color=item.color;
        new_click.clickNum+=Number(item.clickNum);
        new_click.clickPeople+=Number(item.clickPeople);
        new_click.clickNumPro+=Number(item.clickNumPro);
        new_click.clickPeoplePro+=Number(item.clickPeoplePro);
      })
      data.push(new_click)
    }
    return data
  }
  // 处理actionkey相同的子项之和
  getActionKeyList = (data,key,id,bol)=>{
    const newKeyArr=[];
    let new_click={};
    data.forEach(item=>{
      if(item.actionKey===key){
        newKeyArr.push(item)
      }
    })
    if(!bol){
      if(newKeyArr.length){
        new_click.actionKeyId=id;
        newKeyArr.forEach(item=>{
          new_click.name=item.name;
          new_click.clickNum+=Number(item.clickNum);
          new_click.clickPeople+=Number(item.clickPeople);
          new_click.clickNumPro+=Number(item.clickNumPro);
          new_click.clickPeoplePro+=Number(item.clickPeoplePro);
        })
        data.push(new_click)
      }
      return data
    }else{
      return newKeyArr
    }
  }
  // 动态添加列表
  dealListDom = (data,actionKey,id,bol)=>{
    let newKeys = this.getActionKeyList(data,actionKey,id,bol);
    newKeys = newKeys.sort((a,b)=>{  
      return b.clickNum-a.clickNum 
    })
    newKeys = newKeys.slice(0,10);
    if(newKeys.length){
      this.chart.selectAll('.textWrap1 .textVal').nodes().map((item,i)=>{
        return item.setAttribute('data-name',newKeys[i].actionKeyId)
      })
      this.chart.selectAll('.textWrap2 .textVal').nodes().map((item,i)=>{
        return item.setAttribute('data-name',newKeys[i].actionKeyId)
      })
      this.chart.selectAll('.textWrap3 .textVal').nodes().map((item,i)=>{
        return item.setAttribute('data-name',newKeys[i].actionKeyId)
      })
      this.chart.selectAll('.textWrap1 .textVal').text(function(){
        const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.name;
      })
      this.chart.selectAll('.textWrap3 .textVal').text(function(){
        const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickNum;
      })
      .on('mouseover', KoDetailPage.that.drewTip(data))
      .on('mouseout', tip.hide)
      .on('mousemove', tip.show);
      this.chart.selectAll('.textWrap2 .textVal').style('fill',function(){
        const val = newKeys.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) {
          return val.color;
        }
      })
      .on('mouseover', KoDetailPage.that.drewTip(data))
      .on('mouseout', tip.hide)
      .on('mousemove', tip.show);
    }
  }
  drewLended = (data,page) => {
    if(data&&data.length){
      this.chart = d3.select(this.svgDom).html(pages[page]);
      this.chart.selectAll('text').attr('dominant-baseline',"inherit").attr('text-anchor',"middle");
      this.chart.selectAll('.textWrap1 text').attr('dominant-baseline',"inherit").attr('text-anchor',"left");

      const colorArr = this.getColorFn(data);

      // 处理特殊页面
      if(page==='homepage'){
        let m = this.specialData(data,['homepage_click_testregion_-1','homepage_Click_city_-1'],'homepage_click_city')
        console.log(m)
        this.getActionKeyList(data,'click_ko_item','homepage_add_koitem')
      }else if(page==='studypage'){
        this.specialData(data,['studypage_click_golesson_-1','homepage_click_golesson_free_-1'],'studypage_click_golesson');
        this.specialData(data,['studypage_click_record_free_-1','homepage_click_record_-1'],'studypage_click_record');
        this.specialData(data,['studypage_click_livebroadcast_free_-1','homepage_click_livebroadcast-1'],'studypage_click_livebroadcast');
      }else if(page==='storelist'){
        this.dealListDom(data,'Click_major','storelist_ko_item',true);
      }else if(page==='kolist'){
        this.dealListDom(data,'click_ko_item','kolist_ko_item',true);
      }
      // 修改数据
      this.chart.selectAll('.text').text(function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickNum;
      }).style('font-weight','600')
      .on('mouseover', KoDetailPage.that.drewTip(data))
      .on('mouseout', tip.hide)
      .on('mousemove', tip.show);

      // 修改颜色
      this.chart.selectAll('.mask').style('fill',function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) {
          return val.color;
        }
      })
      .on('mouseover', KoDetailPage.that.drewTip(data))
      .on('mouseout', tip.hide)
      .on('mousemove', tip.show);
    }else{
      d3.select(this.svgDom).html(pages[page]);
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
