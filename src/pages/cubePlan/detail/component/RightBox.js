import React from 'react';
import { Typography } from 'antd';
import {GetLength} from '@/utils/utils';
import style from './style.less';

const { Paragraph } = Typography;
class RightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openModal = (type,data) =>{
    this.props.openModal(type,data);
  };

  render() {
    const {detail,screenRange} = this.props || {};
    const {description,usageList=[],versionList = []} = detail||{};

    const usage = usageList && usageList.length>0 ? usageList.map((val,i)=>{
      return i<2&&(
        <div className={style.boxContent}>
        <Paragraph ellipsis={{ rows: 1 }}>
          {val.title}
        </Paragraph>
        <pre className={style.boxContentPre}>
            {val.content}
            </pre>
      </div>)
    }):<span>&nbsp;&nbsp;&nbsp;&nbsp;无</span> ;

    const usageAll = usageList && usageList.map((val)=>{
      return (
        <div className={style.boxContent}>
          <div>
            {val.title}
          </div>
          <pre className={style.boxContentPre}>
            {val.content}
            </pre>
        </div>)
    });
    const version = versionList && versionList.length>0 ? versionList.map((val,i)=>{
      return i<1&&(
        <div className={style.boxContent}>
          <div className={style.boxDate}>{val.publishDate}更新</div>
          {
            val.modifyList.map((item,idx)=>{
              return idx<2&&<div>
                <Paragraph ellipsis={{ rows: 1 }}>
                  {item.title}
                </Paragraph>
                <pre className={style.boxContentPre}>
                  {item.content}
                </pre>
              </div>
            })
          }
        </div>)
    }):<span>&nbsp;&nbsp;&nbsp;&nbsp;无</span>;
    return (
      <div className={screenRange === 'small_screen' ? style.rightBoxSmall : style.rightBoxMiddle}>
        <div><span className={style.titleLine}/> <span className={style.title}>报考通知</span></div>
        {/*简单介绍*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>简单介绍</span>
            <span onClick={()=>this.openModal('简单介绍',description)}>查看更多 &gt;</span>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 2 }}>
              {description||'无'}
            </Paragraph>
          </div>
        </div>
        {/*使用说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>使用说明</span>
            <span onClick={()=>this.openModal('使用说明',usageAll)}>查看更多 &gt;</span>
          </div>
          {usage}
        </div>
        {/*功能更新说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>功能更新说明</span>
            <span onClick={()=>this.openModal('功能更新说明',usageAll)}>查看更多 &gt;</span>
          </div>
          {version}
        </div>
      </div>
    );
  }
}

export default RightBox;
