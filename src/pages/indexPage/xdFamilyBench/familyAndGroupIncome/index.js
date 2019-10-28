import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '@/components/BIContainer'
import TopTabs from '../../components/topTabs'
import FamilyIncome from './familyIncome'
import GroupIncome from './groupIncome'
import BIModal from '@/ant_components/BIModal'
import BIButton from '@/ant_components/BIButton';
import BITreeSelect from '@/ant_components/BITreeSelect'
import BISelect from '@/ant_components/BISelect'
import { message } from 'antd';
const { Option } = BISelect;

@connect(({ xdFamilyModal, xdWorkModal }) => ({
  userInfo: xdWorkModal.userInfo,
  orgListTreeData: xdFamilyModal.orgListTreeData,
  familyIncomeGroup: xdFamilyModal.familyIncomeGroup,
}))
class FamilyAndGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      incomeVisible:false,
      tabParams:[{
        name: '家族创收对比',
        key: '1',
        children: <FamilyIncome/>,
        isShowBtn: false
      },{
        name:'小组创收对比',
        key:'2',
        children:  <GroupIncome familyAndGroup={this} getIncomeFamilyGroupPk={this.getIncomeFamilyGroupPk}/>,
        isShowBtn: true,
        visible: "incomeVisible",
        changeModal: this.changeIncomeModal
      }],
      groupIdList: [], // 小组创收参数,
      myFamilyGroupList:[],
      PkGroupIdList:localStorage.getItem('incomePkGroupIds')?JSON.parse(localStorage.getItem('incomePkGroupIds')):[], // 小组创收对比PK值
      myGroupValue:localStorage.getItem('incomeMyGroupIds')?JSON.parse(localStorage.getItem('incomeMyGroupIds')):[], // 小组创收mine值
      groupPkInitFlag:localStorage.getItem('incomePkGroupIds')||localStorage.getItem('incomeMyGroupIds')?false:true
    }
  }
  componentDidMount() {
    this.myFamilyGroupList()
  }
  // 小组创收
  getIncomeFamilyGroupPk = (flag) => {
    this.props.dispatch({
      type: 'xdFamilyModal/getIncomeFamilyGroupPk',
      payload: { params: { pkGroupIds: this.getParamas(),  selfGroupIds: this.state.myGroupValue,groupPkInitFlag:flag} },
      callback: res =>  {
        console.log(56,res)
        if (flag && this.state.PkGroupIdList.length<=0) {
          this.setState({ myGroupValue: res.map(item => String(item.groupId))});
        }
      }
    });
  }
  // 小组创收参数处理
  getParamas = () => {
    const { PkGroupIdList } = this.state;
    const groupIdList = [];
    PkGroupIdList.map(item => groupIdList.push(item.replace("c-", '')))
    return groupIdList;
  }
  changeIncomeModal = () =>{
    this.setState({
      incomeVisible:true
    })
  }
  handleOk = () => {
    if(this.state.myGroupValue.concat(this.state.PkGroupIdList).length>6){
      message.warning('小组最多只能选择6个');
      return;
    }
    this.setState({
      incomeVisible: false,
    });
    setTimeout(()=>{
      this.getIncomeFamilyGroupPk(false);
    },300)
    localStorage.setItem('incomePkGroupIds', JSON.stringify(this.state.PkGroupIdList));
    localStorage.setItem('incomeMyGroupIds', JSON.stringify(this.state.myGroupValue));
  };
  handleCancel = () => {
    this.setState({
      incomeVisible: false,
    });
  };
  myFamilyGroupList = () =>{
    this.props.dispatch({
      type:'xdFamilyModal/myFamilyGroupList',
      payload:{params:{}},
      callback:(data)=>{
        this.setState({
          myFamilyGroupList: data
        })
      }
    })
  }
  onFormChange = (value, vname)=>{
    this.setState({
      [vname]: value
    });
  };
  sliceArr=(arr)=>{
    let array = []
    if(arr.length>6){
      array = arr.splice(0,4);
    }else{
      array = arr
    }
    return array
  }
  render() {
    const { orgListTreeData = [], userInfo } = this.props;
    const {myFamilyGroupList, myGroupValue, PkGroupIdList} = this.state
    return (
      <Container
        style={{ width: '100%', marginBottom: '16px' }}
        title=""
        propStyle={{ padding: '0px' }}
        head="none"
      >
        <div className={styles.familyBench}>
          <TopTabs tabParams={this.state.tabParams} />
          <BIModal
            title="设置小组创收对比项"
            visible={this.state.incomeVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={595}
            footer={[
              <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
                取消
              </BIButton>,
              <BIButton type="primary" loading={this.props.submitLoading} onClick={this.handleOk}>
                确定
              </BIButton>,
            ]}
          >
            <div className={styles.modalWrap}>
              <div className={styles.myGroup}>
                <span className={styles.titleName} style={{width:'91px'}}>添加我的小组：</span>
                <span className={styles.titleName}>{userInfo.collegeName}</span>
                <span className={styles.titleName}>{userInfo.familyName}</span>
                <BISelect
                  placeholder="请选择小组"
                  mode="multiple"
                  style={{width:'100%'}}
                  value={this.sliceArr(myGroupValue)}
                  onChange={(val) => this.onFormChange(val,'myGroupValue')}
                  maxTagCount={2}
                >
                  {myFamilyGroupList.map((item, index) => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </div>
              <div className={`${styles.myGroup} ${styles.pkGroup}`}>
                <span className={styles.titleName} style={{width:'91px',display:'inline-block',textAlign:'right'}}>对比小组：</span>
                <BITreeSelect
                  style={{ width: 445 }}
                  placeholder="请选择对比小组"
                  multiple
                  showArrow
                  maxTagCount={3}
                  value={PkGroupIdList}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={orgListTreeData}
                  onChange={(val)=>this.onFormChange(val,'PkGroupIdList')}
                />
              </div>
            </div>
          </BIModal>
        </div>
      </Container>
    );
  }
}

export default FamilyAndGroup;
