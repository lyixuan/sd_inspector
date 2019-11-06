import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import pkImg from '@/assets/xdwork/pk.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import Proportion from '../../../components/proportion';
import Progress from '../../../components/progress'
import IndentNum from '../../../components/indentNum'
import BILoading from '@/components/BILoading'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({xdFamilyModal,loading}) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getFamilyScorePk'],
}))
class FamilyScoreLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      pkGroup:null,
    }
  }
  componentDidMount() {

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
    const {familyScoreList,userInfo} = this.props
    const PkName = familyScoreList.pkGroup.familyName
    const columns = [{
      title: '学分维度',
      dataIndex: 'dimensionName',
      key: 'dimensionName',
      width: '24%'
    },{
      title: '环比(%)',
      dataIndex: 'myScoreRatio',
      key: 'myScoreRatio',
      width: '15%',
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
      title: userInfo.familyName,
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
      title: '对比家族',
      dataIndex: 'groupScore',
      key: 'groupScore',
      width: '15%',
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
    const PkName = familyScoreList.pkGroup.familyName
    return (
      <div className={styles.familyLeft}>
        <div className={styles.proMain}>
          {PkName? <Proportion
            leftNum={familyScoreList.myGroup.score}
            rightNum={familyScoreList.pkGroup.score}
            leftCollege={familyScoreList.myGroup.familyName}
            rightCollege={PkName}
            style={{ width: 'calc(100% - 200px)' }}
          /> : <div className={styles.proNone}>
            <img src={pkImg} style={{ width: '32px' }} />
            <span>快从右边选择一个家族进行学分PK吧！</span>
          </div>}
        </div>
        <div className={styles.tableContainer}>
          {
            this.props.loading?<BILoading isLoading={this.props.loading} />:dataSource && dataSource.length > 0 && <BITable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              scroll={{ x: 0, y: 408 }}
              rowKey={(record, index) => record.dimensionName + '' + index}
              loading={this.props.loading}
            >
            </BITable>
          }

          {
            !PkName && !this.props.loading && <div className={styles.tableImg}><img src={xdPkImg} /></div>
          }

        </div>
      </div>
    );
  }
}

export default FamilyScoreLeft;
