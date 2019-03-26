import React from 'react';
import styles from './style.css';

export default class IllegalInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    this.state.data = this.props.data;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>质检违规日期：{this.state.data.violationDate}</div>
            <div>质检类型：{this.state.data.qualityType == 1 ? '客诉质检' : '班主任质检'}</div>
            <div>
              违规分类：{this.state.data.primaryAssortment}|{this.state.data.secondAssortment}|
              {this.state.data.thirdAssortment}
            </div>
          </div>
          <div className={styles.secRow}>
            <div>质检扣分日期：{this.state.data.reduceScoreDate}</div>
            <div>分维：{this.state.data.dimension}</div>
            <div>违规等级：{this.state.data.violationLevelName}</div>
          </div>
        </div>
        <div>
          <div className={`${styles.secCol} ${styles.secDesc}`}>
            <div>附件：</div>
            <div>{this.state.data.attUrl}</div>
          </div>
          <div className={`${styles.secCol} ${styles.secDesc}`}>
            <div>违规详情：</div>
            <div>{this.state.data.desc}</div>
          </div>
        </div>
      </section>
    );
  }
}
