import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import Proportion from '../../../components/proportion';
import Progress from '../../../components/progress'
import IndentNum from '../../../components/indentNum'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeFamilyList'],
}))
class FamilyIncomeLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      pkGroup: undefined,
      familyList : []
    }
  }
  componentDidMount() {
    // this.setState({
    //   pkGroup:this.state.familyList.pkGroup
    // })
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
    const { familyList } = { familyList: {}}
    const pkFamiy = familyList.familyList
    const { pkGroup } = this.state
    const PkName = pkGroup && pkGroup.groupName
    let maxNumMyScore = ""

    const columns = [{
      width: '20%',
      title: '创收维度',
      dataIndex: 'dim',
      key: 'dim',
    },{
      width: '15%',
      title: '环比',
      dataIndex: 'ringPk',
      key: 'ringPk',
    },{
      width: '20%',
      title: '全国工商管理',
      dataIndex: 'myScore',
      key: 'myScore',
      render:(myScore,data)=>{
        let isFlag = 3
        if (pkFamiy && data.isShowPro) {
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
        if(pkFamiy && data.isShowPro){
          if (Number(data.myScore) > Number(data.groupScore)) {
            maxNumMyScore = Number(data.myScore)
          } else {
            maxNumMyScore = Number(data.groupScore)
          }
        }
        return (
          data.isShowPro && pkFamiy ? <Progress leftNumber = {true} data ={data} PkName={pkFamiy} maxNumMyScore={maxNumMyScore} isIncome={isIncome}/>:<div className={styles.pkRankMain} style={{ justifyContent: 'flex-end', marginRight: '-18px' }}>
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
        if(pkFamiy && data.isShowpro){
          if (Number(data.myScore) > Number(data.groupScore)) {
            maxNumMyScore = Number(data.myScore)
          } else {
            maxNumMyScore = Number(data.groupScore)
          }
        }
        return (
         data.isShowPro && pkFamiy ? <Progress leftNumber={false} data ={data} PkName={pkFamiy} maxNumMyScore={maxNumMyScore}/>:<div className={styles.pkRankMain} style={{ justifyContent: 'flex-satrt', marginRight: '-18px' }}>
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
      dataIndex: 'familyPk',
      key: 'familyPk',
      render: text => {
        return (
          <div className={styles.pkRankMain}>
            <div style={{marginLeft:'-16px'}}>
              <IndentNum>{text}</IndentNum>
            </div>
          </div>
        );
      },
    }]
    return columns || [];
  }
  render() {
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
            <BITable
              columns={this.columns()}
              dataSource={this.props.familyList}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              pagination={false}
              scroll={{ x: 0, y: 408 }}
              rowKey={record => record.id}
              loading={this.props.loading}
            />
        </div>
      </div>
    );
  }
}

export default FamilyIncomeLeft;
