import React from 'react';
import Xing1 from '@/assets/cube/xing1.png';
import Xing2 from '@/assets/cube/xing2.png';
import style from './style.less';

export default class Xing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { starLevel } = this.props;

    return (
        <div className={style.xing}>
          {starLevel>0?<img src={Xing2} alt=""/>:<img src={Xing1} alt=""/>}
          {starLevel>1?<img src={Xing2} alt=""/>:<img src={Xing1} alt=""/>}
          {starLevel>2?<img src={Xing2} alt=""/>:<img src={Xing1} alt=""/>}
          {starLevel>3?<img src={Xing2} alt=""/>:<img src={Xing1} alt=""/>}
          {starLevel>4?<img src={Xing2} alt=""/>:<img src={Xing1} alt=""/>}
        </div>
    );
  }
}
