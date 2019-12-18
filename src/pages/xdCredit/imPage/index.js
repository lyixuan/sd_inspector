import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader';
import BIContainer from '@/components/BIContainer';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import CreditImDetials from '../imDetails';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';
import moment from 'moment';

const collegeType = [
  {
    familyType: 0,
    name: '自考',
  },
  {
    familyType: 1,
    name: '壁垒',
  },
];
const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
const pageSize = 15;
const admin_user = localStorage.getItem('admin_user');
const globalUserType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
@connect(({ xdCreditModal, loading }) => ({
  kpiDateRange: xdCreditModal.kpiDateRange,
  globalOrgList: xdCreditModal.globalOrgList,
}))
class ImPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataRange: [], // 时间
      groupId: [], // 组织
      groupTypes: [],// 组织全部信息数组
      familyType: undefined,// 自考壁垒
      page: 1,
      loadingStatus: true,
      reasonTypeId: 0, //  内部组件参数
      loadingStart: true,
    };
  }
  componentDidMount() {
    // 权限 - 时间 - 列表- 初始化
    // this.props.dispatch({
    //   type: 'xdCreditModal/getUserInfo',
    // }); 
    const { params } = this.props.location.query;
    const { dataRange = [], groupId = [], reasonTypeId = 0} = params ? JSON.parse(params) : {};
    this.setState({ dataRange, groupId, reasonTypeId }, () => {
      this.props.dispatch({
        type: 'xdCreditModal/getKpiDateRange',
        callback: res => {
          const { dataRange } = this.state;
          if (dataRange && dataRange.length !==2) {
            this.setState({ dataRange: [moment(res.endDate), moment(res.endDate)] });
            this.getUserOrgList([res.endDate, res.endDate], () => this.getReasonListData()); // 初始化 数据
          }
        },
      });
    })
  }
  // 请求组织
  getUserOrgList = (date, callBack) => {
    const [startTime, endTime] = date;
    this.props.dispatch({
      type: 'xdCreditModal/getUserOrgList',
      payload: { params: { startTime, endTime }},
      callback: res => this.setState(this.getResetGroupMsg(res), () => {
        if (callBack) callBack()
      }),
    });
  }
  // 列表请求
  getImDetail = (other) => {
    let params = this.getAllParams();
    if (other && Object.prototype.toString.call(other) === '[object Object]') {  params = { ...params, ...other }; }
    this.props.dispatch({
      type: 'xdCreditModal/imDetailList',
      payload: { params: {
        ...params, 
        pageSize,
        page: this.state.page,
      } },
    });
  };
  // 原因列表请求
  getReasonListData() {
    this.props.dispatch({
      type: 'xdCreditModal/reasonList',
      payload: { params: this.getAllParams() },
    });
  }
  getResetGroupMsg = (orgList = this.props.globalOrgList) => {
    if (orgList && orgList.length > 0 && globalUserType !== 'boss') {
      const item = orgList[0];
      return { groupId: [item.id], groupTypes: [item], familyType: item.familyType.length > 1 ? 0 : Number(item.familyType) };
    } else {
      return { groupId: [], groupTypes: [], familyType: 0 };
    }
  }
  // 选择 时间 - 组织 - 储存参数
  onChangeDate = (v, s) => {
    this.setState({ dataRange : v });
    this.getUserOrgList(s);
  }
  onChangeOrg = (v, s) => {
    this.setState({
      groupId: v,
      groupTypes: s, 
      familyType: this.getFamilyType(s)
    })
  }
  onChangeSelect = (v) => {
    this.setState({
      familyType: v
    })
  }
  // 学院类型是否可选择
  getCollegeFlag = () => {
    const { groupTypes } = this.state;
    if (groupTypes instanceof Array && groupTypes.length > 0) {
      const l = groupTypes.length;
      const itemLast = groupTypes[l - 1];
      if (itemLast.familyType.length > 1 && itemLast.groupType === 'college') {
        return true;
      }
    }
    return false
  }
  // 参数groupId
  getGroupMsg = () => {
    const { groupId, groupTypes } = this.state;
    if (groupId && groupId.length > 0) {
      const index = groupId.length - 1;
      return { orgId: groupId[index], groupType: groupTypes[index].groupType };
    } else {
      return { };
    }
  };
  // 参数familyType
  getFamilyType = s => {
    const type = s instanceof Array && s.length > 0 ? s[s.length - 1].familyType : 0;
    if ( type.length === '1') {
      return 1;
    } else if (type) {
      return 0;
    }
  }
  // 获取参数
  getAllParams = () => {
    const [ startTime, endTime ] = this.state.dataRange;
    return {
      ...this.getGroupMsg(),
      startTime: moment(startTime).format(dateFormat),
      endTime: moment(endTime).format(dateFormat),
      familyType: this.state.familyType,
      reasonTypeId: this.state.reasonTypeId
    }
  }
  // 查询
  handleClick = () => {
    this.getReasonListData();
  }
  // 二级组件方法
  onPageChange = currentPage => {
    this.setState({ page: currentPage }, () => this.getImDetail());
  };
  cellClick = (item, record, type) => {
    let reasonTypeId = this.state.reasonTypeId;
    if (item) {
      reasonTypeId = item.typeId;
    } else if (type === 'total' && this.state.reasonTypeId === 0) {
      reasonTypeId = 0;
    }
    const other = {
      groupType: record.groupType,
      orgId: record.orgId,
      reasonTypeId: reasonTypeId,
    };
    this.getImDetail(other);
  };
  reasonTypeClick = item => {
    this.setState(
      {
        loadingStatus: false,
        reasonTypeId: item.typeId,
      }, () => this.getReasonListData()
    );
  };

  render() {
    const { dataRange, groupId, familyType } = this.state;
    const { globalOrgList } = this.props;
    return (
        <div className={styles.imPage}>
          <BIContainer
            title='im负面分析'
            propStyle={{
              padding: '16px 0 0 0'
            }}
          >
            <div className={styles.form}>
              <span className={styles.option}>
                选择时间：
                <BIRangePicker
                  value={dataRange}
                  placeholder={['选择起始时间', '选择截止时间']}
                  format={dateFormat}
                  onChange={this.onChangeDate}
                  allowClear={false}
                  disabledDate={c => disabledDate(c, this.props.kpiDateRange)}
                  style={{ width: '224px' }}
                />
              </span>
              <span className={styles.option}>
                选择组织：
                <BICascader
                  placeholder="选择组织"
                  changeOnSelect
                  options={globalOrgList}
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  displayRender={this.renderCascader}
                  value={groupId}
                  onChange={this.onChangeOrg}
                  allowClear={false}
                  style={{ width: '136px' }}
                  allowClear={globalUserType === 'boss'}
                />
              </span>
              {
                this.getCollegeFlag() && <span className={styles.option}>
                  学院类型：
                  <BISelect
                    value={familyType}
                    placeholder="请选择学院类型"
                    style={{ width: '136px' }}
                    onChange={this.onChangeSelect}
                  >
                    {
                      collegeType.map(item => (
                        <Option key={item.familyType} value={item.familyType}>
                          {item.name}
                        </Option>
                      ))
                    }
                  </BISelect>
                </span> 
              }
              <span className={styles.option}>
                <BIButton type="reset" onClick={this.handleReset} style={{ marginRight: '8px' }}>
                  重置
                </BIButton>
                <BIButton
                  data-trace='{"widgetName":"查询","traceName":"数据服务/学分明细/查询"}'
                  type="primary"
                  onClick={this.handleClick}
                  htmlType="submit"
                >
                  查询
                </BIButton>
              </span>
            </div>
            <div>
              <CreditImDetials
                onPageChange={this.onPageChange}
                pageSize2={pageSize}
                currentPage={this.state.page}
                defaultPage={this.getImDetail}
                loadingStatus={this.state.loadingStatus}
                cellClick={this.cellClick}
                reasonTypeClick={this.reasonTypeClick}
              />
            </div>
          </BIContainer>
        </div>
      
    );
  }
}

export default ImPage;
