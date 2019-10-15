import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Spin,Icon } from 'antd';
import BaseDetail from '@/pages/qualityAppeal/components/BaseDetail';
import BIModal from '@/ant_components/BIModal';
import FormIndex from '@/pages/qualityAppeal/components/BaseForm/index';

@connect(({ qualityAppealing, qualityAppealHome,loading }) => ({
  qualityAppealing,
  qualityAppealHome,
  submitLoading: loading.effects['qualityAppealing/reviewAppeal'],
  submitLoading2: loading.effects['qualityAppealing/sopAppeal'],
  pageLoading: loading.effects['qualityAppealing/getAppealInfo'] || loading.effects['qualityAppealHome/getQualityDetailData']
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
      type: 'qualityNewSheet/updateQuality',
      payload: { ...params },
    }).then((res)=>{
      if(res){
        this.setState({
          visible:false
        });
        this.componentDidMount();
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {DetailData={}} = this.props.qualityAppealing||{};

    const {QualityDetailData={}} = this.props.qualityAppealHome||{};

    return (
      <Spin spinning={this.props.pageLoading}>
        <div className={styles.detailContainer}>
          {/*质检详情*/}
          <BaseDetail data={QualityDetailData}/>
          <div className={styles.editButton} onClick={this.edit}><Icon type="edit" /> 编辑违规信息</div>
          {/* 申诉信息 */}
          {/*{this.getAppealInfos(DetailData)}*/}
        </div>

        <BIModal
          title="编辑质检信息"
          width={1200}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <FormIndex params={QualityDetailData}
                     onSubmit={this.onSubmit}/>
        </BIModal>
      </Spin>
    );
  }
}

export default QualityAppealing;
