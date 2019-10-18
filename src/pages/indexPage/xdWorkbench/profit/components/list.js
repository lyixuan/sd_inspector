import React from 'react';
import { connect } from 'dva';
import { Progress } from 'antd';
import BITable from '@/ant_components/BITable';
import BISelect from '@/ant_components/BISelect';
import Indent from '../../../components/indent';
import styles from '../style.less';

const { Option } = BISelect;
const pkTypeconfig = ['集团排行', '学院内排行', '家族内排行', '同期入职排行', '同级排行',];
@connect(({ loading }) => ({
  loading: loading.effects['xdWorkModal/getIncomeKpiPkList'],
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profitList: [],
      userMsg: '',
      userFlag: false,
      userLocation: ''
    }
  }
  componentDidMount() {
    this.getData();
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
    } else if (userFlag === false) {
      this.setState({
        userFlag: true
      })
    }
  }
  columns = () => {
    const total = this.state.profitList && this.state.profitList[0] ? this.state.profitList[0].incomeKpi : 0
    const columns = [
      {
        width: '10%',
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',
        render: text => <div data-trace='{"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"}'>{text}</div>
      }, {
        width: '50%',
        title: '组织',
        dataIndex: 'org',
        key: 'org',
        render: text => <div data-trace='{"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"}'>{text}</div>
      }, {
        width: '20%',
        title: '班主任',
        dataIndex: 'userName',
        key: 'userName',
        render: text => <Indent data-trace='{"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"}'>{text}</Indent>
      }, {
        title: '绩效收入',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: text => {
          const percent = text / total * 100;
          return <Indent
            style={{
              cursor: 'pointer',
              height: '24px',
              marginLeft: '-8px'
            }}
            data-trace='{"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"}'
          >
            <span style={{ position: 'relative', top: '-2px' }}>{text}</span>
            <Progress
              percent={percent}
              strokeColor={'#00CCC3'}
              showInfo={false}
              strokeWidth={4}
            ></Progress>
          </Indent>
        }
      }
    ];
    return columns || [];
  };
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (this.props.userId === record.userId) return;
        this.props.changeSelected(record.userId)
      },
    };
  }
  getRowClassName = (record, index) => {
    if (this.props.userId === record.userId) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 430;
      return styles.pkUser;
    };
  }
  onChangeParams = (v) => {
    this.getData(v);
    document.querySelector("#scroll .ant-table-body").scrollTop = 0;
    this.props.changePkListType(v);
  }
  getData = (pkListType = this.props.pkListType) => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeKpiPkList',
      payload: { params: { pkListType } },
      callback: (profitList) => {
        this.setState({ profitList })
        this.getScrollFn();
      },
    });
  }

  render() {
    const { profitList, userMsg, userFlag } = this.state;
    const yScrollFlag = profitList && profitList.length > 0;
    return (
      <div className={styles.profitList}>
        <div className={styles.form}>
          选择对比小组：
          <BISelect
            value={this.props.pkListType}
            placeholder="请选择"
            onChange={this.onChangeParams}
            style={{ width: '136px', marginLeft: '8px' }}
            allowClear
          >
            {pkTypeconfig.map((item, index) => <Option key={index} value={index + 1} data-trace='{"widgetName":"本期创收-选择对比小组","traceName":"小德工作台/本期创收/选择对比小组"}'>{item}</Option>)}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspenTable}>
            <BITable
              showHeader={false}
              columns={this.columns()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.userId}
              rowClassName={this.getRowClassName}
            />
          </div>}
          <div id='scroll' className={`${yScrollFlag ? styles.scrollTable : ''} ${userFlag && userMsg ? styles.scrollMineTable : ''}`}>
            <BITable
              columns={this.columns()}
              dataSource={profitList}
              pagination={false}
              loading={this.props.loading}
              rowKey={(record, index) => record.userId + '' + index}
              onRow={this.onClickRow}
              rowClassName={this.getRowClassName}
              scroll={{ y: 410 }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfitList;
