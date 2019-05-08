import React from 'react';
import { Tooltip } from 'antd';
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
  renderTooltipText = (keyname) => {
    let title = null;
    switch (keyname) {
      case 'PV':
        title = '统计周期内，访问该页面的浏览总次数';
        break;
      case 'UV':
        title = '统计周期内，访问该页面的总人数';
        break;
      case '跳出率':
        title = '统计周期内，从该页面跳出应用的人数/访问该页面的总人数。其中，跳出指10分钟内未在该页面发生任何的动作';
        break;
      case '选课后付费占比':
        title = '统计周期内，访问该页面的用户中选KO课后付费的人数/访问该页面的用户总数';
        break;
      default:
        break;
    }
    return (<span className={styles.tooltipTitle}>{title}</span>)
  }
  handleNumber = (num) => {
    if (!num) return num;
    if (num >= 10000) {
      return Number((num / 10000).toFixed(2)).toLocaleString() + '万';
    } else {
      return !num ? num : num.toLocaleString();
    }
  }
  render() {
    const { pvuvData = {} } = this.props.behavior;
    const { bouncePercent, choicePercent, pv, uv } = pvuvData
    const dataObj = [{ name: 'PV', data: pv ? this.handleNumber(pv) : pv }, { name: 'UV', data: uv ? this.handleNumber(uv) : uv }, { name: '跳出率', data: bouncePercent }, { name: '选课后付费占比', data: choicePercent }]
    return (
      <div className={styles.contentWrap}>
        {
          dataObj.map((item, index) => {
            return (
              <div className={styles.itemCls} key={index}>
                <Tooltip overlayClassName={styles.overlayClassName} placement="top" title={this.renderTooltipText(item.name)} arrowPointAtCenter={true}>
                  <span className={styles.nameCls}>{item.name}</span>
                </Tooltip>

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
