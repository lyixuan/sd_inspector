import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BISelect from '@/ant_components/BISelect'
import BITable from '@/ant_components/BITable'
import Indent from '../../../components/indent';
const { Option } = BISelect;
@connect(({ loading } ) => ({
  loading: loading.effects['xdWorkModal/getFamilyList'],
}))
class FamilyIncomeRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orgOptions: [],
      collegeId: undefined,
      dataSource : [],
      userFlag: false,
      userLocation: '',
      userMsg: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeCollegeList',
      callback: orgOptions => {
        this.setState({ orgOptions });
      },
    });
    this.getFamilyList();
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
    if (scrollTop > userLocation && scrollTop < userLocation + 208) {
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
  getFamilyList = (collegeId) =>  {
    this.props.dispatch({
      type: 'xdWorkModal/getFamilyList',
      payload: { params: { collegeId } },
      callback: dataSource => {
        this.setState({ dataSource });
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
            <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{text}</div>
          )
        }
      }, {
        width: '35%',
        title: '组织',
        dataIndex: 'familyName',
        key: 'familyName',
        render: text => {
          return (
            <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{text}</div>
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
              <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{text}</div>
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
              <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{text}</div>
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
    return {
      onClick: () => {
        this.props.changeSelected(record,record.familyId)
      },
    };
  }
  setRowClassName = (record, index) => {
    const {familyList}=this.props
    let className = ''
    if (record.familyId == familyList.selfFamilyId) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 208;
      className = "rowHover"
    }
    return className
  }
  render() {
    const {orgOptions, collegeId, dataSource,userFlag, userMsg,} = this.state
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
              <Option key={item.collegeId} value={item.collegeId} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
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
            <div id="scroll" >
              <BITable
                columns={this.columnsRight()}
                dataSource={dataSource}
                pagination={false}
                loading={this.props.loading}
                scroll={{ y: 208 }}
                onRow={this.onClickRow}
                rowKey={record => record.familyId}
              >
              </BITable>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default FamilyIncomeRight;
