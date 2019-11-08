import React from 'react';
import { connect } from 'dva';
import { setLocalValue, thousandsFormatAll } from '@/pages/indexPage/components/utils/utils';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import BITextAlign from '@/pages/indexPage/components/BITextAlign';
import BIWrapperTable from '../../../components/BIWrapperTable';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import checkIcon from '@/assets/component/checkicon.png';
import styles from './style.less';

const { Option } = BISelect;
@connect(({ xdWorkModal, loading }) => ({
  globalCollegeList: xdWorkModal.globalCollegeList,
}))
class ProfitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMsg: '',
      userFlag: false,
      ...this.getSearchParams()// 搜索参数初始化
    }
  }
  componentDidMount() {
    this.getDrawerList();
    // 表格添加滚动事件
    if (document.querySelector("#scroll .ant-table-body")) {
      document.querySelector("#scroll .ant-table-body").onscroll = (e) => {
        this.getScrollFn(e.target.scrollTop);
      }
    }
  }
  componentWillUnmount() {
    if (document.querySelector("#scroll .ant-table-body")) {
      document.querySelector("#scroll .ant-table-body").onscroll = '';
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
  // 滚动
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
  // getShowKe
  getShowKey = (key) => {
    const { showKey = {} } = this.props;
    if (showKey[key]) {
      return showKey[key]
    }
    return ''
  }
  columns = () => {
    const { drawerList } = this.props;
    const total = drawerList && drawerList[0] ? drawerList[0].kpiFlow : 0;
    const columns = [
      {
        width: '14%',
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
      }, {
        width: '30%',
        title: '组织',
        dataIndex: 'orgName',
        key: 'orgName',
      }, {
        width: '20%',
        title: '创收绩效',
        dataIndex: 'kpiFlow',
        key: 'kpiFlow',
        render: text => {
          const percent = (total ? text / total * 100 : 0) + '%';
          return <BIWrapperProgress text={thousandsFormatAll(text)} percent={percent}/>
        }
      }, {
        title: '人均绩效在服学院',
        dataIndex: 'stuAvg',
        key: 'stuAvg',
        render: (text, record) => <BITextAlign>{text}</BITextAlign>
      }, {
        width: 40,
        title: '',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => <>{this.getIncludes(record.orgId) ? <img style={{width: 14, height: 14}} src={checkIcon} alt='icon'/> : ''}</>
      }
    ];
    return columns || [];
  };
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (record[this.getShowKey('mineFlag')]) return;
        this.props.changeSelected(record.orgId);
      },
    };
  }
  getRowClassName = (record, index) => {
    if (record[this.getShowKey('mineFlag')]) {
      this.state.userMsg = record;
      return styles.pkMine;
    };
    if (this.getIncludes(record.orgId)) return styles.pkUser;
  }
  getIncludes = (id) => {
    return this.props.pkUsers && this.props.pkUsers.includes(id);
  }
  onChangeParams = (value, vname) => {
    if (vname === 'oneLevel') {
      this.setState({
        orgValue: value,   
        studentValue: undefined
      })
    } else if (vname === 'studentValue') {
      setLocalValue({studentValue: value, orgValue: this.state.orgValue}, this.props.localKey)
      this.setState({studentValue: value}, () => this.getDrawerList());
    } else if (vname === 'collegeId') {
      setLocalValue({collegeId: value === undefined ? 'undefined' : value}, this.props.localKey)
      this.setState({collegeId: value}, () => this.getDrawerList());
    }
  };
  // 列表数据
  getDrawerList = () => {
    const { orgValue, studentValue, collegeId } = this.state;
    this.props.getDrawerList({
      orgValue, 
      studentValue,
      collegeId,
    }, this.getScrollFn);
  }
  render() {
    const { userMsg, userFlag, collegeId} = this.state;
    const { handleAction=function() {}, drawerList, globalCollegeList} = this.props;
    const yScrollFlag = drawerList && drawerList.length > 0;
    return (
      <div className={styles.profitList}>
        <div className={styles.form}>
          <div className={styles.title}>选择对比对象：</div>
          <BISelect
            value={collegeId}
            placeholder="请选择"
            onChange={(val) => this.onChangeParams(val, 'collegeId')}
            style={{ width: '136px', marginLeft: '24px' }}
            allowClear
          >
            {globalCollegeList.map(item => <Option key={item.collegeId} data-trace={{"widgetName":`创收-${this.getShowKey('incomeType')}选择学院`,"traceName": `家族长工作台/创收-${this.getShowKey('incomeType')}选择学院`}}>{item.collegeName}</Option>)}
          </BISelect>
        </div>
        <div className={styles.tableContent}>
          {userFlag && userMsg && <div className={styles.suspenTable}>
            <BIWrapperTable
              showHeader={false}
              columns={this.columns()}
              dataSource={[userMsg]}
              pagination={false}
              rowKey={record => record.orgId}
              rowClassName={this.getRowClassName}
              scroll={{ y: 410 }}
            />
          </div>}
          <div id='scroll' className={`${yScrollFlag ? styles.scrollTable : ''} ${userFlag && userMsg ? styles.scrollMineTable : ''}`}>
            <BIWrapperTable
              columns={this.columns()}
              dataSource={drawerList}
              pagination={false}
              loading={this.props.drawerloading}
              rowKey={(record, index) => record.orgId + '' + index}
              onRow={this.onClickRow}
              rowClassName={this.getRowClassName}
              scroll={{ y: 250 }}
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

export default ProfitList;
