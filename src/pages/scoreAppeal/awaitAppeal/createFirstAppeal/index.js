import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import CreateAppeal from '../../components/CreateAppeal';
import router from 'umi/router';
import BIButton from '@/ant_components/BIButton';
import imgUp from '@/assets/scoreQuality/up.png';
import imgDown from '@/assets/scoreQuality/down.png';
import { Spin, message } from 'antd';
import BIModal from '@/ant_components/BIModal';
import BaseInfo from '../../components/BaseInfo';

@connect(({ awaitAppealModel, scoreAppealModel, loading }) => ({
  awaitAppealModel, scoreAppealModel,
  loading: loading.effects['scoreAppealModel/queryBaseAppealInfo'],
  submitLoading: loading.effects['awaitAppealModel/firstStartAppeal'],
}))

class AppealCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: true,
      visible: false,
      attUrlList: [],
    };
  }

  componentDidMount() {
    const { query = {} } = this.props.location;
    this.props.dispatch({
      type: 'scoreAppealModel/queryBaseAppealInfo',
      payload: { params: { dimensionId: query.dimensionId, dimensionType: query.dimensionType,creditDate:query.creditDate,creditType:query.creditType } },
    });
  }
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
    if (query.creditType === 26 && !creditType) {
      message.warn('申诉维度必填');
      return;
    }
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    const { query = {} } = this.props.location;
    const { type, creditType, dimensionType, creditAppealId,creditDate } = query || {};
    const { desc, attUrlList, creditType: creditType2 } = this.state;
    const params = {
      type,                   // 一申
      creditType: creditType2 ? creditType2 : creditType ? Number(creditType) : undefined,  // 学分维度
      dimensionType: Number(dimensionType),            // 申诉维度
      creditDate: creditDate,
      creditAppealId: Number(creditAppealId),   // 学分申诉id（待申诉数据ID）
      desc,
      attUrlList,
      appealType: 1,  // 1 待申诉  2 已申诉
    };

    const that = this;
    this.props.dispatch({
      type: 'awaitAppealModel/firstStartAppeal',
      payload: { params },
    }).then(() => {
      that.setState({
        visible: false,
      });
      router.push({
        pathname: '/scoreAppeal/onAppeal',
        query: { params: JSON.stringify({dimensionType: query.dimensionType})  }
      });
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
      // 判断是接口返回的数据还是自己上传的数据，json数据会不同 根据是否有response判断
      if (attUrlList[i].response) {
        newAttUrlList.push(attUrlList[i].response.data.fileUrl);
      }
      if(attUrlList[i].url) {
        newAttUrlList.push(attUrlList[i].url.substring(attUrlList[i].url.indexOf('upload')));
      }
    }
    this.setState({ attUrlList: newAttUrlList });
  };

  render() {
    const { collapse1 } = this.state;
    const { loading, scoreAppealModel } = this.props;
    const { detailInfo = {} } = scoreAppealModel || {};
    const { query = {} } = this.props.location;
    // 申诉基础信息-学分维度
    let dimensionType;
    if (scoreAppealModel && scoreAppealModel.detailInfo && scoreAppealModel.detailInfo.baseAppealInfo) {
      dimensionType = scoreAppealModel.detailInfo.baseAppealInfo.dimensionType;
    }

    const collapse1Style = {
      display:
      collapse1
          ? 'block'
          : 'none',
    };
    return (
      <Spin spinning={loading}>
        <div className={styles.appealContainer}>
          <BaseInfo detailInfo={detailInfo} dimensionType={query.dimensionType} />
          <div>
            <div className={styles.foldBox}>
              <span>一次申诉</span>
              <span onClick={() => this.handleCollapse(1)}>
                <img src={collapse1 ? imgDown : imgUp} width='18' height='18' />
              </span>
            </div>
            <div className={styles.spaceLine} />
            <div style={{ paddingLeft: '15px' }}  style={ collapse1Style }>
              <CreateAppeal
                {...this.props}
                creditType={query.creditType}
                dimensionType={query.dimensionType}
                getUploadImg={(attUrlList) => this.getUploadImg(attUrlList)}
                onFormChange={(value, vname) => this.onFormChange(value, vname)} />
              <div className={styles.spaceLine} />
            </div>
          </div>
          <footer style={{ textAlign: 'right', marginTop: '20px' }}>
            <BIButton onClick={() => router.goBack()} style={{ marginRight: '15px' }}>返回</BIButton>
            <BIButton type='primary' onClick={() => this.submitAppeal()}>提交申诉</BIButton>
          </footer>
          {/*二次确认modal*/}
          <BIModal
            title="提交确认"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
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
