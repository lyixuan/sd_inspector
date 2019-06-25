import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import FirstCheckResult from '../components/FirstCheckResult';
import SecondCheckResult from '../components/SecondCheckResult';
import CreateAppeaRecord from '../components/CreateAppeaRecord';
import BaseInfo from '../components/BaseInfo';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';
import ShortcutButton from  '@/pages/scoreAppeal/components/ShortcutButton';
import AuthButton from '@/components/AuthButton';

@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo']||loading.effects['scoreAppealModel/queryAppealInfoCheckList'],
}))

class AppealCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      collapse2: true,
    };
  }
  componentDidMount(nextProps) {
    const {query={}} = nextProps?nextProps.location:this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: {params:{dimensionId:query.dimensionId,dimensionType:query.dimensionType}},
    });
    this.props.dispatch({
      type: 'scoreAppealModel/queryAppealInfoCheckList',
      payload: { params:{creditAppealId:query.id} },
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const {appealRecord:appealRecord1}=this.props.scoreAppealModel;
    const {appealRecord:appealRecord2}=nextProps.scoreAppealModel;
    if (appealRecord1[1]&&appealRecord2[1]&&appealRecord2[2]) {
      this.setState({collapse1:false})
    }
    const {query:query1} = this.props.location;
    const {query:query2} = nextProps.location;
    if(query1.id!==query2.id) {
      this.componentDidMount(nextProps);
    }
  }

  handleCollapse=(type)=> {
    if (type === 1){
      this.setState({
        collapse1: !this.state.collapse1
      });
    } else {
      this.setState({
        collapse2: !this.state.collapse2
      });
    }
  };
  onChangePage(ids,currentId,direction){
    let newId = null;
    let metaDimensionId = null;
    let creditType = null;
    let nextItem = null;
    ids.forEach((item,i)=>{
      const arr = item.split(',');
      if (direction==='up'){
        if (Number(arr[0])===Number(currentId)){
          if(i===0){
            nextItem=ids[ids.length-1]
          }else {
            nextItem=ids[i-1];
          }
        }
      } else {
        if (Number(arr[0])===Number(currentId)){
          if (i===ids.length-1) {
            nextItem = ids[0]
          } else {
            nextItem = ids[i+1];
          }
        }
      }
    });
    if (nextItem) {
      const tmpArr = nextItem.split(',');
      newId=tmpArr[0];
      metaDimensionId=tmpArr[1];
      creditType=tmpArr[3];
    }
    const {query={}} = this.props.location;
    const newQuery = {};
    newQuery.id = Number(newId);
    newQuery.dimensionId = Number(metaDimensionId); // 获取详情用id
    newQuery.creditType=Number(creditType);
    router.replace({
      pathname:'/scoreAppeal/onAppeal/detail',
      query:{
        ...query,...newQuery
      }
    });
  }

  onJumpAppeal(){
    const {query={}} = this.props.location;
    const {scoreAppealModel={}}=this.props;
    const {detailInfo={}}=scoreAppealModel;
    const checkQuery={
      id:query.id,
      dimensionId:query.dimensionId,        // 获取详情用
      creditType:query.creditType,  // 学分维度
      dimensionType:query.dimensionType,            // 申诉维度
      status:detailInfo.status,
      firstOrSec:(Number(detailInfo.status) === 1||Number(detailInfo.status) === 5)?1:(Number(detailInfo.status) === 2||Number(detailInfo.status) === 6)?2:null,// 1 一申，2 二申
      sopOrMaster:(Number(detailInfo.status) === 1||Number(detailInfo.status) === 2)?1:(Number(detailInfo.status) === 5||Number(detailInfo.status) === 6)?2:null,// 1 sop，2 master
    };
    router.push({query:checkQuery, pathname:'/scoreAppeal/onAppeal/checkAppeal'});
  }

  render() {
    const {query={}} = this.props.location;
    const {collapse1,collapse2} = this.state;
    const {loading,scoreAppealModel={}}=this.props;
    const {detailInfo={},appealRecord={}}=scoreAppealModel;
    const firstRecord = appealRecord[1];
    const SecondRecord = appealRecord[2];
    const { appealStart:appealStart1, sopAppealCheck:sopAppealCheck1, masterAppealCheck:masterAppealCheck1 } = firstRecord||{};
    const { appealStart:appealStart2, sopAppealCheck:sopAppealCheck2 , masterAppealCheck:masterAppealCheck2 } = SecondRecord||{};
    const idList = query.idList&&JSON.parse(query.idList);
    return (
      <Spin spinning={loading}>
      <div className={styles.appealContainer}>
        <BaseInfo detailInfo={detailInfo} dimensionType={query.dimensionType}/>
        {firstRecord&&(
          <div>
            <div className={styles.foldBox}>
              <span >一次申诉</span>
              <span onClick={()=>this.handleCollapse(1)}><img src={collapse1?imgdown:imgUp} width='18' height='18'/></span>
            </div>
            {collapse1&&(
              <div style={{paddingLeft:'15px'}}>
                {appealStart1&&<CreateAppeaRecord appealStart={appealStart1}/>}
                {sopAppealCheck1&&sopAppealCheck1.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck1}/>}
                {masterAppealCheck1&&<SecondCheckResult masterAppealCheck={masterAppealCheck1} firstOrSec ={true}
                                                        creditType={query.creditType}
                                                        dimensionType={query.dimensionType}/>}
                <div className={styles.spaceLine}/>
              </div>
            )}
          </div>
        )}
        {SecondRecord&&(
          <div>
            <div className={styles.foldBox}>
              <span >二次申诉 <span style={{fontWeight:'400',fontSize:14}}>{query.secondAppealEndDate? `(二次申诉截止日期：${query.secondAppealEndDate})`:''}</span></span>
              <span onClick={()=>this.handleCollapse(2)}><img src={collapse2?imgdown:imgUp} width='18' height='18'/></span>
            </div>
            {collapse2&&(
              <div style={{paddingLeft:'15px'}}>
                {appealStart2&&<CreateAppeaRecord appealStart={appealStart2}/>}
                {sopAppealCheck2&&sopAppealCheck2.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck2}/>}
                {masterAppealCheck2&&<SecondCheckResult masterAppealCheck={masterAppealCheck2} firstOrSec ={false}
                                                        creditType={query.creditType}
                                                        dimensionType={query.dimensionType}/>}
                <div className={styles.spaceLine}/>
              </div>
            )}
          </div>
        )}
        {query.isOnAppeal&&
        (AuthButton.checkPathname('/scoreAppeal/appeal/dockingMan')||
          AuthButton.checkPathname('/scoreAppeal/appeal/master'))&&
        <ShortcutButton ids={idList} currentId={query.id}
                        status={detailInfo.status}
                        onChangePage={(ids,currentId,direction)=>this.onChangePage(ids,currentId,direction)}
                        onJumpAppeal={(state)=>this.onJumpAppeal(state)}/>}
        <footer style={{ textAlign: 'right', marginTop: '20px' }}>
          <BIButton onClick={() => router.goBack()}>返回</BIButton>
        </footer>
      </div>
      </Spin>
    );
  }
}

export default AppealCheck;
