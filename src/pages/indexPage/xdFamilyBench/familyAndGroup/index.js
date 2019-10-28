import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '@/components/BIContainer'
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
      visible: false,
      tabParams: [{
        name: <span data-trace='{"widgetName":"家族学分对比","traceName":"家族长工作台/家族学分对比"}'>家族学分对比</span>,
        key: '1',
        children: <FamilyScore />,
        isShowBtn: false
      }, {
        name: <span data-trace='{"widgetName":"小组学分对比","traceName":"家族长工作台/小组学分对比"}'>小组学分对比</span>,
        key: '2',
        children: <GroupScore familyAndGroup={this} getGroupPkList={this.getGroupPkList} />,
        isShowBtn: true,
        changeModal: this.changeModal,
        visible: "visible"
      }],
      collegeIdList: [],
      familyIdList: [],
      groupIdList: [],
      PkCollegeIdList: [],
      PkFamilyIdList: [],
      myFamilyGroupList: [],
      PkGroupIdList: localStorage.getItem('pkGroupIds') ? JSON.parse(localStorage.getItem('pkGroupIds')) : [], // 小组创收对比PK值
      myGroupValue: localStorage.getItem('myGroupIds') ? JSON.parse(localStorage.getItem('myGroupIds')) : [], // 小组创收mine值
      pkGroupIds: [],
      showFamilyGroup: localStorage.getItem('pkGroupIds') || localStorage.getItem('myGroupIds') ? false : true
    }
  }
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'xdWorkModal/getOrgMapList',
      payload: { params: {} },
    });
    this.myFamilyGroupList()
    this.getGroupPkList(this.state.showFamilyGroup)
  }
  getGroupPkList = (flag) => {
    this.props.dispatch({
      type: 'xdWorkModal/getGroupPkList',
      payload: { params: { pkGroupIds: this.getParamas(), myGroupIds: this.state.myGroupValue, showFamilyGroup: flag } },
      callback: res => {
        if (flag && this.state.PkGroupIdList.length <= 0) {
          this.setState({
            myGroupValue: res.map(item => String(item.groupId))
          });
        }
      }
    })
  }

  changeModal = () => {
    this.setState({
      visible: true
    })
  }
  // 小组创收参数处理
  getParamas = () => {
    const { PkGroupIdList } = this.state;
    const groupIdList = [];
    PkGroupIdList.map(item => groupIdList.push(item.replace("c-", '')))
    return groupIdList;
  }
  myFamilyGroupList = () => {
    this.props.dispatch({
      type: 'xdWorkModal/myFamilyGroupList',
      payload: { params: {} },
      callback: (data) => {
        this.setState({
          myFamilyGroupList: data
        })
      }
    })
  }
  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value
    });
  };
  unique = (arr) => {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
  }
  handleOk = () => {
    if (this.state.PkGroupIdList.concat(this.state.myGroupValue).length > 6) {
      message.warning('小组最多只能选择6个');
      return
    }
    this.setState({
      visible: false,
      showFamilyGroup: false,
    });
    setTimeout(() => {
      this.getGroupPkList(this.state.showFamilyGroup);
    }, 300)
    localStorage.setItem('pkGroupIds', JSON.stringify(this.state.PkGroupIdList));
    localStorage.setItem('myGroupIds', JSON.stringify(this.state.myGroupValue));

  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  mapGroupIdValus = (groupArr) => {
    let groupIds = []
    groupArr.length > 0 && groupArr.map((item) => {
      groupIds.push(String(item.groupId))
    })
    return groupIds
  }
  render() {
    const { orgListTreeData = [], userInfo } = this.props.xdWorkModal.xdWorkModal;
    const { myFamilyGroupList, myGroupValue, PkGroupIdList } = this.state
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
                <span className={styles.titleName} style={{ width: '91px' }}>添加我的小组：</span>
                <span className={styles.titleName}>{userInfo.collegeName}</span>
                <span className={styles.titleName}>{userInfo.familyName}</span>
                <BISelect
                  placeholder="请选择小组"
                  mode="multiple"
                  style={{ width: '100%' }}
                  defaultValue={myGroupValue}
                  onChange={(val) => this.onFormChange(val, 'myGroupValue')}
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
                <span className={styles.titleName} style={{ width: '91px', display: 'inline-block', textAlign: 'right' }}>对比小组：</span>
                <BITreeSelect style={{ width: 445 }}
                  placeholder="请选择对比小组"
                  multiple
                  showArrow
                  maxTagCount={3}
                  value={PkGroupIdList}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  treeData={orgListTreeData}
                  onChange={(val) => this.onFormChange(val, 'PkGroupIdList')}
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
