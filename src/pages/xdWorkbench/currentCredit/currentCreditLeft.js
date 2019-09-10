import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'
import { Progress } from 'antd';
import Proportion from '../components/proportion';
function CustomExpandIcon(props) {
  return (
    <a/>
  );
}

class  currentCreditLeft extends React.Component {
  columns = () => {
    const columns = [
      {
        title: '学分维度',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '环比（%）',
        dataIndex: 'precent',
        key: 'precent',
      }, {
        title: '我的',
        dataIndex: 'myNum',
        key: 'myNum',
        width:80,
      },{
        title: '',
        dataIndex: 'progress',
        key: 'progress',
        width: 210,
        render: (progress,data) => {
          const isFlag = data.myNum>data.contrastGroup?1:data.myNum<data.contrastGroup?2:3
          return (
            data.isShowPro?
            <div
              style={{
                color: '#52C9C2',
                cursor: 'pointer',
                width:'177px',
                display:'flex',
                justifyContent:'center'
              }}
            >
              <div style={{width:'60%',position:'relative'}}>
                <div className={isFlag === 1 ? `${styles.progressWin}` : isFlag === 2?`${styles.progressLose}`:`${styles.progressLose}`} style={{width:'100%'}}>
                  <div className={isFlag === 1 ? `${styles.progressLose}` : isFlag === 2?`${styles.progressWin}`:`${styles.progressWin}`} style={{width:'30%'}}>

                  </div>
                </div>

              </div>
            </div>
              :null
          );
        },
      },{
        title: '对比小组',
        dataIndex: 'contrastGroup',
        key: 'contrastGroup',
      }
    ];
    return columns || [];
  };
  setRowClassName = (record) => {
    let className = ''
    if(record.oneLevel === 1){
      className = "oneLevelBgColor"
    }else{
      className = "otherLevelBgColor"
    }
    return className
  }
  render() {

    const data = [
      {
        key: 1,
        name: "绩效排名系数",
        precent: "",
        myNum: 2,
        contrastGroup:4,
        oneLevel:1,
        isShowPro:false,
        progress:''
      },{
        key: 2,
        name: "集团排名",
        precent: "",
        myNum: 2,
        contrastGroup:4,
        oneLevel:1,
        isShowPro:false,
        progress:''
      },{
        key: 1,
        name: "家族内排名",
        precent: "",
        myNum: 2,
        contrastGroup:4,
        oneLevel:1,
        isShowPro:false,
        progress:''
      },{
        key: 1,
        name: "人均在服学员",
        precent: "",
        myNum: 2,
        contrastGroup:4,
        oneLevel:1,
        isShowPro:false,
        progress:''
      },
      {
        key: 1,
        name: '学分均分',
        precent: "-5.31",
        myNum: "8.11",
        contrastGroup:"10.38",
        oneLevel:1,
        isShowPro:true,
        progress:'',
        children: [
          {
            key: 12,
            name: '正面均分',
            precent: "5.31",
            myNum: "6.80",
            contrastGroup:"12.70",
            oneLevel:2,
            isShowPro:true,
            progress:'',
            children: [
              {
                key: 121,
                name: '有效出勤',
                precent: "5.31",
                myNum: "3.61",
                contrastGroup:"3.61",
                oneLevel:3,
                isShowPro:true,
                progress:'',
                children:[{
                  key: 123,
                  name: '有效直播',
                  precent: "",
                  myNum: "2.78",
                  contrastGroup:"3.49",
                  oneLevel:4,
                  isShowPro:true,
                  progress:'',
                },{
                  key: 124,
                  name: '有效重播',
                  precent: "",
                  myNum: "0.83",
                  contrastGroup:"1.41",
                  oneLevel:4,
                  isShowPro:true,
                  progress:'',
                }]
              },
              {
                key: 122,
                name: '有效做题',
                precent: "",
                myNum: "3.69",
                contrastGroup:"3.05",
                oneLevel:3,
                isShowPro:true,
                progress:'',
              },
            ],
          }
        ],
      },

    ];

 const {PkName} = this.props
    return (
          <div className={styles.creditLeft}>
            <div className={styles.proMain}>
              <Proportion
                leftNum={8.11}
                rightNum={10.38}
                leftCollege={'自变量/法律一组'}
                rightCollege={PkName}
                style={{width: 'calc(100% - 200px)'}}
              />
            </div>

            <BITable
              columns={this.columns()}
              dataSource={data}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination = {false}
              scroll={{x:0,y:408}}
              rowKey={record => record.name}
            >
            </BITable>
          </div>
    );
  }
}

export default currentCreditLeft;
