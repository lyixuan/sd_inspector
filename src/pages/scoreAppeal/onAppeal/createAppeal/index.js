import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import CreateAppeal from '../../components/CreateAppeal';
import FirstCheckResult from '../../components/FirstCheckResult';
import SecondCheckResult from '../../components/SecondCheckResult';
import CreateAppeaRecord from '../../components/CreateAppeaRecord';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgdown from '@/assets/scoreQuality/down.png';
import { Spin, message } from 'antd';
import BIModal from '@/ant_components/BIModal';
import BaseInfo from '../../components/BaseInfo';

@connect(({ appealCreateModel, scoreAppealModel, onAppealModel, loading }) => ({
  appealCreateModel, scoreAppealModel, onAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo'],
  submitLoading: loading.effects['appealCreateModel/postStartAppeal'],
}))

class AppealCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse1: true,
      collapse2: true,
      visible: false,
      attUrlList: [],
    };

  }
  componentDidMount() {
    const { query = {} } = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params: { dimensionId: query.dimensionId, dimensionType: query.dimensionType } },
    });
    this.props.dispatch({
      type: 'scoreAppealModel/queryAppealInfoCheckList',
      payload: { params: { creditAppealId: query.creditAppealId } },
    }).then(() => {
      const { scoreAppealModel = {} } = this.props;
      const { appealRecord = {} } = scoreAppealModel;
      const { appealStart: firstRecord } = appealRecord[1];
      this.setState({
        attUrlList: firstRecord ? firstRecord.appealProof : [],
        desc: firstRecord ? firstRecord.desc : undefined,
        creditType: firstRecord ? firstRecord.creditType : undefined,
      })
    });
  }

  getFileList = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    this.props.dispatch({
      type: 'appealCreateModel/queryuploadMultipleFile',
      payload: { file },
    })
  };
  onFormChange = (value, vname) => {
    this.setState({
      [vname]: value,
    });
  };
  submitAppeal = () => {
    const { query = {} } = this.props.location;
    const { desc, creditType, attUrlList } = this.state;
    if (!desc) {
      message.warn('申诉说明必填');
      return;
    }
    if (query.dimensionId === 26 && !creditType) {
      message.warn('申诉维度必填');
      return;
    }
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    const { query = {} } = this.props.location;
    const { type, creditAppealId, creditType, dimensionType } = query;
    const { desc, attUrlList, creditType: creditType2 } = this.state;
    const params = {
      type,
      creditAppealId: Number(creditAppealId),
      desc,
      creditType: creditType2 ? creditType2 : creditType ? Number(creditType) : undefined,
      dimensionType: Number(dimensionType),
      attUrlList,
    };
    const that = this;
    this.props.dispatch({
      type: 'onAppealModel/startAppeal',
      payload: { params },
    }).then(() => {
      that.setState({
        visible: false,
      });
      router.goBack();
    });

  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleCollapse = (type) => {
    if (type === 1) {
      this.setState({
        collapse1: !this.state.collapse1,
      });
    } else {
      this.setState({
        collapse2: !this.state.collapse2,
      });
    }
  };

  getUploadImg = (attUrlList) => {
    let newAttUrlList = [];
    for (let i = 0; i < attUrlList.length; i++) {
      if (attUrlList[i].name) {
        newAttUrlList.push(attUrlList[i].response.data.fileUrl);
      } else {
        newAttUrlList.push(attUrlList[i].url.substring(attUrlList[i].url.indexOf('upload')));
      }
    }
    this.setState({ attUrlList: newAttUrlList });
  };

  render() {
    const { collapse1, collapse2 } = this.state;
    const { loading, scoreAppealModel = {} } = this.props;
    const { detailInfo = {}, appealRecord = {} } = scoreAppealModel;
    const firstRecord = appealRecord[1];
    const SecondRecord = appealRecord[2];
    const { appealStart: appealStart1, sopAppealCheck: sopAppealCheck1, masterAppealCheck: masterAppealCheck1 } = firstRecord || {};
    const { appealStart: appealStart2, sopAppealCheck: sopAppealCheck2, masterAppealCheck: masterAppealCheck2 } = SecondRecord || {};
    const { query = {} } = this.props.location;
    console.log(111);
    return (
      <Spin spinning={loading}>
        <div className={styles.appealContainer}>
          <BaseInfo detailInfo={detailInfo} dimensionType={query.dimensionType} />
          {firstRecord && (
            <div>
              <div className={styles.foldBox}>
                <span>一次申诉</span>
                <span onClick={() => this.handleCollapse(1)}><img src={collapse1 ? imgdown : imgUp} width='18'
                  height='18' /></span>
              </div>
              {/* 申诉内容 */}
              {collapse1 && (
                <div style={{ paddingLeft: '15px' }}>
                  {Number(query.type) === 1 && <CreateAppeal {...this.props}
                    dimensionType={query.dimensionType}
                    getUploadImg={(attUrlList) => this.getUploadImg(attUrlList)}
                    getFileList={this.getFileList} appealStart={appealStart1}
                    onFormChange={(value, vname) => this.onFormChange(value, vname)} />}
                  {Number(query.type) === 2 && appealStart1 && <CreateAppeaRecord appealStart={appealStart1} />}
                  {sopAppealCheck1 && sopAppealCheck1.length !== 0 && <FirstCheckResult sopAppealCheck={sopAppealCheck1} />}
                  {masterAppealCheck1 && <SecondCheckResult masterAppealCheck={masterAppealCheck1} />}
                  <div className={styles.spaceLine} />
                </div>
              )}
            </div>
          )}
          {Number(query.type) === 2 && (
            <div>
              <div className={styles.foldBox}>
                <span>二次申诉  <span style={{ fontWeight: '400', fontSize: 14 }}>{query.secondAppealEndDate ? `(二次申诉截止日期：${query.secondAppealEndDate})` : ''}</span></span>
                <span onClick={() => this.handleCollapse(2)}><img src={collapse2 ? imgdown : imgUp} width='18'
                  height='18' /></span>
              </div>
              {/* 申诉内容 */}
              {collapse2 && (
                <div style={{ paddingLeft: '15px' }}>
                  <CreateAppeal {...this.props}
                    dimensionType={query.dimensionType}
                    getUploadImg={(attUrlList) => this.getUploadImg(attUrlList)}
                    getFileList={this.getFileList} appealStart={appealStart1}
                    onFormChange={(value, vname) => this.onFormChange(value, vname)} />
                  {sopAppealCheck2 && sopAppealCheck2.length !== 0 && <FirstCheckResult sopAppealCheck={sopAppealCheck2} />}
                  {masterAppealCheck2 && <SecondCheckResult masterAppealCheck={masterAppealCheck2} />}
                </div>
              )}
            </div>
          )}
          <footer style={{ textAlign: 'right', marginTop: '20px' }}>
            <BIButton onClick={() => router.goBack()} style={{ marginRight: '15px' }}>返回</BIButton>
            <BIButton type='primary' onClick={() => this.submitAppeal()}>提交申诉</BIButton>
          </footer>
          {/*---------*/}
          <BIModal
            title="提交确认"
            visible={this.state.visible}
            footer={[
              <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
                取消
              </BIButton>,
              <BIButton type="primary" loading={this.props.submitLoading} onClick={this.handleOk}>
                确定
              </BIButton>,
            ]}
          >
            <div className={styles.modalWrap}>是否确认提交？</div>
          </BIModal>
        </div>
      </Spin>
    );
  }
}

export default AppealCreate;
