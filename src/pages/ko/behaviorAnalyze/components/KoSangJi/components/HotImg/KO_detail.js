import React from 'react';
import * as d3 from 'd3';
import {HOT_RANGE} from '@/utils/constants';
import {thousandsFormat} from '@/utils/utils'
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
    if(JSON.stringify(nextProps.behavior.hotDataList)!=='{}'||nextProps.behavior.hotDataList!==this.props.behavior.hotDataList){
      this.drewLended(nextProps.behavior.hotDataList,nextProps.behavior.currentPage,nextProps.behavior.currentActionName);
    }
  }
  // 给data增加颜色属性
  getColorFn = (hotData) => {
    hotData.map(item1=>{
      const val = (!item1.clickNumPro||typeof(item1.clickNumPro)==='number')?item1.clickNumPro:Number(item1.clickNumPro.split('%')[0])
      const colorVal = HOT_RANGE.filter(item2=> val >= item2.minVal && val<=item2.maxVal)[0];
      if(colorVal) return item1.color=colorVal.color
    });
    return hotData;
  };
  // 绘制tip框
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
    <li class=${styles.tooltipItem}>${newHotData.name}</li>
    <li class=${styles.tooltipItem}>点击人数：${thousandsFormat(newHotData.clickPeople)}人</li>
    <li class=${styles.tooltipItem}>人数占比：${newHotData.clickPeoplePro.toFixed(2)}%</li>
    <li class=${styles.tooltipItem}>点击次数：${thousandsFormat(newHotData.clickNum)}次</li>
    <li class=${styles.tooltipItem}>次数占比：${newHotData.clickNumPro.toFixed(2)}%</li>
    </ul>`;
  };
  // 求和
  sumFn = (newIdArr,id)=>{
    let new_click={clickNum:0,clickPeople:0,clickNumPro:0,clickPeoplePro:0,actionKeyId:id};
      newIdArr.forEach(item=>{
        new_click.name=item.name;
        new_click.clickNum+=Number(item.clickNum);
        new_click.clickPeople+=Number(item.clickPeople);
        new_click.clickNumPro+=Number(item.clickNumPro);
        new_click.clickPeoplePro+=Number(item.clickPeoplePro);
      })
      return new_click
  }
  // 处理不同id表示同一模块的actionids
  specialData = (data,keyArr,id)=>{
    const newIdArr = [];
    data.forEach(item=>{
      keyArr.forEach(el=>{
        if(item.actionKeyId===el){
          newIdArr.push(item)
        }
      })
    })
    if(newIdArr.length&&!data.find(item=>item.actionKeyId===id)){
      data.push(this.sumFn(newIdArr,id))
    }
    return data
  }
  // 处理actionkey相同的子项之和
  getActionKeyList = (data,key,id,bol)=>{
    const newKeyArr=data.filter(item=>item.actionKey===key);
    return bol?newKeyArr:(newKeyArr.length&&!data.find(item=>item.actionKeyId===id)? data.push(this.sumFn(newKeyArr,id)):null)
  }
  // 首页展示名字规则：字数超过三行显示省略号
  dealHomeText = (newKeys)=>{
    this.chart.selectAll('.textWrap11 .textVal').nodes().map((item,i)=>{
      return item.setAttribute('data-name',newKeys[i].actionKeyId)
    })
    this.chart.selectAll('.textWrap12 .textVal').nodes().map((item,i)=>{
      return item.setAttribute('data-name',newKeys[i].actionKeyId)
    })
    this.chart.selectAll('.textWrap11 .textVal').text(function(){
      const val = newKeys.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
      let name='';
      if(val) {
        if(val.name.length>4){
          name=`${val.name.slice(4,8)}`
        }
      }
      return name;
    })
    this.chart.selectAll('.textWrap12 .textVal').text(function(){
      const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
      let name='';
      if(val){
        if(val.name.length>8) {
          if(val.name.length<12){
            name=`${val.name.slice(8)}`;
          }else{
            name=`${val.name.slice(8,11)}...`;
          }
        }
      }
      return name;
    })
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
        if(val) {
          let name=val.name;
          if(id==='homepage_ko_item'){
            name=val.name.length>4?`${val.name.slice(0,4)}`:val.name
          }
          
          return name;
        }
      })
      if(id==='homepage_ko_item'){
        this.dealHomeText(newKeys)
      }
    
      this.chart.selectAll('.textWrap3 .textVal').text(function(){
        const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickNumPro.toFixed(2)+'%';
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
  drewLended = (data,page,currentActionName) => {
    if(data&&data.length){
      this.chart = d3.select(this.svgDom).html(pages[page]);
      this.chart.selectAll('text').attr('dominant-baseline',"inherit").attr('text-anchor',"middle");
      this.chart.selectAll('.textWrap1 text').attr('dominant-baseline',"inherit").attr('text-anchor',"left");
      this.chart.selectAll('.textWrap11 text').attr('text-anchor',"start");
      this.chart.selectAll('.textWrap12 text').attr('text-anchor',"start");

      const colorArr = this.getColorFn(data);

      // 处理特殊页面
      if(page==='homepage'){
        this.dealListDom(data,'click_ko_item','homepage_ko_item',true);
        this.specialData(data,['homepage_click_testregion_-1','homepage_Click_city_-1'],'homepage_click_city')
        // this.getActionKeyList(data,'click_ko_item','homepage_add_koitem')
      }else if(page==='studypage'){
        this.specialData(data,['studypage_click_golesson_-1','studypage_click_golesson_free_-1'],'studypage_click_golesson');
        this.specialData(data,['studypage_click_record_free_-1','studypage_click_record_-1'],'studypage_click_record');
        this.specialData(data,['studypage_click_livebroadcast_free_-1','studypage_click_livebroadcast-1'],'studypage_click_livebroadcast');
      }else if(page==='storelist'){
        this.dealListDom(data,'Click_major','storelist_ko_item',true);
      }else if(page==='kolist'){
        this.dealListDom(data,'click_ko_item','kolist_ko_item',true);
      }else if(page==='livefeedpage'){
        this.dealListDom(data,'click_change_live','livefeedpage_live_item',true);
      }
      // 修改数据
      this.chart.selectAll('.text').text(function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickNumPro.toFixed(2)+'%';
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
    // 展示大标题名字
    if(currentActionName){
      this.chart.selectAll('.isShow tspan').text(currentActionName)
    }else{
      this.chart.selectAll('.isShow').style('display', 'none')
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
