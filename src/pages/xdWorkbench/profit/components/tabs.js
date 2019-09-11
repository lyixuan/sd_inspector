import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import Proportion from '../../components/proportion';
import BIRadio from '@/ant_components/BIRadio';
import gradeA from '@/assets/workBench/a.png';
import gradeB from '@/assets/workBench/b.png';
import gradeC from '@/assets/workBench/c.png';
import gradeS from '@/assets/workBench/s.png';
import xdGif from '@/assets/workBench/xdpk.png';
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
@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPersonInfo'] || loading.effects['xdWorkModal/getContrastIncomeKpiPkList'],
}))
class profitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pkType: 1,
      profitData: {
        selfValue: 2222202,
        pkUserValue: 201,
        subItem: [{
          subItemName: '创收绩效名次',
          subSelfValue: 2000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 3000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }, {
          subItemName: '创收绩效名次',
          subSelfValue: 4000,
          subPkUserValue: 3000,
          subValueType: 2,	
        }]
      },
      profitPersonData: {
        self: {
          userName: '李四',
          userGrade: 'A',
          org: '自变量学院',
          certificationGradeList: [{
            certificationCode: '1',
            certificationIconUrl: '/staticFile/classFile/upload/certificationIcon/originalIcon/2PtgHH7EycIQWJXjFn5i_0523.png'
          }]
        },
        pkUser: {
          userName: 'o四',
          userGrade: 'C',
          org: '自变量学院',
          certificationGradeList: [{
            certificationCode: '1',
            certificationIconUrl: '/staticFile/classFile/upload/certificationIcon/originalIcon/2PtgHH7EycIQWJXjFn5i_0523.png'
          }]
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
      this.getPkmsg();
      this.getPkList();
    }
  }

  handlePkTypeChange = (e) => {
    this.setState({
      pkType: e.target.value
    }, () => this.getPkList());
    
  }
  // pk信息
  getPkmsg = () => {
    this.props.dispatch({
      type: `xdWorkModal/getIncomeKpiPersonInfo`,
      payload: { params: { pkUser: this.props.pkUser } },
      callback: (profitPersonData) => this.setState({ profitPersonData }),
    });
  }
  // 对比列表
  getPkList = () => {
    this.props.dispatch({
      type: `xdWorkModal/getContrastIncomeKpiPkList`,
      payload: { params: { pkUser: this.props.pkUser,  pkType: this.state.pkType} },
      callback: (profitData) => this.setState({ profitData }),
    });
  }
  getSizeStyle = ({subSelfValue, subPkUserValue}) => {
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
    return (
      <div className={styles.profitTabs}>
        <BIRadio onChange={this.handlePkTypeChange} value={this.state.pkType} style={{ marginBottom: 16 }}>
          {pkTypeObj.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}>{item}</BIRadio.Radio.Button>)}
        </BIRadio>
        <Skeleton loading={this.props.loading} >
          <div className={styles.tabContent}>
            <img src={xdGif}/>
            {/* 第一行 */}
            <div className={styles.tabBody}>
              <div className={styles.tabOneTh}>
                <span style={{color: '#7A7C80', fontSize: '12px'}}>对比项</span>
                <span style={{color: '#1A1C1F', fontWeight: 'bold'}}>创收绩效</span>
              </div>
              <div className={styles.tabOneTd}>
                <div className={styles.tabMine}>
                  <div className={styles.msg}>
                    <img src={gradeImg[profitPersonData.self.userGrade]} style={{marginRight: '16px'}}/>
                    <div>
                      <span style={{color: '#1A1C1F', fontWeight: 'bold'}}>{profitPersonData.self.userName}</span>
                      <span>{profitPersonData.self.org}</span>
                    </div>
                  </div>
                  <div className={styles.imgs}>
                    {profitPersonData.self.certificationGradeList.map(item => <img key={item.certificationCode} src={pathImUrl + item.certificationIconUrl} style={{marginRight: '10px'}}/>)}
                  </div>
                </div>
                <div className={`${pkUser ? '' : styles.tabLine}`}>
                  {pkUser ? <>
                    <div className={styles.msg}>
                      <img src={gradeImg[profitPersonData.pkUser.userGrade]} style={{marginRight: '16px'}}/>
                      <div>
                        <span style={{color: '#1A1C1F', fontWeight: 'bold'}}>{profitPersonData.pkUser.userName}</span>
                        <span>{profitPersonData.pkUser.org}</span>
                      </div>
                    </div>
                    <div className={styles.imgs}>
                      {profitPersonData.pkUser.certificationGradeList.map(item => <img key={item.certificationCode} src={pathImUrl + item.certificationIconUrl} style={{marginRight: '10px'}}/>)}
                    </div></> : <div className={styles.nonePk}>
                      <img src={pkImg} style={{marginRight: '16px'}}/>
                      <span>请从右边选择一个小组进行绩效PK吧！</span>
                    </div>
                  }
                </div>
              </div>
            </div>
            {/* 第二行 */}
            <div className={styles.tabBody} style={{height: '72px'}}>
              <div className={styles.tabTwoTh}><span>绩效</span></div>
              <div className={styles.tabTwoTd}>
                {
                  pkUser ? <Proportion leftNum={profitData.selfValue} rightNum={profitData.pkUserValue} iconed={true}/> 
                  : <div className={styles.tabTwoNone}><div>￥{thousandsFormat(profitData.selfValue)}</div></div>
                }
              </div>
            </div>
            {/* 第三行 */}
            <div className={`${styles.tabBody} ${styles.tabThreeBody}`}>
              <div className={styles.tabThreeTh}>
                {profitData.subItem.map((item, index) => <span key={index + '' + this.state.pkType}  style={{marginLeft: '36px'}}>{item.subItemName}</span>)}
              </div>
              <div className={styles.tabThreeTd}>
                {
                  profitData.subItem.map((item, index) =><div>
                  <span key={index + '' + this.state.pkType} style={{color: this.getSizeStyle(item)}}>{thousandsFormat(item.subSelfValue)}{unitType[item.subValueType]}</span>
                  <span>{pkUser ? <span>{thousandsFormat(item.subPkUserValue)}{unitType[item.subValueType]}</span> : ''}</span>
                  </div>)
                }
              </div>
            </div>
          </div>
        </Skeleton>
      </div>  
    );
  }
}

export default profitList;
