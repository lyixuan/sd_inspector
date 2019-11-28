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
      initialObjectFit:'cover',
    };

    return (
      <div className={styles.layer} style={{ display: showVideo ? 'block' : 'none' }}>
        <BIScrollbar style={{ width: '100%', height: '100%' }}>
          <div className={styles.mobile}>
            <img src={border} className={styles.border} />
            <div className={styles.videoInner}>
              {showVideo && <Player {...playerProps} />}
              <div onClick={this.close} className={styles.close}>
                <Icon type="close-circle" style={{ fontSize: '30px', color: '#fff' }} />
              </div>
            </div>
          </div>
        </BIScrollbar>
      </div>
    );
  }
}

export default VideoDia;
