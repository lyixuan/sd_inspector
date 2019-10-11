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
import { Select, Radio } from 'antd';
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
      pkGroupIds:[]

    }
  }
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'xdWorkModal/getOrgMapList',
      payload: { params: {} },
    });
    this.myFamilyGroupList()
    this.getGroupPkList()
  }
  getGroupPkList=()=>{
    this.props.dispatch({
      type:'xdWorkModal/getGroupPkList',
      payload: { params: {pkGroupIds:this.state.pkGroupIds} },
    })
  }
  componentWillReceiveProps(nextProps) {
    const {familyGroupPkList={}} = this.props.xdWorkModal.xdWorkModal;
    const nextPropsList = this.props.xdWorkModal.xdWorkModal.familyGroupPkList
    if (nextPropsList !== {}) {
      const myGroupList= familyGroupPkList&&familyGroupPkList.groupList
      this.setState({
        myGroupValue:myGroupList&&myGroupList.length>0 && this.mapGroupIdValus(myGroupList)
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
    console.log(110,this.state.pkGroupIds)
    if ('myGroup' === vname) {
      this.setState({
        myGroupValue: value,
      })
      console.log(100,this.state.myGroupValue)
    }else if('PkGroup' === vname){
      console.log(92,value)
      const list1 = [];
      const list2 = [];
      const list3 = [];
      let ids=[]
      value.forEach((v)=>{
        if (v.indexOf('a-')>=0) {
          list1.push(v);
        }
        if (v.indexOf('b-')>=0) {
          list2.push(v);
        }
        if (v.indexOf('c-')>=0) {
          list3.length<=5 && list3.push(v);
        }
      });
      console.log(117,ids,list3)

      list3.length>0 && list3.map((item)=>{
        ids.push(item.split('-')[1])
      })
      console.log(127,list3,ids,this.state.myGroupValue)

      this.setState({
        PkCollegeIdList: [...list1],
        PkFamilyIdList: [...list2],
        PkGroupIdList: [...list3],
        pkGroupIds:this.unique(this.state.myGroupValue.concat(ids))
      })
      console.log(112,list1,list2,list3,this.state.PkGroupIdList,this.state.pkGroupIds)
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
      console.log(80,this.state.pkGroupIds)
    },100)

    if(this.state.pkGroupIds.length>6){
      message.warning('小组最多只能选择6个');
      return
    }
    this.setState({
      visible: false,
    });
    this.getGroupPkList(this.state.pkGroupIds)
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
    const {myFamilyGroupList,myGroupValue,PkCollegeIdList ,PkFamilyIdList, PkGroupIdList} = this.state
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
                <span className={styles.titleName}>芒格学院</span>
                <span className={styles.titleName}>英语</span>
                <BISelect
                  placeholder="请选择小组"
                  mode="multiple"
                  style={{width:314}}
                  defaultValue={myGroupValue}
                  onChange={(val) => this.onFormChange(val,'myGroup')}
                >
                  {myFamilyGroupList.map((item, index) => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
                {/*<BISelect style={{ width: 314 }}*/}
                              {/*placeholder="请选择小组"*/}
                              {/*multiple*/}
                              {/*showArrow*/}
                              {/*maxTagCount={2}*/}
                              {/*dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}*/}
                              {/*treeData={orgListTreeData}*/}
                              {/*onChange={(val)=>this.onFormChange(val,'myGroup')}*/}
                {/*></BISelect>*/}
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
