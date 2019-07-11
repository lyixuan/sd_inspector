import React from 'react';
import CreateGroup from './component/CreateGroup'
import GroupStatistics from './component/GroupStatistics'
import styles from './style.less';

class aiWorktable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.reportExamTable}>
        <CreateGroup></CreateGroup>
        <GroupStatistics></GroupStatistics>
      </div>
    );
  }
}

export default aiWorktable;
