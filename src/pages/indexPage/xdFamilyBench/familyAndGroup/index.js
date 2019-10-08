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
    }
  }
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'xdWorkModal/getOrgMapList',
      payload: { params: {} },
    });
  }

  changeModal = () =>{
    this.setState({
      visible:true
    })
  }
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  onFormChange = (value,vname)=>{
    if ('myGroup' === vname) {
      const list1 = [];
      const list2 = [];
      const list3 = [];
      value.forEach((v)=>{
        if (v.indexOf('a-')>=0) {
          list1.push(v);
        }
        if (v.indexOf('b-')>=0) {
          list2.push(v);
        }
        if (v.indexOf('c-')>=0) {
          list3.push(v);
        }
      });
      this.setState({
        collegeIdList: [...list1],
        familyIdList: [...list2],
        groupIdList: [...list3],
      })
    }else if('PkGroup' === vname){
      const list1 = [];
      const list2 = [];
      const list3 = [];
      value.forEach((v)=>{
        if (v.indexOf('a-')>=0) {
          list1.push(v);
        }
        if (v.indexOf('b-')>=0) {
          list2.push(v);
        }
        if (v.indexOf('c-')>=0) {
          list3.push(v);
        }
      });
      this.setState({
        PkCollegeIdList: [...list1],
        PkFamilyIdList: [...list2],
        PkGroupIdList: [...list3],
      })
    } else {
      this.setState({
        [vname]:value
      });
    }
  };
  render() {
    const {orgListTreeData = []} = this.props.xdWorkModal.xdWorkModal;
    console.log(60,this.props.xdWorkModal.xdWorkModal)
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
                <span className={styles.titleName} style={{}}>添加我的小组：</span>
                <span className={styles.titleName}>芒格学院</span>
                <span className={styles.titleName}>英语</span>
                <BITreeSelect style={{ width: 314 }}
                              placeholder="请选择小组"
                              multiple
                              showArrow
                              maxTagCount={2}
                              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                              treeData={orgListTreeData}
                              onChange={(val)=>this.onFormChange(val,'myGroup')}
                ></BITreeSelect>
              </div>
              <div className={`${styles.myGroup} ${styles.pkGroup}`}>
                <span className={styles.titleName} style={{width:'91px',display:'inline-block',textAlign:'right'}}>对比小组：</span>
                <BITreeSelect style={{ width: 445 }}
                              placeholder="请选择对比小组"
                              multiple
                              showArrow
                              maxTagCount={3}
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
