import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyIncome from './familyIncome'
import GroupIncome from './groupIncome'
import BIModal from '@/ant_components/BIModal'
import BIButton from '@/ant_components/BIButton';
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
      groupIdList: [], // 小组创收参数
    }
  }
  componentDidMount() {
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

  render() {
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
            footer={[
              <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
                取消
              </BIButton>,
              <BIButton type="primary" loading={this.props.submitLoading} onClick={this.handleOk}>
                确定
              </BIButton>,
            ]}
          >
            <div className={styles.modalWrap}>是否确认提交？</div>
          </BIModal>
        </div>
      </Container>
    );
  }
}

export default FamilyAndGroup;
