import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
// import Carousel from './Carousel';
import styles from './style.less';
import detail from '@/assets/cube/detail.png';
import icon1 from '@/assets/cube/icon1.png';
import icon2 from '@/assets/cube/icon2.png';
import blue from '@/assets/cube/blue.png';
import green from '@/assets/cube/green.png';
import gary from '@/assets/cube/gary.png';
import orange from '@/assets/cube/orange.png';
import router from 'umi/router';

const { Meta } = Card;

@connect(({ cubePlan }) => ({}))
class MCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openDialogs = () => {
    this.props.onChangeDia(true);
  };

  goto = id => {
    router.push({
      pathname: '/cubePlan/list/detail',
      query: { params: JSON.stringify({ id }) },
    });
  };

  render() {
    // const { params } = this.props;
    const { screenRange } = this.props;
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
        <Card
          className={styles.card}
          hoverable
          cover={
            <img
              className={styles.imgCon}
              alt="example"
              // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <div className={styles.meta}>
            <div className={styles.top}>
              <span className={styles.tips}>
                <i>报考通知</i>
                <img src={icon1} className={styles.icon} />
                <img src={icon2} className={styles.icon} />
              </span>
              <span className={styles.status}>
                <img src={orange} />
              </span>
            </div>
            <p>学员学习报告是针对学员，学习的阶段性总结报告， 使用于鼓励学员完成学习任务目标。</p>
            <div className={styles.detail}>
              <img src={detail} />
            </div>
          </div>
          {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
        </Card>
      </div>
    );
  }
}

export default MCard;
