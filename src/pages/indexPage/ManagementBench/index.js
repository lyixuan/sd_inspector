import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import styles from './style.less';
import ScoreContrast from './scoreContrast';
import Header from './header';
import IncomeCompare from './incomeCompare';
import ReactDOM from 'react-dom';
import IMPartLeft from './IMPartLeft';
import IMPartRight from './IMPartRight';
import NPSEvaluate from './NPSEvaluate';
@connect(xdWorkModal => ({
  xdWorkModal,
}))
class ManagementBench extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: storage.getItem('admin_user').userId,
    };
  }

  componentDidUpdate() {
    if (this.props.location) {
      const anchor = this.props.location.hash.replace('#', '');
      if (anchor) {
        const domElement = ReactDOM.findDOMNode(this.refs[anchor]);
        if (domElement) {
          domElement.scrollIntoView();
        }
      }
    }
  }

  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.workbench}>
        <Header />
        <IncomeCompare />
        <ScoreContrast ref="one" />
        <div className={styles.qualityAppel} ref="four">
          <IMPartLeft />
          <IMPartRight />
        </div>
        <NPSEvaluate ref="five" />
      </div>
    );
  }
}

export default ManagementBench;
