import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import BITabs from '@/ant_components/BITabs';
import BIDatePicker from '@/ant_components/BIDatePicker';
import staticMap from '@/assets/staticMap.svg';
import styles from './style.less';
import {blendChartOptions}  from './component/echartOptions/college_options';
import {famProOPtion}  from './component/echartOptions/family_prov_options';
import {groupOPtion}  from './component/echartOptions/group_options';
import moment from 'moment/moment';
import BIButton from '@/ant_components/BIButton';

const  { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({ exam, loading }) => ({
  exam,
  loading: loading.models.exam,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beginDate: "2019-03-02",
      endDate:"2019-03-03",
      tabId:'examPlan',
      name:'考试计划人数',
      legend:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
      legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
    };

  }
  componentDidMount() {
    this.examTotal();
    this.province();
    this.examOrg('college');
    this.examOrg('family');
    this.examOrg('group');
  }
  examTotal = () => {
    this.props.dispatch({
      type: 'exam/examTotal',
    })
  };
  province = () => {
    const {beginDate,endDate}=this.state;
    this.props.dispatch({
      type: 'exam/province',
      payload: {beginDate,endDate},
    })
  };
  examOrg = (orgType) => {
    const {beginDate,endDate}=this.state;
    const param = {
      beginDate,endDate,orgType
    };
    this.props.dispatch({
      type: 'exam/examOrg',
      payload: param,
    })
  };
  switchContent=(val)=>{
    if(val === 'examPlan'){
      this.setState({
        tabId:"examPlan",
        name:'考试计划人数',
        legend:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
        legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
      })
    }else if(val === 'examNotice'){
      this.setState({
        tabId:"examNotice",
        name:'报考通知人数',
        legend:['老生触达率','新生触达率','应通知老生人数','应通知新生人数'],
        legendGroup:['新生应通知人数/新生触达率','老生应通知人数/老生触达率','未触达人数/未触达率']
      })
    }else if(val === 'examTicket'){
      this.setState({
        tabId:"examTicket",
        name:'准考证填写',
        legend:['老生填写率','新生填写率','老生填写人数','新生填写人数'],
        legendGroup:['新生填写人数/新生填写率','老生填写人数/老生填写率','未填写人数/未填写率']
      })
    }
    console.log(val)
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    return current < moment('2018-10-23') || current > moment(day1,dateFormat);
  };
  // 日期修改
  dateChange=(value, dateString)=> {
    this.setState({
      beginDate:dateString[0],
      endDate:dateString[1],
    });
  };
  render() {
    const {tabId,endDate,beginDate} = this.state;
    const { exam } = this.props;
    const { porDataList = {} ,famDataList={},examTotal={}} = exam;
    const tabData = [{name:'考试计划',id:'examPlan',data:[]},{name:'报考通知',id:'examNotice',data:[]},{name:'准考证填写',id:'examTicket',data:[]}];

    return (
      <Spin spinning={false}>
        <BITabs onChange={this.switchContent} type="card" tabBarStyle={{backgroundColor:'#fff',padding:'19px 0 0 30px'}}>
          {
            tabData.map(item=> <BITabs.TabPane tab={item.name} key={item.id}>
              <div className={styles.m_container}>
                <div className={styles.map_container}>
                  <div style={{width:'928px',margin:'0 auto'}}>
                    <img src={staticMap} alt="" width='631' height='526' style={{margin:'29px 47px 20px 0'}}/>
                    <div className={styles.m_mapInfo}>
                      {
                        examTotal[tabId]?examTotal[tabId].map((itemList,i)=>{
                          return  <p key={itemList.name} className={i===0?styles.map_title:styles.map_txt}>{itemList.name}{itemList.value}</p>
                        }):null
                      }
                    </div>
                  </div>
                </div>
                <div className={styles.selectTime}>
                 <span className={styles.selectTxt}>筛选日期</span>
                  <BIRangePicker
                    placeholder={['开始时间','结束时间']}
                    onChange={this.dateChange}
                    style={{ width: '230px'}}
                    disabledDate={this.disabledDate}
                    value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}
                  />
                </div>
                <div className={styles.echartCls}>
                  <div className='m_box'>
                    <p className={styles.proTip}>点击省份可查看该省份的学院及家族数据</p>
                    <Echart clickEvent update={porDataList} style={{ width: '100%', height: "1500px" }} options={famProOPtion(this.state,porDataList,'pro')} />
                  </div>
                  <div className='m_box'><Echart update={porDataList} style={{ width: '100%', height: "410px" }} options={blendChartOptions(this.state,{},'all')} /></div>
                  <div className='m_box'><Echart update={famDataList} style={{ width: '100%', height: "1700px" }} options={famProOPtion(this.state,famDataList,'fam')} /></div>
                  <div className='m_box'>
                    <Echart update={porDataList} style={{ width: '100%', height: "410px" }} options={groupOPtion(this.state)} />
                    <BIButton type="primary" style={{marginBottom:'20px'}} onClick={()=>console.log(1)}>查看更多</BIButton>
                  </div>
                </div>
              </div>
            </BITabs.TabPane>)
          }
        </BITabs>
      </Spin>
    );
  }

}
export default Survey;
