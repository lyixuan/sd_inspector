import React from 'react';
import moment from 'moment';
import { Progress, Tooltip } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

@connect(() => ({

}))
class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: 1
    }
  }
  onTabChange = (val) => {
    this.setState({
      keye: val
    })
  };
  componentDidMount() {

  }


  render() {
    return (
      <div>score</div>
    );
  }
}

export default Score;
