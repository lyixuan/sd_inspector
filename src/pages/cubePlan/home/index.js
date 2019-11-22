import React from 'react';
import { connect } from 'dva';
import MCarousel from '../component/MCarousel/MCarousel';

import styles from './style.less';

@connect(({ classQualityModel }) => ({}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <MCarousel></MCarousel>
      // <div>
      //   1111
      //   <MCarousel>
      //     <div>
      //       <h3>1</h3>
      //     </div>
      //     <div>
      //       <h3>2</h3>
      //     </div>
      //     <div>
      //       <h3>3</h3>
      //     </div>
      //     <div>
      //       <h3>4</h3>
      //     </div>
      //   </MCarousel>
      // </div>
    );
  }
}

export default Index;
