import React from 'react';
import style from './style.less';
import {Input, Button, Select} from 'antd';

class HotQuestion extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const {Option} = Select;

    let tabsAndCopyButton = <div className={style.tabs}>
      <div className={style.tab}>
        <div className={style.each}>尚德学员</div>
        <div className={style.each}>非尚德学员</div>
      </div>
      <Button type="primary" className={style.button}>同步</Button>
    </div>;

    let chooseRobotArea = <div className={style['choose-robot']}>
      <div>
        <span className={style.label}>请选择：</span>
        <Select
          className={style.select}
          placeholder="请选择"
          defaultValue={185}>
          <Option value={185}>尚小德</Option>
          <Option value={195}>管理学院</Option>
        </Select>
      </div>
      {tabsAndCopyButton}
    </div>;

    return <div className={style.wrap}>
      {chooseRobotArea}
    </div>
  }
}

export default HotQuestion;
