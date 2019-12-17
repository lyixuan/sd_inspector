import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BICascader from '@/ant_components/BICascader';
import Container from '@/components/BIContainer';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import TopTabs from "./components/topTabsAll";
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { disabledDate, getDateObj } from '@/pages/indexPage/components/utils/utils';
import pkBtnImg from '@/assets/pkbtn.png';
import qushiImg from '@/assets/qushibtn.png';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY-MM-DD';
const userTypes = {
  'class': true,
  'group': true,
  'family': true,
}
@connect(({ histogramModel, newDetailModal, global}) => ({
  globalOrgList: histogramModel.globalOrgList || {},
  userInfo: histogramModel.userInfo || {},
  globalUserTypes: global.globalUserTypes || {},
  globalDateMoment: newDetailModal.globalDateMoment
}))
class ScoreContrast extends React.Component {
  constructor(props) {
    super(props);
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    this.state = {
      queryAppealDatas:{},
      queryParams: {
        contrasts: 1,
        familyType: '0',
        dimensionId: undefined,
        collegeId: undefined,
        groupId: undefined,
        dataRange: this.props.globalDateMoment
      },
      query: { }, // tabs值储存
      tabNum:1,
      userType,
      familyTypeInit: '0'
    }
  }
  componentDidMount() {
     // 自考壁垒对应的学院  三个工作台都要用
    this.props.dispatch({
      type:"histogramModel/getCurrentFamilyType",
      callback:({ familyType }) => {
        const { queryParams } = this.state;
        queryParams.familyType = familyType + '';
        this.setState({
          familyTypeInit: familyType + '',
          queryParams
        }, () => this.queryAppealDataPage())
      }
    }) 
  }
  // tab改变
  changeTab = (obj) => {
    const { queryParams } = this.state;
    this.state.query[queryParams.contrasts] = {
      // contrasts: queryParams.contrasts,
      // familyType: queryParams.familyType,
      // dimensionId: queryParams.dimensionId,
      // collegeId: queryParams.collegeId,
      // groupId: queryParams.groupId,
      // dataRange: queryParams.dataRange
      ...queryParams
    }
    const keye = Number(obj.keye);
    this.state.tabNum = keye;
    if (!this.state.query[keye]) {
      this.state.query[keye] = {
        dimensionId: undefined,
        familyType: this.state.familyTypeInit,
        collegeId: undefined,
        groupId: undefined,
        dataRange: this.props.globalDateMoment
      };
    }
    if (keye !== 1) {
      this.getOrgList(this.state.query[keye].dataRange);
    }
    this.queryAppealDataPage({contrasts: Number(obj.keye), ...this.state.query[obj.keye]});
  }
  // 获取组织
  getOrgList = (date = this.state.queryParams.dataRange) => {
    this.props.dispatch({
      type: 'histogramModel/getOrgList',
      payload:{ params: getDateObj(date) },
    });
  }
  //获取柱状图及维度的接口
  queryAppealDataPage = (obj = {}) =>{
    const params = {
      ...this.state.queryParams,
      ...obj,
    }
    this.setState({queryParams: params });
    this.props.dispatch({
      type:'histogramModel/queryAppealDataPage',
      payload:{params: this.getQueryParams(params)},
      callback:(res) => this.setState({
        queryAppealDatas:res
      })
    })
  }
  // 参数
  getQueryParams = params => {
    const { dataRange, ...others } = params;
    const allTimes = getDateObj(dataRange);
    const newParams = { ...others, ...allTimes };
    if (params.contrasts === 3 && params.groupId) {
      const l = params.groupId.length;
      if (l === 0) {
        newParams.groupId = undefined;
      } else if (l === 1) {
        newParams.collegeId = params.groupId[0];
        newParams.groupId = undefined;
        newParams.familyId = undefined;
      } else if (l > 1) {
        newParams.collegeId = params.groupId[0];
        newParams.groupId = undefined;
        newParams.familyId = params.groupId.length > 1 ? params.groupId[1] : undefined;
      }  
    }
    return newParams
  }
  rightPart = () => {
    const {userType, queryParams} = this.state;
    const allTimes = getDateObj(this.state.queryParams.dataRange);
    const orgList = this.props.globalOrgList[queryParams.familyType] || []
    return(
      <>
        <span style={{ display: 'flex' }}>
          <BIRangePicker
            value={queryParams.dataRange}
            placeholder={['选择起始时间', '选择截止时间']}
            format={dateFormat}
            onChange={val => this.onFormChange(val, 'dataRange')}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalDate)}
            style={{ width: 224, marginRight: 12 }}
          />
          <BISelect style={{ width: 100, marginRight: 12 }} placeholder="请选择" value={queryParams.familyType} onChange={val => this.onFormChange(val, 'familyType')}>
            {[{id: '0', name:'自考'}, {id: '1', name: '壁垒'}].map(item => <Option key={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>
          {queryParams.contrasts === 2 && <BISelect style={{ width: 130, marginRight: 12 }} placeholder="请选择" value={queryParams.collegeId} onChange={val => this.onFormChange(val, 'collegeId')} allowClear>
            {orgList.map(item => <Option key={item.id} value={item.id} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {item.name}
            </Option>)}
          </BISelect>}
          {queryParams.contrasts === 3 && <BICascader
            placeholder="选择组织"
            changeOnSelect
            options={orgList}
            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
            getPopupContainer={triggerNode => triggerNode.parentNode}
            displayRender={this.renderCascader}
            value={queryParams.groupId}
            onChange={val => this.onFormChange(val, 'groupId')}
            allowClear
            style={{ width: '130px' }}
          />}
        </span>
        <span>
          <BIButton onClick={() => this.handleRouter('xdCredit/index', allTimes, '趋势')} type="online" style={{marginRight: '8px'}}>
            <img src={qushiImg} alt='' style={{ width: 15, marginRight: 6 }}/>
            学分趋势
          </BIButton>
          { 
            userTypes[userType] && <BIButton onClick={() => this.handleRouter('xdCreditPk/list', allTimes, 'pk')} type="online" style={{marginRight: '8px'}}>
              <img src={pkBtnImg} alt='' style={{ width: 14, marginRight: 12,     marginTop: '-1px' }}/>
              学分PK
            </BIButton>
          } 
        </span>
      </>
    )
  }
  // select
  onFormChange = (val, type) =>{
    const { queryParams } = this.state;
    queryParams[type] = val;
    if (queryParams.contrasts !== 1 && (type === 'familyType' || type === 'dataRange')) {
      queryParams.groupId = undefined;
      queryParams.collegeId = undefined;
      if (type === 'dataRange') {
        this.getOrgList(val);
      }
    }
    this.setState({
      queryParams: this.state.queryParams,
    }, () => this.queryAppealDataPage())
  }
  handleRouter = (path, params, trace) => {
    const { userType } = this.state;
    const { globalUserTypes } = this.props;
    handleDataTrace({"widgetName":`${globalUserTypes[userType]}点学分${trace}`,"traceName":`${globalUserTypes[userType]}工作台/学分${trace}按钮`});
    jumpGobalRouter(path, params);
  }
  getTabParams = () => {
    const trace = this.props.globalUserTypes[this.state.userType];
    return [{
      name: <span data-trace={`{"widgetName":"学院学分对比","traceName":"${trace}工作台/学院学分对比"}`}>学院学分对比</span>,
      key: '1',
    },{
      name: <span data-trace={`{"widgetName":"家族学分对比","traceName":"${trace}工作台/家族学分对比"}`}>家族学分对比</span>,
      key:'2',
    },{
      name: <span data-trace={`{"widgetName":"小组学分对比","traceName":"${trace}工作台/小组学分对比"}`}>小组学分对比</span>,
      key: '3',
    }]
  }
  render() {
    return (
      <Container 
        style={{ width: '100%', marginBottom: '16px' }}
        propStyle={{ padding: '0px', position: 'relative' }}
        head="none"
      >            
        <TopTabs 
        right={this.rightPart()}
        rightStyles={{
          display: 'flex',
          justifyContent: 'space-between',
          width: 'calc(100% - 400px)',
          marginLeft: 400,
          left: 0
        }} 
        tabParams={this.getTabParams()} onTabChange={this.changeTab}
        propsData = {{
          ...this.state,
          allTimes: getDateObj(this.state.queryParams.dataRange),
          queryAppealDataPage: this.queryAppealDataPage
        }}
        />
      </Container>
    );
  }
}

export default ScoreContrast;
