import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BISelect from '@/ant_components/BISelect'
import BITable from '@/ant_components/BITable'
import Indent from '../../../components/indent';
import BILoading from '@/components/BILoading'
const { Option } = BISelect;
@connect(({ loading } ) => ({
  loading: loading.effects['xdFamilyModal/getFamilyList'],
}))
class FamilyIncomeRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orgOptions: [],
      collegeId: undefined,
      dataSource: [],
      userFlag: false,
      userLocation: '',
      userMsg: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdFamilyModal/getIncomeCollegeList',
      callback: orgOptions => {
        this.setState({ orgOptions });
      },
    });
    this.getFamilyList();
    
    if (document.querySelector("#scrollIncome .ant-table-body")) {
      // 表格添加滚动事件
      document.querySelector("#scrollIncome .ant-table-body").onscroll = (e) => {
        this.getScrollFn(e.target.scrollTop)
      }
    }
  }
  componentWillUnmount() {
    if (document.querySelector("#scrollIncome .ant-table-body")) {
      document.querySelector("#scrollIncome .ant-table-body").onscroll = '';
    }
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 168) {
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
  getFamilyList = (collegeId) => {
    this.props.dispatch({
      type: 'xdFamilyModal/getFamilyList',
      payload: { params: { collegeId } },
      callback: dataSource => {
        this.setState({ dataSource });
        this.getScrollFn();
      },
    });
  }
  columnsRight = () => {
    const columns = [
      {
        width: '15%',
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
        render: text => {
          return (
            <div>{text}</div>
          )
        }
      }, {
        width: '35%',
        title: '组织',
        dataIndex: 'familyName',
        key: 'familyName',
        render: text => {
          return (
            <div>{text}</div>
          )
        }
      }, {
        width: '20%',
        title: '创收绩效',
        dataIndex: 'incomeKpi',
        key: 'incomeKpi',
        render: text => {
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div>{text}</div>
            </Indent>
          )
        }
      },
      {
        title: '人均绩效在服学员',
        dataIndex: 'stuAvg',
        key: 'stuAvg',
        // width:'25%',
        render: text => {
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div>{text}</div>
            </Indent>
          )
        }
      }
    ]
    return columns || [];
  }
  onFormChange = (collegeId) => {
    this.setState({ collegeId });
    this.getFamilyList(collegeId);
  };
  onClickRow = (record) => {
    const obj = { widgetName: '创收组织选择', traceName: '家族长工作台/创收组织选择' };
    const { BI = {} } = window;
    return {
      onClick: () => {
        this.props.changeSelected(record, record.familyId)
        BI.traceV && BI.traceV(obj);
      },
    };
  }
  setRowClassName = (record, index) => {
    const { familyList } = this.props
    let className = ''
    if (record.familyId == familyList.selfFamilyId) {

      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 208;
      className = "rowHover"
    }
    return className
  }
  render() {
    const { orgOptions, collegeId, dataSource, userFlag, userMsg, } = this.state
    return (
      <div className={styles.familyRight}>
        <div className={styles.creditSelect} >
          <span className={styles.title}>选择对比组织:</span>
          <BISelect
            style={{ width: 136, marginLeft: 12 }}
            placeholder="全部"
            value={collegeId}
            onChange={this.onFormChange}
            allowClear
          >
            {orgOptions.map(item => (
              <Option data-trace='{"widgetName":"选择创收对比组织","traceName":"家族长工作台/选择创收对比组织"}' key={item.collegeId} value={item.collegeId}>
                {item.collegeName}
              </Option>
            ))}
          </BISelect>
        </div>
        <div>
          <div className={styles.tableContent}>
            {userFlag && userMsg && <div className={styles.suspension} >
              <BITable
                showHeader={false}
                columns={this.columnsRight()}
                dataSource={[userMsg]}
                pagination={false}
                rowKey={record => record.familyId}
                rowClassName={this.setRowClassName}
              />
            </div>}
            <div id="scrollIncome" >
              {this.props.loading?<BILoading isLoading={this.props.loading} />:<BITable
                columns={this.columnsRight()}
                dataSource={dataSource}
                pagination={false}
                loading={this.props.loading}
                scroll={{ y: 408 }}
                onRow={this.onClickRow}
                rowKey={record => record.familyId}
                rowClassName={this.setRowClassName}
              />}

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default FamilyIncomeRight;
