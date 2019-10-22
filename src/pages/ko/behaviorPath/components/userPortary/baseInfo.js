import React from 'react';
import { Icon,Divider,Row, Col} from 'antd';
import styles from './style.css';
import avatarStudent from '@/assets/avatarStudent.png';

export default class BaseInfo extends React.Component {
  render() {
    const { imageUrl, stuName, nickName, sex, age, city, collegeName, familyName, groupName, businessName, registerDate, serviceEndDate } = this.props.baseInfo || {};

    return (
      <div className={styles.userPortarit}>
        <div className={styles.left}>
          <img className={styles.avatar} src={imageUrl || avatarStudent} />
        </div>
        <div className={styles.right}>
          <div className={styles.name}>{stuName || nickName}</div>
          <div>
            <span className={styles.item}>{sex === '男' ? <Icon type="man" className={styles.sex}/> : <Icon type="woman" className={styles.sex}/>}</span>
            <span className={styles.item}>{age}岁</span>
            <span className={styles.item}>{city}</span>
            <span className={styles.item2}>{collegeName}{familyName && '/'}{familyName}{groupName && '/'}{groupName}</span>
            <span className={styles.item2}>{businessName}</span>
            <span className={styles.item2}>注册日期：{registerDate}</span>
            <span className={styles.item2}>过服日期：{serviceEndDate}</span>
          </div>
        </div>
        <Divider dashed/>
        <Row className={styles.row}>
          <Col span={4}>
            <div>图片</div>
            <div>学习主动性</div>
          </Col>
          <Col span={4}>
            <div>图片</div>
            <div>做题主动性</div>
          </Col>
          <Col span={4}>
            <div className={styles.icon}>1,899</div>
            <div>咨询量</div>
          </Col>
          <Col span={4}>
            <div>图片</div>
            <div>情绪状态</div>
          </Col>
          <Col span={4}>
            <div>图片</div>
            <div>IM不满意率</div>
          </Col>
          <Col span={4}>
            <div>图片</div>
            <div>做题准确率</div>
          </Col>
        </Row>
      </div>
    );
  }
}
