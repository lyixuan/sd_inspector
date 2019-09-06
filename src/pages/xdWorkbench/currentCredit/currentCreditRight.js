import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'
import BISelect from '@/ant_components/BISelect'
import { Progress } from 'antd';
const { Option } = BISelect;

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
      orgValue:'人均在服人员',
      orgSecondOptions:[{
        id:1,
        name:'集团'
      },{
        id:2,
        name:'本学院'
      },{
        id:3,
        name:'本家族'
      }],
      studentsOptions:[{
        id:1,
        name:'1200-1400'
      },{
        id:2,
        name:'1400-1600'
      }],
      secondOptions:[],
      studentValue:'1200-1400',
      rowId:0
    };
  }
  componentDidMount() {
    const {studentsOptions,studentValue} = this.state
    this.setState({
      secondOptions:studentsOptions,
      studentValue:studentsOptions[0].name
    })
  }
  columnsRight = () =>{
    const columns = [
      {
        title:'排名系数',
        dataIndex:'num',
        key:'num'
      },{
        title:'组织',
        dataIndex:'org',
        key:'org'
      },{
        title:'排名',
        dataIndex:'rankNum',
        key:'rankNum'
      },{
        title:'学分',
        dataIndex:'creditNum',
        key:'creditNum',
        render: (creditNum ,data)=> {
          return (
            <div
              style={{
                color: '#52C9C2',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: '13px',color:'#1B1C20' }}>{creditNum}</span>
              <Progress
                percent={data.progress}
                strokeColor={'#00CCC3'}
                showInfo={false}
                strokeWidth={4}
              ></Progress>
            </div>
          );
        },
      },{
        title:'人均在服学员',
        dataIndex:'studentNums',
        key:'studentNums'
      }
    ]
    return columns || [];
  }
  onFormChange = (value,vname)=>{
    const {orgSecondOptions,studentsOptions} = this.state
    if(vname ==='oneLevel'){
      this.setState({
        orgValue:value
      })
      if(value == 1){
        this.setState({
          secondOptions:orgSecondOptions,
          studentValue:orgSecondOptions[0].name
        })
      }else{
        this.setState({
          secondOptions:studentsOptions,
          studentValue:studentsOptions[0].name
        })
      }
    }else if(vname === 'secondLevel'){
      this.setState({
        studentValue:value
      })
    }else{}
  };
  setRowClassName = (record) => {
    let className = ''
    let taClassName = record.id === this.state.rowId?"rowHover":""
    if(record.num === 3){
      className = "background1 "+taClassName
    }else if(record.num === 2){
      className = "background2 "+taClassName
    }else if(record.num === 1){
      className = "background3 "+taClassName
    }else if(record.num === 0.8){
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
          rowId: record.id,
        });
        this.props.clickRow(record)
      },
    };
  }
  render() {
    const {orgOptions,orgValue,secondOptions,studentValue} = this.state;
    const dataSource = [{
      id:1,
      num:3,
      org:'自变量/法律一组',
      rankNum:1,
      creditNum:'6.11',
      progress:90,
      studentNums:1300
    },{
      id:2,
      num:3,
      org:'芝士/英语3组',
      rankNum:2,
      creditNum:'5.05',
      progress:70,
      studentNums:1200
    },{
      id:3,
      num:3,
      org:'自变量/法律一组',
      rankNum:3,
      creditNum:'4.00',
      progress:40,
      studentNums:1300
    },{
      id:4,
      num:2,
      org:'芝士/英语3组',
      rankNum:4,
      creditNum:'3.11',
      progress:30,
      studentNums:1200
    },{
      id:5,
      num:2,
      org:'自变量/法律一组',
      rankNum:4,
      creditNum:'3.11',
      progress:50,
      studentNums:1200
    },{
      id:6,
      num:1,
      org:'芝士/英语3组',
      rankNum:1,
      creditNum:'6.11',
      progress:65,
      studentNums:1300
    },{
      id:7,
      num:1,
      org:'自变量/法律一组',
      rankNum:1,
      creditNum:'6.11',
      progress:90,
      studentNums:1300
    },{
      id:8,
      num:0.8,
      org:'芝士/英语3组',
      rankNum:1,
      creditNum:'6.11',
      progress:90,
      studentNums:1300
    },{
      id:9,
      num:0.8,
      org:'自变量/法律一组',
      rankNum:1,
      creditNum:'6.11',
      progress:90,
      studentNums:1300
    },{
      id:9,
      num:0.5,
      org:'自变量/法律一组',
      rankNum:1,
      creditNum:'6.11',
      progress:90,
      studentNums:1300
    }]
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
          <BITable
            columns={this.columnsRight()}
            dataSource = {dataSource}
            pagination = {false}
            rowClassName={this.setRowClassName}
            onRow={this.onClickRow}
            className = {this.setColumnClassName}
          >

          </BITable>
        </div>
    );
  }
}

export default currentCreditRight;
