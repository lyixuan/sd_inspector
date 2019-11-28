import React from 'react';
import { connect } from 'dva';
import { Card, Typography, message } from 'antd';
// import Carousel from './Carousel';
import styles from './style.less';
import detail from '@/assets/cube/detail.png';
import icon1 from '@/assets/cube/icon1.png';
import icon2 from '@/assets/cube/icon2.png';
import blue from '@/assets/cube/blue.png';
import green from '@/assets/cube/green.png';
import gary from '@/assets/cube/gary.png';
import orange from '@/assets/cube/orange.png';
import newIdea from '@/assets/cube/newIdea.png';
import lightSpot from '@/assets/cube/lightSpot.png';
import greenTips from '@/assets/cube/greenTips.png';
import redTips from '@/assets/cube/redTips.png';
import blueTips from '@/assets/cube/blueTips.png';
import purpleTips from '@/assets/cube/purpleTips.png';
import videoIcon from '@/assets/cube/videoIcon.png';
import router from 'umi/router';

const { Paragraph } = Typography;

const { Meta } = Card;

@connect(({ cubePlan }) => ({}))
class MCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      idx: 0,
    };
  }

  openDialogs = () => {
    this.props.onChangeDia(true);
  };

  goto = id => {
    router.push({
      pathname: '/cubePlan/list/detail',
      query: { id: JSON.stringify(id) },
    });
  };

  handleEnter = (idx, e) => {
    this.setState({
      showVideo: true,
      idx,
    });
  };

  handleOut = idx => {
    this.setState({
      showVideo: false,
      idx,
    });
  };

  render() {
    const { showImg, showVideo, idx } = this.state;
    const { screenRange, cardList } = this.props;

    var settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      width: screenRange === 'middle_screen' ? '1176px' : '1016px',
      height: screenRange === 'middle_screen' ? '260px' : '225px',
    };
    return (
      <div className={screenRange === 'middle_screen' ? styles.middleCard : styles.smallCard}>
        <div className={styles.cardList}>
          {cardList &&
            cardList.map((item, index) => {
              return (
                <Card
                  className={styles.card}
                  onMouseEnter={() => this.handleEnter(index)}
                  onMouseLeave={() => this.handleOut(index)}
                  hoverable
                  cover={<img className={styles.imgCon} alt="" src={item.coverUrl} />}
                >
                  <div className={styles.meta}>
                    <div className={styles.top}>
                      <span className={styles.tips}>
                        <i>{item.name}</i>
                        {item.usedMp !== null && item.usedMp > 0 && (
                          <img src={icon1} className={styles.icon} />
                        )}
                        {item.usedH5 !== null && item.usedH5 > 0 && (
                          <img src={icon2} className={styles.icon} />
                        )}
                      </span>
                      <span className={styles.status}>
                        {item.stepStatus === 1 && <img className={styles.icon1} src={gary} />}
                        {item.stepStatus === 2 && <img className={styles.icon1} src={blue} />}
                        {item.stepStatus === 3 && <img className={styles.icon1} src={orange} />}
                        {item.stepStatus === 4 && <img className={styles.icon1} src={green} />}
                      </span>
                    </div>
                    <p className={styles.paragraph}>
                      <Paragraph ellipsis={{ rows: 2 }}>{item.description}</Paragraph>
                    </p>
                    {item.stepStatus === 1 && (
                      <div
                        className={styles.detail}
                        onClick={() => message.success('该组件还在创意中，欢迎老师提需求')}
                      >
                        <img src={detail} />
                      </div>
                    )}
                    {item.stepStatus === 2 && (
                      <div
                        className={styles.detail}
                        onClick={() => message.success('该组件正在开发中，请期待～')}
                      >
                        <img src={detail} />
                      </div>
                    )}
                    {(item.stepStatus === 3 || item.stepStatus === 4) && (
                      <div className={styles.detail} onClick={() => this.goto(item.id)}>
                        <img src={detail} />
                      </div>
                    )}
                  </div>
                  <div className={styles.tipsImg}>
                    {item.category === '报考' && <img src={redTips} />}
                    {item.category === '创收' && <img src={greenTips} />}
                    {item.category === '督学' && <img src={blueTips} />}
                    {item.category === 'IM增强' && <img src={purpleTips} />}
                  </div>
                  <div
                    className={styles.videoLayer}
                    style={{ display: showVideo && index === idx ? 'block' : ' none' }}
                  >
                    <div className={styles.layerCon}></div>
                    <img
                      src={videoIcon}
                      alt=""
                      onClick={() =>
                        this.props.showVideoDia(true, item.videoUrl, item.detailCoverUrl)
                      }
                    />
                  </div>
                </Card>
              );
            })}
          <Card
            className={styles.card}
            hoverable
            cover={<img className={styles.imgCon} alt="" src={lightSpot} />}
          >
            <div className={styles.meta}>
              <div className={styles.top}>
                <span className={styles.tips}>
                  <i>你有金点子吗？</i>
                </span>
              </div>
              <p className={styles.paragraph}>
                <Paragraph ellipsis={{ rows: 2 }}>
                  你有需求，我有研发，你有金点子，我可以实现。
                </Paragraph>
              </p>
              <div className={styles.detail} onClick={() => this.props.onChangeDia(true)}>
                <img src={newIdea} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default MCard;
