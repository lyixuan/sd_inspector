import React from 'react';
import { connect } from 'dva';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
// import BIWrapperTable from '../../components/BIWrapperTable';
import BIScrollbarTable from '@/ant_components/BIScrollbarTable';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import styles from './style.less';

const { BI = {} } = window;
const { Option } = BISelect;
@connect(({ xdCreditPkModal, loading }) => ({
  globalLevelList: xdCreditPkModal.globalLevelList,
  loading: loading.effects['xdCreditPkModal/groupList'],
}))
class currentCreditRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // orgOptions: [{
      //   id: 1,
      //   name: '组织'
      // },{
      //   id: 2,
      //   name: '人均在服学员'
      // }],
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
      userMsg: '',
      groupList: [],
      eleScroll: '',
      ...this.getSearchParams()// 搜索参数初始化
    };
  }
  componentDidMount() {
    // 表格添加滚动事件
    const eleScroll = document.querySelector("#scroll1 .ant-table-body");
    this.setState({ eleScroll });
    if (eleScroll) {
      eleScroll.onscroll = (e) => {
        this.getScrollFn(e.target.scrollTop)
      }
    }
  }
  componentWillUnmount() {
    const { eleScroll } = this.state;
    if (eleScroll) { eleScroll.onscroll = ''; } 
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.dateRangeSelect) !== JSON.stringify(this.props.dateRangeSelect)) {
      this.getGroupList(nextProps.dateRangeSelect)
    }
  }
  // 获取存储参数
  getSearchParams = () => {
    const { orgValue, studentValue }= JSON.parse(localStorage.getItem(this.props.localKey)) || {};
    const data = {};
    if (orgValue === 1 && studentValue) { 
      // data.orgValue = orgValue;
      data.studentValue = studentValue; 
    } else {
      data.orgValue= 1;
      data.studentValue = 'college';
    }
    return data;
  }
  //获取对比小组的列表页
  getGroupList = ([startTime, endTime] = this.props.dateRangeSelect) => {
    // const paramsItem = this.state.orgValue === 1 ? 'groupType' : 'kpiLevelId';
    this.props.dispatch({
      type: 'xdCreditPkModal/groupList',
      payload: { params: { groupType:  this.state.studentValue, startTime, endTime} },
      callback: (groupList) => {
        this.setState({ groupList });
        const { eleScroll } = this.state;
        if (eleScroll) { eleScroll.scrollTop = 0;}
        this.getScrollFn();
      },
    })
  }
  getScrollFn = (scrollTop = 0) => {
    const { userFlag } = this.state;
    if (scrollTop === 0) {
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
        // width: '40%',
        title: '组织',
        dataIndex: 'groupName',
        key: 'groupName',
      }, 
      // {
      //   width: '20%',
      //   title: '排名系数',
      //   dataIndex: 'creditRankingCoefficient',
      //   key: 'creditRankingCoefficient',
      //   render: text => <BITextAlign textalign='left'>{text}</BITextAlign>
      // }, 
      {
        width: 120,
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
      setLocalValue({studentValue: value, orgValue: this.state.orgValue}, this.props.localKey)
      this.setState({studentValue: value}, () => this.getGroupList());
    }
  };
  setRowClassName = (record, index) => {
    // let className = ''
    let taClassName = ""
    if (record.myGroup) {
      this.state.userMsg = record;
      taClassName = "rowHover";
    }
    if (this.getIncludes(record.groupId)) {
      taClassName = 'rowSelect';
    }
    // if (record.creditRankingCoefficient === 3) {
    //   className = "background1 " + taClassName
    // } else if (record.creditRankingCoefficient === 2) {
    //   className = "background2 " + taClassName
    // } else if (record.creditRankingCoefficient === 1) {
    //   className = "background3 " + taClassName
    // } else if (record.creditRankingCoefficient === 0.8) {
    //   className = "background4 " + taClassName
    // } else {
    //   className = "background5 " + taClassName
    // }
    return taClassName
  }

  onClickRow = (record) => {
    return {
      onClick: () => {
        if (!record.myGroup) {
          this.props.clickRow(record.groupId);
          BI.traceV &&  BI.traceV({"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"})
        }
      },
    };
  }
  // 二级选择参数
  getStudentOptions = () => {
    // const { orgValue } = this.state;
    // if (orgValue === 1) {
      return this.state.orgSecondOptions;
    // } else if (orgValue === 2) {
    //   return this.props.globalLevelList
    // } else {
    //   return [];
    // }
  }
  render() {
    const { studentValue, userFlag, userMsg, groupList=[] } = this.state;
    const { handleAction } = this.props;
    return (
      <div className={styles.creditRight}>
        <div className={styles.creditSelect} >
          <div className={styles.title}>选择对比小组:</div>
          {/* <BISelect style={{ width: 138, marginLeft: 24}} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val, 'oneLevel')}>
            {orgOptions.map((item, index) => (
              <Option value={item.id} key={item.id} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
                {item.name}
              </Option>
            ))}
          </BISelect> */}
          <BISelect style={{ width: 188, marginLeft: 24 }} placeholder="请选择" value={studentValue} onChange={(val) => this.onFormChange(val, 'studentValue')} >
            {this.getStudentOptions().map(item => (
              <Option value={item.id} key={item.id} data-trace='{"widgetName":"本期学分-选择对比小组","traceName":"本期学分-选择对比小组"}'>
                {item.name}
              </Option>
            ))}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspension} >
            <BIScrollbarTable
              showHeader={false}
              columns={this.columnsRight()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.groupId}
              rowClassName={this.setRowClassName}
            />
          </div>}
          <div id="scroll1">
            <BIScrollbarTable
              columns={this.columnsRight()}
              dataSource={groupList}
              pagination={false}
              loading={this.props.loading}
              rowClassName={this.setRowClassName}
              onRow={this.onClickRow}
              scroll={{ y: 470 }}
              rowKey={(record, index) => record.groupId + '' + index}
            />
          </div>
        </div>
        <div className={styles.actionBtn}>
          <BIButton onClick={() => handleAction([])}  loading={this.props.dimenloading} type="reset" style={{marginRight: '8px'}}>清空</BIButton>
          <BIButton onClick={() => handleAction(false)} loading={this.props.dimenloading}  type="primary">确定</BIButton>
        </div> 
      </div>
    );
  }
}

export default currentCreditRight;
