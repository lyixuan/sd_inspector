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
  familyAppeal: xdWorkModal.familyAppeal,
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
        dataIndex: 'violationLevel',
        key: 'violationLevel',
      }, {
        title: '运营长',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      }, {
        title: '质检',
        dataIndex: 'violationNumber1',
        key: 'violationNumber1',
        render: text => <>{text === 1 ? <div className={styles.rankMark}>{text}{<Tooltip placement="bottom" title='含一级违规'><img src={rankWarn} alt='icon' /></Tooltip>}</div> : text}</>
      }, {
        title: '底线',
        dataIndex: 'violationNumber2',
        key: 'violationNumber2',
      }, {
        title: 'IM',
        dataIndex: 'violationNumber3',
        key: 'violationNumber3',
      }, {
        title: '工单',
        dataIndex: 'violationNumber4',
        key: 'violationNumber4',
      } , {
        title: '优新',
        dataIndex: 'violationNumber5',
        key: 'violationNumber5',
      } , {
        title: '创收',
        dataIndex: 'violationNumber6',
        key: 'violationNumber6',
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
    const dataSource = this.props.familyAppeal[tabSource[this.state.appealType]] || [{id: 1, violationNumber1: 1}]
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
