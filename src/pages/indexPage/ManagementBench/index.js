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
      date: {
        startDate: null,
        kpiMonth: null,
        endDate: null,
      },
    };
  }

  componentDidMount() {
    this.props
      .dispatch({
        type: 'xdWorkModal/getCurrentDateRange',
        payload: { params: { userType: 'family' } },
      })
      .then(res => {
        this.setState({
          date: {
            startDate: res.startDate,
            endDate: res.endDate,
            kpiMonth: res.kpiMonth,
          },
        });
      });
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
    const { date } = this.state;
    return (
      <div className={styles.workbench}>
        <Header date={date} />
        <IncomeCompare date={date} />
        <ScoreContrast ref="one"  />
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
