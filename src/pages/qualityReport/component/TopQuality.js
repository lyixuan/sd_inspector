import React from 'react';
import style from './style.less';

export default class TopQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  clickXing=(lv)=>{
    this.props.clickXing && this.props.clickXing(lv);
  };

  render() {
    const { top=10, type='class',cycle='current',linkTital='质检手册',linkRouter='',width=1280} = this.props;

    return (
        <div className={style.topQuality}>

        </div>
    );
  }
}
