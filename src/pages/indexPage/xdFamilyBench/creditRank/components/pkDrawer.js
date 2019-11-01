import React from 'react';
import { connect } from 'dva';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BISelect from '@/ant_components/BISelect';
import { setLocalValue } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const { BI = {} } = window;
const { Option } = BISelect;
@connect(({ xdFamilyModal, xdWorkModal, loading }) => ({
  orgOptions: xdFamilyModal.orgOptions,
  orgSecondOptions: xdFamilyModal.orgSecondOptions,
  globalLevelList: xdWorkModal.globalLevelList,
  loading: loading.effects['xdFamilyModal/getFamilyRankList'],
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
  // 获取存储参数
  getSearchParams = () => {
    const { orgValue, studentValue }= JSON.parse(localStorage.getItem(this.props.localKey)) || {};
    if (orgValue && studentValue) { 
      return { orgValue, studentValue }  // 搜索参数初始化
    } else {
      return { orgValue: 1, studentValue: 'college'}
    }
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
  getGroupList = () => {
    this.props.getGroupList(this.state.orgValue, this.handleCallBack);
  }
  handleCallBack = groupList => {
    this.setState({ groupList })
    document.querySelector("#scroll .ant-table-body").scrollTop = 0;
    const ele = document.querySelector("#scroll .ant-table-body");
    if (ele) {  ele.scrollTop = 0; }
    this.getScrollFn();
  }

  columnsRight = () => {
    const total = this.state.groupList && this.state.groupList[0] ? this.state.groupList[0].credit : 0;
    const { columnOrgName='familyName'} = this.props;
    const columns = [
      {
        width: '16%',
        title: '排名',
        dataIndex: 'creditRanking',
        key: 'creditRanking',
      }, {
        width: '40%',
        title: '组织',
        dataIndex: columnOrgName,
        key: columnOrgName,
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
          return <BIWrapperProgress text={credit} percent={percent} iconed={this.getIncludes(record[this.props.pkValue])} propsStyle={{flex: 'inherit',width: '60px'}}/>
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
      setLocalValue({studentValue:value, orgValue: this.state.orgValue}, this.props.localKey)
      this.setState({studentValue: value}, this.getGroupList());
    }
  };
  setRowClassName = (record, index) => {
    let className = ''
    let taClassName = ""
    if (record[this.props.mineFlag]) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - this.props.getNumValue(580);
      taClassName = "rowHover";
    }
    if (this.getIncludes(record[this.props.pkValue])) {
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
        if (!record[this.props.mineFlag]) {
          this.props.clickRow(record[this.props.pkValue]);
          BI.traceV &&  BI.traceV({"widgetName":"本期学分-学分pk","traceName":"本期学分-学分pk"})
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
    const { orgValue, studentValue, userFlag, userMsg, groupList } = this.state;
    const { orgOptions } = this.props;
    const dataSource = groupList ? groupList : []
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
              rowKey={(record, index) => index}
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
              rowKey={record => record.key}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default currentCreditRight;
