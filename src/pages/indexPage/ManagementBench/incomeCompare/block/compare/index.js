import React from 'react';
import { connect } from 'dva';
import styles from './styles.less'
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
@connect(xdWorkModal => ({
  xdWorkModal,
}))
class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentDidMount() {
    this.props
      .dispatch({
        type: 'xdWorkModal/getCompareCollegeList',
        payload: { params: { beginDate: '2019-08-09', endDate: '2019-10-10' } },
      })
      .then(res => {
        this.setState({ dataSource: res });
      });
  }
  columns = () => {
    const columns = [
      {
        title: '好推单量',
        dataIndex: 'goodPushOrder',
        key: 'goodPushOrder',
      },
      {
        title: '好推流水',
        dataIndex: 'goodPushFlowKpi',
        key: 'goodPushFlowKpi',
        render: (goodPushFlowKpi, record) => {
          const percent = goodPushFlowKpi * 100 + '%';
          return (
            <BIWrapperProgress
              text={goodPushFlowKpi}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '续报单量',
        dataIndex: 'repeatSignOrder',
        key: 'repeatSignOrder',
        render: (repeatSignOrder, record) => {
          const percent = (repeatSignOrder / 500) * 100 + '%';
          return (
            <BIWrapperProgress
              text={repeatSignOrder}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '续报流水',
        dataIndex: 'repeatSignFlowKpi',
        key: 'repeatSignFlowKpi',
        render: (repeatSignFlowKpi, record) => {
          const percent = (repeatSignFlowKpi / 500) * 100 + '%';
          return (
            <BIWrapperProgress
              text={repeatSignFlowKpi}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '成本套单量',
        dataIndex: 'adultRegularOrder',
        key: 'adultRegularOrder',
      },
      {
        title: '成本套流水',
        dataIndex: 'adultRegularFlowKpi',
        key: 'adultRegularFlowKpi',
        render: (adultRegularFlowKpi, record) => {
          const percent = adultRegularFlowKpi * 100 + '%';
          return (
            <BIWrapperProgress
              text={adultRegularFlowKpi}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '创收总流水',
        dataIndex: 'incomeTotalKpi',
        key: 'incomeTotalKpi',
        render: (incomeTotalKpi, record) => {
          const percent = incomeTotalKpi * 100 + '%';
          return (
            <BIWrapperProgress
              text={incomeTotalKpi}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
    ];
    return columns || [];
  };
  render() {
    const { dataSource } = this.state;
    return (
      <Container title="创收学院对比" style={{ width: 'calc(67% - 16px)', height: '372px' ,overflow:'hidden'}}>
        <BIWrapperTable
          className={styles.table}
          columns={this.columns()}
          dataSource={dataSource}
          pagination={false}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={record => record.id}
        />
      </Container>
    );
  }
}

export default Compare;
