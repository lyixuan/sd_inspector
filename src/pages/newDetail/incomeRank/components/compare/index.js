import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BIWrapperTable from '@/components/BIWrapperTable';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { thousandsFormatBigger } from '@/utils/utils';

@connect(() => ({
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
        type: 'incomeRankModal/getCompareCollegeList',
        payload: {
          params: {
            beginDate: '2019-11-29',
            endDate: '2019-12-11',
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
        render: text => <BITextAlign>{text}</BITextAlign>
      },
      {
        title: '好推流水',
        dataIndex: 'goodPushFlowKpi',
        key: 'goodPushFlowKpi',
        render: (goodPushFlowKpi, record) => {
          const percent = record.goodPushFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(goodPushFlowKpi);
          return (
            // <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
              />
            // </div>
          );
        },
      },
      {
        title: '续报单量',
        dataIndex: 'repeatSignOrder',
        key: 'repeatSignOrder',
        render: text => <BITextAlign>{text}</BITextAlign>
      },
      {
        title: '续报流水',
        dataIndex: 'repeatSignFlowKpi',
        key: 'repeatSignFlowKpi',
        render: (repeatSignFlowKpi, record) => {
          const percent = record.repeatSignFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(repeatSignFlowKpi);
          return (
            // <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
              />
            // </div>
          );
        },
      },
      {
        title: '成考单量',
        dataIndex: 'adultRegularOrder',
        key: 'adultRegularOrder',
        render: text => <BITextAlign>{text}</BITextAlign>
      },
      {
        title: '成考流水',
        dataIndex: 'adultRegularFlowKpi',
        key: 'adultRegularFlowKpi',
        render: (adultRegularFlowKpi, record) => {
          const percent = record.adultRegularFlowKpiRatio * 100 + '%';
          const money = thousandsFormatBigger(adultRegularFlowKpi);
          return (
            // <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
              />
            // </div>
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
            // <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <BIWrapperProgress
                text={money}
                percent={percent}
              />
            // </div>
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
      <div className={styles.container}>
        <BIWrapperTable
            className={styles.table}
            columns={this.columns()}
            dataSource={dataSource}
            pagination={false}
            rowClassName={this.setRowClassName}
            loading={this.props.loading}
            onRow={this.onClickRow}
            rowKey={record => record.id}
            bordered={true}
          />
      </div>
    );
  }
}

export default Compare;
