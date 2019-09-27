import React from 'react';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import BITable from '@/ant_components/BITable';
import Container from '../../components/container';

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
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getCountAppealRecord'],
}))
class appeal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appealType: 1,
    }
  }
  componentDidMount() {
  
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
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      }, {
        title: '底线',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      }, {
        title: 'IM',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      }, {
        title: '工单',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      } , {
        title: '优新',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
      } , {
        title: '创收',
        dataIndex: 'violationNumber',
        key: 'violationNumber',
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
          dataSource={[]}
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
