import React from 'react';
import Player from 'griffith'
import fm from '@/assets/cube/fengmian.png';
import bg from '@/assets/cube/video-bg.png';
import newIdea from '@/assets/cube/newIdea.png';
import style from './style.less';

class LeftBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { screenRange } = this.props;
    const sources = {
      hd: {
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
      },
      // sd: {
      //   play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
      // },
    }

    const playerProps = {
      sources,
      initialObjectFit:'contain',
      locale:'en',
      shouldObserveResize:true,
      cover:newIdea,
    };
    return (
      <div className={screenRange==='small_screen'?style.leftBoxSmall:style.leftBoxMiddle}>
        <img src={bg} alt="" className={style.videoBg}/>
        <div className={style.videoInner}>
          <Player {...playerProps}/>
        </div>
      </div>
    );
  }
}

export default LeftBox;
