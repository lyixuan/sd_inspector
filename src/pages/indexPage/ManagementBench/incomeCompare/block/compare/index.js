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
        title: '学院',
        dataIndex: 'collegeName',
        key: 'collegeName',
      },
      {
        title: '好推单量',
        dataIndex: 'goodPushOrder',
        key: 'goodPushOrder',
      },
      {
        title: '好推流水',
        dataIndex: 'goodPushFlowKpiRatio',
        key: 'goodPushFlowKpiRatio',
        render: (goodPushFlowKpiRatio, record) => {
          const percent = goodPushFlowKpiRatio * 100 + '%';
          return (
            <BIWrapperProgress
              text={goodPushFlowKpiRatio}
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
      },
      {
        title: '续报流水',
        dataIndex: 'repeatSignFlowKpiRatio',
        key: 'repeatSignFlowKpiRatio',
        render: (repeatSignFlowKpiRatio, record) => {
          const percent = (repeatSignFlowKpiRatio / 500) * 100 + '%';
          return (
            <BIWrapperProgress
              text={repeatSignFlowKpiRatio}
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
        dataIndex: 'adultRegularFlowKpiRatio',
        key: 'adultRegularFlowKpiRatio',
        render: (adultRegularFlowKpiRatio, record) => {
          const percent = adultRegularFlowKpiRatio * 100 + '%';
          return (
            <BIWrapperProgress
              text={adultRegularFlowKpiRatio}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
      {
        title: '创收总流水',
        dataIndex: 'incomeTotalKpiRatio',
        key: 'incomeTotalKpiRatio',
        render: (incomeTotalKpiRatio, record) => {
          const percent = incomeTotalKpiRatio * 100 + '%';
          return (
            <BIWrapperProgress
              text={incomeTotalKpiRatio}
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
    if(dataSource && dataSource.length>6){
      dataSource.splice(6);
    }
    return (
      <Container title="创收学院对比" style={{ width: 'calc(67% - 16px)', height: '400px' ,overflow:'hidden'}}>
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
