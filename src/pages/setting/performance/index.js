import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import BITabs from '@/ant_components/BITabs';

// const { TabPane } = Tabs;
const TabPane = BITabs.TabPane;

class qualityAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabType: 1,
    };
  }

  callback = key => {
    console.log(key);
  };
  onTabChange = val => {
    console.log(val, 'val');
  };
  render() {
    return (
      <div>
        <>
          <div>
            <BITabs
              onChange={this.onTabChange}
              defaultActiveKey={this.state.tabType}
              animated={false}
            >
              <TabPane tab="在途质检申诉" key={1}>
                <div>11111</div>
              </TabPane>
              <TabPane tab="结案质检申诉" key={2}>
                <div>22222</div>
              </TabPane>
            </BITabs>
          </div>
        </>
      </div>
    );
  }
}

export default qualityAppeal;
