import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import BITable from '@/ant_components/BITable'
import { Progress } from 'antd';
import Proportion from '../components/proportion';
import pkImg from '@/assets/xdwork/pk.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
function CustomExpandIcon(props) {
  return (
    <a/>
  );
}
@connect(({xdWorkModal, loading}) => ({
  xdWorkModal,
}))
class  currentCreditLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList:[]
    }
  }
  componentDidMount() {


  }
  componentWillReceiveProps(nextProps) {
    if(this.props.groupId !== nextProps.groupId){
      this.getGroupPkData(nextProps.groupId)
    }


  }
  //获取左侧列表数据的方法
  getGroupPkData = (groupId) =>{
    this.props.dispatch({
      type: 'xdWorkModal/groupPkList',
      payload: { params: {pkGroup:groupId} },
      callback:(groupPkList)=>{
        this.setState({
          groupPkList
        })

      }
    });
  }
  columns = () => {
    const columns = [
      {
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        width:'30%'
      }, {
        title: '环比（%）',
        width:'20%',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render:(myScoreRatio)=>{
          const isFlag = myScoreRatio>=0?true:false
          return(
            <div className={isFlag?`${styles.titleGreen}`:`${styles.titleRed}`}>{myScoreRatio}</div>
          )

        }
      }, {
        title: '我的',
        dataIndex: 'myScore',
        key: 'myScore',
        width:80,
        render:(myScore,data)=>{
          const isFlag = myScore>data.groupScore?1:myScore<data.groupScore?2:3
          console.log(74,data.dimensionName)
          const myScoreName = data.dimensionName === "学分均分"?myScore.toFixed(2):myScore
          return(
            <div className={isFlag===1?`${styles.titleGreen}`:isFlag===2?`${styles.titleRed}`:`${styles.titleBlack}`}>{myScoreName}</div>
          )

        }
      },{
        title: '对比小组',
        dataIndex: 'groupScore',
        key: 'groupScore',
        render: (groupScore,data) => {
          const isFlag = data.myScore>data.groupScore?1:data.myScore<data.groupScore?2:3
          return (
            data.dimensionName ==="正面均分"?
            <div className={styles.pkRankMain}>
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
              <div>{groupScore}</div>
            </div>:<div className={styles.pkRankMain}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'177px',
                    display:'flex',
                    justifyContent:'center'
                  }}
                >
                </div>
                <div>{groupScore}</div>
              </div>
          );
        },
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
  fillDataSource = (params) =>{
    let data = []
    data.push({
      id:100001,
      dimensionName:'绩效排名系数',
      myScoreRatio:params.myRankingCoefficientRatio,
      myScore:params.myRankingCoefficient,
      groupScore:params.groupRankingCoefficient
    },{
      id:100002,
      dimensionName:'集团排名',
      myScoreRatio:params.myCompanyRankingRatio,
      myScore:params.myCompanyRanking,
      groupScore:params.groupCompanyRanking
    },{
      id:100003,
      dimensionName:'家族内排名',
      myScoreRatio:params.myFamilyRankingRatio,
      myScore:params.myFamilyRanking,
      groupScore:params.groupFmailyRanking
    },{
      id:100004,
      dimensionName:'人均在服学员',
      myScoreRatio:params.myAverageStudentNumberRatio,
      myScore:params.myAverageStudentNumber,
      groupScore:params.groupAverageStudentNumber
    })
    data = params.dimensionList && data.concat(params.dimensionList[0])
    console.log(163,data)
    return data

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
        isShowPro:false,
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
                isShowPro:false,
                progress:'',
                children:[{
                  key: 123,
                  name: '有效直播',
                  precent: "",
                  myNum: "2.78",
                  contrastGroup:"3.49",
                  oneLevel:4,
                  isShowPro:false,
                  progress:'',
                },{
                  key: 124,
                  name: '有效重播',
                  precent: "",
                  myNum: "0.83",
                  contrastGroup:"1.41",
                  oneLevel:4,
                  isShowPro:false,
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
                isShowPro:false,
                progress:'',
              },
            ],
          },
          {
            key: 13,
            name: '负面均分',
            precent: "5.31",
            myNum: "6.80",
            contrastGroup:"12.70",
            oneLevel:2,
            isShowPro:true,
            progress:'',
          }
        ],
      },

    ];

    const {PkName,selfName} = this.props
    const {groupPkList} = this.state
    const dataSource = groupPkList?this.fillDataSource(groupPkList):[]
    console.log(262,dataSource)

    return (
          <div className={styles.creditLeft}>
            <div className={styles.proMain}>
              {PkName?<Proportion
                leftNum={8.11}
                rightNum={10.38}
                leftCollege={selfName}
                rightCollege={PkName}
                style={{width: 'calc(100% - 200px)'}}
              />:<div className={styles.proNone}>
                <img src={pkImg} style={{ width: '32px'}}/>
                <span>快从右边选择一个小组进行学分PK吧！</span>
              </div>}
            </div>
            <div className={styles.tableContainer}>
              <BITable
                columns={this.columns()}
                dataSource={dataSource}
                defaultExpandAllRows={true}
                expandIcon={CustomExpandIcon}
                rowClassName={this.setRowClassName}
                pagination = {false}
                scroll={{x:0,y:408}}
                rowKey={record => record.id}
              >
              </BITable>
              {
                PkName?null:<div className={styles.tableImg}><img src={xdPkImg}/></div>
              }

            </div>
          </div>
    );
  }
}

export default currentCreditLeft;
