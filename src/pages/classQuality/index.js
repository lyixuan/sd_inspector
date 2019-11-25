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

const funArr = [
  {
    img: rulesImg,
    imgted: rulesImg1,
  }
]
const classStyles = {
  1: styles.classA,
  2: styles.classB,
  3: styles.classC,
  4: styles.classD,
  5: styles.classE
}
const levelImgs = {
  '特级违规': level0,
  '一级违规': level1,
  '二级违规': level2,
  '三级违规': level3,
}

@connect(({ classQualityModel }) => ({
  treeList: classQualityModel.treeList
}))
class ClassQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyWord: undefined, // 查询值
      scrollbar: '', // 滚动条
      funTypeSelected: 1 // 左侧悬浮滚动条
    }
  }
  componentDidMount() {
    console.log(this.$container, 89888)
    this.requestTree();
  }
  // 请求
  requestTree = (keyWord = this.state.keyWord) => {
    this.props.dispatch({
      type:'classQualityModel/getFindTreeList',
      payload: { params: { qualityType: 1, keyWord: keyWord === 'reset' ? undefined :  keyWord } }
    })
  }
  // 搜索条件 onChange
  changeSearch = v => {
    this.setState({ keyWord: v });
  }
  // 搜索条件 reset
  handleSubmit = v => {
    if (v === 'reset') {
      this.changeSearch();
      this.requestTree(v);
    } else {
      this.requestTree();
    }
  }
  // 左侧功能选择
  handleFun = type => {
    this.setState({ funTypeSelected: type });
    if (type === 3) {
      this.$container.scrollTop = 0;
    }
  }
  render() {
    const { funTypeSelected } = this.state;
    const { treeList = [] } = this.props;
    console.log(treeList,1234)
    return (
      <div className={styles.classQuality}>
        <div className={styles.functionBar}>
          <span onClick={() => this.handleFun(1)}><img src={funTypeSelected === 1 ? rulesImg1 : rulesImg} alt=""/></span>
          <span onClick={() => this.handleFun(2)} style={{ borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1', }}><img src={funTypeSelected === 2 ? detailImg1 : detailImg} alt=""/></span>
          <span onClick={() => this.handleFun(3)}><img src={funTypeSelected === 3 ? topImg1 : topImg} alt=""/></span>
        </div>
        <div className={styles.search}>
          <img className={styles.icon} src={searchImg} alt=""/>
          <span style={{display: 'inline-block'}}><BIInput onChange={e => this.changeSearch(e.target.value)} value={this.state.keyWord} placeholder="请输入要查找的手册内容" allowClear/></span>
          <BIButton onClick={this.handleSubmit} type="primary" style={{ marginLeft : '16px'}}>查询</BIButton>
          <BIButton onClick={() => this.handleSubmit('reset')} style={{ marginLeft : '8px'}}>重置</BIButton>
        </div>
        <div className={styles.treeCatalog}>
          <BIScrollbar onRefScrollbar={c => this.$container = c} style={{ width: '100%', height: '100%'}}>
            <div className={styles.catalog}>
              <div className={styles.title}>质检手册（班主任）</div>
              {treeList.map(item => <div key={item.id} className={styles.level}>
                <div className={`${styles.class} ${classStyles[item.level]}`}>
                  {item.violationName}
                  {item.violationLevel && <img src={levelImgs[item.violationLevel]} alt=""/>}
                </div>
                {/* <div className={styles.classB}>1. 禁止以利己为目的，利用用户权益舞弊</div>
                <span className={`${styles.class} ${styles.classC} ${styles.classBorder}`}>1.1 操作用户账号<img src={level0} alt=""/></span>
                <div className={styles.classD}>2.2.1 IM场景违规舞弊</div> */}
                { 
                  item.qualityDetaile && 
                  <>
                    <div className={styles.classE}>质检细则</div>
                    <div className={styles.detailed}>
                     {item.qualityDetaile}
                    </div>
                  </>
                }
              </div>)}
              
            </div>
          </BIScrollbar>
        </div>
      </div>
    )
  }
}

export default ClassQuality;
