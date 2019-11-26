import React from 'react';
import { connect } from 'dva';
import Carousel from './Carousel';
import styles from './style.less';
import banner from '@/assets/cube/banner.png';
import router from 'umi/router';

@connect(({ cubePlan }) => ({}))
class MCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDialogs = () => {
    this.props.onChangeDia(true);
  };

  goto = id => {
    router.push({
      pathname: '/cubePlan/list/detail',
      query: { params: JSON.stringify({ id }) },
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
      width: '1016px', //  screenRange === 'middle_screen' ? '1176px' : '1016px',
      height: '225px', // screenRange === 'middle_screen' ? '260px' : '225px',
    };
    return (
      <div
        className={styles.MCarousel}
        style={{ width: settings.width, height: settings.height, margin: '0 auto' }}
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
