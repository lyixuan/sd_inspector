import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIInput from '@/ant_components/BIInput';
import { Checkbox, Input } from 'antd';
import styles from '../edit/style.less';

const { BIRangePicker } = BIDatePicker;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
    };
    this.initModel = {
      index: 0,
      levelLowerLimit: null,
      levelUpperLimit: null,
      upperClose: false,
      lowerClose: false,
      levelValue: '',
    };
  }

  componentDidMount() {
    this.setState({ itemList: this.props.itemList });
  }

  // 添加好推绩效列表
  addItem = () => {
    // debugger;
    // const { itemList = [] } = this.state;
    const itemList = this.props.itemList || [];
    const newAddObject = { ...this.initModel };
    const indexArr = itemList.map((list, index) => {
      return (list.index = index);
    });
    newAddObject.index = indexArr.length > 0 ? Math.max.apply(null, indexArr) + 1 : 1;
    itemList.push(newAddObject);
    // this.setState({ itemList });
    this.onChange(itemList);
  };

  renderInput = (obj = {}, keyName, classname = '') => {
    return (
      <BIInput
        placeholder="请输入"
        dataname={keyName}
        value={obj[keyName]}
        onChange={e => this.changeInputValue(keyName, obj, e)}
        defaultValue={obj[keyName]}
      />
    );
  };

  renderCheckBox = (obj = {}, keyName, classname = '') => {
    return (
      <Checkbox
        dataname={keyName}
        checked={obj[keyName]}
        onChange={e => this.changeCheckboxValue(obj, e)}
      />
    );
  };

  changeInputValue = (key = '', item = {}, e) => {
    const target = e.currentTarget;
    const newObj = { ...item };
    let inputValue = target.value || '';
    inputValue = inputValue.replace(/。|\./g, '.');
    if (!/^(\d{0,9})(\.\d{0,2})?$/g.test(inputValue)) {
      return;
    }
    newObj[key] = inputValue;
    this.changeItemValue(newObj);
  };
  changeCheckboxValue = (item = {}, e) => {
    const { target = {} } = e;
    const { checked, dataname } = target;
    const newObj = { ...item };
    newObj[dataname] = checked;
    this.changeItemValue(newObj);
  };

  changeItemValue = obj => {
    const { itemList } = this.state;
    for (const item in itemList) {
      if (obj.index === itemList[item].index) {
        itemList[item] = obj;
        break;
      }
    }
    this.onChange(itemList);
  };
  // 删除好推绩效列表
  delItem = item => {
    const { itemList = [] } = this.state;
    if (itemList.length === 1) {
      console.warn('默认一条数据');
      return;
    }
    itemList.splice(
      itemList.findIndex(list => {
        console.log(list, item);
        return list.index === item.index;
      }),
      1
    );
    this.onChange(itemList);
  };

  onChange = itemList => {
    this.setState({ itemList });
    this.props.onChange(itemList);
  };
  render() {
    const itemList = this.props.itemList;
    return (
      <>
        <ul className={styles.listItem}>
          {itemList.map((item, idx) => (
            <li key={idx}>
              <div className={styles.itemLeft}>
                <p style={{ float: 'left', margin: '0' }}>
                  <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                    {this.renderInput(item, 'levelLowerLimit')}
                  </span>
                  {/* <span style={{ margin: '0 10px 0 0' }}>%</span> */}
                  {this.renderCheckBox(item, 'lowerClose')}
                  <span>闭区间</span>
                </p>
                <span style={{ float: 'left', margin: '0 20px', lineHeight: '30px' }}>~</span>
                <p style={{ float: 'left', margin: '0' }}>
                  <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                    {this.renderInput(item, 'levelUpperLimit')}
                  </span>
                  {/* <span style={{ margin: '0 10px 0 0' }}>%</span> */}
                  {this.renderCheckBox(item, 'upperClose')}
                  <span>闭区间</span>
                </p>
              </div>
              <div className={styles.itemMiddle}>
                <span>系数</span>
                <span style={{ width: '100px', display: 'inline-block', margin: '0 5px 0 8px' }}>
                  {this.renderInput(item, 'levelValue')}
                </span>
                {/* <span>%</span> */}
              </div>
              <div className={styles.itemRight}>
                <span className={styles.btn} onClick={() => this.delItem(item)}>
                  删除
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
