import React from 'react';
import copy from 'copy-to-clipboard';
import { Icon } from 'antd';
import { connect } from 'dva';
import styles from '../../style.less';

class DetailBbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  handleClick = (e) => {
    // 复制
    copy(e.target.value)
    alert('复制成功', 1)
  }

  render() {
    return (
      <>
        <ul className={styles.userInfo}>
          <li className={styles.flex}>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员姓名：</span>
              <span className={styles.name + " " + styles.nameCurrent}>玉青1龙</span>
            </div>
            <div className={`${styles.row} ${styles.width50}`}>
              <span className={styles.label}>学员id：</span>
              <span className={styles.name}>388383</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>订单id：</span>
              <span className={styles.name}>899889</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>发帖时间：</span>
              <span className={styles.name}>2019.00.00</span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>关&nbsp;键&nbsp;词：</span>
              <span className={styles.name + " " + styles.labels}>
                <em>吐槽客服态度吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
                <em>吐槽客服态度</em>
              </span>
            </div>
          </li>
          <li className={styles.flex}>
            <div className={styles.row}>
              <span className={styles.label}>帖子详情：</span>
              <span className={styles.name}>
                上课时希望老师<i className={styles.keyword}>不靠谱</i>打比方的例子更好，可以夸张点，最重要的还事通俗易懂吧。然后就是
                老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词解释题目
                写上上课时希望老师多讲点打比方的例子更好，我要吐槽客服态度，最重要的还事通俗易懂然
                就是老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词解释
                题目写上上课时希望老师多讲点打比方的例子更好，可以夸张点，最重要的还事通俗易懂吧。
                然后就是老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词
                解释题目写上上课时希望老师多讲点打比方的例子更好，可以夸张点，最重要的还事通俗易懂
                吧。然后就是
                老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词解释题目
                写上上课时希望老师多讲点打比方的例子更好，可以夸张点，最重要的还事通俗易懂吧。然后
                就是老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词解释
                题目写上上课时希望老师多讲点打比方的例子更好，可以夸张点，最重要的还事通俗易懂吧。
                然后就是老师后面放个小黑板。提前把课堂要求写在那以及把这堂课的章节几个简答题和名词
                解释题目写上
              </span>
            </div>
          </li>
        </ul>
      </>
    );
  }
}

export default DetailBbs;

