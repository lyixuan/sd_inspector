import React, { Component } from 'react';
import starColor from '@/assets/starColor.png';
import starNone from '@/assets/starNone.png';

class Star extends Component {
  getStar() {
    const { star } = this.props;
    const stars = [];
    for(let i = 0; i < 5; i++ ) {
      if (i < star) {
        stars.push(starColor);
      } else {
        stars.push(starNone);
      }
    }
    return stars
  }
  render() {
    const stars = this.getStar();
    return (
      <span className="star" style={this.props.style || {}}>
        {stars.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                style={{ width: '12px', height: '12px', marginRight: '3px' }}
              />
            );
          })}
      </span>
    );
  }
}
export default Star;
