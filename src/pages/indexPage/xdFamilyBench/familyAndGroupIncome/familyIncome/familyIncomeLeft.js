import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
// import pkImg from '@/assets/xdwork/pk.png';
// import xdPkImg from '@/assets/workBench/xdpk.gif';
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
class FamilyIncomeLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      pkGroup:null,
      "data": {
        "dimensionList": [{
          "children": [],
          "dimensionName": "集团排名",
          "groupScore": "0.5",
          "id": 1,
          "myNum": 0,
          "myScore": "2.0",
          "myScoreRatio":0,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "总绩效",
          "groupScore": "88/90",
          "id": 2,
          "myNum": 0,
          "myScore": "29/90",
          "myScoreRatio": 0,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "好推绩效",
          "groupScore": "16/18",
          "id": 3,
          "myNum": 0,
          "myScore": "13/28",
          "myScoreRatio": 0,
          "parentId": 0,
          "unit": null
        },{
          "children": [],
          "dimensionName": "好推单量",
          "groupScore": "10.38",
          "id": 4,
          "myNum": 0,
          "myScore": "8.11",
          "myScoreRatio": "-5.31",
          "parentId": 0,
          "unit": null
        },{
          "children": [],
          "dimensionName": "好推流水",
          "groupScore": "12.70",
          "id": 5,
          "myNum": 0,
          "myScore": "6.80",
          "myScoreRatio": "5.31",
          "parentId": 0,
          "unit": null
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
    let data = params
    data.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    data.map((item) => {
      if (item.dimensionName === "好推单量" || item.dimensionName === "好推流水") {
        item.isShowPro= true

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
    const { pkGroup } = this.state
    const PkName = pkGroup && pkGroup.groupName
    let maxNumMyScore = ""

    const columns = [{
      title: '创收维度',
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
        const isIncome = data.isShowPro
        if(PkName && data.isShowPro){
          if (Number(data.myScore) > Number(data.groupScore)) {
            maxNumMyScore = Number(data.myScore)
          } else {
            maxNumMyScore = Number(data.groupScore)
          }
        }
        return (
          data.isShowPro && PkName ? <Progress leftNumber = {true} data ={data} PkName={PkName} maxNumMyScore={maxNumMyScore} isIncome={isIncome}/>:<div className={styles.pkRankMain} style={{ justifyContent: 'flex-end', marginRight: '-18px' }}>
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
        if(PkName && data.isShowpro){
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
      title: '对比家族',
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
    const {data} = this.state
    const dataSource = data && data.dimensionList.length>0 && this.fillDataSource(data.dimensionList)
    return (
      <div className={styles.familyLeft}>
        <div className={styles.proMain}>
          <Proportion
            leftNum={8.11}
            rightNum={10.38}
            leftCollege={"全国工商管理"}
            rightCollege={"法律"}
            style={{ width: 'calc(100% - 200px)' }}
          />
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

          {/*{*/}
            {/*groupId === 0 && <div className={styles.tableImg}><img src={xdPkImg} /></div>*/}
          {/*}*/}

        </div>
      </div>
    );
  }
}

export default FamilyIncomeLeft;
