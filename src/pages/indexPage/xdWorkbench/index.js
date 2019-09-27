import React from 'react';
import { connect } from 'dva';
import Profit from './profit'
import PerformanceDetail from './performanceDetail';
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';
import CurrentCredit from './currentCredit'
import storage from '../../../utils/storage';

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class XdWorkbench extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: storage.getItem('admin_user').userId,
      isShowCredits: 20002
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'xdWorkModal/isShowPermission',
      payload: { params: {} },
      callback: (data) => {
        this.setState({
          isShowCredits: data.code
        })
      }
    });


  }
  render() {
    const { userId, isShowCredits } = this.state;
    return (
      <div className={styles.workbench}>
        <PerformanceDetail></PerformanceDetail>
        {
          isShowCredits !== 20002 ? <CurrentCredit></CurrentCredit> : null
        }

        <Profit userId={userId} />
        <div className={styles.qualityAppel}>
          <Quality userId={userId}/>
          <Appeal userId={userId} />
        </div>
      </div>
    );
  }
}

export default XdWorkbench;
