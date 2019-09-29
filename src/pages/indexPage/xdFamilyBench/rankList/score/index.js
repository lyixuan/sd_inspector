import React from 'react';
import moment from 'moment';
import Wrap from './components/wrap'
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
      <div className={styles.scroeWrap}>
        <Wrap></Wrap>
      </div>

    );
  }
}

export default Score;
