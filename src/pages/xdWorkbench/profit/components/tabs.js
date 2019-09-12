import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import Proportion from '../../components/proportion';
import BIRadio from '@/ant_components/BIRadio';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import xdGif from '@/assets/workBench/xdpk.gif';
import pkImg from '@/assets/xdwork/pk.png';
import { thousandsFormat } from '@/utils/utils'
import styles from '../style.less';

const pkTypeObj = ['综合对比', '好推绩效', '续报绩效', '成考专本套'];
const gradeImg = { // 等级
  A: gradeA,
  B: gradeB,
  C: gradeC,
  S: gradeS,
}
const unitType = [, '', '元', '%', '单'];
const pathImUrl = 'http://bi-admin.ministudy.com'
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPersonInfo'] || loading.effects['xdWorkModal/getContrastIncomeKpiPkList'],
}))
class profitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkType: 1,
      profitData: [],
      profitPersonData: {
        self: {
          certificationGradeList: []
        },
        pkUser: {
          certificationGradeList: []
        }
      }
    }
  }
  componentDidMount() {
    this.getPkmsg();
    this.getPkList();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pkUser !== this.props.pkUser) {
      this.getPkmsg(nextProps.pkUser);
      this.getPkList(nextProps.pkUser);
    }
  }

  handlePkTypeChange = (e) => {
    this.setState({
      pkType: e.target.value
    }, () => this.getPkList());
  }
  // pk信息
  getPkmsg = (pkUser = this.props.pkUser) => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPersonInfo',
      payload: { params: { pkUser } },
      callback: (profitPersonData) => this.setState({ profitPersonData }),
    });
  }
  // 对比列表
  getPkList = (pkUser = this.props.pkUser) => {
    this.props.dispatch({
      type: 'xdWorkModal/getContrastIncomeKpiPkList',
      payload: {
        params: {
          pkUser,
          tabType: this.state.pkType,
          pkListType: this.props.pkListType
        }
      },
      callback: (profitData) => this.setState({ profitData }),
    });
  }
  getSizeStyle = ({ subSelfValue, subPkUserValue }) => {
    if (subSelfValue > subPkUserValue) {
      return '#00CCC3';
    } else if (subSelfValue < subPkUserValue) {
      return '#FF626A';
    }
    return '';
  }

  render() {
    const { profitPersonData, profitData } = this.state;
    const { pkUser } = this.props;
    const profitDataOther = profitData && profitData.filter((item, index) => index !== 0);
    console.log(profitData, profitDataOther)
    return (
      <div className={styles.profitTabs}>
        <BIRadio onChange={this.handlePkTypeChange} value={this.state.pkType} style={{ marginBottom: 16 }}>
          {pkTypeObj.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}>{item}</BIRadio.Radio.Button>)}
        </BIRadio>
        <Skeleton loading={this.props.loading} >
          <div className={styles.tabContent}>
            {!pkUser && <img src={xdGif} />}
            {/* 第一行 */}
            <div className={styles.tabBody} style={{ height: '136px' }}>
              <div className={styles.tabOneTh}>
                <span style={{ color: '#7A7C80', fontSize: '12px' }}>对比项</span>
                <span style={{ color: '#1A1C1F', fontWeight: 'bold' }}>创收绩效</span>
              </div>
              <div className={styles.tabOneTd}>
                <div className={`${styles.tabMine} ${pkUser ? '' : styles.tabMineLine}`}>
                  <div className={styles.msg}>{profitPersonData.self.userGrade}
                    <img src={gradeImg[profitPersonData.self.userGrade]} style={{ marginRight: '16px' }} />
                    <div>
                      <span style={{ color: '#1A1C1F', fontWeight: 'bold' }}>{profitPersonData.self.userName}</span>
                      <span>{profitPersonData.self.org}</span>
                    </div>
                  </div>
                  <div className={styles.imgs}>
                    {profitPersonData.self.certificationGradeList.map(item => <img key={item.certificationCode} src={pathImUrl + item.certificationIconUrl} style={{ marginRight: '10px' }} />)}
                  </div>
                </div>
                <div className={`${pkUser ? '' : styles.tabUserLine}`}>
                  {
                    pkUser && profitPersonData.pkUser ?
                      <>
                        <div className={styles.msg}>
                          <img src={gradeImg[profitPersonData.pkUser.userGrade]} style={{ marginRight: '16px' }} />
                          <div>
                            <span style={{ color: '#1A1C1F', fontWeight: 'bold' }}>{profitPersonData.pkUser.userName}</span>
                            <span>{profitPersonData.pkUser.org}</span>
                          </div>
                        </div>
                        <div className={styles.imgs}>
                          {profitPersonData.pkUser.certificationGradeList.map(item => <img key={item.certificationCode} src={pathImUrl + item.certificationIconUrl} style={{ marginRight: '10px' }} />)}
                        </div>
                      </>
                      :
                      <div className={styles.nonePk}>
                        <img src={pkImg} style={{ marginRight: '16px' }} />
                        <span>请从右边选择一个小组进行绩效PK吧！</span>
                      </div>
                  }
                </div>
              </div>
            </div>
            {/* 第二行 */}
            <div className={styles.tabBody} style={{ height: '72px' }}>
              <div className={styles.tabTwoTh}><span>绩效</span></div>
              <div className={styles.tabTwoTd}>
                {
                  pkUser && profitData && profitData[0] ? <Proportion leftNum={profitData[0].selfValue} rightNum={profitData[0].pkUserValue} iconed={true} />
                    : <div className={styles.tabTwoNone}><div>￥{thousandsFormat(profitData.selfValue)}</div></div>
                }
              </div>
            </div>
            {/* 第三行 */}
            <div className={styles.tabThreeBody}>
              <div className={styles.tabBody}>
                <div className={styles.tabThreeTh}>
                  {profitDataOther && profitDataOther.map((item, index) => <span key={index + '' + this.state.pkType} style={{ marginLeft: item.itemType === 2 ? '36px' : '12px' }}>{item.itemName}</span>)}
                </div>
                <div className={styles.tabThreeTd}>
                  {
                    profitDataOther && profitDataOther.map((item, index) => <div>
                      <span key={index + '' + this.state.pkType} style={{ color: this.getSizeStyle(item) }}>{thousandsFormat(item.selfValue)}{unitType[item.valueType]}</span>
                      <span>{pkUser ? <span>{thousandsFormat(item.pkUserValue)}{unitType[item.valueType]}</span> : ' '}</span>
                    </div>)
                  }
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default profitList;
