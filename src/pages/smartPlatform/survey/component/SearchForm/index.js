import React from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import DatePickerDecorator from 'antd/lib/date-picker';
import moment from 'moment';
import Select from '../../component/Select';
import styles from '../../style.less';
import {provinceJson} from '@/utils/constants';

const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
@connect(({ home }) => ({
  home,
}))
 class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state={
      province:'全部',
      collegeId:null,
      familyId:'全部',
      beginDate:'',
      endDate:'',
      familyData:[], // 家族的下拉框options
    };
  }

  // 选择框修改
  handleChange = (value,id)=> {
    const {orgList} = this.props.home;
    if(id === 'province'){
      this.setState({
        province:value,
      });
    }else if(id === 'college'){
      const familyData = orgList.filter(item => item.id===value)[0].sub ;
      this.setState({
        collegeId:value,
        familyId:familyData[0].id,
        familyData,
      });
    }else if(id === 'family'){
      this.setState({
        familyId:value,
      });
    }
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const {dateRange} = this.props.home;
    const {beginTime,endTime} = dateRange;
    return current < moment(beginTime) || current > moment(endTime);
  };
  // 日期修改
  dateChange=(value, dateString)=> {
    this.setState({
      beginDate:dateString[0],
      endDate:dateString[1],
    });
  };
  search = () =>{
    const { province, collegeId, familyId, beginDate, endDate} =  this.state;
    const newPro = province!=='全部'?province:'';
    const newFam = familyId!=='全部'?familyId:null;

    const {searchData} = this.props;
    searchData({ province:newPro, collegeId, familyId:newFam, beginDate, endDate});
  };
  reset = () =>{
    this.setState({
      province:'全部',
      collegeId:null,
      familyId:'全部',
      beginDate:'',
      endDate:'',
      familyData:[]
    })
  };
  render(){
    const { province, collegeId, familyId, beginDate, endDate,familyData} =  this.state;
    const {orgList} = this.props.home;

    return (
      <>
        <div>
          <span className={styles.searchTxt}>查询条件：</span>
          <Select options={provinceJson} defaultValue={province} id='province' handleChange={this.handleChange} showName/>
          <Select options={orgList} defaultValue={collegeId} id='college' handleChange={this.handleChange} value='id' />
          <Select options={familyData} defaultValue={familyId} id='family' handleChange={this.handleChange} value='id' />
          <RangePicker
            placeholder={['开始时间','结束时间']}
            onChange={this.dateChange}
            disabledDate={this.disabledDate}
            value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}
          />
        </div>
        <div>
          <Button type="primary2" style={{marginRight:'20px'}} onClick={this.reset}>恢复默认</Button>
          <Button type="primary" onClick={this.search}>
            <Icon type="search" style={{fontSize:'16px'}} />
            查询
          </Button>
        </div>
      </>
    );
  }
}
export default Survey;
