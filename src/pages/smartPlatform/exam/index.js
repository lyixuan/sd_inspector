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
      beginDate:'',
      endDate:'',
      name:'考试计划人数',
      legend:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
      legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
    };

  }
  componentDidMount() {

  }
  switchContent=(val)=>{
    if(val === 'examPlan'){
      this.setState({
        name:'考试计划人数',
        legend:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
        legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
      })
    }else if(val === 'examNotice'){
      this.setState({
        name:'报考通知人数',
        legend:['老生触达率','新生触达率','应通知老生人数','应通知新生人数'],
        legendGroup:['新生应通知人数','新生触达率','老生应通知人数','老生触达率','未触达人数','未触达率']
      })
    }else if(val === 'examTicket'){
      this.setState({
        name:'准考证填写',
        legend:['老生填写率','新生填写率','老生填写人数','新生填写人数'],
        legendGroup:['新生填写人数','新生填写率','老生填写人数','老生填写率','未填写人数','未填写率']
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
    console.log(dateString)
  };
  render() {
    const {legend,name,endDate,beginDate} = this.state;
    const { exam } = this.props;
    const { dataList = {} } = exam;
    const { data1 = {}, data2 = {} } = dataList;
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
                      <p className={styles.map_title}>全国{name}共：500000人</p>
                      <p className={styles.map_txt}>{legend[0]}：2300</p>
                      <p className={styles.map_txt}>{legend[1]}：2300</p>
                      <p className={styles.map_txt}>{legend[2]}：2300</p>
                      <p className={styles.map_txt}>{legend[3]}：2300</p>
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
                    // value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}
                  />
                </div>
                <div>
                  <div className='m_box'><Echart clickEvent update={data1} style={{ width: '100%', height: "510px" }} options={famProOPtion(this.state,data1,'pro')} /></div>
                  <div className='m_box'><Echart update={data1} style={{ width: '100%', height: "410px" }} options={blendChartOptions(this.state,exam,'all')} /></div>
                  <div className='m_box'><Echart update={data1} style={{ width: '100%', height: "510px" }} options={famProOPtion(this.state,data2,'fam')} /></div>
                  <div className='m_box'><Echart update={data1} style={{ width: '100%', height: "510px" }} options={groupOPtion(this.state)} /> <p className={styles.checkMore} onClick={()=>console.log(1)}>查看更多</p></div>
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
