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
      dataSource : []
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
        this.props.changeSelected(record.familyId)
      },
    };
  }
  render() {
    const {orgOptions, collegeId, dataSource} = this.state
    return (
      <div className={styles.familyRight}>
        <div className={styles.creditSelect} >
          <span className={styles.title}>选择对比小组:</span>
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
          <BITable
            columns={this.columnsRight()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            scroll={{ y: 208 }}
            onRow={this.onClickRow}
            rowKey={record => record.groupId}
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default FamilyIncomeRight;
