import React from 'react';
import { connect } from 'dva';
import MCarousel from '../component/MCarousel/MCarousel';
import MCard from '../component/MCard/card';
import PlanDia from './planDia';
import VideoDia from './videoDia';
import styles from './style.less';
import { message } from 'antd';

// import styles from './style.less';

@connect(({ cubePlanDia, cubePlan }) => ({ cubePlanDia, cubePlan }))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceUrl: '',
      coverUrl: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'cubePlanDia/getBannerList',
    });
    this.props.dispatch({
      type: 'cubePlanDia/getCardList',
    });
    document.body.style.overflow = 'visible';
  }

  onChangeDia = showDia => {
    this.setState({ showDia });
    document.body.style.overflow = 'hidden';
  };

  close = showDia => {
    this.setState({ showDia });
    document.body.style.overflow = 'visible';
  };

  closeFn = showVideo => {
    this.setState({ showVideo });
    document.body.style.overflow = 'visible';
  };

  showVideoDia = (showVideo, sourceUrl, coverUrl) => {
    if (!sourceUrl) {
      message.success('该组件正在开发中，请期待～');
      return;
    }
    this.setState({ showVideo, sourceUrl, coverUrl });
    document.body.style.overflow = 'hidden';
  };

  render() {
    const { screenRange } = this.props.cubePlan;
    const { bannerList, cardList } = this.props.cubePlanDia;
    const { showDia, sourceUrl, showVideo, coverUrl } = this.state;
    return (
      <div className={styles.cubePlanCon}>
        <MCarousel
          className={styles.mCarousel}
          screenRange={screenRange}
          onChangeDia={this.onChangeDia}
          bannerList={bannerList}
        ></MCarousel>
        <MCard
          screenRange={screenRange}
          cardList={cardList}
          onChangeDia={this.onChangeDia}
          showVideoDia={(showVideo, url, coverUrl) => this.showVideoDia(showVideo, url, coverUrl)}
        />
        <PlanDia className={styles.dialogs} showDia={showDia} close={this.close} />
        <VideoDia
          showVideo={showVideo}
          sourceUrl={sourceUrl}
          coverUrl={coverUrl}
          close={this.closeFn}
        />
      </div>
    );
  }
}

export default Index;
