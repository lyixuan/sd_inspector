import React from 'react';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import DatePickerDecorator from 'antd/lib/date-picker';
import moment from 'moment';
import Select from '../../component/Select';
import styles from '../../style.less';
import {provinceJson} from '@/utils/constants';

const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
export default class Survey extends React.Component {
  constructor(props){
    super(props);
    this.state={
      province:'报考省份',
      collegeId:'学院',
      familyId:'家族',
      beginDate:'',
      endDate:'',
      familyData:[], // 家族的下拉框options
    };
  }
  collegeData = ()=>{
    return [
      {name:'学院',code:111,children:[{name:'家族1',code:11},{name:'家族11',code:12},{name:'家族12',code:13}]},
      {name:'学院1',code:211,children:[{name:'家族2',code:21},{name:'家族21',code:22},{name:'家族22',code:23}]},
      {name:'学院2',code:311,children:[{name:'家族3',code:31},{name:'家族31',code:32},{name:'家族32',code:33}]},];
  };
  // 选择框修改
  handleChange = (value,id)=> {
    if(id === 'province'){
      this.setState({
        province:value,
      });
    }else if(id === 'college'){
      const familyData = this.collegeData().filter(item => item.code===value)[0].children ;
      this.setState({
        collegeId:value,
        familyId:familyData[0].code,
        familyData,
      });
    }else if(id === 'family'){
      this.setState({
        familyId:value,
      });
    }
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
    const {searchData} = this.props;
    searchData({ province, collegeId, familyId, beginDate, endDate});
  };
  reset = () =>{
    this.setState({
      province:'报考省份',
      collegeId:'学院',
      familyId:'家族',
      beginDate:'',
      endDate:'',
      familyData:[]
    })
  };
  render(){
    const { province, collegeId, familyId, beginDate, endDate,familyData} =  this.state;

    return (
      <>
        <div>
          <span className={styles.searchTxt}>查询条件：</span>
          <Select options={provinceJson} defaultValue={province} id='province' handleChange={this.handleChange} />
          <Select options={this.collegeData()} defaultValue={collegeId} id='college' handleChange={this.handleChange} />
          <Select options={familyData} defaultValue={familyId} id='family' handleChange={this.handleChange} />
          <RangePicker placeholder={['开始时间','结束时间']} onChange={this.dateChange} value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}/>
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
