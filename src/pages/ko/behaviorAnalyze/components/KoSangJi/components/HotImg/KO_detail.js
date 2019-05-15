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
      const val = (!item1.clickPeoplePro||typeof(item1.clickPeoplePro)==='number')?item1.clickPeoplePro:Number(item1.clickPeoplePro.split('%')[0])
      const colorVal = HOT_RANGE.filter(item2=> val >= item2.minVal && val<=item2.maxVal)[0];
      if(colorVal) item1.color=colorVal.color
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
      keyArr.forEach(el=>{ if(item.actionKeyId===el) newIdArr.push(item) })
    })
   
    if(newIdArr.length&&!data.find(item=>item.actionKeyId===id)){
      data.push(this.sumFn(newIdArr,id))
    }
    return data
  }
  // 处理actionkey相同的子项之和
  getActionKeyList = (data,key,id,bol)=>{
    const newKeyArr=data.filter(item=>(item.actionKey===key&&Number(item.actionKeyId.split('$')[1])>-1));
    return bol?newKeyArr:(newKeyArr.length&&!data.find(item=>item.actionKeyId===id)? data.push(this.sumFn(newKeyArr,id)):null)
  }
  // 首页展示名字规则：字数超过三行显示省略号
  dealHomeText = (newKeys)=>{
    const domClass = ['.textWrap11 .textVal','.textWrap12 .textVal'];
    domClass.forEach(classname=>{
      this.chart.selectAll(classname).nodes().map((item,i)=>item.setAttribute('data-name',newKeys[i].actionKeyId))
    })
    this.chart.selectAll(domClass[0]).text(function(){
      const val = newKeys.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
      if(val) return val.name&&val.name.length>4?`${val.name.slice(4,8)}`:'';
    })
    this.chart.selectAll(domClass[1]).text(function(){
      const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
      if(val){if(val.name.length>8) return val.name.length<12?`${val.name.slice(8)}`:`${val.name.slice(8,11)}...`;}
    })
  }
  // 动态添加列表
  dealListDom = (data,actionKey,id,bol)=>{
    const domClass=['.textWrap1 .textVal','.textWrap2 .textVal','.textWrap3 .textVal'],
      newKeys = this.getActionKeyList(data,actionKey,id,bol).sort((a,b)=>(b.clickNum-a.clickNum)).slice(0,10);
    if(newKeys.length){
      // 首页动态加载特殊处理
      if(id==='homepage_ko_item') this.dealHomeText(newKeys)
      // 给dom动态添加data-name
      domClass.forEach(classname=>{
        this.chart.selectAll(classname).nodes().map((item,i)=>{
          return newKeys[i]?item.setAttribute('data-name',newKeys[i].actionKeyId):null
        })
      })
      // 名字
      this.chart.selectAll(domClass[0]).text(function(){
        const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) {
          if(id==='homepage_ko_item'&&val.name.length>4) return `${val.name.slice(0,4)}`;
          else return val.name;
         }
      })
      // 数据
      this.chart.selectAll(domClass[2]).text(function(){
        const val = newKeys.filter((item,i)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickPeoplePro.toFixed(2)+'%';
      })
        .on('mouseover', KoDetailPage.that.drewTip(data))
        .on('mouseout', tip.hide)
        .on('mousemove', tip.show);
      // 颜色
      this.chart.selectAll(domClass[1]).style('fill',function(){
        const val = newKeys.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.color;
      })
        .on('mouseover', KoDetailPage.that.drewTip(data))
        .on('mouseout', tip.hide)
        .on('mousemove', tip.show);
    }
  }
  drewLended = (data,page,currentActionName) => {
    this.chart = d3.select(this.svgDom).html(pages[page]);
    if(data&&data.length){
      this.chart.selectAll('text').attr('dominant-baseline',"inherit").attr('text-anchor',"middle");
      this.chart.selectAll('.textWrap1 text').attr('dominant-baseline',"inherit").attr('text-anchor',"left");
      this.chart.selectAll('.textWrap11 text').attr('text-anchor',"start");
      this.chart.selectAll('.textWrap12 text').attr('text-anchor',"start");
      this.chart.selectAll('.isShow').attr('text-anchor',"start");

      const colorArr = this.getColorFn(data);

      // 处理特殊页面
      if(page==='homepage'){
        this.dealListDom(data,'click_ko_item','homepage_ko_item',true);
        this.specialData(data,['homepage_click_testregion$-1','homepage_Click_city$-1'],'homepage_click_testregion');
      }else if(page==='studypage'){
        this.specialData(data,['studypage_click_golesson$-1','studypage_click_golesson_free$-1'],'studypage_click_golesson');
        this.specialData(data,['studypage_click_record_free$-1','studypage_click_record$-1'],'studypage_click_record');
        this.specialData(data,['studypage_click_livebroadcast_free$-1','studypage_click_livebroadcast-1'],'studypage_click_livebroadcast');
      }else if(page==='storelist'){
        this.dealListDom(data,'Click_major','storelist_ko_item',true);
      }else if(page==='kolist'){
        this.dealListDom(data,'click_ko_item','kolist_ko_item',true);
      }else if(page==='livefeedpage'){
        this.dealListDom(data,'click_change_live','livefeedpage_live_item',true);
      }else if(page==='majordetail'){
        this.specialData(data,['majordetail_click_intro _class$-1','majordetail_click_intro_class$-1'],'majordetail_click_intro_class');
      }
      // 修改数据
      this.chart.selectAll('.text').text(function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.clickPeoplePro.toFixed(2)+'%';
      })
        .style('font-weight','600')
        .on('mouseover', KoDetailPage.that.drewTip(data))
        .on('mouseout', tip.hide)
        .on('mousemove', tip.show);

      // 修改颜色
      this.chart.selectAll('.mask').style('fill',function(){
        const val = colorArr.filter((item)=>d3.select(this).attr('data-name')===item.actionKeyId)[0];
        if(val) return val.color;
      })
        .on('mouseover', KoDetailPage.that.drewTip(data))
        .on('mouseout', tip.hide)
        .on('mousemove', tip.show);
    }
    // 展示详情页标题
    if(currentActionName) this.chart.selectAll('.isShow tspan').text(currentActionName)

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
