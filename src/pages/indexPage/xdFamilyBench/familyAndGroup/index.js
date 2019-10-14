import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyScore from './familyScore'
import GroupScore from './groupScore'
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
      visible:false,
      tabParams:[{
        name:'家族学分对比',
        key:'1',
        children: <FamilyScore/>,
        isShowBtn:false
      },{
        name:'小组学分对比',
        key:'2',
        children:  <GroupScore/>,
        isShowBtn:true,
        changeModal:this.changeModal,
        visible:"visible"
      }],
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
      PkCollegeIdList: [],
      PkFamilyIdList: [],
      PkGroupIdList: [],
      myFamilyGroupList:[],
      myGroupValue:[],
      pkGroupIds:[],
      userInfo:{}
    }
  }
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'xdWorkModal/getOrgMapList',
      payload: { params: {} },
    });
    let pkGroupIds = localStorage.getItem('pkGroupIds');
    let myGroupIds = localStorage.getItem('myGroupIds');
    this.myFamilyGroupList()
    this.getGroupPkList(pkGroupIds,myGroupIds)
    this.setState({
      userInfo:JSON.parse(localStorage.getItem("userInfo"))
    })
  }
  getGroupPkList=(arr,arr1)=>{
    this.props.dispatch({
      type:'xdWorkModal/getGroupPkList',
      payload: { params: {pkGroupIds:arr?arr:this.state.pkGroupIds,myGroupIds:arr1?arr1:this.state.myGroupValue} },
    })
    let pkGroupIds = arr?arr:this.state.pkGroupIds
    let myGroupIds = arr1?arr1:this.state.myGroupValue
    localStorage.setItem('pkGroupIds', pkGroupIds);
    localStorage.setItem('myGroupIds', myGroupIds);
  }
  componentWillReceiveProps(nextProps) {
    const {familyGroupPkList={}} = this.props.xdWorkModal.xdWorkModal;
    const nextPropsList = this.props.xdWorkModal.xdWorkModal.familyGroupPkList
    if (nextPropsList !== {}) {
      const myGroupList= familyGroupPkList&&familyGroupPkList.groupList
      const myGroupLists=[]
      const pkGroupLists=[]
      myGroupList && myGroupList.map((item)=>{
        if(item.myGroup){
          myGroupLists.push(item);
        }else{
          pkGroupLists.push(item)
        }

      })
      this.setState({
        myGroupValue:myGroupLists && myGroupLists.length>0 && this.mapGroupIdValus(myGroupLists),
        pkGroupIds:pkGroupLists && pkGroupLists.length>0 && this.mapGroupIdValus(pkGroupLists),
      })
    }
  }
  changeModal = () =>{
    this.setState({
      visible:true
    })
  }

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
  unique=(arr)=>{
    return arr.reduce((prev,cur) => prev.includes(cur) ? prev : [...prev,cur],[]);
  }
  handleOk = () => {
    setTimeout(()=>{
      console.log(80,this.state.pkGroupIds,this.state.myGroupValue)
    },100)

    if(this.state.pkGroupIds.length>6){
      message.warning('小组最多只能选择6个');
      return
    }
    this.setState({
      visible: false,
    });
    this.getGroupPkList(this.state.pkGroupIds,this.state.myGroupValue)
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  mapGroupIdValus=(groupArr)=>{
    let groupIds=[]
    groupArr.length>0 && groupArr.map((item)=>{
      groupIds.push(String(item.groupId))
    })
    return groupIds
  }
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
            title="设置小组学分对比项"
            visible={this.state.visible}
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
