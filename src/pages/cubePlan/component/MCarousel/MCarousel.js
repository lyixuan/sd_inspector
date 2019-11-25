import React from 'react';
import { connect } from 'dva';
import Carousel from './Carousel';
import './style.less';
import banner from '@/assets/cube/banner.png';

@connect(({ classQualityModel }) => ({}))
class MCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // const { params } = this.props;
    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      width: '1176px',
      height: '260px',
    };
    return (
      <div class="MCarousel" style={{ width: settings.width, height: settings.height }}>
        <Carousel {...settings}>
          <div>
            <div>
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
