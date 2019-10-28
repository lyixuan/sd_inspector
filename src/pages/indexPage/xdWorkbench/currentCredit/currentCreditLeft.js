import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './style.less';
import BIWrapperTable from '../../components/BIWrapperTable';
import BIContrastCell from '@/components/BIContrastCell';
import BILoading from '@/components/BILoading';
import BIFillCell from '@/components/BIFillCell';
import BIIcon from '@/components/BIIcon';
import pluscircle from '@/assets/xdwork/pluscircle.png';
import xdPkImg from '@/assets/workBench/xdpk.gif';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';

const { BI = {} } = window;
const colorsArr = ['rgba(255, 89, 89, 1)', 'rgba(255, 89, 89, 0.8)', 'rgba(255, 89, 89, 0.6)', 'rgba(255, 89, 89, 0.4)', 'rgba(255, 89, 89, 0.2)', 'rgba(255, 89, 89, 0.1)'];
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
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
    const { startTime, endTime } = this.props.kpiTimes;
    const columns = [
      {
        width: '14%',
        title: '学分维度',
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        render: (text, record) => this.getDimensionName(record)
      }, {
        width: '8%',
        title: '环比(%)',
        dataIndex: 'myScoreRatio',
        key: 'myScoreRatio',
        render: text => <>{text && text !== 'N/A' ? <BIFillCell>{text} <img src={text > 0 ? up : down} alt=""/></BIFillCell> : ''}</>
      },
    ];
    groupList.map((item, index) => {
      columns.push({
        width: '12%',
        title: <div>
          {index > 0 ? item.groupName : '我的'}
          {index > 0 ? <BIIcon onClick={() => this.props.changePkFn(item.groupId)}/> : ''}
        </div>,
        dataIndex: item.groupId,
        key: item.groupId,
        render: (text, record) => {
          const textV = record.values[index];
          return (
            <>
              {
                record.flagMark ? <BIFillCell {...record.valuesParams[index]} className={index === 0 && textV ? styles.mineHover : ''}>
                  {
                    index === 0 && textV ? <Link onClick={this.getDataTrace} target='_black' to={`/xdCredit/index?params=${JSON.stringify({startTime, endTime, "dementionId": record.id })}`} >
                      {textV}
                      <span style={{color: '#00beaf', marginLeft: '2px'}}>{'>'}</span>
                    </Link> 
                    : <>{textV}<span style={{marginLeft: '8px'}}></span></>
                  }
                </BIFillCell> 
                : <BIFillCell style={{paddingRight: '16px'}}>{textV}</BIFillCell>
              }
            </>
          )
        }
      }) 
    })
    for (var i = 0; i < 6 - groupList.length; i++) {
      columns.push({
        width: '12%',
        title: <div className={styles.pluscircle} onClick={this.handleToggle}><img src={pluscircle} alt='icon'/>添加PK对象</div>,
        dataIndex: '添加PK对象' + i,
        key: '添加PK对象' + i,
      })
    }
    return columns || [];
  };
  // 学分查看埋点
  getDataTrace = () => {
    BI.traceV &&  BI.traceV({"widgetName":"本期学分-学分查看","traceName":"本期学分-学分查看"});
  }
  // 添加pk对象点击事件
  handleToggle = () => {
    BI.traceV &&  BI.traceV({"widgetName":"本期学分-添加pk对象","traceName":"本期学分-添加pk对象"});
    this.props.toggleDrawer(true);
  }
  //获取左侧列表数据的方法
  getGroupPkData = (pkGroupList = this.props.pkGroupList) => {
    this.props.dispatch({
      type: 'xdClsssModal/groupPkList',
      payload: { params: { pkGroupList } },
      callback: res => {
        res.dimensionList = this.fillDataSource(res.dimensionList);
        this.setState({ groupPkList: res });
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
      return <b style={{marginLeft: level === 3 ? '-20px' : '0'}}>{sequenceNo} {dimensionName}</b>
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
  fillDataSource = (params = [], n = 1, flagMark) => {
    params.map(item => { 
      item.level = n;
      item.flagMark = item.dimensionName === '学分均分' ? 3 : flagMark; // 1 正面均分  2 负面均分 3学分均分 其它
      if (item.values) {// 处理颜色对比
        if (item.flagMark === 1 || item.flagMark === 3) {
          item.valuesParams = BIContrastCell.colorContrast({ nums: item.values });
        } else if (item.flagMark === 2) {
          item.valuesParams = BIContrastCell.colorContrast({ nums: item.values, colors: colorsArr, isReversed: true });
        }
      }
      if (item.children && item.children.length > 0) {
        const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
        this.fillDataSource(item.children, n + 1, mark);
      }
    })
    return params
  }
  getDataSource = () => {
    const { groupPkList } = this.state;
    const data = groupPkList.dimensionList ? JSON.parse(JSON.stringify(groupPkList.dimensionList)) : [];
    if (this.props.hasData) {
      return data.splice(0);
    } else {
      return data.splice(4);
    }
  }
  render() {
    const { pkGroupList } = this.props
    const dataSource = this.getDataSource();
    return (
      <div className={styles.creditLeft} style={{minHeight: this.props.getNumValue(732) + 'px'}}>
        {this.props.loading ? <BILoading isLoading={this.props.loading}/> : <div className={styles.tableContainer}>  
          {
            dataSource && dataSource.length > 0 && <BIWrapperTable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              expandIcon={CustomExpandIcon}
              rowClassName={this.setRowClassName}
              pagination={false}
              rowKey={record => record.id}
              loading={this.props.loading}
              bordered={true}
              scroll={{ x: 'max-content', y: this.props.getNumValue(680) }}
            />
          }
          {
            pkGroupList && pkGroupList.length < 4 ? <div onClick={() => this.props.toggleDrawer(true)} className={styles.tableImg}><img src={xdPkImg} /></div> : ''
          }
      </div>}
      </div>
    );
  }
}

export default currentCreditLeft;
