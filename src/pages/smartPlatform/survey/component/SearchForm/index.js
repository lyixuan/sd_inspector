import React from 'react';
import { connect } from 'dva';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import DatePickerDecorator from 'antd/lib/date-picker';
import moment from 'moment';
import Select from '../../component/Select';
import styles from '../../style.less';

const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
@connect(({ home }) => ({
  home,
}))
 class Survey extends React.Component {
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

  // 选择框修改
  handleChange = (value,id)=> {
    const {newOrgList} = this.newData();
    if(id === 'province'){
      this.setState({
        province:value,
      });
    }else if(id === 'college'){
      const familyData = newOrgList.filter(item => item.id===value)[0].sub ;
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
    const newPro = province==='报考省份'|| province==="所有省份"?null:province;
    const newCol = collegeId!=='学院'?collegeId:null;
    const newFam = familyId!=='家族'?familyId:null;

    const {searchData} = this.props;
    searchData({ province:newPro, collegeId:newCol, familyId:newFam, beginDate, endDate});
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
  newData = ()=>{
    const {orgList,provinceJson} = this.props.home;
    let newOrgList=JSON.parse(JSON.stringify(orgList)),newProvinceJson=JSON.parse(JSON.stringify(provinceJson));
    if(orgList){
      newOrgList.unshift({name:'全部学院',id:null,sub:[]});
      newOrgList.map(item=>item.sub.unshift({name:'全部家族',id:null,sub:[]}));
    }
    if(provinceJson){
      newProvinceJson.unshift({name:'所有省份',code:null});
    }
    return {newOrgList,newProvinceJson}
  };
  render(){
    const { province, collegeId, familyId, beginDate, endDate,familyData} =  this.state;
    const {newOrgList,newProvinceJson} = this.newData();

    return (
      <>
        <div>
          <span className={styles.searchTxt}>查询条件：</span>
          <Select options={newProvinceJson} defaultValue={province} id='province' handleChange={this.handleChange} showName/>
          <Select options={newOrgList} defaultValue={collegeId} id='college' handleChange={this.handleChange} value='id' />
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
