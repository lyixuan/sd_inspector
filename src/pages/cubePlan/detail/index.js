import React from 'react';
import { connect } from 'dva';
import BIModal from '@/ant_components/BIModal';
import style from './style.less';
import LeftBox from './component/LeftBox';
import RightBox from './component/RightBox';
import BottomBox from './component/BottomBox';
import BIInput from '@/ant_components/BIInput';
import Xing from './component/Xing';
import sub from '@/assets/cube/sub.png';
import cal from '@/assets/cube/cal.png';


@connect(({ cubePlanDetail, cubePlan, loading }) => ({
  cubePlanDetail,
  cubePlan,
  pageLoading: loading.effects['cubePlanDetail/getCommentPage'],
  loading: loading.effects['cubePlanDetail/getCubeDetail'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visible2: false,
      titleName: '简单介绍',
      data: '',
      content:'',
      starLevel:0,
      outwardName:'段誉'
    };
  }

  componentDidMount() {
    const params = { id: 1 };

    this.props.dispatch({
      type: 'cubePlanDetail/getCubeDetail',
      payload: { params },
    });
    this.getCommentList();
  }

  getCommentList = (page) => {
    const { commentLists } = this.props.cubePlanDetail;
    const params = { id: 1, pageSize: 10, page: page + 1 || 1, commentLists };
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
    const { detailInfo = {}} = this.props.cubePlanDetail;
    this.setState({
      visible2: true,
      id:detailInfo.id,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      visible2: false,
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
    this.props.dispatch({
      type: 'cubePlanDetail/saveUserComment',
      payload: { ...params },
    }).then((res)=>{
      if(res){
        that.getCommentList();
      }
    });
    this.handleCancel()
  };



  render() {
    const {content,starLevel,outwardName} = this.state;
    const { pageLoading } = this.props;
    const { screenRange } = this.props.cubePlan;
    const { detailInfo = {}, commentData = {}, commentLists = [] } = this.props.cubePlanDetail;
    const { videoUrl, detailCoverUrl } = detailInfo || {};
    const { titleName, data } = this.state;
    return (
      <div className={screenRange === 'small_screen' ? style.layoutSmall : style.layoutMiddle}>
        <div>
          <LeftBox screenRange={screenRange} videoUrl={videoUrl} detailCoverUrl={detailCoverUrl}/>
          <RightBox screenRange={screenRange}
                    detail={detailInfo}
                    openModal={(type, data) => this.openModal(type, data)}/>
        </div>
        <div className={style.clear}/>
        <BottomBox screenRange={screenRange} pageLoading={pageLoading} commentData={commentData} commentLists={commentLists}
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
          onCancel={this.handleCancel}
        >
          <div className={style.bb}>
            <div>
              <span className={style.tt}>选个花名</span>：
              <span>选个花名</span>
            </div>
            <div>
              <span className={style.tt}>打分</span>：
              <span><Xing starLevel={starLevel}  clickXing={(lv)=>this.clickXing(lv)}/></span>
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
              <img onClick={this.handleCancel}  src={cal} alt=""/>
              <img onClick={this.submit} src={sub} alt=""/>
            </div>
          </div>
        </BIModal>
      </div>
    );
  }
}

export default CubePlanDetail;
