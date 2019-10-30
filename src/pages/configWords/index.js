import React from 'react';
import {connect} from 'dva';
import {Radio} from 'antd';
import Keywords from '@/pages/configWords/keywords';
import style from './style.less';

class Config extends React.Component{
  constructor(props) {
    super(props);
    this.titleObj = {
      keywords: '关键词引导',
      entity: '实体词引导',
      combine: '组合词引导'
    };
    this.state = {
      showWhich: 'keywords'
    }
  }

  render() {
    const {currentResult, total} = this.props;
    const {showWhich} = this.state;

    let titleObj = this.titleObj;
    let titleText = titleObj[showWhich];

    return (
    <div className={style['content-wrap']}>
      <div className={style.header}>{titleText}</div>
      <div className={style.content}>
        <Radio.Group defaultValue={showWhich} onChange={this.onChangeTab} className={style['tabs']}>
          <Radio.Button value='keywords' className={style['tab-button']}>关键词</Radio.Button>
          <Radio.Button value='entity' className={style['tab-button']}>实体词</Radio.Button>
          <Radio.Button value='combine' className={style['tab-button']}>组合词</Radio.Button>
        </Radio.Group>
        <div className={style['item-content']}>
          {showWhich === 'keywords' ? <Keywords formData={currentResult} total={total}/> : null}
        </div>
      </div>
    </div>
    )
  }

  // 监听tab页改变
  onChangeTab = (e) => {
    this.setState({
      showWhich: e.target.value
    })
  }
}

export default
connect(({configWords}) => ({
  currentResult: configWords.searchResult,
  total: configWords.total
}))(Config);
