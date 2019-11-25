import React from 'react';
import { connect } from 'dva';
import Carousel from './Carousel';
import styles from './style.less';
import banner from '@/assets/cube/banner.png';

@connect(({ cubePlan }) => ({}))
class MCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDialogs = () => {
    this.props.onChangeDia(true);
  };

  render() {
    // const { params } = this.props;
    const { screenRange } = this.props;
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      width: '1016px', //  screenRange === 'middle_screen' ? '1176px' : '1016px',
      height: '260px', //  screenRange === 'middle_screen' ? '260px' : '225px',
    };
    return (
      <div className={styles.MCarousel} style={{ width: settings.width, height: settings.height }}>
        <Carousel {...settings}>
          <div>
            <div onClick={this.openDialogs}>
              <img src={banner} style={{ width: settings.width }}></img>
            </div>
            <div>
              <h3>2</h3>
            </div>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default MCarousel;
