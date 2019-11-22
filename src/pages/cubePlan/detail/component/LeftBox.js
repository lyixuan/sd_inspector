import React from 'react';
import style from './style.less';

class LeftBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { screenRange } = this.props;
    return (
      <div className={screenRange==='small_screen'?style.leftBoxSmall:style.leftBoxMiddle}>
      </div>
    );
  }
}

export default LeftBox;
