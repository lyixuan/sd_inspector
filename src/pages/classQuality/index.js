import React from 'react';
import { connect } from 'dva';
import { Anchor, BackTop, Tooltip } from 'antd';
import BIScrollbar from '@/ant_components/BIScrollbar';
import BILoading from '@/components/BILoading';
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
import noImg from '@/assets/classQuality/nodata.png';
import changeImg from '@/assets/classQuality/change.png';
import changeImg1 from '@/assets/classQuality/change1.png';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';
import moment from 'moment';

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
const getMoemnt = function (date) {
  return moment(date).format('YYYY.MM.DD')
}
@connect(({ global, classQualityModel, loading }) => ({
  globalCollapsed: global.collapsed,// 左侧二级下单是否打 
  flatTreeList: classQualityModel.flatTreeList,
  logTreeList: classQualityModel.logTreeList,
  dateRange: classQualityModel.dateRange,
  dateChangeRange: classQualityModel.dateChangeRange,
  loading: loading.effects['classQualityModel/getFindTreeList'],
}))
class ClassQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qualityType: 1,
      typeName: '客诉',
      setFixed: '', // serach类名
      keyWord: undefined, // 查询值
      scrollbar: '', // 滚动条
      funTypeSelected: 2 ,// 左侧悬浮滚动条
      rulesObj: {},
      oneLoding: true,
      resetKeyWord: undefined
    }
  }
  componentDidMount() {
    // 数据
    const qualityType = this.getQualityType(this.props.location.pathname);
    const params = this.props.location.query.params;
    const { keyWord } = params ? JSON.parse(params) : {};
    this.setState({
      resetKeyWord: keyWord,
      keyWord,
      qualityType,
      typeName: typeTranslate[qualityType]
    }, () => {
      this.requestTree();
      // 质检记录时间
      this.props.dispatch({
        type:'classQualityModel/getDateRange',
        payload: { params: { qualityType }}
      })
      // 变更记录最近时间
      this.props.dispatch({
        type:'classQualityModel/getLastModifyDate',
        payload: { params: { qualityType }}
      })
    }) 
    // 表格添加滚动事件
    if (document.body) {
      document.body.onscroll = (e) => {
        const val = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (val > 0 && !this.state.setFixed) {
          this.setState({ setFixed: styles.searchFixed})
        } else if (val <= 0 && this.state.setFixed) {
          this.setState({ setFixed: ''})
        }
      }
    }
  }
  componentWillUnmount() {
    if (document.body) {
      document.body.onscroll = '';
    }
    this.props.dispatch({
      type:'classQualityModel/getInitList',
    })
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
      payload: { params: { qualityType: this.state.qualityType, keyWord: keyWord === 'reset' || !keyWord ? undefined :  keyWord.trim() } },
      callback: () => {
        // this.setState({
        //   flatTreeList,
        //   logTreeList
        // })
        if (this.state.oneLoding) {
          this.setState({
            oneLoding: false
          })
        }
        const val = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (val !== 0) {
          document.documentElement.scrollTop = 0;
        }
      }
    })
    const { typeName } = this.state;
    if (keyWord === 'reset') {
      handleDataTrace({"widgetName":`手册查询重置-${typeName}`,"traceName":`质检管理/${typeName}质检手册/手册查询重置`});
    } else {
      handleDataTrace({"widgetName":`手册查询确认-${typeName}`,"traceName":`质检管理/${typeName}质检手册/手册查询确认`});
    }
  }
  // 搜索条件 onChange
  changeSearch = v => {
    this.setState({ keyWord: v });
  }
  // 搜索条件 reset
  handleSubmit = v => {
    if (v === 'reset') {
      // const { resetKeyWord } = this.state;
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
    const { typeName } = this.state;
    if (type === 1) {
      handleDataTrace({"widgetName":`目录按钮点击-${typeName}`,"traceName":`质检管理/${typeName}质检手册/目录按钮点击`})
    } else if (type === 2) {
      handleDataTrace({"widgetName":`质检记录按钮点击-${typeName}`,"traceName":`质检管理/${typeName}质检手册/质检记录按钮点击`});
    } 
  }
  // 是否显示标注
  getIsShowTag = item => {
    const { funTypeSelected } = this.state;
    if (((item.violationNumber || item.personNumber) && funTypeSelected === 2) || (funTypeSelected === 3 && item.modifyType === 2)) {
      return styles.classSelected2;
    } else if (funTypeSelected === 3 && item.modifyType === 1) {
      return styles.classSelected3;
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
    const { typeName } = this.state;
    handleDataTrace({"widgetName":`质检细则-${typeName}`,"traceName":`质检管理/${typeName}质检手册/质检细则`});
  }
  // 手册关闭
  handleClose = () => {
    if (this.state.funTypeSelected === 1) {
      this.setState({ funTypeSelected: '' });
    }
  }
  render() {
    const { funTypeSelected, setFixed, rulesObj, typeName, oneLoding} = this.state;
    const {  dateRange = {}, globalCollapsed, loading, logTreeList = [], flatTreeList = [] } = this.props;
    const isLoading = loading && oneLoding ? true : false;
    const flagNoData = !isLoading && flatTreeList.length === 0 ? true : false;
    return (
      <BILoading isLoading={isLoading} style={{height: 'auto'}}>
        <div className={styles.classQuality}>
          {/* 左侧功能条 */}
          <div className={styles.functionBar}>
            <Tooltip title="手册目录" placement="right">
              <span onClick={() => this.handleFun(1)}><img src={funTypeSelected === 1 ? rulesImg1 : rulesImg} alt=""/></span>
            </Tooltip>
            <Tooltip title="质检记录" placement="right">
              <span onClick={() => this.handleFun(2)} style={{ borderTop: '1px solid #E1E1E1' }}><img src={funTypeSelected === 2 ? detailImg1 : detailImg} alt=""/></span>
            </Tooltip>
            <Tooltip title="变更记录" placement="right">
              <span onClick={() => this.handleFun(3)} style={{ borderTop: '1px solid #E1E1E1', borderBottom: '1px solid #E1E1E1', }}><img src={funTypeSelected === 3 ? changeImg1 : changeImg} alt=""/></span>
            </Tooltip>
            <span>
              <BackTop visibilityHeight={-1000}>
                <img src={topImg} alt=""/>
              </BackTop>
            </span>
          </div>
          {/* 右侧导航条 */}
          { funTypeSelected === 1 && logTreeList.length > 0 ?
            <div className={styles.navigation}>
              <div className={styles.title}> 
              {typeName}手册目录
              <img onClick={this.handleClose} src={closeImg} alt=""/>
              </div>
              <BIScrollbar style={{ maxHeight: 400 }}>
                <Anchor targetOffset={200}>
                  {logTreeList.map((item, index) => <Link href={`#Anchor${item.id}`}  key={item.id} title={item.violationName} />)}
                </Anchor>
              </BIScrollbar>
            </div> : ''
          }
          <div className={setFixed}>
            <div className={styles.search}>
              <img className={styles.icon} src={searchImg} alt=""/>
              <span style={{display: 'inline-block'}}><BIInput onChange={e => this.changeSearch(e.target.value)} value={this.state.keyWord} onPressEnter={this.handleSubmit} placeholder="请输入要查找的手册内容" allowClear/></span>
              <BIButton loading={this.props.loading} onClick={this.handleSubmit} type="primary" style={{ marginLeft : '16px'}}>查询</BIButton>
              <BIButton onClick={() => this.handleSubmit('reset')} style={{ marginLeft : '8px'}}>重置</BIButton>
            </div>
          </div>
          <div className={styles.treeCatalog}>
            <div className={`${styles.catalog} ${flagNoData ? styles.catalogNoData : ''}`}>
              <div className={styles.title}>质检手册（{typeName})
              <div className={styles.dateChange}>最近更新时间：{this.props.dateChangeRange}</div> 
              </div>
             {   
               !flagNoData ? 
               <>
                {
                  flatTreeList.map((item, index) => <div key={item.id + '' + index} id={`Anchor${item.id}`}  className={styles.level}>
                  <div className={`${styles.class} ${classStyles[item.level]} ${this.getIsShowTag(item)}`}>
                    {item.level !== 5 ? <span className={styles.violationName}>
                      {item.violationName}
                      {item.violationLevel && <img src={levelImgs[item.violationLevel]} alt=""/>}
                    </span> : <Tooltip 
                    title={`点击${rulesObj[item.id] ? '关闭' : '查看'}质检细则`} 
                    placement="right">
                      <span onClick={() => this.getQualityDetaile(item.id)} className={styles.violationName}>质检细则</span>
                    </Tooltip>}
                    {/* 违规 */}
                    { 
                      this.getIsShowTag(item) &&
                      <span className={styles.tagging}>
                        <span>
                          {funTypeSelected === 2 ? <>违规次数：{item.violationNumber}次 <br/>违规人数：{item.personNumber}人</> : ''}
                          {funTypeSelected === 3 && item.modifyDate ? <>{getMoemnt(item.modifyDate)} <br/>{item.modifyTag}</> : ''}
                        </span>
                      </span>
                    }
                  </div>
                  { 
                    item.qualityDetaile && 
                    <>
                      {rulesObj[item.id] &&
                        <div className={styles.detailed}>
                          {/* {item.qualityDetaile} */}
                          <span dangerouslySetInnerHTML={{ __html: item.qualityDetaile }}></span>
                        </div>
                      }
                    </>
                  }
                  </div>)
                  } 
                </> : <span className={styles.noData}> <img src={noImg} alt=""/> <br/>抱歉，没有搜索到相关内容~</span> 
              }  
            </div> 
            {funTypeSelected === 2 && !isLoading ? <div className={styles.catalogTime}>
              <span>近30天集团质检记录</span>
              <span>{dateRange.startTime}-{dateRange.endTime}</span>
            </div> : ''}
            {funTypeSelected === 3 && !isLoading ? <div className={styles.catalogTime}>
              <span>质检手册更新记录</span>
              <span></span>
            </div> : ''}
          </div>
        </div>
      </BILoading>
    )
  }
}

export default ClassQuality;
