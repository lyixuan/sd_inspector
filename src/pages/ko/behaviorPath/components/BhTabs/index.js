import React from 'react';
import { Tabs } from 'antd';
import './style.less';

const TabPane = Tabs.TabPane;

class BhTabs extends React.Component {

  render() {
    return (
      <span className='BhTabs'>
        <Tabs {...this.props}>
          {this.props.children}
        </Tabs>
      </span>
    );
  }
}

export default BhTabs;
BhTabs.TabPane = TabPane;
