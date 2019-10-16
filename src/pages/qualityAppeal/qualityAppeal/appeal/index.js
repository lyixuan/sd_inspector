import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Spin,Icon } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import Appeal from '@/pages/qualityAppeal/components/AppealInfo/Appeal';
import BIModal from '@/ant_components/BIModal';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';
import AuthButton from '@/components/AuthButton';

@connect(({ qualityAppealing, qualityAppealHome, loading }) => ({
  qualityAppealing,
  qualityAppealHome,
  submitLoading: loading.effects['qualityAppealing/reviewAppeal'],
  submitLoading2: loading.effects['qualityAppealing/sopAppeal'],
  pageLoading:
    loading.effects['qualityAppealing/getAppealInfo'] ||
    loading.effects['qualityAppealHome/getQualityDetailData'],
}))
class QualityAppealing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false
    };
    const { query = {} } = this.props.location;
    this.query = query;
  }

  componentDidMount() {
    this.getQualityInfo();
    this.getAppealInfo();
  }

  getAppealInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealing/getAppealInfo',
      payload: { id: this.query.id },
    });
  };

  getQualityInfo = () => {
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: { id: this.query.id },
    });
  };

  edit = ()=>{
    this.setState({
      visible:true
    })
  };

  onSubmit = params => {
    this.props.dispatch({
      type: 'qualityAppealHome/updateQuality',
      payload: { ...params },
    }).then((res)=>{
      if(res){
        this.setState({
          visible:false
        });
        this.getQualityInfo();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { DetailData = {}, appealShow } = this.props.qualityAppealing || {};
    const { QualityDetailData = {} } = this.props.qualityAppealHome || {};
    console.log(QualityDetailData, 'qualityDetailData');
    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}
          <BaseDetail data={QualityDetailData}/>
          <AuthButton authority="/qualityAppeal/qualityAppeal/editQuality">
            <div className={styles.editButton} onClick={this.edit}><Icon type="edit" /> 编辑违规信息</div>
          </AuthButton>
          {/* 申诉信息 */}
          <Appeal {...this.props} appealShow={appealShow} QualityDetailData={QualityDetailData} />
          {/*{this.getAppealInfos(DetailData)}*/}
        </div>

        <BIModal
          title="编辑质检信息"
          width={1200}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <FormIndex backType="closeModal"
                     params={QualityDetailData}
                     onCancel={this.handleCancel}
                     onSubmit={this.onSubmit}/>
        </BIModal>
      </Spin>
    );
  }
}

export default QualityAppealing;
