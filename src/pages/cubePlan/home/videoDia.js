import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import BIScrollbar from '@/ant_components/BIScrollbar';
import Player from 'griffith';
import border from '@/assets/cube/border.png';
import styles from './style.less';
import { message } from 'antd';

@connect(({ cubePlanDia }) => ({ cubePlanDia }))
class VideoDia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   showVideo: false,
    };
  }

  close = () => {
    this.props.close(false);
  };

  render() {
    const { showVideo, sourceUrl, coverUrl } = this.props;

    const sources = {
      hd: {
        // play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
        play_url: sourceUrl,
      },
    };

    const playerProps = {
      sources,
      initialObjectFit: 'contain',
      locale: 'en',
      shouldObserveResize: true,
      cover: coverUrl,
    };

    return (
      <div className={styles.layer} style={{ display: showVideo ? 'block' : 'none' }}>
        <BIScrollbar style={{ width: '100%', height: '100%' }}>
          <div className={styles.videoInner}>
            <img src={border} className={styles.border}/>
            {showVideo && <Player {...playerProps} />}
            <div onClick={this.close} className={styles.close}>
              <Icon type="close-circle" style={{ fontSize: '30px', color: '#fff' }} />
            </div>
          </div>
        </BIScrollbar>
      </div>
    );
  }
}

export default VideoDia;
