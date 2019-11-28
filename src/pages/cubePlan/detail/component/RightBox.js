import React from 'react';
import { Typography,message } from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import appid from '@/assets/cube/btn-appid.png';
import btnid from '@/assets/cube/btn-id.png';
import btndz from '@/assets/cube/btn-dz.png';
import btnewm from '@/assets/cube/btn-ewm.png';
import btnfz from '@/assets/cube/btn-fz.png';
import lujing from '@/assets/cube/lujing.png';

import style from './style.less';
import { handleDataTrace } from '@/utils/utils';

const { Paragraph } = Typography;
class RightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied:false
    };
  }

  openModal = (type,data) =>{
    handleDataTrace({"widgetName":`${type}-查看更多`,"traceName":`魔方计划/魔方计划列表/${this.props.name}`});
    this.props.openModal(type,data);
  };

  openEwmModal = (text,text2) =>{
    handleDataTrace({"widgetName":`${text}`,"traceName":`${text2}${this.props.name}`});
    this.props.openEwmModal();
  };

  copySuccess = (text,text2) =>{
    handleDataTrace({"widgetName":`${text}`,"traceName":`${text2}${this.props.name}`});
    message.success('复制成功')
  };

  render() {
    const {detail,screenRange,copyUrl} = this.props || {};
    const {description,usageList=[],versionList = [],name,usedMp,usedH5,mpOriginId,mpAppId,mpUrl,h5Url} = detail||{};

    const usage = usageList && usageList.length>0 ? usageList.map((val,i)=>{
      return i<2&&(
        <div className={style.boxContent} key={i}>
        <Paragraph ellipsis={{ rows: 1 }}>
          {val.title}
        </Paragraph>
        <pre className={style.boxContentPre}>
            {val.content}
            </pre>
      </div>)
    }):<span>&nbsp;&nbsp;&nbsp;&nbsp;暂无说明</span> ;

    const usageAll = usageList && usageList.map((val,i)=>{
      return (
        <div className={style.boxContent} key={i}>
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
        <div className={style.boxContent} key={i}>
          <div className={style.boxDate}>{val.publishDate}更新</div>
          {
            val.modifyList.map((item,idx)=>{
              return idx<2&&<div key={idx}>
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
    }):<span>&nbsp;&nbsp;&nbsp;&nbsp;暂无说明</span>;

    const versionAll = versionList && versionList.length>0 ? versionList.map((val,i)=>{
      return (
        <div className={style.boxContent} key={i}>
          <div className={style.boxDate}>{val.publishDate}更新</div>
          {
            val.modifyList.map((item,idx)=>{
              return <div key={idx}>
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
    }):<span>&nbsp;&nbsp;&nbsp;&nbsp;暂无说明</span>;
    return (
      <div className={screenRange === 'small_screen' ? style.rightBoxSmall : style.rightBoxMiddle}>
        <div><span className={style.titleLine}/> <span className={style.title}>{name}</span></div>
        {/*简单介绍*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>简单介绍</span>
            <span onClick={()=>this.openModal('简单介绍',description)}>查看更多 <img className={style.lujing} src={lujing} alt=""/></span>
          </div>
          <div className={style.boxContent}>
            <Paragraph ellipsis={{ rows: 2 }}>
              {description||'暂无介绍'}
            </Paragraph>
          </div>
        </div>
        {/*使用说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>使用说明</span>
            <span onClick={()=>this.openModal('使用说明',usageAll)}>查看更多 <img className={style.lujing} src={lujing} alt=""/></span>
          </div>
          {usage}
        </div>
        {/*功能更新说明*/}
        <div className="cubeDetail">
          <div className={style.boxBar}>
            <span>功能更新说明</span>
            {versionList.length>0&&<span onClick={()=>this.openModal('功能更新说明',versionAll)}>查看更多 <img className={style.lujing} src={lujing} alt=""/></span>}
          </div>
          {version}
        </div>
        <div className={style.btns}>
          {usedMp===1&&<CopyToClipboard text={mpOriginId}
                           onCopy={() => this.copySuccess('复制小程序原始ID','魔方计划/魔方计划列表/')}>
            <span><img src={btnid} alt=""/></span>
          </CopyToClipboard>}
          {usedMp===1&&<CopyToClipboard text={mpAppId}
                                        onCopy={() => this.copySuccess('复制小程序APPID','魔方计划/魔方计划列表/')}>
            <span><img src={appid} alt=""/></span>
          </CopyToClipboard>}
          {usedMp===1&&<CopyToClipboard text={mpUrl}
                                        onCopy={() => this.copySuccess('复制落地页','魔方计划/魔方计划列表/')}>
            <span><img src={btndz} alt=""/></span>
          </CopyToClipboard>}
          {usedH5===1&&<CopyToClipboard text={copyUrl}
                                        onCopy={() => this.copySuccess('复制链接','魔方计划/魔方计划列表/')}>
            <span><img src={btnfz} alt=""/></span>
          </CopyToClipboard>}
          {usedH5===1&&<img src={btnewm} alt="" onClick={()=>this.openEwmModal('下载二维码','魔方计划/魔方计划列表/')}/>}
        </div>
      </div>
    );
  }
}

export default RightBox;
