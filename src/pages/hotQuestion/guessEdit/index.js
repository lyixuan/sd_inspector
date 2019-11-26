import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import { Icon, Modal } from 'antd';
import styles from './style.less';
import router from 'umi/router';
import Line from './components/line';

const array = [1, 2];
const tHead = ['序号', '所属知识库', '所属分类', '标准问题']
class GuessEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardName: ''
    }
  }
  componentDidMount = () => {
    console.log(19, this.countArray())
  }
  handleBread = () => {
    router.push({
      pathname: '/hotQuestion/index'
    });
  }
  countArray = () => {
    let array = [];
    for (let i = 0; i < 27; i++) {
      array.push(i)
    }
    return array;
  }

  render() {
    const { cardName } = this.state;
    return (
      <div className={styles.editContainer}>
        <div className={styles.breadCustom}>
          <a onClick={this.handleBread}>首页/</a>配置编辑
        </div>
        <div className={styles.guessEdit}>
          <div className={styles.title}>猜你想问</div>

          <div className={styles.editTop}>
            <div className={styles.cardName}>
              <span>猜你想问卡片名称：</span>
              <BIInput
                style={{ width: '238px' }}
                placeholder="请输入"
                value={cardName}
              />
            </div>
            <div className={styles.labels}>
              <span>尚德学员</span>
              <span>尚小德</span>
            </div>
          </div>

          <div className={styles.editTable}>
            <ul className={styles.thead}>
              <li className={styles.eq0}>{tHead[0]}</li>
              <li className={styles.eq1}>{tHead[1]}</li>
              <li className={styles.eq2}>{tHead[2]}</li>
              <li className={styles.eq3}>{tHead[3]}</li>
              <li className={styles.eq4}>
                <div className={styles.icon}><Icon type="up-circle" />上移</div>
                <div className={styles.icon}><Icon type="down-circle" />上移</div>
              </li>
            </ul>
            <div className={styles.tbody}>
              {
                this.countArray().map((item, index) => {
                  return <Line index={index}></Line>
                })
              }

            </div>
          </div>


        </div>

      </div>
    )
  }
}

export default GuessEdit;
