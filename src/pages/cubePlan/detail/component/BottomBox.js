import React from 'react';
import style from './style.less';

export default class BottomBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { screenRange } = this.props;
    return (
      <div className={screenRange==='small_screen'?style.bottomBoxSmall:style.bottomBoxMiddle}>

      </div>
    );
  }
}
