import React from 'react';
import { connect} from 'dva';
import { message,Spin } from 'antd';
import BIModal from '@/ant_components/BIModal';
import style from './style.less';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import BottomBox from './component/BottomBox';
import BIInput from '@/ant_components/BIInput';
import Xing from './component/Xing';
import sub from '@/assets/cube/sub.png';
import cal from '@/assets/cube/cal.png';
import save from '@/assets/cube/save.png';
import text from '@/assets/cube/text.png';
import html2canvas from 'html2canvas';
import {BiFilter} from '@/utils/utils';

import { handleDataTrace } from '@/utils/utils';
import {takeScreenshot,downloadBase64} from '@/utils/screenshort';

let IMAGE_URL = '';
@connect(({ cubePlanDetail, cubePlan, loading }) => ({
  cubePlanDetail,
  cubePlan,
  pageLoading: loading.effects['cubePlanDetail/getCommentPage'],
  loadingBtn: loading.effects['cubePlanDetail/getCopyUrl'],
  loadingBtn2: loading.effects['cubePlanDetail/getCopyUrl'],
  loading:loading.effects['cubePlanDetail/getCommentPage']||loading.effects['cubePlanDetail/getCopyUrl'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible2: false,
      visible3: false,
      titleName: '简单介绍',
      data: '',
      content:'',
      starLevel:0,
      outwardName:''
    };
    const {id} = this.props.location.query;
    if(!id){
      message.error('缺少参数id')
    }
    this.id = Number(id);
    this.name='';
    window.scrollTo(0, -1);
  }

  componentDidMount() {
    const params = { id:this.id };

    this.props.dispatch({
      type: 'cubePlanDetail/getCubeDetail',
      payload: { params },
    }).then(()=>{
      const { detailInfo = {}} = this.props.cubePlanDetail;
      if(detailInfo.usedH5 && detailInfo.usedH5===1){
        this.urlChange(31);
      } else if(detailInfo.usedMp && detailInfo.usedMp===1){
        this.urlChange(11);
      }
      handleDataTrace({"widgetName":`查看详情`,"traceName":`魔方计划/魔方计划列表/${this.name}`});
    });
    this.props.dispatch({
      type: 'cubePlanDetail/getOutwardNameList',
      payload: { },
    });
    this.getCommentList();
  }

  urlChange =(type)=>{
    const params = { id:this.id,usedType:type };
    this.props.dispatch({
      type: 'cubePlanDetail/getCopyUrl',
      payload: {params },
    });
  };

  getCommentList = (page) => {
    const { commentLists } = this.props.cubePlanDetail;
    const params = { id: this.id, pageSize: 10, page: page + 1 || 1, commentLists };
    this.props.dispatch({
      type: 'cubePlanDetail/getCommentPage',
      payload: { params },
    });
  };

  openModal = (titleName, data) => {
    this.setState({
      visible: true,
      titleName,
      data,
    });
  };

  openBBModal = () => {
    const { detailInfo = {},OutwardName=[]} = this.props.cubePlanDetail;

    function random(lower, upper) {
      return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    const idx = random(0,OutwardName.length);

    const outwardName = OutwardName[idx] ? OutwardName[idx].outwardName : OutwardName[0].outwardName;
    this.setState({
      visible2: true,
      id:detailInfo.id,
      outwardName,
    });
  };

  openEwmModal = () => {
    const that = this;
    const { detailInfo = {} } = this.props.cubePlanDetail;
    const usedType = detailInfo.usedH5===1?31:null;
    const params = {id:this.id, usedType};
    if(usedType){
      this.props.dispatch({
        type: 'cubePlanDetail/getQRCode',
        payload: {params},
      }).then(()=>{
        that.setState({
          visible3: true,
        },()=>{
          setTimeout(function () {
            that.takeScreenshot();
          }, 100)
        });
      });
    } else {
      message.warn('获取二维码失败')
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visible2: false,
      visible3: false,
    });
  };
  handleCancel1 = () => {
    handleDataTrace({"widgetName":`取消`,"traceName":`魔方计划/${this.name}/评价`});
    this.setState({
      visible: false,
      visible2: false,
      visible3: false,
    });
  };


  onFormChange = (value) => {
    this.setState({
      content: value,
    });
  };

  clickXing = (lv) => {
    this.setState({
      starLevel: lv,
    });
  };

  submit = () => {
    const that = this;
    const {content,starLevel,outwardName,id} = this.state;
    const params = {content,starLevel,outwardName,id};
    if(starLevel===0){
      message.warn('请选择评分星级~')
      return;
    }
    handleDataTrace({"widgetName":`提交`,"traceName":`魔方计划/${this.name}/评价`});
    this.props.dispatch({
      type: 'cubePlanDetail/saveUserComment',
      payload: { ...params },
    }).then((res)=>{
      if(res){
        that.getCommentList();
        this.setState({
          content:'',
          starLevel:0,
          outwardName:''
        })
      }
    });
    this.handleCancel1()
  };

  takeScreenshot=()=>{
    const {shareContent, opts} = takeScreenshot();
    html2canvas(shareContent, opts).then(function (canvas) {
      IMAGE_URL = canvas.toDataURL("image/png");
      const copyDom = document.querySelector("#copyImage");
      copyDom.setAttribute('src',IMAGE_URL);
    })
  };

  saveScreenshot=()=>{
    handleDataTrace({"widgetName":`保存图片`,"traceName":`魔方计划/魔方计划列表/${this.name}/下载二维码`});
    downloadBase64(IMAGE_URL, 'h5二维码.png');
  };

  render() {

    const {content,starLevel,outwardName,visible3} = this.state;
    const { pageLoading,loadingBtn ,loadingBtn2,loading} = this.props;
    const { screenRange } = this.props.cubePlan;
    const { detailInfo = {}, commentData = {}, commentLists = [],qrCode ,copyUrl,copyBottomUrl} = this.props.cubePlanDetail;
    const { videoUrl, detailCoverUrl } = detailInfo || {};
    const { titleName, data } = this.state;

    this.name = detailInfo.name;
    const xingText = BiFilter(`Xing|id:${starLevel}`).name;
    return (
      <Spin  spinning={loading}><div className={screenRange === 'small_screen' ? style.layoutSmall : style.layoutMiddle}>
        <div>
          <LeftBox screenRange={screenRange} videoUrl={videoUrl} detailCoverUrl={detailCoverUrl} name={this.name}/>
          <RightBox screenRange={screenRange}
                    detail={detailInfo}
                    copyUrl={copyUrl}
                    copyBottomUrl={copyBottomUrl}
                    loadingBtn={loadingBtn}
                    loadingBtn2={loadingBtn2}
                    name={this.name}
                    openModal={(type, data) => this.openModal(type, data)}
                    openEwmModal={() => this.openEwmModal()}
          />
        </div>
        <div className={style.clear}/>
        <BottomBox name={this.name} screenRange={screenRange} pageLoading={pageLoading} commentData={commentData} commentLists={commentLists}
                   getCommentList={(pageNum) => {this.getCommentList(pageNum);}}
                   openBBModal={() => {this.openBBModal();}}/>

        <BIModal
          title={titleName}
          width={650}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <div className='cubeDetailModal'>
            <pre className={style.pre}>
              {data}
          </pre>
          </div>
        </BIModal>

        <BIModal
          title='评价'
          width={650}
          visible={this.state.visible2}
          footer={null}
          onCancel={this.handleCancel1}
        >
          <div className={style.bb}>
            <div>
              <span className={style.tt}>我的花名</span>：
              <span>{outwardName}</span>
            </div>
            <div>
              <span className={style.tt}>打分</span>：
              <span><Xing starLevel={starLevel}  clickXing={(lv)=>this.clickXing(lv)}/>  <span className={style.text}>{xingText}</span></span>
            </div>
            <div>
              <span className={style.tt}>评论内容</span>：
              <span>
                <BIInput.TextArea  maxLength={100} rows={4} value={content} placeholder={''}
                                  onChange={(e) => this.onFormChange(e.target.value)} />
              </span>
              <span className={style.moreText}>最多不超过100字</span>
            </div>
            <div className={style.btnfooter}>
              <img onClick={this.handleCancel1}  src={cal} alt=""/>
              <img onClick={this.submit} src={sub} alt=""/>
            </div>
          </div>
        </BIModal>

        <div className={visible3?style.modallayer:style.modallayer2}>
          <div className={style.videoInner}>
            <div id="shareContent" className={style.videoInner1}>
              <img src={detailInfo.coverUrl} alt="" width={376} height={279}/>
              <img src={text} alt="" width={195} style={{marginLeft:35}}/>
              <img src={qrCode} alt="" width={95} height={95} style={{marginLeft:30}}/>
            </div>
            <div className={style.btnfooter}>
              <img onClick={this.handleCancel}  src={cal} alt=""/>
              <img onClick={this.saveScreenshot} src={save} alt=""/>
            </div>
          </div>
        </div>
        <a id="dl-hidden" style={{display:'none'}} />
        <img src="" id="copyImage"  className={style.copyImage}/>
      </div>
      </Spin>
    );
  }
}

export default CubePlanDetail;
