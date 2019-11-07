import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './style.less';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIContrastCell from '../../components/BIContrastCell';
import BITextCell from '../../components/BITextCell';
import BILoading from '@/components/BILoading';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';

const { BI = {} } = window;
const colorsArr = ['rgba(255, 120, 120, 1)', 'rgba(255, 120, 120, 0.8)', 'rgba(255, 120, 120, 0.6)', 'rgba(255, 120, 120, 0.4)', 'rgba(255, 120, 120, 0.2)', 'rgba(255, 120, 120, 0.1)'];
@connect(({ xdClsssModal, loading }) => ({
  kpiTimes: xdClsssModal.kpiTimes || {},
  loading: loading.effects['xdClsssModal/groupPkList'],
}))
class currentCreditLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupPkList: {
        groupList: [],
        dimensionList: []
      },
      phLoading: false
    }
  }
  componentDidMount() {
    this.getGroupPkData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.pkGroupList !== nextProps.pkGroupList) {
      this.getGroupPkData(nextProps.pkGroupList);
    }
  }
  columns = () => {
    const { groupList = [] } = this.state.groupPkList;
    const columns = [
      {
        width: '18%',
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        render: (text, record) => this.getDimensionName(record)
      }, {
        width: '10%',
        title: '环比(%)',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render: text => <>{text && text !== 'N/A' ? <BITextCell>{text} <img src={text > 0 ? up : down} alt="" /></BITextCell> : ''}</>
      },
    ];
    groupList.map((item, index) => {
      columns.push({
        width: '12%',
        title: <div>
          {index > 0 ? item.groupName : '我的'}
          {index > 0 ? <BIIcon onClick={() => this.props.changePkFn(item.groupId)} /> : ''}
        </div>,
        dataIndex: item.groupId,
        key: item.groupId,
        render: (text, record) => {
          const textV = record.values[index];
          return (
            <>
              {
                record.flagMark ? record.valuesParams[index] : <BITextCell style={{ paddingRight: '16px' }}>{textV}</BITextCell>
              }
            </>
          )
        }
      })
    })
    for (var i = 0; i < 6 - groupList.length; i++) {
      columns.push({
        width: '12%',
        title: <div className={styles.pluscircle} onClick={this.handleToggle}><img src={pluscircle} alt='icon' />添加PK对象</div>,
        dataIndex: '添加PK对象' + i,
        key: '添加PK对象' + i,
      })
    }
    return columns || [];
  };
  // 学分查看埋点
  getDataTrace = (r) => {
    BI.traceV && BI.traceV({ "widgetName": r.dimensionName, "traceName": "班主任工作台/本期学分/" + r.dimensionName });
  }
  // 添加pk对象点击事件
  handleToggle = () => {
    BI.traceV && BI.traceV({ "widgetName": "本期学分-添加pk对象", "traceName": "本期学分-添加pk对象" });
    this.props.toggleDrawer(true);
  }
  //获取左侧列表数据的方法
  getGroupPkData = (pkGroupList = this.props.pkGroupList) => {
    this.setState({ phLoading: true });
    this.props.dispatch({
      type: 'xdClsssModal/groupPkList',
      payload: { params: { pkGroupList } },
      callback: res => {
        // 点击多次，只显示最后一次的数据
        const len = this.props.pkGroupList.length;
        if (len !== res.groupList.length - 1) return;
        for (let i = 0; i < len; i++) {
          if (!res.groupList[i + 1] || this.props.pkGroupList[i] !== res.groupList[i + 1].groupId) {
            return;
          }
        }
        res.dimensionList = this.fillDataSource(res.dimensionList);
        console.log(res.dimensionList, 789)
        this.setState({ groupPkList: res, phLoading: false });
      }
    });
  }
  // PK是否选中
  getIncludes = (id) => {
    return this.props.pkUsers && this.props.pkUsers.includes(id);
  }
  // 列表维度name
  getDimensionName = ({ dimensionName, level, sequenceNo }) => {
    if (sequenceNo) {
      return <b style={{ marginLeft: level === 2 || level === 3 ? '20px' : '0' }}>{sequenceNo} {dimensionName}</b>
    } else if (level === 3) {
      return <span style={{ marginLeft: '40px' }}>{dimensionName}</span>
    } else {
      return dimensionName
    }
  }
  setRowClassName = record => {
    let className = ''
    if (record.flagMark === 3) {
      className = 'yellowBgColor';
    } else if (record.flagMark === 1 || record.dimensionName === '退挽' || record.dimensionName === '随堂考') {
      className = 'plusBgColor';
    } else if (record.flagMark === 2) {
      className = 'minusBgColor';
    }
    return className
  }
  getContentLink = (text, record, index) => {
    if (index === 0 && text) {
      const { startTime, endTime } = this.props.kpiTimes;
      return {
        className: styles.mineHover,
        textContent: <Link onClick={() => this.getDataTrace(record)} target='_black' to={`/xdCredit/index?params=${JSON.stringify({ startTime, endTime, "dementionId": record.id })}`} >
          {text} <span style={{ marginLeft: '2px' }}>{'>'}</span>
        </Link>
      }
    } else {
      return {
        textContent: index === 0 ? <span style={{ marginRight: '16px' }}>{text}</span> : ''
      }
    }
  }
  fillDataSource = (params = [], intData = [], n = 1, flagMark) => {
    params.map(item => {
      item.level = n;
      item.flagMark = item.dimensionName === '学分均分' ? 3 : (item.dimensionName === '负面均分' ? 2 : flagMark); // 1 正面均分  2 负面均分 3学分均分 其它
      if (item.values) {// 处理颜色对比
        if (item.flagMark === 3) {
          item.valuesParams = item.values.map((text, index) => {
            if (text > 0) {
              return <BIContrastCell
                text={text}
                nums={item.values}
                {...this.getContentLink(text, item, index)}
              />
            } else {
              return <BIContrastCell
                text={text}
                nums={item.values}
                colors={colorsArr}
                isReversed={true}
                {...this.getContentLink(text, item, index)}
              />
            }
          });
        } else if (item.flagMark === 1 || item.dimensionName === '退挽' || item.dimensionName === '随堂考') {
          item.valuesParams = item.values.map((text, index) => <BIContrastCell
            text={text}
            nums={item.values}
            {...this.getContentLink(text, item, index)}
          />)
        } else if (item.flagMark === 2) {
          item.valuesParams = item.values.map((text, index) => <BIContrastCell
            text={text}
            nums={item.values}
            colors={colorsArr}
            isReversed={true}
            {...this.getContentLink(text, item, index)}
          />)
        }
      }
      const { children, ...others } = item;
      intData.push(others);
      if (item.children && item.children.length > 0) {
        const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
        this.fillDataSource(item.children, intData, n + 1, mark);
      }
    })
    return intData
  }
  getDataSource = () => {
    const { groupPkList } = this.state;
    const { dimensionList = [] } = groupPkList;
    if (dimensionList.length > 0) {
      if (this.props.hasData) {
        return dimensionList;
      } else {
        const [s, a, d, f, ...others] = dimensionList;
        return others;
      }
    } else {
      return []
    }

  }
  render() {
    const { pkGroupList, hasData } = this.props
    const loading = this.props.loading || this.state.phLoading;
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{ minHeight: 560 }}>
        <BILoading isLoading={loading} > <div className={styles.tableContainer}>
          <BIWrapperTable
            name='abcd'
            columns={this.columns()}
            dataSource={dataSource}
            defaultExpandAllRows={true}
            expandIcon={() => <a />}
            rowClassName={this.setRowClassName}
            pagination={false}
            rowKey={record => record.id}
            bordered={true}
            scroll={{ y: 492 }}
          />
          {
            pkGroupList && pkGroupList.length >= 1 ? '' : <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} alt='' /></div>
          }
        </div>
        </BILoading>
      </div>
    );
  }
}

export default currentCreditLeft;
