import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton'
import BIDatePicker from '@/ant_components/BIDatePicker';
import moment from 'moment';
import BISelect from '../Select';
import styles from '../../style.less';

const  { BIRangePicker } = BIDatePicker;
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
      groupId:'小组',
      beginDate:'2018-10-23',
      endDate: '',
      familyData:[], // 家族的下拉框options
      groupData:[], // 家族的下拉框options
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
        groupId:'全部小组',
      });
    }else if(id === 'family'){
      const groupData = this.state.familyData.filter(item => item.id===value)[0].sub ;
      this.setState({
        familyId:value,
        groupId:groupData[0].id,
        groupData,
      });
    } else if(id === 'group'){
      this.setState({
        groupId:value,
      });
    }
  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    // const {dateRange} = this.props.home;
    // const {beginTime,endTime} = dateRange;
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
  search = () =>{
    const { province, collegeId, familyId, groupId,beginDate, endDate} =  this.state;
    const newPro = province==='报考省份'|| province==="所有省份"?null:province;
    const newCol = collegeId!=='学院'?collegeId:null;
    const newFam = familyId!=='家族'?familyId:null;
    const newGroup = groupId!=='小组'&&groupId!=='全部小组'?groupId:null;

    const {searchData} = this.props;
    searchData({ province:newPro, collegeId:newCol, familyId:newFam, beginDate, endDate,groupId:newGroup});
  };
  reset = () =>{
    this.setState({
      province:'报考省份',
      collegeId:'学院',
      familyId:'家族',
      groupId:'小组',
      beginDate:'',
      endDate:'',
      familyData:[],
      groupData:[]
    })
  };
  newData = ()=>{
    const {orgList,provinceJson} = this.props.home;
    let newOrgList=JSON.parse(JSON.stringify(orgList)),newProvinceJson=JSON.parse(JSON.stringify(provinceJson));
    if(orgList){
      newOrgList.unshift({name:'全部学院',id:null,sub:[]});
      newOrgList.map(item=>item.sub.unshift({name:'全部家族',id:null,sub:[]}));
      newOrgList.map(item=>item.sub.map(item1=>item1.sub.unshift({name:'全部小组',id:null,sub:[]})));
    }
    if(provinceJson){
      newProvinceJson.unshift({name:'所有省份',code:null});
    }
    return {newOrgList,newProvinceJson}
  };
  render(){
    const { province, collegeId, familyId,groupId, beginDate, endDate,familyData,groupData} =  this.state;
    const {newOrgList,newProvinceJson} = this.newData();

    return (
      <>
        <div className={styles.form1}>
          <div><span className={styles.labelCls}>报考省份</span>：<BISelect options={newProvinceJson} defaultValue={province} id='province' handleChange={this.handleChange} showName/></div>
          <div><span className={styles.labelCls}>学院</span>：<BISelect options={newOrgList} defaultValue={collegeId} id='college' handleChange={this.handleChange} value='id' /></div>
          <div><span className={styles.labelCls}>家族</span>：<BISelect options={familyData} defaultValue={familyId} id='family' handleChange={this.handleChange} value='id' /></div>
        </div>
       <div className={styles.form1}>
         <div><span className={styles.labelCls}>小组</span>：<BISelect options={groupData} defaultValue={groupId} id='group' handleChange={this.handleChange} value='id' /></div>
         <div><span className={styles.labelCls}>日期</span>：<BIRangePicker
           placeholder={['开始时间','结束时间']}
           onChange={this.dateChange}
           style={{ width: '230px'}}x
           disabledDate={this.disabledDate}
           value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}
        /></div>
         <div style={{width:'302px',textAlign:'right'}}>
           <BIButton type="primary" style={{ width: '70px', marginRight:'10px'}} onClick={this.search}>查询</BIButton>
           <BIButton type="primary2" style={{width: '70px' }} onClick={this.reset}>重置</BIButton>
         </div>
       </div>

      </>
    );
  }
}
export default Survey;
