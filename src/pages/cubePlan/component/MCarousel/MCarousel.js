import React from 'react';
import { connect } from 'dva';
import Carousel from './Carousel';
import styles from './style.less';
import banner from '@/assets/cube/banner.png';
import router from 'umi/router';
import { handleDataTrace } from '@/utils/utils';

@connect(({ cubePlan }) => ({}))
class MCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDialogs = () => {
    handleDataTrace({"widgetName":`魔方计划介绍`,"traceName":`魔方计划/魔方计划介绍`});
    this.props.onChangeDia(true);
  };

  goto = id => {
    router.push({
      pathname: '/cubePlan/list/detail',
      query: { id: JSON.stringify(id) },
    });
  };

  render() {
    // const { params } = this.props;
    const { screenRange, bannerList } = this.props;
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      width: screenRange === 'middle_screen' ? '1176px' : '1016px',
      height: screenRange === 'middle_screen' ? '260px' : '225px',
    };
    return (
      <div
        className={styles.MCarousel}
        style={{ width: settings.width, height: settings.height, margin: '24px auto 0' }}
      >
        <Carousel {...settings}>
          <div>
            <div onClick={this.openDialogs}>
              <img src={banner} style={{ width: settings.width }}></img>
            </div>
          </div>
          {bannerList &&
            bannerList.map(item => {
              return (
                <div onClick={() => this.goto(item.id)}>
                  <img src={item.bannerUrl} />
                </div>
              );
            })}
        </Carousel>
      </div>
    );
  }
}

export default MCarousel;
