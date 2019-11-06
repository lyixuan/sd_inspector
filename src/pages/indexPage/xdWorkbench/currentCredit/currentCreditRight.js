import React from 'react';
import { connect } from 'dva';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIWrapperTable from '../../components/BIWrapperTable';
import BISelect from '@/ant_components/BISelect';
import styles from './style.less';

const { BI = {} } = window;
const { Option } = BISelect;
@connect(({ xdClsssModal, loading }) => ({
  xdClsssModal,
  studentsOptions: xdClsssModal.kpiLevelList || [],
  loading: loading.effects['xdClsssModal/kpiLevelList'],
}))
class currentCreditRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgOptions: [{
        id: 1,
        name: '组织'
      }, {
        id: 2,
        name: '人均在服学员'
      }],
      orgSecondOptions: [{
        id: 'group',
        name: '集团'
      }, {
        id: 'college',
        name: '本学院'
      }, {
        id: 'family',
        name: '本家族'
      }], 
      userFlag: false,
      userLocation: '',
      userMsg: '',
      groupList: [],
      ...this.getSearchParams()// 搜索参数初始化
    };
  }
  componentDidMount() {
    this.getKpiLevelList()
    this.getGroupList()
    // 表格添加滚动事件
    document.querySelector("#scroll1 .ant-table-body").onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
  }
  componentWillUnmount() {
    document.querySelector("#scroll1 .ant-table-body").onscroll = '';
  }
  // 获取存储参数
  getSearchParams = () => {
    const local = localStorage.getItem('creditSearchParams');
    const params = local ? JSON.parse(local) : {};
    if (params.orgValue && params.studentValue) { 
      return { orgValue: params.orgValue, studentValue: params.studentValue,}  // 搜索参数初始化
    } else {
      return { orgValue: 1, studentValue: 'college'}
    }
  }
  //获取人均在服学员的下来数据方法
  getKpiLevelList = () => {
    this.props.dispatch({
      type: 'xdClsssModal/kpiLevelList',
      payload: { params: {} },
    });
  }
  //获取对比小组的列表页
  getGroupList = () => {
    const paramsItem = this.state.orgValue === 1 ? 'groupType' : 'kpiLevelId';
    this.props.dispatch({
      type: 'xdClsssModal/groupList',
      payload: { params: { [paramsItem]:  this.state.studentValue} },
      callback: (groupList) => {
        this.setState({ groupList })
        this.getScrollFn();
      },
    })
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if ((scrollTop > userLocation && scrollTop < userLocation + this.props.getNumValue(600)) || scrollTop === 0) {
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

  columnsRight = () => {
    const total = this.state.groupList && this.state.groupList[0] ? this.state.groupList[0].credit : 0
    const columns = [
      {
        width: '16%',
        title: '排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
      }, {
        width: '40%',
        title: '组织',
        dataIndex: 'groupName',
        key: 'groupName',
      }, {
        width: '20%',
        title: '排名系数',
        dataIndex: 'creditRankingCoefficient',
        key: 'creditRankingCoefficient',
        render: text => <BITextAlign>{text}</BITextAlign>
      }, {
        title: '学分',
        dataIndex: 'credit',
        key: 'credit',
        render: (credit, record) => {
          const percent = credit / total * 100 + '%';
          return <BIWrapperProgress text={credit} percent={percent} iconed={this.getIncludes(record.groupId)} propsStyle={{flex: 'inherit',width: '60px'}}/>
        },
      },
    ]
    return columns || [];
  }
  getIncludes = (id) => {
    return this.props.pkGroupList && this.props.pkGroupList.includes(id);
  }
  onFormChange = (value, vname) => {
    if (vname === 'oneLevel') {
      this.setState({
        orgValue: value,   
        studentValue: undefined
      })
    } else if (vname === 'studentValue') {
      localStorage.setItem('creditSearchParams', JSON.stringify({studentValue:value, orgValue: this.state.orgValue}));
      this.setState({studentValue: value});
      setTimeout(() => {
        this.getGroupList()
      }, 200)
      document.querySelector("#scroll .ant-table-body").scrollTop = 0;
    } else { }
  };
  setRowClassName = (record, index) => {
    let className = ''
    let taClassName = ""
    if (record.isMyGroup) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - this.props.getNumValue(580);
      taClassName = "rowHover";
    }
    if (this.getIncludes(record.groupId)) {
      taClassName = 'rowSelect';
    }
    if (record.creditRankingCoefficient === 3) {
      className = "background1 " + taClassName
    } else if (record.creditRankingCoefficient === 2) {
      className = "background2 " + taClassName
    } else if (record.creditRankingCoefficient === 1) {
      className = "background3 " + taClassName
    } else if (record.creditRankingCoefficient === 0.8) {
      className = "background4 " + taClassName
    } else {
      className = "background5 " + taClassName
    }
    return className
  }

  onClickRow = (record) => {
    return {
      onClick: () => {
        if (!record.isMyGroup) {
          this.props.clickRow(record.groupId);
          BI.traceV &&  BI.traceV({"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"})
        }
      },
    };
  }
  // 初始化tabale 列数据
  fillDataSource = val => {
    const data = [];
    val.map((item, index) =>
      data.push({
        key: index + 1,
        averageStudentNumber: item.averageStudentNumber,
        collegeId: item.collegeId,
        groupName: item.groupName,
        credit: item.credit,
        familyId: item.familyId,
        groupId: item.groupId,
        creditRankingCoefficient: item.creditRankingCoefficient,
        creditRanking: item.creditRanking,
        isMyGroup: item.myGroup,
      })
    );
    return data;
  };
  // 二级选择参数
  getStudentOptions = () => {
    const { orgValue } = this.state;
    if (orgValue === 1) {
      return this.state.orgSecondOptions;
    } else if (orgValue === 2) {
      return this.props.studentsOptions
    } else {
      return [];
    }
  }
  render() {
    const { orgOptions, orgValue, studentValue, userFlag, userMsg, groupList } = this.state;
    const dataSource = groupList ? this.fillDataSource(groupList) : []
    return (
      <div className={styles.creditRight}>
        <div className={styles.creditSelect} >
          <span className={styles.title}>选择对比小组:</span>
          <BISelect style={{ width: 138}} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val, 'oneLevel')}>
            {orgOptions.map((item, index) => (
              <Option value={item.id} key={item.id} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
                {item.name}
              </Option>
            ))}
          </BISelect>
          <BISelect style={{ width: 188, marginLeft: 12 }} placeholder="请选择" value={studentValue} onChange={(val) => this.onFormChange(val, 'studentValue')} >
            {this.getStudentOptions().map(item => (
              <Option value={item.id} key={item.id} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
                {item.name}
              </Option>
            ))}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspension} >
            <BIWrapperTable
              showHeader={false}
              columns={this.columnsRight()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.groupId}
              rowClassName={this.setRowClassName}
              scroll={{ y: 40 }}
            />
          </div>}
          <div id="scroll1">
            <BIWrapperTable
              columns={this.columnsRight()}
              dataSource={dataSource}
              pagination={false}
              loading={this.props.loading}
              rowClassName={this.setRowClassName}
              onRow={this.onClickRow}
              scroll={{ y: this.props.getNumValue(600) }}
              rowKey={record => record.groupId}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default currentCreditRight;
