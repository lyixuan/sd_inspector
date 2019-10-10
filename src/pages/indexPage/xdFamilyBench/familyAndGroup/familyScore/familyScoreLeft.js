import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import pkImg from '@/assets/xdwork/pk.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import Proportion from '../../../components/proportion';
import Progress from '../../../components/progress'
import IndentNum from '../../../components/indentNum'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyScoreLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      pkGroup:null,
      "data": {
        "dimensionList": [{
          "children": [],
          "dimensionName": "绩效排名系数",
          "groupScore": "0.5",
          "id": -1,
          "myNum": 0,
          "myScore": "2.0",
          "myScoreRatio": "0.00",
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "集团排名",
          "groupScore": "88/90",
          "id": -2,
          "myNum": 0,
          "myScore": "29/90",
          "myScoreRatio": "0.00",
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "家族内排名",
          "groupScore": "16/18",
          "id": -3,
          "myNum": 0,
          "myScore": "13/28",
          "myScoreRatio": null,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "人均在服学员",
          "groupScore": "1356",
          "id": -4,
          "myNum": 0,
          "myScore": "1672",
          "myScoreRatio": "0.00",
          "parentId": 0,
          "unit": null
        }, {
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "dimensionName": "有效直播",
                "groupScore": "1.70",
                "id": 37,
                "myNum": 5049,
                "myScore": "3.63",
                "myScoreRatio": "6.80",
                "parentId": 36,
                "unit": "个"
              }, {
                "children": [],
                "dimensionName": "有效重播",
                "groupScore": "0.64",
                "id": 38,
                "myNum": 4023,
                "myScore": "1.46",
                "myScoreRatio": "49.41",
                "parentId": 36,
                "unit": "个"
              }],
              "dimensionName": "有效出勤",
              "groupScore": "2.34",
              "id": 36,
              "myNum": 0,
              "myScore": "5.09",
              "myScoreRatio": "16.31",
              "parentId": 2,
              "unit": ""
            }, {
              "dimensionName": "有效做题",
              "groupScore": "2.47",
              "id": 39,
              "myNum": 0,
              "myScore": "5.19",
              "myScoreRatio": "35.49",
              "parentId": 2,
              "unit": "",
              children:[]
            }],
            "dimensionName": "正面均分",
            "groupScore": "4.93",
            "id": 2,
            "myNum": 0,
            "myScore":"11.81" ,
            "myScoreRatio": "14.15",
            "parentId": 1,
            "unit": ""
          }],
          "dimensionName": "学分均分",
          "groupScore": "3.80",
          "id": 1,
          "myNum": 0,
          "myScore": "11.16",
          "myScoreRatio": "4.95",
          "parentId": 0,
          "unit": ""
        }],
        "myGroup": {
          "score": "11.16",
          "groupName": "自变量/全国工商1组"
        },
        "pkGroup": {
          "score": "3.80",
          "groupName": "芝士/英语2•1组"
        }
      }
    }
  }
  componentDidMount() {

    this.setState({
      pkGroup:this.state.data.pkGroup
    })

  }
  fillDataSource = (params, n = 1) => {
    let data = params;
    data.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    data.map((item) => {
      if (item.dimensionName === "学分均分") {
        item.children.map((subItem, subIndex) => {
          if (subItem.dimensionName === "正面均分") {
            subItem.isShowPro = true
            this.serverArray(subItem.children)
          }

        })
      }
    })
    return data

  }
  serverArray = (arr) => {
    for (var item = 0; item < arr.length; item++) {
      if (arr[item].children) {
        arr[item].isShowPro = true
        this.serverArray(arr[item].children)
      }
    }
    return arr
  }
  columns = () => {
    let maxNumMyScore = ""
    const {familyScoreList} = this.props
    const PkName = familyScoreList.pkGroup.familyName
    const columns = [{
      title: '学分维度',
      dataIndex: 'dimensionName',
      key: 'dimensionName',
      width: '30%'
    },{
      title: '环比',
      dataIndex: 'myScoreRatio',
      key: 'myScoreRatio',
      width: '14%',
      render: (myScoreRatio,data) => {
        let isFlag = 3
        if (PkName && data.isShowPro) {
          isFlag = myScoreRatio >= 0 ? 1 : 2
        }

        return (
          <div className={isFlag === 1 ? `${styles.titleGreen}` :(isFlag ===2?`${styles.titleRed}`:`${styles.titleBlack}`) }>
            <IndentNum>{myScoreRatio}</IndentNum>
          </div>
        )
      }
    },{
      title: '全国工商管理',
      dataIndex: 'myScore',
      key: 'myScore',
      width: '14%',
      render:(myScore,data)=>{
        let isFlag = 3
        if (PkName && data.isShowPro) {
          isFlag = Number(myScore) > Number(data.groupScore) ? 1 : Number(myScore) < Number(data.groupScore) ? 2 : 3
        }
        return (
          <div className={isFlag === 1 ? `${styles.titleGreen}` : isFlag === 2? `${styles.titleRed}` : `${styles.titleBlack}`}>
            <IndentNum>{myScore}</IndentNum>
          </div>
        )
      }
    },{
      title: '',
      dataIndex: 'myScore',
      key: 'leftNum',
      width: 58.5,
      render: (myScore, data) => {
        if(PkName && data.dimensionName === "正面均分"){
          if (Number(data.myScore) > Number(data.groupScore)) {
            maxNumMyScore = Number(data.myScore)
          } else {
            maxNumMyScore = Number(data.groupScore)
          }
        }
        return (
         data.isShowPro && PkName ? <Progress leftNumber = {true} data ={data} PkName={PkName} maxNumMyScore={maxNumMyScore}/>:<div className={styles.pkRankMain} style={{ justifyContent: 'flex-end', marginRight: '-18px' }}>
            <div
              style={{
                color: '#52C9C2',
                cursor: 'pointer',
                width: '58.5px',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
            </div>
          </div>
        );
      }
    }, {
      title: '',
      dataIndex: 'groupScore',
      key: 'rightNum',
      width: 58.5,
      render: (groupScore, data) => {
        if(PkName && data.dimensionName === "正面均分"){
          if (Number(data.myScore) > Number(data.groupScore)) {
            maxNumMyScore = Number(data.myScore)
          } else {
            maxNumMyScore = Number(data.groupScore)
          }
        }
        return (
          data.isShowPro && PkName ? <Progress leftNumber={false} data ={data} PkName={PkName} maxNumMyScore={maxNumMyScore}/>:<div className={styles.pkRankMain} style={{ justifyContent: 'flex-satrt', marginRight: '-18px' }}>
            <div
              style={{
                color: '#52C9C2',
                cursor: 'pointer',
                width: '58.5px',
                display: 'flex',
                justifyContent: 'flex-satrt'
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
      width: '10%',
      render: (groupScore,) => {
        return (
          <div className={styles.pkRankMain}>
            <div style={{marginLeft:'-16px'}}>
              <IndentNum>{groupScore}</IndentNum>
            </div>
          </div>
        );
      },
    }]
    return columns || [];
  }
  setRowClassName = (record) => {
    let className = ''
    if (record.level === 1 && record.dimensionName === "学分均分") {
      className = "oneLevelBgColor"
    } else if (record.level === 1 && record.dimensionName !== "学分均分") {
      className = "otherLevelBgColor"
    } else {
      className = "otherLevelBgColor1"
    }
    return className
  }
  render() {
    const {familyScoreList} = this.props
    const dataSource = familyScoreList && familyScoreList.dimensionList.length>0 && this.fillDataSource(familyScoreList.dimensionList)
    const leftNum = familyScoreList.myGroup.score
    const userName = familyScoreList.myGroup.familyName
    const rightNum = familyScoreList.pkGroup.score
    const PkName = familyScoreList.pkGroup.familyName
    return (
      <div className={styles.familyLeft}>
        <div className={styles.proMain}>
          {PkName ? <Proportion
            leftNum={leftNum}
            rightNum={rightNum}
            leftCollege={userName}
            rightCollege={PkName}
            style={{ width: 'calc(100% - 200px)' }}
          /> : <div className={styles.proNone}>
            <img src={pkImg} style={{ width: '32px' }} />
            <span>快从右边选择一个小组进行学分PK吧！</span>
          </div>}
        </div>
        <div className={styles.tableContainer}>
          {
            dataSource && dataSource.length > 0 && <BITable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              scroll={{ x: 0, y: 408 }}
              rowKey={record => record.id}
              loading={this.props.loading}
            >
            </BITable>
          }

          {
            !PkName && <div className={styles.tableImg}><img src={xdPkImg} /></div>
          }

        </div>
      </div>
    );
  }
}

export default FamilyScoreLeft;
