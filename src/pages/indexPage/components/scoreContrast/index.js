import React from 'react';
import { connect } from 'dva';
import TopTabs from "../../components/topTabs";
import Container from '@/components/BIContainer';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader';
import CollegeScore from "./collegeScore";
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import pkBtnImg from '@/assets/pkbtn.png';
import qushiImg from '@/assets/qushibtn.png';

const { Option } = BISelect;
const userTypes = {
  'class': true,
  'group': true,
  'family': true,
}
@connect(({ xdWorkModal, global}) => ({
  globalOrgList: xdWorkModal.globalOrgList || {},
  userInfo: xdWorkModal.userInfo || {},
  globalUserTypes: global.globalUserTypes || {}
}))
class ScoreContrast extends React.Component {
  constructor(props) {
    super(props);
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    const trace = this.props.globalUserTypes[userType]
    this.state = {
      tabParams: [{
        name: <span data-trace={`{"widgetName":"学院学分对比","traceName":"${trace}工作台/学院学分对比"}`}>学院学分对比</span>,
        key: '1',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: <span data-trace={`{"widgetName":"家族学分对比","traceName":"${trace}工作台/家族学分对比"}`}>家族学分对比</span>,
        key:'2',
        children: <CollegeScore  queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      },{
        name: <span data-trace={`{"widgetName":"小组学分对比","traceName":"${trace}工作台/小组学分对比"}`}>小组学分对比</span>,
        key: '3',
        children: <CollegeScore queryAppealDatas={this} queryAppealDataPage={this.queryAppealDataPage}/>,
      }],
      collegeOptions:[],
      queryAppealDatas:{},
      queryParams: {
        contrasts: 1,
        familyType: '0',
        dimensionId: undefined,
        collegeId: undefined,
        groupId: undefined,
        ...this.props.allTimes
      },
      query: { }, // tabs值储存
      tabNum:1,
      userType,
      familyTypeInit: '0'
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type:"xdWorkModal/getFamilyType",
      callback:(res) => {
        this.setState({ collegeOptions:res });
        if (!res['0']) {
          const { queryParams } = this.state;
          queryParams.familyType = '1';
          this.setState({
            familyTypeInit: '1',
            queryParams
          }, () => this.queryAppealDataPage())
        } else {
          this.queryAppealDataPage()
        }
      }
    })
    // 自考壁垒对应的学院  三个工作台都要用
    this.props.dispatch({
      type: 'xdWorkModal/getOrgList',
      payload:{params: this.props.allTimes },
    });
  }
  // tab改变
  changeTab = (obj) => {
    const { queryParams } = this.state;
    this.state.query[queryParams.contrasts] = {
      contrasts: queryParams.contrasts,
      familyType: queryParams.familyType,
      dimensionId: queryParams.dimensionId,
      collegeId: queryParams.collegeId,
      groupId: queryParams.groupId,
    }
    const keye = Number(obj.keye);
    this.state.tabNum = keye;
    if (!this.state.query[keye]) {
      this.state.query[keye] = {
        dimensionId: undefined,
        familyType: this.state.familyTypeInit,
        collegeId: undefined,
        groupId: undefined
      };
    }
    this.queryAppealDataPage({contrasts: Number(obj.keye), ...this.state.query[obj.keye]});
  }
  //获取柱状图及维度的接口
  queryAppealDataPage = (obj = {}) =>{
    const params = {
      ...this.state.queryParams,
      ...obj,
    }
    this.setState({queryParams: params });
    this.props.dispatch({
      type:'xdWorkModal/queryAppealDataPage',
      payload:{params: this.getQueryParams(params)},
      callback:(res) => this.setState({
        queryAppealDatas:res
      })
    })
  }
  // 参数
  getQueryParams = params => {
    if (params.contrasts === 3 && params.groupId) {
      const l = params.groupId.length;
      if (l === 0) {
        return {
          ...params,
          groupId: undefined
        }
      } else if (l === 1) {
        return {
          ...params,
          collegeId: params.groupId[0],
          groupId: undefined
        }
      } else if (l > 1) {
        return {
          ...params,
          collegeId: params.groupId[0],
          groupId: params.groupId.length > 1 ? params.groupId[1] : undefined
        }
      }  
    } else {
      return params
    }
  }
  rightPart = () => {
    const {collegeOptions={}, userType, queryParams} = this.state;
    const { allTimes } = this.props;
    const orgList = this.props.globalOrgList[queryParams.familyType] || []
    return(
      <>
        <span style={{ marginRight: 200, display: 'flex' }}>
          <BISelect style={{ width: 136, marginRight: 12 }} placeholder="请选择" value={queryParams.familyType} onChange={(val) => this.onFormChange(val, 'familyType')}>
            {Object.keys(collegeOptions).map(key => <Option key={key} data-trace='{"widgetName":"家族筛选","traceName":"管理层工作台/家族筛选"}'>
              {collegeOptions[key]}
            </Option>)}
          </BISelect>
          {queryParams.contrasts === 2 && <BISelect style={{ width: 136, marginRight: 12 }} placeholder="请选择" value={queryParams.collegeId} onChange={(val) => this.onFormChange(val, 'collegeId')} allowClear>
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
            onChange={(val) => this.onFormChange(val, 'groupId')}
            allowClear
            style={{ width: '136px' }}
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
    if (type === 'familyType') {
      queryParams.groupId = undefined;
      queryParams.collegeId = undefined;
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
        tabParams={this.state.tabParams} onTabChange={this.changeTab}
        />
      </Container>
    );
  }
}

export default ScoreContrast;
