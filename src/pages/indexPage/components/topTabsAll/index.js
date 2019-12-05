import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BITabs from '@/ant_components/BITabs';
import CollegeScore from "@/pages/indexPage/components/scoreContrast/collegeScore";

const TabPane = BITabs.TabPane;
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class TopTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1'
    }
  }
  componentDidMount() {
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
    if(this.props.onTabChange){
      this.props.onTabChange({keye: val})
    }
  };
  render() {
    const { keye } = this.state;
    const { tabParams = [], propsData = {} } = this.props;
    return (
      <div className={styles.topTab} style={this.props.style}>
        <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
          {tabParams.map((item, index) => {
            const key = item.key || index + 1;
            return (
              <TabPane tab={item.name} key={key}>
                <div keye={key}>
                  <CollegeScore {...propsData} />
                </div>
              </TabPane>
            )
          }
          )}
        </BITabs>
        <div className={styles.topRight} style={this.props.rightStyles || {}}>{this.props.right}</div>
      </div>
    );
  }
}

export default TopTabs;
