import React from 'react';
import { connect } from 'dva';
import MCarousel from '../component/MCarousel/MCarousel';
import MCard from '../component/MCard/card';
import PlanDia from './planDia';
import VideoDia from './videoDia';
import styles from './style.less';
import { message } from 'antd';
import { handleDataTrace } from '@/utils/utils';

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

  showVideoDia = (showVideo, sourceUrl, coverUrl, name, status) => {
    handleDataTrace({ widgetName: `播放视频`, traceName: `魔方计划/魔方计划列表/${name}` });
    if (!sourceUrl) {
      if (status === 1) {
        message.success('该组件还在创意中，欢迎老师提需求');
      }
      if (status === 2) {
        message.success('该组件正在开发中，请期待～');
      }

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
          showVideoDia={(showVideo, url, coverUrl, name, status) =>
            this.showVideoDia(showVideo, url, coverUrl, name, status)
          }
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
