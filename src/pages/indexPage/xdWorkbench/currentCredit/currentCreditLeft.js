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
      groupPkList: [],
      myGroup:{},
      leftNum:'',
      rightNum:'',
      groupId:'',
      pkGroup:{}

    }
  }
  componentDidMount(){
    // console.log(32,this.props.groupId)
    // if(this.props.groupId === 0){
    //   this.getGroupPkData(this.props.groupId)
    // }
  }
  componentWillMount(){
    this.getGroupPkData(this.props.groupId)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.groupId !== nextProps.groupId){
      this.getGroupPkData(nextProps.groupId)
      this.setState({
        groupId:nextProps.groupId
      })
    }
  }
  //获取左侧列表数据的方法
  getGroupPkData = (groupId) =>{
    this.props.dispatch({
      type: 'xdWorkModal/groupPkList',
      payload: { params: {pkGroup:groupId} },
      callback:(groupPkList)=>{
        this.setState({
          groupPkList:groupPkList.dimensionList,
          myGroup:groupPkList.myGroup,
          pkGroup:groupPkList.pkGroup,
        })

      }
    });
  }

  columns = () => {
    let maxNumMyScore = ""
    let maxNumGroupScore = ""
    const {pkGroup} = this.state
    const PkName = pkGroup && pkGroup.groupName
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
          let isFlag = 3
          if(data.dimensionName !== "绩效排名系数"&&data.dimensionName !== "集团排名"&&data.dimensionName !== "家族内排名"&&data.dimensionName !== "人均在服学员"){
            isFlag = myScore>data.groupScore?1:myScore<data.groupScore?2:3
          }
          let myScoreName = ""
          if(myScore !== null){
            myScoreName = myScore
          }
          return(
            <div className={isFlag===1 && data.isShowPro && PkName?`${styles.titleGreen}`:isFlag===2 && data.isShowPro && PkName?`${styles.titleRed}`:`${styles.titleBlack}`}>{myScoreName}</div>
          )

        }
      },{
        title:'',
        dataIndex:'myScore',
        key:'leftNum',
        width:58.5,
        render: (myScore,data) => {
          const {groupName} = this.state.pkGroup
          let isFlag=""
          let leftProgress =""
          let myScoreLefNum = ""
          let myScoreRightNum = ""
          if(groupName){
            isFlag = myScore>data.groupScore?1:myScore<data.groupScore?2:3
            if(data.dimensionName === "正面均分"|| data.isShowPro) {
              myScoreLefNum = Number(myScore)
              myScoreRightNum = Number(data.groupScore)
            }
            if(data.dimensionName === "正面均分"){

              if(myScoreLefNum>myScoreRightNum){
                maxNumMyScore = myScoreLefNum
              }else{
                maxNumMyScore = myScoreRightNum
              }
            }
            if(data.dimensionName === "正面均分"|| data.isShowPro){
              leftProgress = ((myScoreLefNum/maxNumMyScore)*100).toFixed(2)+'%'
            }
          }
          return (
            data.dimensionName === "正面均分"|| data.isShowPro && groupName?
              <div className={styles.pkRankMain} style={{justifyContent:'flex-end',marginRight:'-18px'}}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'58.5px',
                    display:'flex',
                    justifyContent:'flex-end'
                  }}
                >
                  <div style={{width:leftProgress}} className={`${styles.progress} ${isFlag === 1 ? styles.progressWin : (isFlag === 2?styles.progressLose:styles.progressLose)}`}>
                  </div>
                </div>
              </div>:<div className={styles.pkRankMain} style={{justifyContent:'flex-end',marginRight:'-18px'}}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'58.5px',
                    display:'flex',
                    justifyContent:'flex-end'
                  }}
                >
                </div>
              </div>
          );
        }
      },{
        title:'',
        dataIndex:'groupScore',
        key:'rightNum',
        width:58.5,
        render: (groupScore,data) => {
          const {groupName} = this.state.pkGroup
          let isFlag=""
          let leftProgress =""
          let lefNum = ""
          let rightNum = ""
          if(groupName){
            isFlag = data.myScore>groupScore?1:data.myScore<groupScore?2:3
            if(data.dimensionName === "正面均分"|| data.isShowPro) {
              lefNum = Number(groupScore)
              rightNum = Number(data.myScore)
            }
            if(data.dimensionName === "正面均分"){

              if(lefNum>rightNum){
                maxNumGroupScore = lefNum
              }else{
                maxNumGroupScore = rightNum
              }
            }
            if(data.dimensionName === "正面均分"|| data.isShowPro && groupName){
              leftProgress = (lefNum/maxNumGroupScore)*100+'%'
            }
          }

          return (
            data.dimensionName === "正面均分"|| data.isShowPro?
              <div className={styles.pkRankMain} style={{justifyContent:'flex-start',marginLeft:'-18px'}}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'58.5px',
                    display:'flex',
                    justifyContent:'flex-start'
                  }}
                >
                  <div style={{width:leftProgress}} className={`${styles.rightProgress} ${isFlag === 1 ? styles.progressLose : (isFlag === 2?styles.progressWin:styles.progressWin)}`}>
                  </div>
                </div>
              </div>:<div className={styles.pkRankMain} style={{justifyContent:'flex-start',marginRight:'-18px'}}>
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    width:'58.5px',
                    display:'flex',
                    justifyContent:'flex-start'
                  }}
                >
                </div>
              </div>
          );
        }
      },{
        title: '对比小组',
        dataIndex: 'groupScore',
        key: 'groupScore',
        render: (groupScore,data) => {
          return (
            <div className={styles.pkRankMain}>
              <div style={{marginLeft:'30px'}}>{groupScore}</div>
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
    data = params
    data.map((item)=>{
      if(item.dimensionName === "学分均分"){
        item.children.map((subItem,subIndex)=>{
          if(subItem.dimensionName === "正面均分"){
            subItem.isShowPro = true
            this.serverArray(subItem.children)
          }

        })
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
    const {groupId} = this.props
    const {groupPkList,myGroup,pkGroup} = this.state
    const  dataSource = groupPkList && this.fillDataSource(groupPkList)
    const leftNum = myGroup && myGroup.score
    const userName = myGroup && myGroup.groupName
    const rightNum = pkGroup && pkGroup.score
    const PkName = pkGroup && pkGroup.groupName

    return (
          <div className={styles.creditLeft}>
            <div className={styles.proMain}>
              {groupId!==0?<Proportion
                leftNum={leftNum}
                rightNum={rightNum}
                leftCollege={userName}
                rightCollege={PkName}
                style={{width: 'calc(100% - 200px)'}}
              />:<div className={styles.proNone}>
                <img src={pkImg} style={{ width: '32px'}}/>
                <span>快从右边选择一个小组进行学分PK吧！</span>
              </div>}
            </div>
            <div className={styles.tableContainer}>
              {
                dataSource.length>0 && <BITable
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
                groupId === 0 && <div className={styles.tableImg}><img src={xdPkImg}/></div>
              }

            </div>
          </div>
    );
  }
}

export default currentCreditLeft;
