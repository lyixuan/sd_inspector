import React from 'react';
import { connect } from 'dva';
import { thousandsFormatBigger } from '@/utils/utils';
import styles from './styles.less';
import workImg1 from '@/assets/workImg1.png';
import workImg2 from '@/assets/workImg2.png';
import workImg3 from '@/assets/workImg3.png';
import workImg4 from '@/assets/workImg4.png';
import workImg5 from '@/assets/workImg5.png';
import workArrow from '@/assets/workArrow.png';
import moment from 'moment';
import { Tooltip } from 'antd';
const { BI = {} } = window;
const admin_user = localStorage.getItem('admin_user');

const TYPE = [
  {
    key: 1,
    name: '学分均分',
    href: '#one',
    title: '当前绩效周期内本学院的学分均分',
  },
  {
    key: 2,
    name: '创收单量',
    href: '#two',
    title: '当前绩效周期内创收总单量',
  },
  {
    key: 3,
    name: '创收流水',
    href: '#three',
    title: '当前绩效周期内竞合后净流水',
  },
  {
    key: 4,
    name: 'IM差评率',
    href: '#four',
    title: '当前绩效周期内IM差评率',
  },
  {
    key: 5,
    name: 'NPS差评率',
    href: '#four',
    title: '当前绩效周期内NPS差评率',
  },
  {
    key: 6,
    name: 'BBS负面贴',
    href: '#six',
    title: '当前绩效周期内BBS负面帖数',
  },
];

class Block extends React.Component {
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

  addPoint = (e, name) => {
    if (name === 'IM差评率') {
      BI.traceV && BI.traceV({ widgetName: 'IM差评率', traceName: '管理层工作台/IM差评率' });
    }
  };
  render() {
    const { item } = this.props;
    if (!item) return;
    let href = '';
    let title = '';
    let name = '';
    TYPE.map(currentValue => {
      if (currentValue.key === item.type)
        return (href = currentValue.href), (title = currentValue.title), (name = currentValue.name);
    });
    let money = 0;
    if (name === 'IM差评率' || name === 'NPS差评率') {
      money = item.value !== 0 ? Number(item.value) * 100 + '%' : 0;
    } else {
      money = thousandsFormatBigger(item.value);
    }
    return (
      <li onClick={e => this.addPoint(e, name)}>
        <a href={href}></a>
        <span className={styles.num}>
          <Tooltip title={title}>{money}</Tooltip>
        </span>
        <p className={styles.bottom}>
          <span>
            {TYPE.map(it => {
              return it.key === item.type ? it.name : '';
            })}
          </span>
        </p>
      </li>
    );
  }
}

export default Block;
