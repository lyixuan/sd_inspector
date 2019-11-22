import React from 'react';
import { connect } from 'dva';
import Carousel from './Carousel';
import './style.less';

@connect(({ classQualityModel }) => ({}))
class MCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="MCarousel">
        <Carousel autoplay dots>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
    );
  }
}

export default MCarousel;
