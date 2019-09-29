import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BISelect from '@/ant_components/BISelect'
import BITable from '@/ant_components/BITable'
import Indent from '../../../components/indent';
const { Option } = BISelect;
@connect((xdWorkModal) => ({
  xdWorkModal,
}))

class FamilyIncomeRight extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orgOptions: [{
        id: 1,
        name: '组织'
      }, {
        id: 2,
        name: '人均在服学员'
      }],
      orgValue: '组织',
      dataSource : [{
        averageStudentNumber: 520,
        collegeId: 100,
        credit: "16.84",
        creditRanking: 1,
        incomeNum: 4000,
        familyId: 171,
        groupId: 73,
        groupName: "自变量/汉语言专科5组",
        myGroup: false
      },{
        averageStudentNumber: 1740,
        collegeId: 100,
        credit: "15.53",
        creditRanking: 2,
        incomeNum: 5999,
        familyId: 200,
        groupId: 65,
        groupName: "自变量/学前教育2组",
        myGroup: false
      },{
        averageStudentNumber: 1703,
        collegeId: 100,
        credit: "13.08",
        creditRanking: 3,
        incomeNum: 2999,
        familyId: 200,
        groupId: 66,
        groupName: "自变量/学前教育3组",
        myGroup: false
      },{
        averageStudentNumber: 1703,
        collegeId: 100,
        credit: "13.08",
        creditRanking: 4,
        incomeNum: 5999,
        familyId: 200,
        groupId: 67,
        groupName: "自变量/学前教育3组",
        myGroup: false
      },{
        averageStudentNumber: 1703,
        collegeId: 100,
        credit: "13.08",
        creditRanking: 5,
        incomeNum: 2999,
        familyId: 200,
        groupId: 68,
        groupName: "自变量/学前教育3组",
        myGroup: false
      }]
    }
  }
  componentDidMount() {

  }
  columnsRight = () => {
    const total = this.state.groupList && this.state.groupList[0] ? this.state.groupList[0].credit : 0
    const columns = [
      {
        width: '10%',
        title: '排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
        render: (creditRanking) => {
          return (
            <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{creditRanking}</div>
          )
        }
      }, {
        width: '40%',
        title: '组织',
        dataIndex: 'groupName',
        key: 'groupName',
        render: (groupName) => {
          return (
            <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{groupName}</div>
          )
        }
      }, {
        width: '25%',
        title: '创收绩效',
        dataIndex: 'incomeNum',
        key: 'incomeNum',
        render: (incomeNum) => {
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{incomeNum}</div>
            </Indent>
          )
        }
      },
      {
        title: '人均绩效在服学员',
        dataIndex: 'averageStudentNumber',
        key: 'averageStudentNumber',
        width:'25%',
        render: (averageStudentNumber) => {
          return (
            <Indent style={{
              marginLeft: '-8px'
            }}>
              <div data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>{averageStudentNumber}</div>
            </Indent>
          )
        }
      }
    ]
    return columns || [];
  }
  onFormChange = (value, vname) => {
    this.setState({
      orgValue: value
    })
      // document.querySelector("#scroll .ant-table-body").scrollTop = 0;
  };
  setRowClassName = (record, index) => {
    return "background1"
  }
  render() {
    const {orgOptions,orgValue,dataSource} = this.state
    return (
      <div className={styles.familyRight}>
        <div className={styles.creditSelect} >
          <span className={styles.title}>选择对比小组:</span>
          <BISelect style={{ width: 136, marginLeft: 12 }} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val)}>
            {orgOptions.map((item, index) => (
              <Option key={item.id} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
                {item.name}
              </Option>
            ))}
          </BISelect>
        </div>
        <div id="scroll1" data-trace='{"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"}'>
          <BITable
            columns={this.columnsRight()}
            dataSource={dataSource}
            pagination={false}
            loading={this.props.loading}
            rowClassName={this.setRowClassName}
            onRow={this.onClickRow}
            scroll={{ y: 408 }}
            rowKey={record => record.groupId}
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default FamilyIncomeRight;
