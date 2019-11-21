import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIScrollbar from '@/ant_components/BIScrollbar';
import searchImg from '@/assets/classQuality/search.png';
import rulesImg from '@/assets/classQuality/func1.png';
import detailImg from '@/assets/classQuality/func2.png';
import topImg from '@/assets/classQuality/func3.png';
import rulesImg1 from '@/assets/classQuality/fun1.png';
import detailImg1 from '@/assets/classQuality/fun2.png';
import topImg1 from '@/assets/classQuality/fun3.png';

import styles from './style.less';

@connect(({ classQualityModel }) => ({
}))
class ClassQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: ''
    }
  }
  componentDidMount() {
    console.log(this.$container, 89888)
  }

  // 搜索条件 onChange
  changeSearch = v => {
    this.setState({
      searchData: v
    })
  }
  // 搜索条件 reset
  handleSubmit = v => {
    if (v === 'reset') {
      this.changeSearch('');
    }
    // 请求
  }
  render() {
    return (
      <div className={styles.classQuality}>
        <div className={styles.functionBar}>
          <span><img src={rulesImg} alt=""/></span>
          <span style={{ borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1', }}><img src={detailImg} alt=""/></span>
          <span><img src={topImg} alt=""/></span>
        </div>
        <div className={styles.search}>
          <img className={styles.icon} src={searchImg} alt=""/>
          <span style={{display: 'inline-block'}}><BIInput onChange={e => this.changeSearch(e.target.value)} value={this.state.searchData} placeholder="请输入要查找的手册内容" allowClear/></span>
          <BIButton onClick={this.handleSubmit} type="primary" style={{ marginLeft : '16px'}}>查询</BIButton>
          <BIButton onClick={() => this.handleSubmit('reset')} style={{ marginLeft : '8px'}}>重置</BIButton>
        </div>
        <div className={styles.treeCatalog}>
          <BIScrollbar refScrollbar={c => this.$container = c} style={{ width: '100%', height: '100%'}}>
            11111
          </BIScrollbar>
        </div>
      </div>
    )
  }
}

export default ClassQuality;
