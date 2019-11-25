import React from 'react';
import { connect } from 'dva';
import MCarousel from '../component/MCarousel/MCarousel';
import PlanDia from './planDia';
import styles from './style.less';

// import styles from './style.less';

@connect(({ cubePlan }) => ({ cubePlan }))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cubePlan/getBannerList',
    });
  }

  onChangeDia = showDia => {
    this.setState({ showDia });
  };

  close = showDia => {
    this.setState({ showDia });
  };

  render() {
    const { screenRange } = this.props.cubePlan;
    const { showDia } = this.state;
    return (
      <div className={styles.cubePlanCon}>
        <MCarousel screenRange={screenRange} onChangeDia={this.onChangeDia}></MCarousel>
        <PlanDia className={styles.dialogs} showDia={showDia} close={this.close} />
      </div>
    );
  }
}

export default Index;
