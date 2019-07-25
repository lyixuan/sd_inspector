import React from 'react';
import CreateGroup from './component/CreateGroup'
import GroupStatistics from './component/GroupStatistics'
import styles from './style.less';
import { connect } from 'dva';

@connect(({ }) => ({}))
class aiWorktable extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'koPlan/getCurrentTime'
    });
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
