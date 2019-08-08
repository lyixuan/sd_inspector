import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIInput from '@/ant_components/BIInput';
import { Checkbox } from 'antd';
import styles from '../edit/style.less';

const { BIRangePicker } = BIDatePicker;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: this.props.itemList,
      initModel: [
        {
          levelLowerLimit: null,
          levelUpperLimit: null,
          upperClose: null,
          lowerClose: null,
          levelValue: '',
        },
      ],
    };
  }

  checkChangeLower = (item, e) => {
    console.log(e.target.checked);
    return 'checked' == (item.lowerClose || e.target.checked);
  };

  checkChangeUpper = (item, e) => {
    return 'checked' == (item.upperClose || e.target.checked);
  };
  // 添加好推绩效列表
  addItem = () => {
    const { itemList = [], initModel } = this.state;
    let newItemList = itemList.concat(initModel);
    this.setState({ itemList: newItemList });
  };

  // 删除好推绩效列表
  delItem = item => {
    const { itemList = [] } = this.state;
    if (itemList.length === 1) {
      console.warn('默认一条数据');
      return;
    }
    itemList.splice(itemList.findIndex(list => list.index === item.index), 1);
    this.setState({ itemList });
  };

  render() {
    const { itemList = [] } = this.state;
    console.log(itemList, 'itemList');
    return (
      <>
        <ul className={styles.listItem}>
          {itemList.map((item, idx) => (
            <li key={idx}>
              <div className={styles.itemLeft}>
                <p style={{ float: 'left', margin: '0' }}>
                  <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                    <BIInput placeholder="请输入" value={item.levelLowerLimit} />
                  </span>
                  <span>%</span>
                  <Checkbox
                    style={{ marginLeft: '5px' }}
                    checked
                    onChange={item => this.checkChangeLower}
                  >
                    闭区间
                  </Checkbox>
                </p>
                <span style={{ float: 'left', margin: '0 20px', lineHeight: '30px' }}>~</span>
                <p style={{ float: 'left', margin: '0' }}>
                  <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                    <BIInput placeholder="请输入" value={item.levelUpperLimit} />
                  </span>
                  <span>%</span>
                  <Checkbox style={{ marginLeft: '5px' }} onChange={item => this.checkChangeUpper}>
                    闭区间
                  </Checkbox>
                </p>
              </div>
              <div className={styles.itemMiddle}>
                <span>系数</span>
                <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                  <BIInput placeholder="请输入" value={item.levelValue} />
                </span>
                <span>%</span>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.btn} onClick={() => this.delItem(item)}>
                  删除
                  {idx}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.addTable} onClick={this.addItem}>
          添加区间
        </p>
      </>
    );
  }
}

export default Tab;
