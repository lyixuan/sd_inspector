import React from 'react';
import { connect } from 'dva';
import styles from './styles.less';
import workImg1 from '@/assets/workImg1.png';
import workImg2 from '@/assets/workImg2.png';
import workImg3 from '@/assets/workImg3.png';
import workImg4 from '@/assets/workImg4.png';
import workImg5 from '@/assets/workImg5.png';
import workArrow from '@/assets/workArrow.png';
import moment from 'moment';

const admin_user = localStorage.getItem('admin_user');
@connect(xdManagementBench => ({
  xdManagementBench,
}))
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countList: {},
      allList: [],
      userType: JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null,
      bflag: false,
      val: '自考',
      familyType: 0, // 0 自考 1 壁垒
    };
  }
  componentDidMount() {
    this.getAllList();
    this.getCountList();
  }

  //指标
  getAllList() {
    this.props
      .dispatch({
        type: 'xdManagementBench/getCountByDate',
        payload: { params: { beginDate: '2019-08-09', endDate: '2019-10-10' } },
      })
      .then(res => {
        this.setState({ allList: res });
      });
  }

  //学分
  getCountList(familyType) {
    this.props
      .dispatch({
        type: 'xdManagementBench/getCountCreditAvgScore',
        payload: { params: { beginDate: '2019-08-09', endDate: '2019-10-10', familyType } },
      })
      .then(res => {
        this.setState({ countList: res });
      });
  }

  changeType() {
    let { bflag } = this.state;
    bflag = !bflag;
    if (bflag) {
      this.getCountList(1);
      this.setState({ val: '壁垒', bflag });
    } else {
      this.getCountList(0);
      this.setState({ val: '自考', bflag });
    }
  }

  // 院长不显示nps差评率
  getUlList() {
    const { countList, val } = this.state;
    return (
      <ul className={styles.list}>
        <li>
          <a href="#one">
            <img src={workImg1} alt="icon" />
          </a>
          {countList.familyTypeFlag && <span className={styles.changeType} onClick={() => this.changeType()}>
            {val}
            <img src={workArrow} className={styles.arrow} />
          </span>
          }
          <span className={styles.num}>{countList.value}</span>
          <p className={styles.bottom}>
            <span>学分均分</span>
            <span className={styles.arrowCon}>
              {countList.loopRatio}%{countList.loopRatio > 0 && <i className={styles.arrowTop}></i>}
              {countList.loopRatio < 0 && <i className={styles.arrowBottom}></i>}
            </span>
          </p>
        </li>
        <li>
          <a href="#two">
            <img src={workImg2} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>创收单量</span>
          </p>
        </li>
        <li>
          <a href="#three">
            <img src={workImg3} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>创收流失</span>
          </p>
        </li>
        <li>
          <a href="#four">
            <img src={workImg4} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>IM差评率</span>
          </p>
        </li>
        <li>
          <a href="#five">
            <img src={workImg5} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>BBS负面帖数</span>
          </p>
        </li>
      </ul>
    );
  }

  // 管理层不显示学分
  getUlList1() {
    return (
      <ul className={styles.list}>
        <li>
          <a href="#one">
            <img src={workImg1} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>创收单量</span>
          </p>
        </li>
        <li>
          <a href="#two">
            <img src={workImg2} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>创收流失</span>
          </p>
        </li>
        <li>
          <a href="#three">
            <img src={workImg3} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>IM差评率</span>
          </p>
        </li>
        <li>
          <a href="#four">
            <img src={workImg4} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>NPS差评率</span>
          </p>
        </li>
        <li>
          <a href="#five">
            <img src={workImg5} alt="icon" />
          </a>
          <span className={styles.num}>8.92</span>
          <p className={styles.bottom}>
            <span>BBS负面帖数</span>
          </p>
        </li>
      </ul>
    );
  }

  render() {
    const { date } = this.props;
    const { allList, userType } = this.state;
    const start = moment(date.startDate).format('YYYY.MM.DD');
    const end = moment(date.endDate).format('YYYY.MM.DD');
    return (
      <div className={styles.header}>
        <p className={styles.title}>
          <span className={styles.word}>关键指标</span>
          <span className={styles.date}>
            {start}- {end}(最新学分日期)
          </span>
        </p>
        {/* 管理层不显示学分 */}
        {userType !== 'boss' && <div>{this.getUlList()}</div>}
        {/* 院长副院长 不显示差评率 */}
        {userType !== 'college' && <div>{this.getUlList1()}</div>}
      </div>
    );
  }
}

export default Header;
