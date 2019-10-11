import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyIncome from './familyIncome'
import GroupIncome from './groupIncome'
import BIModal from '@/ant_components/BIModal'
import BIButton from '@/ant_components/BIButton';
import BITreeSelect from '@/ant_components/BITreeSelect'
import BISelect from '@/ant_components/BISelect'
import { message } from 'antd';
const { Option } = BISelect;
@connect((xdWorkModal) => ({
  xdWorkModal,
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
        children:  <GroupIncome getIncomeFamilyGroupPk={this.getIncomeFamilyGroupPk}/>,
        isShowBtn: true,
        visible: "incomeVisible",
        changeModal: this.changeIncomeModal
      }],
      groupIdList: [], // 小组创收参数,
      myFamilyGroupList:[],
      PkGroupIdList:[],
      myGroupValue:[],
      userInfo:{}
    }
  }
  componentDidMount() {
    this.myFamilyGroupList()
    this.setState({
      userInfo:JSON.parse(localStorage.getItem("userInfo"))
    })
  }
  // 小组创收
  getIncomeFamilyGroupPk = () => {
    this.props.dispatch({
      type: 'xdWorkModal/getIncomeFamilyGroupPk',
      payload: { params: { groupIdList: [] } },
    });
  }
  changeIncomeModal = () =>{
    this.setState({
      incomeVisible:true
    })
  }
  handleOk = () => {
    this.setState({
      incomeVisible: false,
    });
    this.getIncomeFamilyGroupPk();
  };
  handleCancel = () => {
    this.setState({
      incomeVisible: false,
    });
  };
  myFamilyGroupList = () =>{
    this.props.dispatch({
      type:'xdWorkModal/myFamilyGroupList',
      payload:{params:{}},
      callback:(data)=>{
        this.setState({
          myFamilyGroupList:data
        })
      }
    })
  }
  onFormChange = (value,vname)=>{
    this.setState({
      pkGroupIds:[]
    })
    if ('myGroup' === vname) {
      this.setState({
        myGroupValue: value,
      })
    }else if('PkGroup' === vname){
      const list3 = [];
      let ids=[]
      value.forEach((v)=>{
        if (v.indexOf('c-')>=0) {
          list3.length<=5 && list3.push(v);
        }
      });
      list3.length>0 && list3.map((item)=>{
        ids.push(item.split('-')[1])
      })
      console.log(127,list3,ids,this.state.myGroupValue)

      this.setState({
        PkGroupIdList: [...list3],
        pkGroupIds:this.unique(ids),
        myGroupValue:this.unique(this.state.myGroupValue)
      })
    } else {
      this.setState({
        [vname]:value
      });
    }
  };
  render() {
    const {orgListTreeData = []} = this.props.xdWorkModal.xdWorkModal;
    const {myFamilyGroupList,myGroupValue,PkGroupIdList,userInfo} = this.state
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
                  defaultValue={myGroupValue}
                  onChange={(val) => this.onFormChange(val,'myGroup')}
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
                <BITreeSelect style={{ width: 445 }}
                              placeholder="请选择对比小组"
                              multiple
                              showArrow
                              maxTagCount={3}
                              value={[...PkGroupIdList]}
                              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                              treeData={orgListTreeData}
                              onChange={(val)=>this.onFormChange(val,'PkGroup')}
                ></BITreeSelect>
              </div>
            </div>
          </BIModal>
        </div>
      </Container>
    );
  }
}

export default FamilyAndGroup;
