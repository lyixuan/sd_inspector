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
import level1 from '@/assets/classQuality/level1.png';
import level2 from '@/assets/classQuality/level2.png';
import level3 from '@/assets/classQuality/level3.png';
import level0 from '@/assets/classQuality/level0.png';

import styles from './style.less';

@connect(({ classQualityModel }) => ({
}))
class ClassQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: '',
      scrollbar: '',
    }
  }
  componentDidMount() {
    console.log(this.$container, 89888)
  }
  // back top
  handleTop = () => {
    console.log(this.$container)
    this.$container.scrollTop = 0;
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
          <span onClick={this.handleTop}><img src={topImg} alt=""/></span>
        </div>
        <div className={styles.search}>
          <img className={styles.icon} src={searchImg} alt=""/>
          <span style={{display: 'inline-block'}}><BIInput onChange={e => this.changeSearch(e.target.value)} value={this.state.searchData} placeholder="请输入要查找的手册内容" allowClear/></span>
          <BIButton onClick={this.handleSubmit} type="primary" style={{ marginLeft : '16px'}}>查询</BIButton>
          <BIButton onClick={() => this.handleSubmit('reset')} style={{ marginLeft : '8px'}}>重置</BIButton>
        </div>
        <div className={styles.treeCatalog}>
          <BIScrollbar refScrollbar={c => this.$container = c} style={{ width: '100%', height: '100%'}}>
            <div className={styles.catalog}>
              <div className={styles.title}>质检手册（班主任）</div>
              <div className={styles.level}>
                <div className={`${styles.class} ${styles.classA}`}>
                  徇私舞弊
                  <img src={level0} alt=""/>
                </div>
                <div className={styles.classB}>1. 禁止以利己为目的，利用用户权益舞弊</div>
                <div className={styles.classC}>1.1 操作用户账号</div>
                <div className={styles.classD}>2.2.1 IM场景违规舞弊</div>
                <div className={styles.classE}>质检细则</div>
                <div className={styles.detailed}>
                  禁止与用户沟通过程中老师主动恶意羞辱讽刺禁止与用户沟通过程中老师主动恶意羞辱讽刺禁止与用户沟通过程中老师主动恶意羞辱讽刺禁止与用户沟通过程中老师主动恶意羞辱讽刺
                </div>
              </div>
            </div>
          </BIScrollbar>
        </div>
      </div>
    )
  }
}

export default ClassQuality;
