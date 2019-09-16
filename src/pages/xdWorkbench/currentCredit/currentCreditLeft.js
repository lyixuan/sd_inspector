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
  loading:loading.effects['xdWorkModal/groupPkList'],
}))
class  currentCreditLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList:[]
    }
  }
  componentDidMount() {}
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
    let denominatorNumber = ""
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
          const isDecimal = String(myScore).indexOf(".") + 1
          const myScoreName = isDecimal >0 ? myScore.toFixed(2):myScore
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
          const isDecimal = String(groupScore).indexOf(".") + 1
          const groupScoreName = isDecimal > 0 ? groupScore.toFixed(2):groupScore
          //循环判断进度条的换算开始
          let maxWidth = ''
          let groupScoreNum = ''
          if(data.dimensionName === "正面均分"){
            denominatorNumber= ((Number(data.myScore)+Number(groupScoreName))*100).toFixed(2)
          }
          if(data.dimensionName === "正面均分"|| data.isShowPro){
            const deNumber = ((data.myScore+Number(groupScoreName))*100).toFixed(2)
            const moleculeNumber = ((data.myScore+Number(groupScoreName))*100).toFixed(2)
             maxWidth =denominatorNumber? parseInt(117*(moleculeNumber/denominatorNumber)):0
             groupScoreNum = maxWidth>0 ? Math.ceil(data.groupScore*100/deNumber*maxWidth):0
          }
          //循环判断进度条的换算结束
          return (
            data.dimensionName === "正面均分"|| data.isShowPro?
            <div className={styles.pkRankMain}>
              <div
                style={{
                  color: '#52C9C2',
                  cursor: 'pointer',
                  width:'117px',
                  display:'flex',
                  justifyContent:'center'
                }}
              >
                <div style={{width:maxWidth+'px',position:'relative'}}>
                  <div className={isFlag === 1 ? `${styles.progressWin}` : isFlag === 2?`${styles.progressLose}`:`${styles.progressLose}`} style={{width:'100%'}}>
                    <div style={{width:groupScoreNum+'px'}} className={isFlag === 1 ? `${styles.progressLose}` : isFlag === 2?`${styles.progressWin}`:`${styles.progressWin}`} >

                    </div>
                  </div>

                </div>
              </div>
              <div style={{marginLeft:'30px'}}>{groupScoreName}</div>
            </div>:<div className={styles.pkRankMain}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'117px',
                    display:'flex',
                    justifyContent:'center'
                  }}
                >
                </div>
                <div style={{marginLeft:'30px'}}>{groupScoreName}</div>
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
    params.dimensionList && params.dimensionList[0].children.map((item)=>{
      if(item.dimensionName === "正面均分"){
        this.serverArray(item.children)
      }
    })
    return data

  }
 serverArray = (arr) =>{
    for(var item = 0;item < arr.length;item++){
        if(arr[item].children){
          arr[item].isShowPro = true
          this.serverArray(arr[item].children)
        }
    }
    return arr
  }

  render() {
    const {PkName,selfName} = this.props
    console.log(182,PkName)
    const {groupPkList} = this.state
    const dataSource = groupPkList?this.fillDataSource(groupPkList):[]
    return (
          <div className={styles.creditLeft}>
            <div className={styles.proMain}>
              {PkName?<Proportion
                leftNum={-8.11}
                rightNum={-8.11}
                leftCollege={selfName}
                rightCollege={PkName}
                style={{width: 'calc(100% - 200px)'}}
              />:<div className={styles.proNone}>
                <img src={pkImg} style={{ width: '32px'}}/>
                <span>快从右边选择一个小组进行学分PK吧！</span>
              </div>}
            </div>
            <div className={styles.tableContainer}>
              {
                dataSource && <BITable
                  columns={this.columns()}
                  dataSource={dataSource}
                  defaultExpandAllRows={true}
                  expandIcon={CustomExpandIcon}
                  rowClassName={this.setRowClassName}
                  pagination = {false}
                  scroll={{x:0,y:408}}
                  rowKey={record => record.id}
                  loading={this.props.loading}
                >
                </BITable>
              }

              {
                !PkName && <div className={styles.tableImg}><img src={xdPkImg}/></div>
              }

            </div>
          </div>
    );
  }
}

export default currentCreditLeft;
