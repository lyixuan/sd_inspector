import React from 'react';
import { connect } from 'dva';
import { Anchor, BackTop, Tooltip } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import searchImg from '@/assets/classQuality/search.png';
import rulesImg from '@/assets/classQuality/func1.png';
import detailImg from '@/assets/classQuality/func2.png';
import topImg from '@/assets/classQuality/func3.png';
import rulesImg1 from '@/assets/classQuality/fun1.png';
import detailImg1 from '@/assets/classQuality/fun2.png';
import level1 from '@/assets/classQuality/level1.png';
import level2 from '@/assets/classQuality/level2.png';
import level3 from '@/assets/classQuality/level3.png';
import level0 from '@/assets/classQuality/level0.png';
import closeImg from '@/assets/classQuality/delete.png';
import styles from './style.less';

const { Link } = Anchor;
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
const typeTranslate = {
  1: '客诉',
  2: '班主任',
}
@connect(({ classQualityModel, loading }) => ({
  dateRange: classQualityModel.dateRange,
  logTreeList: classQualityModel.logTreeList,
  flatTreeList: classQualityModel.flatTreeList,
  loading: loading.effects['xdClsssModal/getCountCurrentQuality'],
}))
class ClassQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityType: 1,
      setFixed: '', // serach类名
      keyWord: undefined, // 查询值
      scrollbar: '', // 滚动条
      funTypeSelected: 2 ,// 左侧悬浮滚动条
      rulesObj: {}
    }
  }
  componentDidMount() {
    // 时间
    this.props.dispatch({
      type:'classQualityModel/getDateRange',
    })
    // 数据
    this.setState({
      qualityType: this.getQualityType(this.props.location.pathname)
    }, () => this.requestTree()) 
    // 表格添加滚动事件
    if (document.body) {
      document.body.onscroll = (e) => {
        const val = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (val > 54 && !this.state.setFixed) {
          this.setState({ setFixed: styles.searchFixed})
        } else if (val <= 54 && this.state.setFixed) {
          this.setState({ setFixed: ''})
        }
      }
    }
  }
  componentWillUnmount() {
    if (document.body) {
      document.body.onscroll = '';
    }
  }
  getQualityType = urlStr => {
    const type = Number(urlStr.match('[^/]+(?!.*/)')[0]);
    if (type === 1 || type === 2) {
      return type;
    } else {
      return 1;
    }   
  }
  // 请求
  requestTree = (keyWord = this.state.keyWord) => {
    this.props.dispatch({
      type:'classQualityModel/getFindTreeList',
      payload: { params: { qualityType: this.state.qualityType, keyWord: keyWord === 'reset' ? undefined :  keyWord } },
      callback: () => {
        const val = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (val !== 0) {
          document.documentElement.scrollTop = 0;
        }
      }
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
    if (this.state.funTypeSelected === type) {
      this.setState({ funTypeSelected: '' });
    } else {
      this.setState({ funTypeSelected: type });
    }
  }
  // 是否显示标注
  getIsShowTag = item => {
    if ((item.violationLevel && this.state.funTypeSelected === 2) || item.level === 1) {
      return true;
    } else {
      return false;
    }
  }
  // 细则显示
  getQualityDetaile = id => {
    const { rulesObj } = this.state;
    this.setState({
      rulesObj: { ...rulesObj, [id]: !rulesObj[id]} 
    })
  }
  // 手册关闭
  handleClose = () => {
    if (this.state.funTypeSelected === 1) {
      this.setState({ funTypeSelected: '' });
    }
  }
  render() {
    const { funTypeSelected, setFixed, rulesObj, qualityType } = this.state;
    const { logTreeList = [], flatTreeList = [], dateRange = {} } = this.props;
    return (
      <div className={styles.classQuality}>
        {/* 左侧功能条 */}
        <div className={styles.functionBar}>
          <Tooltip title="手册目录" >
            <span onClick={() => this.handleFun(1)}><img src={funTypeSelected === 1 ? rulesImg1 : rulesImg} alt=""/></span>
          </Tooltip>
          <span onClick={() => this.handleFun(2)} style={{ borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1', }}><img src={funTypeSelected === 2 ? detailImg1 : detailImg} alt=""/></span>
          <span><BackTop visibilityHeight={-1000}><img src={topImg} alt=""/></BackTop></span>
        </div>
        {/* 右侧导航条 */}
        { funTypeSelected === 1 ?
          <div className={styles.navigation}>
            <div className={styles.title}> 
            {typeTranslate[qualityType]}手册目录
            <img onClick={this.handleClose} src={closeImg} alt=""/>
            </div>
            <Anchor>
              {logTreeList.map((item, index) => <Link href={`#Anchor${item.id}`}  key={item.id} title={item.violationName} />)}
            </Anchor>
          </div> : ''
        }
        <div className={setFixed}>
          <div className={styles.search}>
            <img className={styles.icon} src={searchImg} alt=""/>
            <span style={{display: 'inline-block'}}><BIInput onChange={e => this.changeSearch(e.target.value)} value={this.state.keyWord} placeholder="请输入要查找的手册内容" allowClear/></span>
            <BIButton onClick={this.handleSubmit} type="primary" style={{ marginLeft : '16px'}}>查询</BIButton>
            <BIButton onClick={() => this.handleSubmit('reset')} style={{ marginLeft : '8px'}}>重置</BIButton>
          </div>
        </div>
        <div className={styles.treeCatalog}>
          <div className={styles.catalog}>
            <div className={styles.title}>质检手册（{typeTranslate[qualityType]}）</div>
            {flatTreeList.map((item, index) => <div key={item.id + '' + index} id={`Anchor${item.id}`}  className={styles.level}>
              <div className={`${styles.class} ${classStyles[item.level]} `}>
                <span className={`${styles.violationName} ${this.getIsShowTag(item) ? styles.classBorder : ''}`}>
                  {item.violationName}
                  {item.violationLevel && <img src={levelImgs[item.violationLevel]} alt=""/>}
                </span>
                {/* 违规 */}
                { 
                  this.getIsShowTag(item) &&
                  <span className={styles.tagging}>
                    <span>
                      违规次数：{item.violationNumber}次 <br/>违规人数：{item.personNumber}人
                    </span>
                  </span>
                }
              </div>
              { 
                item.qualityDetaile && 
                <>
                  <div onClick={() => this.getQualityDetaile(item.id)} className={styles.classE}>质检细则</div>
                  {rulesObj[item.id] &&
                    <div className={styles.detailed}>
                      {item.qualityDetaile}
                    </div>
                  }
                </>
              }
            </div>)}
          </div> 
          {funTypeSelected === 2 ? <div className={styles.catalogTime}>
            <span>近30天集团质检记录</span>
            <span>{dateRange.startTime}-{dateRange.endTime}</span>
          </div> : ''}
        </div>
      </div>
    )
  }
}

export default ClassQuality;
