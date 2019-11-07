import React from 'react';
import { connect } from 'dva';
import { getSubtract } from '@/pages/indexPage/components/utils/utils';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const { BI = {} } = window;
const { Option } = BISelect;
const initShowKey = {
  columnOrgName: 'groupName',
  mineFlag: 'myGroup',
  pkValue: 'groupId',
}
@connect(({ xdFamilyModal, xdWorkModal }) => ({
  orgOptions: xdFamilyModal.orgOptions,
  orgSecondOptions: xdFamilyModal.orgSecondOptions,
  globalLevelList: xdWorkModal.globalLevelList,
  globalCollegeList: xdWorkModal.globalCollegeList,
}))
class currentCreditRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userFlag: false,
      userLocation: '',
      userMsg: '',
      groupList: [],
      ...this.getSearchParams()// 搜索参数初始化
    };
  }
  componentDidMount() {
    this.getGroupList();
    // 表格添加滚动事件
    const ele = document.querySelector("#scroll1 .ant-table-body");
    if (ele) {
      ele.onscroll = (e) => {
        this.getScrollFn(e.target.scrollTop)
      }
    }
  }
  componentWillUnmount() {
    const ele = document.querySelector("#scroll1 .ant-table-body");
    if (ele) { ele.onscroll = ''; } 
  }
  // getShowKe
  getShowKey = (key) => {
    const { showKey = {} } = this.props;
    if (showKey[key]) {
      return showKey[key]
    } else {
      return initShowKey[key];
    }
  }
  // 获取存储参数
  getSearchParams = () => {
    const { orgValue, studentValue, collegeId }= JSON.parse(localStorage.getItem(this.props.localKey)) || {};
    const data = {};
    if (orgValue && studentValue) { 
      data.orgValue = orgValue;
      data.studentValue = studentValue; 
    } else {
      data.orgValue= 1;
      data.studentValue = 'college';
    }
    if (collegeId === 'undefined') {
      data.collegeId = undefined;
    } else {
      data.collegeId = collegeId || '103';
    }
    return data;
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if ((scrollTop > userLocation && scrollTop < userLocation + getSubtract(this.props.hasData, 600)) || scrollTop === 0) {
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
  // 列表数据
  getGroupList = () => {
    const { orgValue, studentValue, collegeId } = this.state;
    this.props.getGroupList({
      orgValue, 
      studentValue,
      collegeId,
    }, this.handleCallBack);
  }
  handleCallBack = groupList => {
    this.setState({ groupList })
    const ele = document.querySelector("#scroll .ant-table-body");
    if (ele) {  ele.scrollTop = 0; }
    this.getScrollFn();
  }

  columnsRight = () => {
    const total = this.state.groupList && this.state.groupList[0] ? this.state.groupList[0].credit : 0;
    const orgName = this.getShowKey('columnOrgName');
    const columns = [
      {
        width: '16%',
        title: '排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
      }, {
        width: '40%',
        title: '组织',
        dataIndex: orgName,
        key: orgName,
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
          return <BIWrapperProgress text={credit} percent={percent} iconed={this.getIncludes(record[this.getShowKey('pkValue')])} propsStyle={{flex: 'inherit',width: '60px'}}/>
        },
      },
    ]
    return columns || [];
  }
  getIncludes = (id) => {
    return this.props.pkUsers && this.props.pkUsers.includes(id);
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
    } else if (vname === 'collegeId') {
      setLocalValue({collegeId: value === undefined ? 'undefined' : value}, this.props.localKey)
      this.setState({collegeId: value}, () => this.getGroupList());
    }
  };
  setRowClassName = (record, index) => {
    let className = ''
    let taClassName = ""
    if (record[this.getShowKey('mineFlag')]) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - getSubtract(this.props.hasData, 580);
      taClassName = "rowHover";
    }
    if (this.getIncludes(this.getShowKey('pkValue'))) {
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
        if (!record[this.getShowKey('mineFlag')]) {
          this.props.clickRow(record[this.getShowKey('pkValue')]);
          const pkName = this.getShowKey('pkValue') === 'groupId' ? '小组' : '家族';
          BI.traceV &&  BI.traceV({"widgetName": `学分-${pkName}学分pk`,"traceName": `家族长工作台/学分-${pkName}学分pk`})
        }
      },
    };
  }
  // 二级选择参数
  getStudentOptions = () => {
    const { orgValue } = this.state;
    if (orgValue === 1) {
      return this.props.orgSecondOptions;
    } else if (orgValue === 2) {
      return this.props.globalLevelList;
    } else {
      return [];
    }
  }
  render() {
    const { orgValue, studentValue, collegeId, userFlag, userMsg, groupList=[] } = this.state;
    const { orgOptions, hasData, handleAction=function(){}, showKey={}, globalCollegeList } = this.props;
    const pkValue = this.getShowKey('pkValue');
    return (
      <div className={styles.creditRight}>
        <div className={styles.creditSelect} >
          <span className={styles.title}>{showKey.serachName}:</span>
          {
              pkValue === 'groupId' ? <>
                <BISelect style={{ width: 138, marginLeft: 24}} placeholder="请选择" value={orgValue} onChange={(val) => this.onFormChange(val, 'oneLevel')}>
                  {orgOptions.map((item, index) => (
                    <Option value={item.id} key={item.id} data-trace='{"widgetName":"学分-选择对比小组","traceName":"家族长工作台/学分-选择对比小组"}'>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
                <BISelect style={{ width: 188, marginLeft: 12 }} placeholder="请选择" value={studentValue} onChange={(val) => this.onFormChange(val, 'studentValue')} >
                  {this.getStudentOptions().map(item => (
                    <Option value={item.id} key={item.id} data-trace='{"widgetName":"学分-选择对比小组","traceName":"家族长工作台/学分-选择对比小组"}'>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </> : <BISelect style={{ width: 138, marginLeft: 24 }} placeholder="全部" value={collegeId} onChange={(val) => this.onFormChange(val, 'collegeId')} allowClear>
              {
                globalCollegeList.map(item => (
                  <Option key={item.collegeId} data-trace='{"widgetName":"学分-选择家族学分对比组织","traceName":"家族长工作台/选择家族学分对比组织"}'>
                    {item.collegeName}
                  </Option>
                ))
              }
            </BISelect>
          }
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspension} >
            <BIWrapperTable
              showHeader={false}
              columns={this.columnsRight()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={(record, index) => index}
              rowClassName={this.setRowClassName}
              scroll={{ y: 40 }}
            />
          </div>}
          <div id="scroll1">
            <BIWrapperTable
              columns={this.columnsRight()}
              dataSource={groupList}
              pagination={false}
              loading={this.props.drawerloading}
              rowClassName={this.setRowClassName}
              onRow={this.onClickRow}
              scroll={{ y: getSubtract(hasData, 600) }}
              rowKey={record => record[pkValue]}
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
