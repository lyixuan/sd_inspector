import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BIWrapperTable from '../../../components/BIWrapperTable';
import styles from '../style.less';

const { BI = {} } = window;
const { Option } = BISelect;
const pkTypeconfig = ['集团排行', '学院内排行', '家族内排行', '同期入职排行', '同级排行',];
@connect(({ loading }) => ({
  loading: loading.effects['xdClsssModal/getIncomeKpiPkList'],
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
      this.getScrollFn(e.target.scrollTop);
    }
  }
  componentWillUnmount() {
    document.querySelector("#scroll .ant-table-body").onscroll = '';
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if ((scrollTop > userLocation && scrollTop < userLocation + 400) || scrollTop === 0) {
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
    const total = this.state.profitList && this.state.profitList[0] ? this.state.profitList[0].totalKpi : 0
    const columns = [
      {
        width: '16%',
        title: '排名',
        dataIndex: 'sort',
        key: 'sort',

      }, {
        width: '40%',
        title: '组织',
        dataIndex: 'orgName',
        key: 'orgName',
      }, {
        width: '20%',
        title: '老师姓名',
        dataIndex: 'personName',
        key: 'personName',
      }, {
        title: '绩效收入（元）',
        dataIndex: 'totalKpi',
        key: 'totalKpi',
        render: (text, record) => {
          const percent = text / total * 100 + '%';
          return <BIWrapperProgress text={text} percent={percent} iconed={this.getIncludes(record.personId)} propsStyle={{flex: 'inherit',width: '60px'}}/>
        }
      }
    ];
    return columns || [];
  };
  onClickRow = (record, index) => {
    return {
      onClick: () => {
        if (this.props.userId === record.personId) return;
        this.props.changeSelected(record.personId);
        BI.traceV &&  BI.traceV({"widgetName":"本期创收-创收pk","traceName":"小德工作台/本期创收/创收pk"})
      },
    };
  }
  getRowClassName = (record, index) => {
    if (this.props.userId === record.personId) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 430;
      return styles.pkMine;
    };
    if (this.getIncludes(record.personId)) return styles.pkUser;
  }
  getIncludes = (id) => {
    return this.props.pkUsers && this.props.pkUsers.includes(id);
  }
  onChangeParams = (v) => {
    this.getData(v);
    document.querySelector("#scroll .ant-table-body").scrollTop = 0;
    this.props.changePkListType(v);
  }
  getData = (pkListType = this.props.pkListType) => {
    this.props.dispatch({
      type: 'xdClsssModal/getIncomeKpiPkList',
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
            <BIWrapperTable
              showHeader={false}
              columns={this.columns()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.personId}
              rowClassName={this.getRowClassName}
              scroll={{ y: 40 }}
            />
          </div>}
          <div id='scroll' className={`${yScrollFlag ? styles.scrollTable : ''} ${userFlag && userMsg ? styles.scrollMineTable : ''}`}>
            <BIWrapperTable
              columns={this.columns()}
              dataSource={profitList}
              pagination={false}
              loading={this.props.loading}
              rowKey={(record, index) => record.personId + '' + index}
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
