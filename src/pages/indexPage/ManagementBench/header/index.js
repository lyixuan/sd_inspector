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
import Block from './block';
import { thousandsFormatBigger } from '@/utils/utils';
import { Tooltip } from 'antd';

const admin_user = localStorage.getItem('admin_user');

const TYPE = [
  {
    key: 1,
    name: '学分均分',
    href: 'one',
  },
  {
    key: 2,
    name: '创收单量',
    href: 'two',
  },
  {
    key: 3,
    name: '创收流水',
    href: 'three',
  },
  {
    key: 4,
    name: 'IM差评率',
    href: 'four',
  },
  {
    key: 5,
    name: 'NPS差评率',
    href: 'five',
  },
  {
    key: 6,
    name: 'BBS负面贴',
    href: 'six',
  },
];
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
    const { date } = this.props;
    this.props
      .dispatch({
        type: 'xdManagementBench/getCountByDate',
        payload: {
          params: {
            beginDate: moment(date.startDate).format('YYYY-MM-DD'),
            endDate: moment(date.endDate).format('YYYY-MM-DD'),
          },
        },
      })
      .then(res => {
        this.setState({ allList: res });
      });
  }

  //学分
  getCountList(familyType) {
    const { date } = this.props;
    this.props
      .dispatch({
        type: 'xdManagementBench/getCountCreditAvgScore',
        payload: {
          params: {
            beginDate: moment(date.startDate).format('YYYY-MM-DD'),
            endDate: moment(date.endDate).format('YYYY-MM-DD'),
            familyType,
          },
        },
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
  // 1	学分均分
  // 2	创收单量
  // 3	创收流水
  // 4	IM差评率
  // 5	NPS差评率
  // 6	BBS负面贴
  getUlList() {
    const { countList, val, allList } = this.state;
    return (
      <ul className={styles.list}>
        <li>
          <Tooltip title="当前绩效周期内本学院的学分均分">
            <a href="#one">{/* <img src={workImg1} alt="icon" /> */}</a>
          </Tooltip>
          {countList.familyTypeFlag && (
            <span className={styles.changeType} onClick={() => this.changeType()}>
              {val}
              <img src={workArrow} className={styles.arrow} />
            </span>
          )}
          <span className={styles.num}>{thousandsFormatBigger(countList.value)}</span>
          <p className={styles.bottom}>
            <span>学分均分</span>
            <span className={styles.arrowCon}>
              {countList.loopRatio}%{countList.loopRatio > 0 && <i className={styles.arrowTop}></i>}
              {countList.loopRatio < 0 && <i className={styles.arrowBottom}></i>}
            </span>
          </p>
        </li>
        {allList.map(item => {
          if (!item || !item.type) return;
          return <Block item={item} />;
        })}
        {/* <li>
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
            <span>创收流水</span>
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
        </li> */}
      </ul>
    );
  }

  // 管理层不显示学分
  getUlList1() {
    const { allList } = this.state;
    return (
      <ul className={styles.list}>
        {allList.map(item => {
          if (!item || !item.type) return;
          return <Block item={item} />;
        })}
        {/* <li>
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
        </li>*/}
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
