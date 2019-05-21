import React from 'react';
import BITabs from '@/ant_components/BITabs';

class AwaitAppealSpecialNewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <>
        <BITabs onChange={this.onTabChange} defaultActiveKey={this.state.tabType} animated={false}>
          <BITabs.TabPane tab="在途质检申诉" key={1}>
            <div>&优新;</div>
          </BITabs.TabPane>
        </BITabs>
      </>
    );
  }
}

export default AwaitAppealSpecialNewer;
