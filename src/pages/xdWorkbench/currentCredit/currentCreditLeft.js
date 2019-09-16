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
      rightNum:''

    }
  }
  componentDidMount(){
  }
  componentWillReceiveProps(nextProps) {
    console.log(28,this.props.groupId,nextProps.groupId)
    if(this.props.groupId !== nextProps.groupId){

      this.getGroupPkData(nextProps.groupId)
    }
  }
  //获取左侧列表数据的方法
  getGroupPkData = (groupId) =>{
    console.log('groupId',groupId)
    this.props.dispatch({
      type: 'xdWorkModal/groupPkList',
      payload: { params: {pkGroup:groupId} },
      callback:(groupPkList)=>{
        this.setState({
          groupPkList:groupPkList.dimensionList,
          myGroup:groupPkList.myGroup
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
          let isDecimal = false
          let myScoreName = ""
          if(myScore !== null){
            // isDecimal = String(myScore).indexOf(".") + 1
            myScoreName = myScore
          }
          return(
            <div className={isFlag===1?`${styles.titleGreen}`:isFlag===2?`${styles.titleRed}`:`${styles.titleBlack}`}>{myScoreName}</div>
          )

        }
      },{
        title: '对比小组',
        dataIndex: 'groupScore',
        key: 'groupScore',
        render: (groupScore,data) => {
          let isFlag =''
          let maxWidth = ''
          let groupScoreNum = ''
          let groupScoreName = ""
          if(groupScore !== null ){
            isFlag = data.myScore>data.groupScore?1:data.myScore<data.groupScore?2:3
           groupScoreName = groupScore
            //循环判断进度条的换算开始

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
          }else{

          }

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
    console.log(157,params)
    let data = []
    data = params
    console.log(151,data)
    data.map((item)=>{
      if(item.dimensionName === "学分均分"){
        item.children.map((subItem,subIndex)=>{
          if(subItem.dimensionName == "正面均分"){
            this.serverArray(item.children)
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
    console.log(180,arr)
    return arr
  }

  render() {
    console.log(185,this.props.groupId)
    const {PkName,selfName} = this.props
    console.log(180,PkName)
    const {groupPkList,myGroup} = this.state
    const  dataSource = groupPkList && this.fillDataSource(groupPkList)
    const leftNum = myGroup && myGroup.score
    const rightNum =
    console.log(199,dataSource)
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
                !PkName && <div className={styles.tableImg}><img src={xdPkImg}/></div>
              }

            </div>
          </div>
    );
  }
}

export default currentCreditLeft;
