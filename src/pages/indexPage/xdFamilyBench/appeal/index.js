import React from 'react';
import { connect } from 'dva';
import { Tooltip } from 'antd';
import BIRadio from '@/ant_components/BIRadio';
import BITable from '@/ant_components/BITable';
import Container from '../../components/container';
import rankWarn from '@/assets/xdFamily/rankWarn.png';
import styles from './style.less';

const tabsMsg = [{
  title: '未申诉',
  dataTrace: '{"widgetName":"本期创收-综合对比","traceName":"小德工作台/本期创收/综合对比"}',
}, {
  title: '被驳回',
  dataTrace: '{"widgetName":"本期创收-综合对比","traceName":"小德工作台/本期创收/综合对比"}',
}, {
  title: '审核中',
  dataTrace: '{"widgetName":"本期创收-综合对比","traceName":"小德工作台/本期创收/综合对比"}',
}];
const tabSource = {
  1: 'nonAppealList',
  2: 'rejectedAppealList',
  3: 'auditingAppealList'
}
@connect(({ xdWorkModal, loading }) => ({
  familyAppeal: xdWorkModal.familyAppeal || {},
  loading: loading.effects['xdWorkModal/getFamilyRecord'],
}))
class appeal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appealType: 1,
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getFamilyRecord',
      payload: { params: { id: this.props.userId } },
    });
  }

  columns = () => {
    const columns = [
      {
        title: '家族小组',
        dataIndex: 'groupName',
        key: 'groupName',
      }, {
        title: '质检',
        dataIndex: 'qualityNum',
        key: 'qualityNum',
        render: (text, record)=> <>{record.primaryViolationFlag ? <div className={styles.rankMark}>{text}{<Tooltip placement="bottom" title='含一级违规'><img src={rankWarn} alt='icon' /></Tooltip>}</div> : text}</>
      }, {
        title: '底线',
        dataIndex: 'bottomLineNum',
        key: 'bottomLineNum',
      }, {
        title: 'IM',
        dataIndex: 'imNum',
        key: 'imNum',
      }, {
        title: '工单',
        dataIndex: 'orderNum',
        key: 'orderNum',
      } , {
        title: '优新',
        dataIndex: 'newExcellentNum',
        key: 'newExcellentNum',
      } , {
        title: '创收',
        dataIndex: 'incomeNum',
        key: 'incomeNum',
      } 
 
    ];
    return columns || [];
  };
  handleChange = (e) => {
    this.setState({
      appealType: e.target.value
    });
  }

  render() {
    const dataSource = this.props.familyAppeal[tabSource[this.state.appealType]] || []
    return (
      <Container
        title='本期申诉'
        style={{ width: '60%' }}
        propStyle={{ paddingLeft: '16px' }}
      >
        <BIRadio onChange={this.handleChange} value={this.state.appealType} style={{ marginBottom: 16 }}>
          {tabsMsg.map((item, index) => <BIRadio.Radio.Button value={index + 1} key={index}><div data-trace={item.dataTrace}>{item.title}</div></BIRadio.Radio.Button>)}
        </BIRadio>
        <BITable
          columns={this.columns()}
          dataSource={dataSource}
          pagination={false}
          loading={this.props.loading}
          rowKey={(record, index) => index}
          smalled
        />
      </Container>
    );
  }
}

export default appeal;
