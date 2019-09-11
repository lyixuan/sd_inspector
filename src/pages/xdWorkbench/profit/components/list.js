import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import BITable from '@/ant_components/BITable'
import BISelect from '@/ant_components/BISelect'
import styles from '../style.less';

const { Option } = BISelect;
const pkTypeconfig = ['集团排行', '学院内排行', '家族内排行', '同期入职排行', '同级排行', ];
@connect(({ loading}) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class profitList extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      pkListType: 5,
      profitList: [
        { sort: 123, userId: 1, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 2, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 1456, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 4, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 5, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 6, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 7, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 8, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 9, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 10, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 2222, userId:11, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 12, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 13, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
        { sort: 123, userId: 15, org: '组织', userName: '邓嘟嘟', incomeKpi: '111'},
      ],
      userMsg: '',
      userFlag: false,
      userLocation: ''
    }
  }
  componentDidMount() {
    this.getData();
    this.getScrollFn();
    // 表格添加滚动事件
    document.querySelector("#scroll .ant-table-body").onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
  }
  componentWillUnmount() {
    document.querySelector("#scroll .ant-table-body").onscroll = '';
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 400) {
      if (userFlag === true) {
        this.setState({
          userFlag: false
        })
      }
    } else if (userFlag === false){
      this.setState({
        userFlag: true
      })
    }
  }
  columns = () => {
    const columns = [
      {
        width: '20%',
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
      }, {
        width: '20%',
        title: '组织',
        dataIndex: 'org',
        key: 'org',
      }, {
        width: '20%',
        title: '班主任',
        dataIndex: 'userName',
        key: 'userName',
      }, {
        title: '绩效收入',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: text => <div
            style={{
              cursor: 'pointer',
              height: '24px'
            }}
          >
            <span style={{ position: 'relative', top: '-2px'}}>{10000}</span>
            <Progress
              percent={90}
              strokeColor={'#00CCC3'}
              showInfo={false}
              strokeWidth={4}
            ></Progress>
          </div>
      }
    ];
    return columns || [];
  };
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (this.props.userId === record.userId) return;
        this.props.changeSelected(record.userId)
      }
    };
  }
  getRowClassName = (record, index) => {
    if (this.props.userId === record.userId) {
      this.state.userMsg = this.state.profitList[index];
      this.state.userLocation = 40 * (index + 1) - 430;
      return styles.pkUser;
    };
  }
  onChangeParams = (v) => {
    this.setState({ pkListType : v}, () => this.getData());
  }
  getData = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPkList',
      payload: { params: { pkListType: this.state.pkListType } },
      callback: (dataSource) => this.setState({ dataSource }),
    });
  }

  render() {
    const { pkListType, profitList, userMsg, userFlag } = this.state;
    return (
      <div className={styles.profitList}>
        <div className={styles.form}>
          选择对比小组：
          <BISelect
            value={pkListType}
            placeholder="请选择"
            onChange={this.onChangeParams}
            style={{width: '136px', marginLeft: '8px'}}
            allowClear
          >
            {pkTypeconfig.map((item, index) => <Option key={index} value={index + 1}>{item}</Option>)}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspension}>
            <BITable
            showHeader={false}
            columns={this.columns()}
            dataSource={[userMsg]}
            pagination={false}
            rowKey={record => record.userId}
            rowClassName={this.getRowClassName}
          />
          </div>}
          <div id='scroll'>
            <BITable
              columns={this.columns()}
              dataSource={profitList}
              pagination={false}
              loading={this.props.loading}
              rowKey={record => record.userId}
              onRow= {this.onClickRow}
              rowClassName={this.getRowClassName}
              scroll={{ x: 0, y: 420 }}
            />
          </div>
        </div>
      </div>

    );
  }
}

export default profitList;
