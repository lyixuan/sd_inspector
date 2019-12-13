import React from 'react';
import { Avatar,Spin } from 'antd';
import Xing from './Xing';
import kongmimade from '@/assets/kongmimade.png';
import lujing from '@/assets/cube/lujing.png'
import style from './style.less';
import { handleDataTrace } from '@/utils/utils';

export default class BottomBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  more=(pageNum)=>{
    this.props.getCommentList(pageNum);
  };

  openBBModal=()=>{
    handleDataTrace({"widgetName":`我要评价`,"traceName":`魔方计划/魔方计划列表/${this.props.name}`});
    this.props.openBBModal();
  };

  goToPage = () => {
    this.props.viewStatisticData();
  };


  render() {
    const { screenRange, commentData ,commentLists, id} = this.props;

    let viewDataFlag;
    if (id === 1 || id === 4) {
      viewDataFlag = true
    } else {
      viewDataFlag = false
    }

    const {pageNum,isLastPage} = commentData||{};

    const comment = commentLists.map((item,i) => {
      return <div className={style.btRow} key={i}>
        <div className={style.btLeft}>
          <Avatar size={60} src={item.imageUrl} />
        </div>
        <div className={style.btMiddle}>
          <div>{item.outwardName}</div>
          <div>发表于{item.createTime}</div>
        </div>
        <div className={style.btRight}>
          <Xing starLevel={item.starLevel}/>
          <div>{item.content?item.content:`系统：【${item.outwardName}】没有留言`}</div>
        </div>
      </div>
    });

    return (
      <div className={screenRange==='small_screen'?style.bottomBoxSmall:style.bottomBoxMiddle}>
        <Spin spinning={this.props.pageLoading}>
          <div className={style['boxBar-bottom']}>
            <div>
              <span className={style.comment}>评价与建议<span className={style.line}> </span></span>
              {
                viewDataFlag
                  ? <span onClick={this.goToPage} className={style.view}>查看数据统计</span>
                  : null
              }
            </div>
            <span
              onClick={()=>this.openBBModal()}
              className={style.public}>
              我要评价  <img className={style.lujing} src={lujing} alt=""/>
            </span>
          </div>
          <div className={style.boxContent}>
            {commentLists.length>0?comment:<div className={style.kong}>
              <img src={kongmimade} alt=""/>
              <span>快来抢沙发，留下你的评论。</span>
            </div>}
          </div>
          {commentLists.length>0&&
            <div className={style.footer}>
              {isLastPage?<span>没有更多了</span>:<span onClick={()=>this.more(pageNum)}>查看更多</span>}
            </div>}
        </Spin>
      </div>
    );
  }
}
