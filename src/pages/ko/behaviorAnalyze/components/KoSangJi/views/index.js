import React from 'react';
import styles from './index.less'

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
    };
  }
  componentDidMount() {

  }
  render() {
    const { pvuvData = {} } = this.props.behavior;
    const { bouncePercent, choicePercent, pv, uv } = pvuvData
    const dataObj = [{ name: 'PV', data: pv ? pv.toLocaleString() : pv }, { name: 'UV', data: uv ? uv.toLocaleString() : uv }, { name: '跳出率', data: bouncePercent }, { name: '选课后付费占比', data: choicePercent }]
    return (
      <div className={styles.contentWrap}>
        {
          dataObj.map((item, index) => {
            return (
              <div className={styles.itemCls} key={index}>
                <div className={styles.nameCls}>{item.name}</div>
                <div className={styles.dataCls}>{item.data}</div>
              </div>
            )
          })
        }

      </div>
    );
  }
}

export default Views;
