import React from 'react';
import router from 'umi/router';
import { Radio } from 'antd';
import styles from './index.less';

export default class RadioComponent extends React.Component {
  constructor(props){
    super(props);
    const {path} = props;
    this.state = {
      path,
    };
  }
  handleSizeChange = (e) => {
    this.setState({ path: e.target.value });
    router.push(e.target.value)
  };
  render(){
    const {path} = this.state;
    return(
      <div className={styles.contWrap}>
        <Radio.Group value={path} onChange={this.handleSizeChange}>
          <Radio.Button value="/smartPlatform/survey">报表概览</Radio.Button>
          <Radio.Button value="/smartPlatform/details">明细数据查询</Radio.Button>
        </Radio.Group>
      </div>
    )
  }
}
