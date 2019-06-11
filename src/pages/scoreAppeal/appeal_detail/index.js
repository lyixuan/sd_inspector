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
  componentDidMount() {
    const {query={}} = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: {params:{dimensionId:query.dimensionId,dimensionType:query.dimensionType}},
    });
    this.props.dispatch({
      type: 'scoreAppealModel/queryAppealInfoCheckList',
      payload: { params:{creditAppealId:query.id} },
    });
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
    let status = null;
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
      status=tmpArr[2];
      creditType=tmpArr[3];
    }
    console.log('nextItem',nextItem)
    const {query={}} = this.props.location;
    const newQuery = {};
    newQuery.id = Number(newId);
    newQuery.dimensionId = Number(metaDimensionId); // 获取详情用id
    newQuery.status=Number(status);
    newQuery.creditType=Number(creditType);
    router.replace({
      pathname:'/scoreAppeal/appeal_detail',
      query:{
        ...query,...newQuery
      }
    });
    this.componentDidMount();
  }

  onJumpAppeal(){
    const {query={}} = this.props.location;
    const checkQuery={
      id:query.id,
      dimensionId:query.dimensionId,        // 获取详情用
      creditType:query.creditType,  // 学分维度
      dimensionType:query.dimensionType,            // 申诉维度
      status:query.status,
      firstOrSec:(Number(query.status) === 1||Number(query.status) === 5)?1:(Number(query.status) === 2||Number(query.status) === 6)?2:null,// 1 一申，2 二申
      sopOrMaster:(Number(query.status) === 1||Number(query.status) === 2)?1:(Number(query.status) === 5||Number(query.status) === 6)?2:null,// 1 sop，2 master
    };
    router.push({query:checkQuery, pathname:'/scoreAppeal/checkAppeal'});
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
        <BaseInfo detailInfo={detailInfo}/>
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
                {masterAppealCheck1&&<SecondCheckResult masterAppealCheck={masterAppealCheck1}/>}
                <div className={styles.spaceLine}/>
              </div>
            )}
          </div>
        )}
        {SecondRecord&&(
          <div>
            <div className={styles.foldBox}>
              <span >二次申诉</span>
              <span onClick={()=>this.handleCollapse(2)}><img src={collapse2?imgdown:imgUp} width='18' height='18'/></span>
            </div>
            {collapse2&&(
              <div style={{paddingLeft:'15px'}}>
                {appealStart2&&<CreateAppeaRecord appealStart={appealStart2}/>}
                {sopAppealCheck2&&sopAppealCheck2.length!==0&&<FirstCheckResult sopAppealCheck={sopAppealCheck2}/>}
                {masterAppealCheck2&&<SecondCheckResult masterAppealCheck={masterAppealCheck2}/>}
              </div>
            )}
          </div>
        )}
        {query.isOnAppeal&&
        (AuthButton.checkPathname('/scoreAppeal/appeal/dockingMan')||
          AuthButton.checkPathname('/scoreAppeal/appeal/master'))&&
        <ShortcutButton ids={idList} currentId={query.id}
                        status={query.status}
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
