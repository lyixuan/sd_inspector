import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import BITabs from '@/ant_components/BITabs';
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
    console.log(20,val)
    this.setState({
      keye: val
    })
  };
  render() {
    const {keye} = this.state;
    const {tabParams} = this.props;

    return (
      <div className={styles.topTab}>
        <BITabs onChange={this.onTabChange} type="card" activeKey={keye}>
          {tabParams.map((item, index) =>
            <TabPane tab={item.name} key={item.key}>
              <div keye={item.key}>{item.children}</div>
            </TabPane>
          )}
        </BITabs>
      </div>
    );
  }
}

export default TopTabs;
