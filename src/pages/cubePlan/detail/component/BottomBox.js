import React from 'react';
import { Avatar,Spin } from 'antd';
import Xing from './Xing';
import kongmimade from '@/assets/kongmimade.png';
import lujing from '@/assets/cube/lujing.png'
import style from './style.less';

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
    this.props.openBBModal();
  };


  render() {
    const { screenRange, commentData ,commentLists} = this.props;

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
          <div className={style.boxBar}>
            <span>评价与建议</span>
            <span onClick={()=>this.openBBModal()}>我要评价  <img className={style.lujing} src={lujing} alt=""/></span>
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
