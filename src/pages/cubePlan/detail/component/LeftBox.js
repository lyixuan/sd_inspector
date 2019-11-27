import React from 'react';
import Player from 'griffith'
import bg from '@/assets/cube/video-bg.png';
import style from './style.less';

class LeftBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { screenRange,detailCoverUrl,videoUrl } = this.props;
    const sources = {
      hd: {
        play_url: videoUrl,
      },
    };

    const playerProps = {
      sources,
      initialObjectFit:'contain',
      locale:'en',
      shouldObserveResize:true,
      cover:detailCoverUrl,
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
