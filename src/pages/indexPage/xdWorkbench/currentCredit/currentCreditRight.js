import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'
import BISelect from '@/ant_components/BISelect'
import { Progress } from 'antd';
const { Option } = BISelect;
@connect(({xdWorkModal, loading}) => ({
  xdWorkModal,
  studentsOptions:xdWorkModal.kpiLevelList,
  loading: loading.effects['xdWorkModal/kpiLevelList'],
}))
class  currentCreditRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgOptions:[{
        id:1,
        name:'组织'
      },{
        id:2,
        name:'人均在服学员'
      }],
      orgValue:'组织',
      orgSecondOptions:[{
        id:'group',
        name:'集团'
      },{
        id:'college',
        name:'本学院'
      },{
        id:'family',
        name:'本家族'
      }],
      secondOptions:[],
      studentValue:'本学院',
      rowId:0,
      userFlag: false,
      userLocation: '',
      userMsg: '',
      groupType:'college',
      kpiLevelId:"",
      groupList:[]
    };
  }
  componentDidMount() {
   this.getKpiLevelList()
    this.getGroupList()
    // 表格添加滚动事件
    document.querySelector("#scroll1 .ant-table-body").onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
    this.setState({
      secondOptions:this.state.orgSecondOptions,
      studentValue:this.state.studentValue
    })
  }
  componentWillReceiveProps(nextProps) {
  }
  componentWillUnmount() {
    document.querySelector("#scroll1 .ant-table-body").onscroll = '';
  }
  //获取人均在服学员的下来数据方法
  getKpiLevelList = () =>{
    this.props.dispatch({
      type: 'xdWorkModal/kpiLevelList',
      payload: { params: {} },
    });
  }
  //获取对比小组的列表页
  getGroupList = ()=>{
    this.props.dispatch({
      type:'xdWorkModal/groupList',
      payload:{params:{groupType:this.state.groupType,kpiLevelId:this.state.kpiLevelId}},
      callback: (groupList) => {
        this.setState({ groupList })
        this.getScrollFn();
      },
    })
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 400) {
      if (userFlag === true) {
        this.setState({
          userFlag: false
        })
      }
    } else if (userFlag === false){
      this.setState({
        userFlag: true
      })
    }
  }

  columnsRight = () =>{
    const total = this.state.groupList && this.state.groupList[0] ? this.state.groupList[0].credit : 0
    const columns = [
      {
        width: '20%',
        title:'排名系数',
        dataIndex:'creditRankingCoefficient',
        key:'creditRankingCoefficient'
      },{
        width: '24%',
        title:'组织',
        dataIndex:'groupName',
        key:'groupName'
      },{
        width: '14%',
        title:'排名',
        dataIndex:'creditRanking',
        key:'creditRanking'
      },{
        width: '20%',
        title:'学分',
        dataIndex:'credit',
        key:'credit',
        render: (credit ,data)=> {
          const percent = credit / total * 100;
          return (
            <div
              style={{
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px'}}>{credit}</span>
              <Progress
                percent={Number(percent)}
                strokeColor={'#00CCC3'}
                showInfo={false}
                strokeWidth={4}
              ></Progress>
            </div>
          );
        },
      },{
        title:'人均在服学员',
        dataIndex:'averageStudentNumber',
        key:'averageStudentNumber'
      }
    ]
    return columns || [];
  }
  onFormChange = (value,vname)=>{
    const {orgSecondOptions} = this.state
    const {studentsOptions} = this.props
    if(vname ==='oneLevel'){
      this.setState({
        orgValue:value
      })
      if(value == 1){
        this.setState({
          secondOptions:orgSecondOptions,
          studentValue:'请选择'
        })
      }else{
        this.setState({
          secondOptions:studentsOptions,
          studentValue:'请选择'
        })
      }
    }else if(vname === 'secondLevel'){
      if(value == "college"){
        this.setState({
          groupType:'college',
          kpiLevelId:'',
          studentValue:value
        })
      }else if(value == "family"){
        this.setState({
          groupType:'family',
          kpiLevelId:'',
          studentValue:value
        })
      }else if(value == "group"){
        this.setState({
          groupType:'',
          kpiLevelId:'',
          studentValue:value
        })
      }else{
        this.setState({
          kpiLevelId:value,
          groupType:'',
          studentValue:value
        })
      }
      setTimeout(()=>{
        this.getGroupList()
      },200)
      document.querySelector("#scroll .ant-table-body").scrollTop = 0;
    }else{}
  };
  setRowClassName = (record,index) => {
    let className = ''
    let taClassName = ""
    if (record.isMyGroup) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 430;
      taClassName = "rowHover"
    }
    if(record.creditRankingCoefficient === 3){
      className = "background1 "+taClassName
    }else if(record.creditRankingCoefficient === 2){
      className = "background2 "+taClassName
    }else if(record.creditRankingCoefficient === 1){
      className = "background3 "+taClassName
    }else if(record.creditRankingCoefficient === 0.8){
      className = "background4 "+taClassName
    }else{
      className = "background5 "+taClassName
    }
    return className
  }

  onClickRow = (record) => {
    return {
      onClick: () => {
        this.setState({
          rowId: record.groupId,
        });
        this.props.clickRow(record)
      },
    };
  }
  // 初始化tabale 列数据
  fillDataSource = val => {
    const data = [];
    val.map((item, index) =>
      data.push({
        key: index + 1,
        averageStudentNumber: item.averageStudentNumber,
        collegeId: item.collegeId,
        groupName: item.groupName,
        credit: item.credit,
        familyId:item.familyId,
        groupId:item.groupId,
        creditRankingCoefficient: item.creditRankingCoefficient,
        creditRanking: item.creditRanking,
        isMyGroup: item.myGroup,
      })
    );
    return data;
  };
  render() {
    const {orgOptions,orgValue,studentValue,userFlag,userMsg,secondOptions,groupList} = this.state;
    const dataSource = groupList?this.fillDataSource(groupList):[]
    return (
        <div className={styles.creditRight}>
          <div className={styles.creditSelect}>
            <span className={styles.title}>选择对比小组:</span>
            <BISelect style={{width:136,marginLeft:12}} placeholder="请选择" value={orgValue} onChange={(val)=>this.onFormChange(val,'oneLevel')}>
              {orgOptions.map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
            <BISelect style={{width:222,marginLeft:12}} placeholder="请选择" value={studentValue} onChange={(val)=>this.onFormChange(val,'secondLevel')}>
              {secondOptions.map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
          </div>
          <div className={styles.tableContent}>
            {userFlag && userMsg && <div className={styles.suspension}>

              <BITable
                showHeader={false}
                columns={this.columnsRight()}
                dataSource={[userMsg]}
                pagination={false}
                rowKey={record => record.userId}
                rowClassName={this.setRowClassName}
                className = {this.setColumnClassName}
              />
            </div>}
            <div id="scroll1">
              <BITable
                columns={this.columnsRight()}
                dataSource = {dataSource}
                pagination = {false}
                loading={this.props.loading}
                rowClassName={this.setRowClassName}
                onRow={this.onClickRow}
                className = {this.setColumnClassName}
                scroll={{x:0,y:408}}
                rowKey={record => record.groupId}
              >
              </BITable>
            </div>
          </div>

        </div>
    );
  }
}

export default currentCreditRight;
