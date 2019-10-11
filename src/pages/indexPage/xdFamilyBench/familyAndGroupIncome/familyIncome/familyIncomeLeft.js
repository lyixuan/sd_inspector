import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import Proportion from '../../../components/proportion';
import Progress from '../../../components/progress'
import IndentNum from '../../../components/indentNum';
import pkImg from '@/assets/xdwork/pk.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';

function CustomExpandIcon(props) {
  return (
    <a />
  );
}
const JudgeNumFn = (n, m = 0, flag) => {
  if (n > m) {
    return flag ? styles.titleRed : styles.titleGreen;
  } else if (n < m) {
    return flag ? styles.titleGreen : styles.titleRed;  
  } 
  return
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
    }
  }
  componentDidMount() {
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
    const { pkFamilyId } = this.props;
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
      render: text => <IndentNum className={JudgeNumFn(text)}>{text}</IndentNum>
    },{
      width: '20%',
      title: '全国工商管理',
      dataIndex: 'selfValue',
      key: 'selfValue',
      render:(text, record, index)=> <IndentNum className={pkFamilyId ? JudgeNumFn(Number(text), Number(record.familyPk), index === 0 ? true : false) : ''}>{text}</IndentNum>
    },{
      title: '',
      dataIndex: 'selfValue',
      key: 'leftNum',
      width: 58.5,
      render: (text, record, index) => {
        return (
          pkFamilyId && index > 2 ? <Progress leftNumber = {true} data={{myScore: text, groupScore: record.familyPk}}/> 
          : <div className={styles.pkRankMain} style={{ justifyContent: 'flex-end', marginRight: '-18px' }}>
              <div
                style={{
                  color: '#52C9C2',
                  cursor: 'pointer',
                  width: '58.5px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              />
          </div>
        );
      }
    }, {
      title: '',
      dataIndex: 'familyPk',
      key: 'rightNum',
      width: 58.5,
      render: (text, record, index) => {
        return (
          pkFamilyId && index > 2  ? <Progress data={{myScore: record.selfValue, groupScore: text}}/>
          : <div className={styles.pkRankMain} style={{ justifyContent: 'flex-satrt', marginRight: '-18px' }}>
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
      render:(text, record, index)=> <IndentNum className={pkFamilyId ? JudgeNumFn(Number(text), Number(record.selfValue), index === 0 ? true : false) : ''}>{text ? text : ''}</IndentNum>
    }]
    return columns || [];
  }
  render() {
    const { familyList = {}, pkFamilyId } = this.props;
    return (
      <div className={styles.familyLeft}>
        <div className={styles.proMain}>
          {pkFamilyId ? <Proportion
            leftNum={familyList.selfIncomeKpi}
            rightNum={familyList.pkFamilyKpi}
            leftCollege={familyList.selfFamilyName}
            rightCollege={familyList.pkFamilyKpi}
            style={{ width: 'calc(100% - 200px)' }}
          /> : <div className={styles.proNone}>
          <img src={pkImg} style={{ width: '32px' }} />
          <span>快从右边选择一个小组进行学分PK吧！</span>
        </div>}
        </div>
        <div className={styles.tableContainer}>
            <BITable
              columns={this.columns()}
              dataSource={familyList.pkInfo || []}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              pagination={false}
              scroll={{ x: 0, y: 208 }}
              rowKey={record => record.id}
              loading={this.props.loading}
            />
            {
              !pkFamilyId && <div className={styles.tableImg}><img src={xdPkImg} /></div>
            }
        </div>
      </div>
    );
  }
}

export default FamilyIncomeLeft;
