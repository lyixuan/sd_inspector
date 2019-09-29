import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Container from '../../components/container'
import TopTabs from '../../components/topTabs'
import FamilyIncome from './familyIncome'
import GroupIncome from './groupIncome'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyAndGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      tabParams:[{
        name:'家族创收对比',
        key:'1',
        children: <FamilyIncome/>,
        isShowBtn:false
      },{
        name:'小组创收对比',
        key:'2',
        children:  <GroupIncome/>,
        isShowBtn:false
      }]
    }
  }
  componentDidMount() {

  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
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
        </div>
      </Container>
    );
  }
}

export default FamilyAndGroup;
