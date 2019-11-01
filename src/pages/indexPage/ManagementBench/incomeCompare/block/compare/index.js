import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './styles.less';
import Container from '@/components/BIContainer';
import BIWrapperTable from '../../../../components/BIWrapperTable';
import BITable from '@/ant_components/BITable';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { thousandsFormatBigger } from '@/utils/utils';

@connect(xdManagementBench => ({
  xdManagementBench,
}))
class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      date: this.props.date || {},
    };
  }

  componentDidMount() {
    const { date } = this.props;
    this.props
      .dispatch({
        type: 'xdManagementBench/getCompareCollegeList',
        payload: {
          params: {
            beginDate: moment(date.startDate).format('YYYY-MM-DD'),
            endDate: moment(date.endDate).format('YYYY-MM-DD'),
          },
        },
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
        dataIndex: 'goodPushFlowKpi',
        key: 'goodPushFlowKpi',
        render: (goodPushFlowKpi, record) => {
          const percent = record.goodPushFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(goodPushFlowKpi);
          return (
            <BIWrapperProgress
              text={money}
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
        dataIndex: 'repeatSignFlowKpi',
        key: 'repeatSignFlowKpi',
        render: (repeatSignFlowKpi, record) => {
          const percent = record.repeatSignFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(repeatSignFlowKpi);
          return (
            <BIWrapperProgress
              text={money}
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
          const percent = record.adultRegularFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(adultRegularFlowKpi);
          return (
            <BIWrapperProgress
              text={money}
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
          const percent = record.incomeTotalKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(incomeTotalKpi);
          return (
            <BIWrapperProgress
              text={money}
              percent={percent}
              propsStyle={{ flex: 'inherit', width: '60px', textAlign: 'center' }}
            />
          );
        },
      },
    ];
    return columns || [];
  };
  setRowClassName = (record, index) => {
    let taClassName = '';
    if (record.highlightFlag) {
      taClassName = 'rowHover';
    }
    return taClassName;
  };

  render() {
    const { dataSource } = this.state;

    if (dataSource && dataSource.length > 6) {
      dataSource.splice(6);
    }
    return (
      <Container
        title="创收学院对比"
        style={{ width: 'calc(67% - 16px)', height: '400px', overflow: 'hidden' }}
      >
        <BIWrapperTable
          className={styles.table}
          columns={this.columns()}
          dataSource={dataSource}
          pagination={false}
          rowClassName={this.setRowClassName}
          loading={this.props.loading}
          onRow={this.onClickRow}
          rowKey={record => record.id}
        />
      </Container>
    );
  }
}

export default Compare;
