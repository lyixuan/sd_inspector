import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyScore from './familyScore'
import GroupScore from './groupScore'
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
      }]
    }
  }
  componentDidMount() {

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
            title="设置小组学分对比项"
            visible={this.state.visible}
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
