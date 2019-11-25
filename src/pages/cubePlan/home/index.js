import React from 'react';
import { connect } from 'dva';
import MCarousel from '../component/MCarousel/MCarousel';
import PlanDia from './planDia';
import styles from './style.less';

// import styles from './style.less';

@connect(({ cubePlanDia, cubePlan }) => ({ cubePlanDia, cubePlan }))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cubePlanDia/getBannerList',
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
    const { bannerList } = this.props.cubePlanDia;
    const { showDia } = this.state;
    console.log(bannerList, 'bannerList');
    return (
      <div className={styles.cubePlanCon}>
        <MCarousel
          screenRange={screenRange}
          onChangeDia={this.onChangeDia}
          bannerList={bannerList}
        ></MCarousel>
        <PlanDia className={styles.dialogs} showDia={showDia} close={this.close} />
      </div>
    );
  }
}

export default Index;
