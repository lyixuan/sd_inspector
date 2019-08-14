import React from 'react';
import { connect } from 'dva';
import { Spin, message, Table } from 'antd';
import styles from './style.less';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment';

const { Option } = BISelect;
const archiveStatus = {
  archiving: 1,
  archiveSuccess: 2,
  archiveFail: 3,
};

@connect(({ createIncome, loading }) => ({
  createIncome,
  loadingTime: loading.effects['createIncome/getBatchLogList'],
}))
class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeValue: '',
      disabled: true, // 存档按钮是否可点击
      archiveStop: true,
    };
  }

  componentDidMount() {
    this.getBatchLogList();
  }

  getBatchLogList = () => {
    this.props.dispatch({
      type: 'createIncome/getBatchLogList',
    });
  };

  formatData = (time, YYYYMMDD) => {
    if (YYYYMMDD) {
      return moment(time).format('YYYY-MM-DD');
    }
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  };
  columnsData = () => {
    const columns = [
      {
        title: '存档时间',
        width: '180px',
        dataIndex: 'batchStartTime',
        render: (text, record) => {
          let value = this.formatData(record.batchStartTime);
          return <div>{value}</div>;
        },
      },
      {
        title: '已存档绩效包',
        width: '300px',
        dataIndex: 'effectiveDate',
        render: (text, record) => {
          return (
            <div>{`${this.formatData(record.kpiPackageStartDate, 'YYYYMMDD')} 至 ${this.formatData(
              record.kpiPackageEndDate,
              'YYYYMMDD'
            )}`}</div>
          );
        },
      },
      {
        title: '操作人',
        width: '100px',
        dataIndex: 'operator',
      },
      {
        title: '状态',
        dataIndex: 'batchStatus',
        render: (text, record) => {
          let value = '';
          if (record.batchStatus === 1) return (value = '存档中');
          if (record.batchStatus === 2) return (value = '存档成功');
          if (record.batchStatus === 3) return (value = '存档失败');
          return <div>{value}</div>;
        },
      },
    ];

    return columns;
  };

  // 存档
  handleArchive = () => {
    const { disabled, changeValue } = this.state;
    const params = {};
    if (disabled) return;
    params.kpiPackageStartDate = changeValue.split('至')[0];
    params.kpiPackageEndDate = changeValue.split('至')[1];
    this.props
      .dispatch({
        type: 'createIncome/saveBatchLog',
        payload: { params },
      })
      .then(res => {
        if (res) {
          this.setState({ disabled: false });
          message.success('存档成功');
          this.getBatchLogList();
          return;
        }
      });
    this.setState({ disabled: true });
  };

  // // 暂定不做取消存档
  // handleArchiveStop = () => {
  //   const { disabled, changeValue } = this.state;
  //   const params = {};
  //   params.kpiPackageStartTime = changeValue;
  //   params.kpiPackageEndTime = changeValue;
  //   // 请求接口
  //   this.props.dispatch({
  //     type: 'createIncome/cacelBatchLog',
  //     payload: { params },
  //   });
  // };

  // 获取绩效包周期
  formValChange = (val, key) => {
    this.setState({
      changeValue: val.key,
      disabled: false,
    });
  };
  render() {
    const { disabled } = this.state;
    const { achievementList, loadingTime } = this.props;
    const { batchLogListData = [] } = this.props.createIncome;
    const dataSource = batchLogListData;

    return (
      <>
        <Spin spinning={loadingTime}>
          <div className={styles.archiveWrap}>
            <h2 className={styles.title}>创收绩效存档</h2>
            <div className={styles.line}>
              <div>
                <span>需存档的绩效包:</span>
                <BISelect
                  placeholder="请选择绩效月"
                  style={{ width: 190, margin: '0 30px 0 10px' }}
                  labelInValue
                  onChange={val => this.formValChange(val)}
                >
                  {achievementList.map(item => (
                    <Option
                      key={`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(
                        item.expiryDate
                      ).format('YYYY-MM-DD')}`}
                    >
                      {`${moment(item.effectiveDate).format('YYYY-MM-DD')}至${moment(
                        item.expiryDate
                      ).format('YYYY-MM-DD')}`}
                    </Option>
                  ))}
                </BISelect>
                <BIButton
                  disabled={disabled}
                  type="primary"
                  onClick={this.handleArchive}
                  style={{ padding: '0 25px', marginRight: 10 }}
                >
                  存档
                </BIButton>
                {/* <BIButton disabled={archiveStop} type="primary" onClick={this.handleArchiveStop}>
              取消存档
              取消存档功能暂时不做
            </BIButton> */}
              </div>
              <div className={styles.archiveTable}>
                <Table
                  bordered
                  dataSource={dataSource}
                  columns={this.columnsData()}
                  useFixedHeader
                  scroll={{ y: 300 }}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </Spin>
      </>
    );
  }
}

export default Archive;
